import uuid
from pathlib import Path
from fastapi import (
    APIRouter, Depends, HTTPException, status, UploadFile, File, Form
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.screenshot import Screenshot
from app.models.user import User
from app.schemas.screenshot import ScreenshotResponse, ScreenshotList
from app.api.deps import get_current_active_user

router = APIRouter(prefix="/screenshots", tags=["screenshots"])

# Создаем папку для загрузок если её нет
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Разрешенные типы файлов
ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/jpg", 
    "image/png"
}

# Максимальный размер файла (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024


def validate_file(file: UploadFile) -> None:
    """Проверяет файл на соответствие требованиям"""
    if file.content_type not in ALLOWED_MIME_TYPES:
        allowed_types = ', '.join(ALLOWED_MIME_TYPES)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Неподдерживаемый тип файла. Разрешены только: {allowed_types}"
        )


@router.post("/upload", response_model=ScreenshotResponse)
async def upload_screenshot(
    file: UploadFile = File(...),
    category: str = Form(...),
    description: str = Form(None),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Загружает скриншот"""
    
    # Проверяем файл
    validate_file(file)
    
    # Проверяем размер файла
    file_content = await file.read()
    max_size_mb = MAX_FILE_SIZE // (1024 * 1024)
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Файл слишком большой. Максимальный размер: {max_size_mb}MB"
        )
    
    # Генерируем уникальное имя файла
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Сохраняем файл
    try:
        with open(file_path, "wb") as f:
            f.write(file_content)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при сохранении файла"
        )
    
    # Создаем запись в БД
    db_screenshot = Screenshot(
        filename=unique_filename,
        original_filename=file.filename,
        file_path=str(file_path),
        file_size=len(file_content),
        mime_type=file.content_type,
        category=category,
        description=description,
        user_id=current_user.id
    )
    
    db.add(db_screenshot)
    db.commit()
    db.refresh(db_screenshot)
    
    return db_screenshot


@router.get("/", response_model=ScreenshotList)
async def get_screenshots(
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Получает список скриншотов пользователя"""
    
    screenshots = db.query(Screenshot).filter(
        Screenshot.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    total = db.query(Screenshot).filter(
        Screenshot.user_id == current_user.id
    ).count()
    
    return ScreenshotList(screenshots=screenshots, total=total)


@router.get("/{screenshot_id}", response_model=ScreenshotResponse)
async def get_screenshot(
    screenshot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Получает конкретный скриншот"""
    
    screenshot = db.query(Screenshot).filter(
        Screenshot.id == screenshot_id,
        Screenshot.user_id == current_user.id
    ).first()
    
    if not screenshot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Скриншот не найден"
        )
    
    return screenshot


@router.get("/{screenshot_id}/file")
async def get_screenshot_file(
    screenshot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Возвращает файл скриншота"""
    
    screenshot = db.query(Screenshot).filter(
        Screenshot.id == screenshot_id,
        Screenshot.user_id == current_user.id
    ).first()
    
    if not screenshot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Скриншот не найден"
        )
    
    file_path = Path(screenshot.file_path)
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Файл не найден"
        )
    
    return FileResponse(
        path=file_path,
        filename=screenshot.original_filename,
        media_type=screenshot.mime_type
    )


@router.delete("/{screenshot_id}")
async def delete_screenshot(
    screenshot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Удаляет скриншот"""
    
    screenshot = db.query(Screenshot).filter(
        Screenshot.id == screenshot_id,
        Screenshot.user_id == current_user.id
    ).first()
    
    if not screenshot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Скриншот не найден"
        )
    
    # Удаляем файл
    file_path = Path(screenshot.file_path)
    if file_path.exists():
        try:
            file_path.unlink()
        except Exception as e:
            # Логируем ошибку, но не прерываем удаление записи из БД
            print(f"Ошибка при удалении файла {file_path}: {e}")
    
    # Удаляем запись из БД
    db.delete(screenshot)
    db.commit()
    
    return {"message": "Скриншот удален"} 