import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8">
            Извините, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            На главную
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Назад
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Если вы считаете, что это ошибка, пожалуйста, сообщите нам.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 