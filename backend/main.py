from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.api.screenshots import router as screenshots_router
from app.database import engine
from app.models.user import Base
from app.models.screenshot import Screenshot  # noqa: F401

# Создаем таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Цифровой Органайзер", version="1.0.0")

# Настройка CORS для работы с frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174", 
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179",
        "http://localhost:5180",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175", 
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
        "http://127.0.0.1:5178",
        "http://127.0.0.1:5179",
        "http://127.0.0.1:5180",
        "http://192.168.1.22:5173",
        "http://192.168.1.22:5174",
        "http://192.168.1.22:5175",
        "http://192.168.1.22:5176",
        "http://192.168.1.22:5177",
        "http://192.168.1.22:5178",
        "http://192.168.1.22:5179",
        "http://192.168.1.22:5180"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роуты
app.include_router(auth_router)
app.include_router(screenshots_router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/")
async def root():
    return {"message": "Цифровой Органайзер API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 