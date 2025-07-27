from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # База данных
    database_url: str = "sqlite:///./digital_organizer.db"
    
    # JWT настройки
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # OAuth настройки
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    github_client_id: Optional[str] = None
    github_client_secret: Optional[str] = None
    
    # CORS настройки
    frontend_url: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"


settings = Settings() 