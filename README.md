# 🗂️ Цифровой Органайзер

Веб-приложение для сохранения и организации закладок с системой авторизации и локализацией.

## 🚀 Быстрый запуск

### Вариант 1: Автоматический запуск (рекомендуется)
```bash
# Из корневой папки проекта
./start-dev.sh
```

### Вариант 2: Ручной запуск
```bash
# Терминал 1 - Backend
cd backend
source venv/bin/activate
python main.py

# Терминал 2 - Frontend  
cd frontend
npm run dev
```

## 📋 Подробная инструкция

### 1. Подготовка окружения

#### Backend (Python/FastAPI)
```bash
cd backend

# Создание виртуального окружения (если не существует)
python -m venv venv

# Активация виртуального окружения
source venv/bin/activate  # macOS/Linux
# или
venv\Scripts\activate     # Windows

# Установка зависимостей
pip install -r requirements.txt
```

#### Frontend (React/Vite)
```bash
cd frontend

# Установка зависимостей
npm install
```

### 2. Запуск

#### Автоматический запуск (рекомендуется)
```bash
# Из корневой папки проекта
chmod +x start-dev.sh  # Только при первом запуске
./start-dev.sh
```

#### Ручной запуск
```bash
# Терминал 1 - Backend
cd backend
source venv/bin/activate
python main.py

# Терминал 2 - Frontend
cd frontend  
npm run dev
```

### 3. Доступ к приложению

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API документация:** http://localhost:8000/docs

## 🔧 Возможные проблемы и решения

### Проблема: "source: no such file or directory: venv/bin/activate"
**Решение:** Убедись, что ты находишься в папке `backend`:
```bash
cd backend
source venv/bin/activate
```

### Проблема: "ModuleNotFoundError: No module named 'jose'"
**Решение:** Зависимости не установлены в виртуальном окружении:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Проблема: CORS ошибки в браузере
**Решение:** Backend не может обработать запросы с твоего IP. Добавь свой IP в `backend/main.py`:
```python
allow_origins=[
    # ... существующие адреса ...
    "http://ТВОЙ_IP:5173",  # Добавь сюда
]
```

### Проблема: Белый экран
**Решение:** Проверь консоль браузера (F12) на ошибки JavaScript.

### Проблема: "Ошибка регистрации"
**Решение:** 
1. Проверь, что backend запущен
2. Проверь консоль браузера на CORS ошибки
3. Убедись, что IP адрес добавлен в CORS настройки

## 📁 Структура проекта

```
digital-organizer/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Конфигурация и безопасность
│   │   ├── models/         # SQLAlchemy модели
│   │   └── schemas/        # Pydantic схемы
│   ├── venv/               # Виртуальное окружение Python
│   ├── main.py             # Точка входа backend
│   └── requirements.txt    # Python зависимости
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── contexts/       # React контексты
│   │   ├── pages/          # Страницы приложения
│   │   └── utils/          # Утилиты
│   ├── package.json        # Node.js зависимости
│   └── vite.config.js      # Конфигурация Vite
├── start-dev.sh            # Скрипт автоматического запуска
└── README.md               # Эта инструкция
```

## 🛠️ Технологии

### Backend
- **FastAPI** - веб-фреймворк
- **SQLAlchemy** - ORM для работы с БД
- **Alembic** - миграции БД
- **Pydantic** - валидация данных
- **python-jose** - JWT токены
- **passlib** - хеширование паролей
- **httpx** - HTTP клиент для OAuth

### Frontend
- **React 19** - UI библиотека
- **React Router** - маршрутизация
- **Tailwind CSS** - стилизация
- **Axios** - HTTP клиент
- **Headless UI** - UI компоненты
- **Heroicons** - иконки

## 🔐 Функции

- ✅ Регистрация и вход пользователей
- ✅ OAuth через Google и GitHub
- ✅ JWT аутентификация
- ✅ Защищенные маршруты
- ✅ Локализация (русский/английский)
- ✅ Адаптивный дизайн
- ✅ Управление закладками (в разработке)

## 📝 Примечания

- Backend использует SQLite для простоты разработки
- Все пароли хешируются с помощью bcrypt
- JWT токены имеют срок действия 30 минут
- CORS настроен для локальной разработки

## 🚨 Важно

- **Всегда активируй виртуальное окружение** перед запуском backend
- **Проверяй консоль браузера** при возникновении проблем
- **Используй скрипт `start-dev.sh`** для автоматического запуска
- **Добавляй новые IP адреса** в CORS настройки при необходимости 