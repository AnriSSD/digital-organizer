import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..schemas.auth import UserCreate, UserResponse, Token, OAuthRequest
from ..core.security import get_password_hash, verify_password, create_access_token
from ..core.config import settings
from ..api.deps import get_current_active_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Регистрация нового пользователя"""
    # Проверяем, что пароли совпадают
    if user_data.password != user_data.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Проверяем длину пароля
    if len(user_data.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters long"
        )
    
    # Проверяем, что пользователь не существует
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Создаем нового пользователя
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        is_verified=True  # Для простоты сразу верифицируем
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Вход пользователя"""
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/oauth/google", response_model=Token)
async def google_oauth(oauth_data: OAuthRequest, db: Session = Depends(get_db)):
    """OAuth через Google"""
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Google OAuth not configured"
        )
    
    # Обмениваем код на токен
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "code": oauth_data.code,
                "grant_type": "authorization_code",
                "redirect_uri": f"{settings.frontend_url}/auth/callback"
            }
        )
        
        if token_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get access token from Google"
            )
        
        token_data = token_response.json()
        access_token = token_data["access_token"]
        
        # Получаем информацию о пользователе
        user_response = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        
        if user_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get user info from Google"
            )
        
        user_info = user_response.json()
        email = user_info["email"]
        google_id = user_info["id"]
    
    # Ищем или создаем пользователя
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            email=email,
            oauth_provider="google",
            oauth_id=google_id,
            is_verified=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    elif user.oauth_provider != "google":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered with different provider"
        )
    
    # Создаем JWT токен
    jwt_token = create_access_token(data={"sub": user.email})
    return {"access_token": jwt_token, "token_type": "bearer"}


@router.post("/oauth/github", response_model=Token)
async def github_oauth(oauth_data: OAuthRequest, db: Session = Depends(get_db)):
    """OAuth через GitHub"""
    if not settings.github_client_id or not settings.github_client_secret:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="GitHub OAuth not configured"
        )
    
    # Обмениваем код на токен
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": settings.github_client_id,
                "client_secret": settings.github_client_secret,
                "code": oauth_data.code
            },
            headers={"Accept": "application/json"}
        )
        
        if token_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get access token from GitHub"
            )
        
        token_data = token_response.json()
        access_token = token_data["access_token"]
        
        # Получаем информацию о пользователе
        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"token {access_token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )
        
        if user_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get user info from GitHub"
            )
        
        user_info = user_response.json()
        email = user_info.get("email")
        github_id = str(user_info["id"])
        
        if not email:
            # Если email не публичный, получаем его отдельно
            emails_response = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"token {access_token}",
                    "Accept": "application/vnd.github.v3+json"
                }
            )
            if emails_response.status_code == 200:
                emails = emails_response.json()
                primary_email = next((e for e in emails if e["primary"]), None)
                if primary_email:
                    email = primary_email["email"]
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not get email from GitHub"
        )
    
    # Ищем или создаем пользователя
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            email=email,
            oauth_provider="github",
            oauth_id=github_id,
            is_verified=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    elif user.oauth_provider != "github":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered with different provider"
        )
    
    # Создаем JWT токен
    jwt_token = create_access_token(data={"sub": user.email})
    return {"access_token": jwt_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """Получает информацию о текущем пользователе"""
    return current_user 