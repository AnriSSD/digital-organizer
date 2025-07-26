#!/usr/bin/env python3
"""
Тестовый файл для проверки импортов
"""
import sys
import os

# Добавляем путь к виртуальному окружению
venv_path = os.path.join(os.path.dirname(__file__), 'venv', 'lib', 'python3.11', 'site-packages')
if venv_path not in sys.path:
    sys.path.insert(0, venv_path)

try:
    import fastapi
    print("✅ FastAPI импортируется успешно")
except ImportError as e:
    print(f"❌ Ошибка импорта FastAPI: {e}")

try:
    import uvicorn
    print("✅ Uvicorn импортируется успешно")
except ImportError as e:
    print(f"❌ Ошибка импорта Uvicorn: {e}")

try:
    from fastapi.middleware.cors import CORSMiddleware
    print("✅ CORS middleware импортируется успешно")
except ImportError as e:
    print(f"❌ Ошибка импорта CORS middleware: {e}")

print(f"Python путь: {sys.executable}")
print(f"Python версия: {sys.version}")
print(f"Пути поиска модулей: {sys.path[:3]}...") 