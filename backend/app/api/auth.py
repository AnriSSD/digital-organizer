import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import (
    UserCreate, UserLogin, UserResponse, Token, OAuthRequest,
    ForgotPasswordRequest, ResetPasswordRequest, ForgotPasswordResponse
)
from app.core.security import (
    verify_password, get_password_hash, create_access_token,
    create_reset_token, verify_reset_token
)
import re
from app.api.deps import get_current_active_user

router = APIRouter(prefix="/auth", tags=["authentication"])


def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 8:
        return False
    if not re.search(r"[a-zA-Z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    return True


@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if passwords match
    if user_data.password != user_data.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Validate password strength
    if not validate_password(user_data.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and contain both letters and numbers"
        )
    
    # Check if user already exists
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(
        form_data.password, user.hashed_password
    ):
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


@router.post("/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(
    request: ForgotPasswordRequest, db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        # Don't reveal if user exists or not for security
        return {
            "message": "If the email exists, a password reset link has been sent"
        }
    
    # Generate reset token
    reset_token = create_reset_token(data={"sub": user.email})
    
    # Store token in database
    user.reset_token = reset_token
    user.reset_token_expires = None  # Will be set by token expiration
    db.commit()
    
    # Log the reset link (in production, this would be sent via email)
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
    print(f"Password reset link for {user.email}: {reset_link}")
    
    return {
        "message": "If the email exists, a password reset link has been sent"
    }


@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest, db: Session = Depends(get_db)
):
    # Validate password strength
    if not validate_password(request.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and contain both letters and numbers"
        )
    
    # Check if passwords match
    if request.password != request.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Verify reset token
    email = verify_reset_token(request.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Find user
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    # Update password and clear reset token
    user.hashed_password = get_password_hash(request.password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    
    return {"message": "Password has been reset successfully"}


@router.post("/oauth/google")
def google_oauth(request: OAuthRequest, db: Session = Depends(get_db)):
    # Exchange code for token
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "client_id": "your-google-client-id",  # Replace with actual
        "client_secret": "your-google-client-secret",  # Replace with actual
        "code": request.code,
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:3000/oauth/callback"
    }
    
    # This is a simplified version - in production you'd handle the OAuth flow properly
    return {"message": "Google OAuth not fully implemented yet"}


@router.post("/oauth/github")
def github_oauth(request: OAuthRequest, db: Session = Depends(get_db)):
    # Exchange code for token
    token_url = "https://github.com/login/oauth/access_token"
    token_data = {
        "client_id": "your-github-client-id",  # Replace with actual
        "client_secret": "your-github-client-secret",  # Replace with actual
        "code": request.code
    }
    
    # This is a simplified version - in production you'd handle the OAuth flow properly
    return {"message": "GitHub OAuth not fully implemented yet"}


@router.get("/me", response_model=UserResponse)
def get_current_user(
    current_user: User = Depends(get_current_active_user)
):
    return current_user 