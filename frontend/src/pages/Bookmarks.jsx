import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TagBadge from '../components/TagBadge';
import CategoryBadge from '../components/CategoryBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AddCategoryModal from '../components/AddCategoryModal';
import { useCategories } from '../utils/useCategories';

const Bookmarks = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [readFilter, setReadFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const itemsPerPage = 10;

  // Получение закладок с backend
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Получаем закладки из localStorage
      const storedBookmarks = localStorage.getItem('bookmarks');
      let data = [];
      
      if (storedBookmarks) {
        data = JSON.parse(storedBookmarks);
      } else {
        // Если нет данных, используем мок-данные для демонстрации
        data = [
          {
            id: 1,
            title: 'React Documentation',
            description: 'Официальная документация React',
            url: 'https://react.dev',
            category: 'Обучение',
            tags: ['react', 'javascript', 'frontend'],
            is_read: false,
            created_at: '2025-01-26T10:00:00Z'
          },
          {
            id: 2,
            title: 'Tailwind CSS Guide',
            description: 'Полное руководство по Tailwind CSS',
            url: 'https://tailwindcss.com/docs',
            category: 'Обучение',
            tags: ['css', 'tailwind', 'design'],
            is_read: true,
            created_at: '2025-01-25T15:30:00Z'
          },
          {
            id: 3,
            title: 'FastAPI Tutorial',
            description: 'Изучение FastAPI для создания API',
            url: 'https://fastapi.tiangolo.com',
            category: 'Работа',
            tags: ['python', 'fastapi', 'api'],
            is_read: false,
            created_at: '2025-01-24T09:15:00Z'
          }
        ];
        // Сохраняем мок-данные в localStorage
        localStorage.setItem('bookmarks', JSON.stringify(data));
      }
      
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Не удалось загрузить закладки');
    } finally {
      setIsLoading(false);
    }
  };

  // Фильтрация и поиск
  useEffect(() => {
    let filtered = bookmarks;

    // Поиск по заголовку и тегам
    if (searchTerm) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Фильтр по категории
    if (selectedCategory) {
      filtered = filtered.filter(bookmark => bookmark.category === selectedCategory);
    }

    // Фильтр по тегам
    if (selectedTags.length > 0) {
      filtered = filtered.filter(bookmark =>
        selectedTags.every(tag => bookmark.tags.includes(tag))
      );
    }

    // Фильтр по статусу прочтения
    if (readFilter !== 'all') {
      const isRead = readFilter === 'read';
      filtered = filtered.filter(bookmark => bookmark.is_read === isRead);
    }

    setFilteredBookmarks(filtered);
    setCurrentPage(1);
  }, [bookmarks, searchTerm, selectedCategory, selectedTags, readFilter]);

  // Получение уникальных категорий и тегов
  const availableCategories = [...new Set(bookmarks.map(b => b.category).filter(Boolean))];
  const allTags = [...new Set(bookmarks.flatMap(b => b.tags))];

  // Пагинация
  const paginatedBookmarks = filteredBookmarks.slice(0, currentPage * itemsPerPage);
  const hasMorePages = paginatedBookmarks.length < filteredBookmarks.length;

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const toggleReadStatus = async (bookmarkId) => {
    try {
      // Обновляем статус в состоянии
      const updatedBookmarks = bookmarks.map(bookmark =>
        bookmark.id === bookmarkId
          ? { ...bookmark, is_read: !bookmark.is_read }
          : bookmark
      );
      
      setBookmarks(updatedBookmarks);
      setFilteredBookmarks(updatedBookmarks);
      
      // Сохраняем в localStorage
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    }
  };

  const removeTagFilter = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const removeCategoryFilter = () => {
    setSelectedCategory('');
  };

  const handleAddCategory = (categoryName) => {
    addCategory(categoryName);
  };

  const handleDeleteCategory = (categoryName) => {
    if (window.confirm(`Удалить категорию "${categoryName}"?`)) {
      deleteCategory(categoryName);
      // Если удаляемая категория была выбрана в фильтре, сбрасываем фильтр
      if (selectedCategory === categoryName) {
        setSelectedCategory('');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Мои закладки</h1>
        </div>
        <LoadingSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Мои закладки</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <TagIcon className="h-4 w-4 mr-2" />
            Добавить категорию
          </button>
          <Link
            to="/add"
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Добавить ссылку
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Поиск */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по заголовку или тегам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Фильтр по категории */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Фильтр по статусу */}
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">Все</option>
            <option value="read">Прочитанные</option>
            <option value="unread">Непрочитанные</option>
          </select>

          {/* Фильтр по тегам */}
          <select
            value=""
            onChange={(e) => {
              if (e.target.value && !selectedTags.includes(e.target.value)) {
                setSelectedTags(prev => [...prev, e.target.value]);
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Добавить тег</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Активные фильтры */}
        {(selectedCategory || selectedTags.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategory && (
              <CategoryBadge
                category={selectedCategory}
                onClick={removeCategoryFilter}
                removable
              />
            )}
            {selectedTags.map(tag => (
              <TagBadge
                key={tag}
                tag={tag}
                onClick={() => removeTagFilter(tag)}
                removable
              />
            ))}
          </div>
        )}
      </div>

      {/* Секция управления категориями */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Управление категориями</h3>
          <span className="text-sm text-gray-500">{categories.length} категорий</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between p-3 rounded-lg transition-colors bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-900 font-medium">{category}</span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(category);
                }}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Удалить категорию"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Список закладок */}
      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Нет закладок</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory || selectedTags.length > 0
              ? 'Попробуйте изменить фильтры'
              : 'Добавьте свою первую закладку'
            }
          </p>
          {!searchTerm && !selectedCategory && selectedTags.length === 0 && (
            <Link
              to="/add"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Добавить ссылку
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedBookmarks.map(bookmark => (
            <div key={bookmark.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {bookmark.title}
                      </a>
                    </h3>
                    <button
                      onClick={() => toggleReadStatus(bookmark.id)}
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        bookmark.is_read
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {bookmark.is_read ? 'Прочитано' : 'Не прочитано'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{bookmark.description}</p>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 block"
                  >
                    {bookmark.url}
                  </a>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {bookmark.category && (
                      <CategoryBadge category={bookmark.category} />
                    )}
                    {bookmark.tags.map(tag => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Кнопка "Показать ещё" */}
          {hasMorePages && (
            <div className="text-center pt-6">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Показать ещё
              </button>
            </div>
          )}
        </div>
      )}

      {/* Модальное окно добавления категории */}
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAddCategory={handleAddCategory}
        categories={categories}
      />
    </div>
  );
};

export default Bookmarks; 