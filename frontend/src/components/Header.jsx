import { Link, useLocation } from 'react-router-dom';
import { PlusIcon, BookmarkIcon, HomeIcon, InformationCircleIcon, TagIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: HomeIcon },
    { path: '/add', label: 'Добавить ссылку', icon: PlusIcon },
    { path: '/bookmarks', label: 'Мои закладки', icon: BookmarkIcon },
    { path: '/categories', label: 'Категории', icon: TagIcon },
    { path: '/about', label: 'О проекте', icon: InformationCircleIcon },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
              Цифровой Органайзер
            </Link>
          </div>
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 