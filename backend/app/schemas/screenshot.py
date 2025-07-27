from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ScreenshotBase(BaseModel):
    category: str
    description: Optional[str] = None


class ScreenshotCreate(ScreenshotBase):
    pass


class ScreenshotResponse(ScreenshotBase):
    id: int
    filename: str
    original_filename: str
    file_path: str
    file_size: int
    mime_type: str
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ScreenshotList(BaseModel):
    screenshots: list[ScreenshotResponse]
    total: int 