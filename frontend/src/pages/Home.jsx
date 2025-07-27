import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, BookmarkIcon, CheckCircleIcon, XCircleIcon, HeartIcon } from '@heroicons/react/24/outline';
import { apiClient } from '../utils/api';
import { useLanguage } from '../hooks/useLanguage';

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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.welcome')}</h2>
            <p className="text-lg text-gray-600 mb-6">
              {t('home.description')}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{t('home.apiStatus')}</h3>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon()}
                <span className="text-sm text-gray-600">{getStatusText()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/add"
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                {t('home.addLink')}
              </Link>
              <Link
                to="/bookmarks"
                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <BookmarkIcon className="h-5 w-5 mr-2" />
                {t('home.myBookmarks')}
              </Link>
              <Link
                to="/donate"
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                {t('home.supportProject')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 