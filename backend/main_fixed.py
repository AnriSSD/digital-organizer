#!/usr/bin/env python3
"""
Цифровой Органайзер - Backend API
"""
import sys
import os

# Добавляем путь к виртуальному окружению
venv_path = os.path.join(os.path.dirname(__file__), 'venv', 'lib', 'python3.11', 'site-packages')
if venv_path not in sys.path:
    sys.path.insert(0, venv_path)

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    import uvicorn
except ImportError as e:
    print(f"Ошибка импорта: {e}")
    print(f"Python путь: {sys.executable}")
    print(f"Пути поиска: {sys.path[:3]}")
    sys.exit(1)

app = FastAPI(title="Цифровой Органайзер", version="1.0.0")

# Настройка CORS для работы с frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "Цифровой Органайзер API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 