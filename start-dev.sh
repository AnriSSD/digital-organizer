#!/bin/bash

echo "🚀 Запускаю Digital Organizer в режиме разработки..."

# Функция для остановки всех процессов при выходе
cleanup() {
    echo "🛑 Останавливаю все процессы..."
    pkill -f "python main.py"
    pkill -f "vite"
    exit 0
}

# Устанавливаем обработчик сигналов
trap cleanup SIGINT SIGTERM

# Запускаем backend в фоне
echo "🔧 Запускаю backend на http://localhost:8000"
cd backend && python main.py &
BACKEND_PID=$!

# Ждем немного, чтобы backend успел запуститься
sleep 2

# Запускаем frontend в фоне
echo "🎨 Запускаю frontend на http://localhost:5173"
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "✅ Оба сервера запущены!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:8000"
echo "📊 API Docs: http://localhost:8000/docs"
echo ""
echo "Нажмите Ctrl+C для остановки всех серверов"

# Ждем завершения любого из процессов
wait 