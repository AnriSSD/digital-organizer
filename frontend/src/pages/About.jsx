import { Link } from 'react-router-dom';
import { ArrowLeftIcon, BookmarkIcon, PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Назад
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">О проекте</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <BookmarkIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Цифровой Органайзер</h2>
          </div>
          <p className="text-lg text-gray-600">
            Веб-приложение для сохранения и организации ссылок с автоматической классификацией с помощью ИИ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PlusIcon className="h-5 w-5 mr-2 text-blue-600" />
              Возможности
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Автоматическое извлечение метаданных из ссылок</li>
              <li>• ИИ-классификация по категориям и тегам</li>
              <li>• Удобный поиск и фильтрация</li>
              <li>• Отслеживание статуса прочтения</li>
              <li>• Адаптивный дизайн</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-green-600" />
              Технологии
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Frontend:</strong> React + Vite + Tailwind CSS</li>
              <li>• <strong>Backend:</strong> FastAPI + SQLite</li>
              <li>• <strong>Миграции:</strong> Alembic</li>
              <li>• <strong>ИИ:</strong> Автоматическая классификация</li>
              <li>• <strong>Деплой:</strong> Vercel/Railway</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Планы развития</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Telegram Bot</h4>
              <p className="text-sm text-blue-700">Добавление ссылок через Telegram</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Экспорт данных</h4>
              <p className="text-sm text-green-700">Экспорт в различные форматы</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Синхронизация</h4>
              <p className="text-sm text-purple-700">Синхронизация между устройствами</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Это MVP версия проекта. Мы постоянно работаем над улучшением функциональности.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/add"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Попробовать
              </Link>
              <Link
                to="/bookmarks"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Мои закладки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 