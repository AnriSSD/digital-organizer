import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, BookmarkIcon, HeartIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { apiClient } from '../utils/api';

const Home = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const { t } = useLanguage();

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    try {
      const data = await apiClient.healthCheck();
      
      if (data.status === 'ok') {
        setApiStatus('ok');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      setApiStatus('error');
      console.error('Ошибка при проверке API:', error);
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'ok':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'ok':
        return t('home.apiWorking');
      case 'error':
        return t('home.apiUnavailable');
      default:
        return t('home.checking');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Фоновые декоративные элементы */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-60"></div>
            
            <div className="relative z-10">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-8 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{t('home.welcome')}</h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                {t('home.description')}
              </p>
              
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-12 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 mb-3">{t('home.apiStatus')}</h3>
                <div className="flex items-center justify-center space-x-3">
                  {getStatusIcon()}
                  <span className="text-base text-gray-700 font-medium">{getStatusText()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/add"
                  className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <PlusIcon className="h-6 w-6 mr-3" />
                  {t('home.addLink')}
                </Link>
                <Link
                  to="/bookmarks"
                  className="flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-lg font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <BookmarkIcon className="h-6 w-6 mr-3" />
                  {t('home.myBookmarks')}
                </Link>
                <Link
                  to="/donate"
                  className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <HeartIcon className="h-6 w-6 mr-3" />
                  {t('home.supportProject')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 