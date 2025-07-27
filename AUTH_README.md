# Система авторизации Digital Organizer

## 🚀 Быстрый старт

### Backend

1. **Установите зависимости:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Создайте файл .env:**
```bash
cp env.example .env
```

3. **Настройте переменные окружения в .env:**
```env
# Обязательные настройки
SECRET_KEY=your-super-secret-key-change-this-in-production
DATABASE_URL=sqlite:///./digital_organizer.db

# Опционально - для OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

4. **Запустите backend:**
```bash
python main.py
```

Backend будет доступен по адресу: http://localhost:8000

### Frontend

1. **Установите зависимости:**
```bash
cd frontend
npm install
```

2. **Запустите frontend:**
```bash
npm run dev
```

Frontend будет доступен по адресу: http://localhost:3000

## 🔧 Настройка OAuth (опционально)

### Google OAuth

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 credentials
5. Добавьте разрешенные redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:8000/auth/callback`
6. Скопируйте Client ID и Client Secret в .env файл

### GitHub OAuth

1. Перейдите в [GitHub Developer Settings](https://github.com/settings/developers)
2. Создайте новое OAuth App
3. Добавьте Authorization callback URL:
   - `http://localhost:3000/auth/callback`
4. Скопируйте Client ID и Client Secret в .env файл

## 📁 Структура проекта

### Backend
```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py          # API роуты авторизации
│   │   └── deps.py          # Зависимости для проверки токенов
│   ├── core/
│   │   ├── config.py        # Конфигурация приложения
│   │   └── security.py      # JWT и хеширование паролей
│   ├── models/
│   │   └── user.py          # Модель пользователя
│   └── schemas/
│       └── auth.py          # Pydantic схемы
├── main.py                  # Основной файл приложения
└── requirements.txt         # Зависимости Python
```

### Frontend
```
frontend/src/
├── components/
│   ├── Header.jsx           # Обновленная навигация
│   └── ProtectedRoute.jsx   # Компонент защиты маршрутов
├── contexts/
│   └── AuthContext.jsx      # Контекст авторизации
├── pages/
│   ├── Login.jsx            # Страница входа
│   └── Register.jsx         # Страница регистрации
└── locales/
    ├── en.js                # Английские переводы
    └── ru.js                # Русские переводы
```

## 🔐 API Endpoints

### Авторизация
- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Вход пользователя
- `POST /auth/oauth/google` - OAuth через Google
- `POST /auth/oauth/github` - OAuth через GitHub
- `GET /auth/me` - Информация о текущем пользователе

### Защищенные маршруты
- `/add` - Добавление закладок (требует авторизации)
- `/bookmarks` - Просмотр закладок (требует авторизации)

## 🎨 Обновленная навигация

### Десктоп
- **Слева:** Home, My Bookmarks
- **Справа:** 
  - Выпадающее меню "More" (Add Link, About, Support)
  - Переключатель языка
  - Кнопка "Logout" (если авторизован)

### Мобильная версия
- Бургер-меню с полной навигацией
- Адаптивный дизайн

## 🧪 Тестирование

1. **Регистрация:**
   - Перейдите на http://localhost:3000/register
   - Создайте аккаунт с email и паролем

2. **Вход:**
   - Перейдите на http://localhost:3000/login
   - Войдите с созданными данными

3. **Защищенные маршруты:**
   - Попробуйте перейти на /add или /bookmarks без авторизации
   - Должен быть редирект на /login

4. **Logout:**
   - Нажмите кнопку "Выйти" в навигации
   - Должен быть редирект на /login

## 🔧 Возможные проблемы

### Backend не запускается
- Проверьте, что все зависимости установлены
- Убедитесь, что файл .env создан и настроен
- Проверьте, что порт 8000 свободен

### Frontend не подключается к backend
- Убедитесь, что backend запущен на http://localhost:8000
- Проверьте CORS настройки в backend/main.py

### OAuth не работает
- Проверьте настройки в .env файле
- Убедитесь, что redirect URIs настроены правильно
- Проверьте, что OAuth приложения созданы и активны

## 📝 Измененные файлы

### Backend
- `requirements.txt` - добавлены зависимости для авторизации
- `main.py` - подключены роуты авторизации
- Созданы новые модули в папке `app/`

### Frontend
- `package.json` - добавлены зависимости для авторизации
- `App.jsx` - добавлен AuthProvider и новые маршруты
- `Header.jsx` - полностью переработан согласно UX-правилам
- Созданы новые компоненты и страницы
- Обновлены файлы локализации

## 🚀 Следующие шаги

1. Настройте OAuth для Google и GitHub
2. Добавьте email верификацию
3. Реализуйте восстановление пароля
4. Добавьте двухфакторную аутентификацию
5. Настройте production окружение 