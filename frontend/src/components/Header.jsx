import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  BookmarkIcon, 
  HomeIcon, 
  InformationCircleIcon, 
  HeartIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainNavItems = [
    { path: '/', label: t('header.home'), icon: HomeIcon },
    { path: '/bookmarks', label: t('header.bookmarks'), icon: BookmarkIcon },
  ];

  const moreMenuItems = [
    { path: '/add', label: t('header.addLink'), icon: PlusIcon },
    { path: '/about', label: t('header.about'), icon: InformationCircleIcon },
    { path: '/donate', label: t('header.support'), icon: HeartIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              onClick={closeMobileMenu}
            >
              {t('header.logo')}
            </Link>
          </div>

          {/* Основная навигация (десктоп) */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Правая часть (десктоп) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Выпадающее меню "Ещё" */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {t('header.more')}
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {moreMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeDropdown}
                        className={`flex items-center px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Переключатель языка */}
            <LanguageSwitcher />

            {/* Кнопка выхода (если авторизован) */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                {t('header.logout')}
              </button>
            )}
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню (выпадающее) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-1">
              {/* Основные пункты */}
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Дополнительные пункты */}
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Переключатель языка */}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>

              {/* Кнопка выхода */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  {t('header.logout')}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Оверлей для закрытия выпадающего меню */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeDropdown}
        />
      )}
    </header>
  );
};

export default Header; 