import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, TagIcon, XMarkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import TagBadge from '../components/TagBadge';
import CategoryBadge from '../components/CategoryBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AddCategoryModal from '../components/AddCategoryModal';
import AddScreenshotModal from '../components/AddScreenshotModal';
import ScreenshotCard from '../components/ScreenshotCard';
import ScreenshotImage from '../components/ScreenshotImage';
import { useCategories } from '../utils/useCategories';
import { apiClient } from '../utils/api';
import axios from 'axios';

const Bookmarks = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [bookmarks, setBookmarks] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [filteredScreenshots, setFilteredScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [readFilter, setReadFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddScreenshotModal, setShowAddScreenshotModal] = useState(false);
  const itemsPerPage = 10;

  // Получение закладок с backend
  useEffect(() => {
    fetchBookmarks();
    fetchScreenshots();
  }, []);

  // Слушаем событие открытия модального окна скриншотов
  useEffect(() => {
    const handleOpenScreenshotModal = () => {
      setShowAddScreenshotModal(true);
    };

    window.addEventListener('openAddScreenshotModal', handleOpenScreenshotModal);
    return () => {
      window.removeEventListener('openAddScreenshotModal', handleOpenScreenshotModal);
    };
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

  const fetchScreenshots = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('/screenshots/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setScreenshots(response.data.screenshots);
      setFilteredScreenshots(response.data.screenshots);
    } catch (error) {
      console.error('Ошибка загрузки скриншотов:', error);
      // Не показываем ошибку пользователю, если он не авторизован
    }
  };

  const handleDeleteCategory = (categoryName) => {
    deleteCategory(categoryName);
  };

  const handleScreenshotUpload = (newScreenshot) => {
    setScreenshots(prev => [newScreenshot, ...prev]);
    setFilteredScreenshots(prev => [newScreenshot, ...prev]);
  };

  const handleScreenshotDelete = async (screenshotId) => {
    try {
      // Удаляем с сервера
      await apiClient.deleteScreenshot(screenshotId);
      
      // Удаляем из состояния
      setScreenshots(prev => prev.filter(s => s.id !== screenshotId));
      setFilteredScreenshots(prev => prev.filter(s => s.id !== screenshotId));
    } catch (error) {
      console.error('Ошибка при удалении скриншота:', error);
      alert('Ошибка при удалении скриншота');
    }
  };

  // Фильтрация и поиск
  useEffect(() => {
    let filtered = bookmarks;
    let filteredScreenshotsData = screenshots;

    // Поиск по заголовку и тегам для закладок
    if (searchTerm) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      // Поиск по названию файла и описанию для скриншотов
      filteredScreenshotsData = filteredScreenshotsData.filter(screenshot =>
        screenshot.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (screenshot.description && screenshot.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Фильтр по категории
    if (selectedCategory) {
      filtered = filtered.filter(bookmark => bookmark.category === selectedCategory);
      filteredScreenshotsData = filteredScreenshotsData.filter(screenshot => screenshot.category === selectedCategory);
    }

    // Фильтр по статусу (только для закладок)
    if (readFilter === 'read') {
      filtered = filtered.filter(bookmark => bookmark.is_read);
    } else if (readFilter === 'unread') {
      filtered = filtered.filter(bookmark => !bookmark.is_read);
    }

    // Фильтр по тегам (только для закладок)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(bookmark =>
        selectedTags.every(tag => bookmark.tags.includes(tag))
      );
    }

    setFilteredBookmarks(filtered);
    setFilteredScreenshots(filteredScreenshotsData);
    setCurrentPage(1);
  }, [bookmarks, screenshots, searchTerm, selectedCategory, selectedTags, readFilter]);

  // Получение уникальных категорий и тегов
  const { categories: availableCategories } = useCategories();
  const allCategories = [...new Set([
    ...availableCategories,
    ...bookmarks.map(b => b.category).filter(Boolean),
    ...screenshots.map(s => s.category).filter(Boolean)
  ])];

  const allTags = [...new Set(bookmarks.flatMap(b => b.tags))];

  // Объединяем закладки и скриншоты для отображения
  const allItems = [
    ...filteredBookmarks.map(bookmark => ({ ...bookmark, type: 'bookmark' })),
    ...filteredScreenshots.map(screenshot => ({ ...screenshot, type: 'screenshot' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Пагинация для объединенного списка
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = allItems.slice(0, endIndex);
  const hasMorePages = endIndex < allItems.length;

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
          <button
            onClick={() => setShowAddScreenshotModal(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <PhotoIcon className="h-4 w-4 mr-2" />
            Добавить скриншот
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
            {allCategories.map(category => (
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
          <span className="text-sm text-gray-500">{allCategories.length} категорий</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allCategories.map((category) => (
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
      {paginatedItems.length === 0 ? (
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
          {paginatedItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    {item.type === 'bookmark' ? (
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                    ) : (
                      <PhotoIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.type === 'bookmark' ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span>{item.original_filename}</span>
                      )}
                    </h3>
                                         {item.type === 'bookmark' && (
                        <button
                          onClick={() => toggleReadStatus(item.id)}
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            item.is_read
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.is_read ? 'Прочитано' : 'Не прочитано'}
                        </button>
                     )}
                     {item.type === 'screenshot' && (
                        <button
                          onClick={() => handleScreenshotDelete(item.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Удалить скриншот"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                     )}
                  </div>
                                     {item.type === 'bookmark' && (
                     <>
                       <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline mt-1 block"
                        >
                          {item.url}
                        </a>
                       <div className="flex flex-wrap gap-2 mt-3">
                         {item.category && <CategoryBadge category={item.category} />}
                         {item.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                       </div>
                     </>
                   )}
                  {item.type === 'screenshot' && (
                    <>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      <div className="mt-3">
                        <ScreenshotImage
                          screenshotId={item.id}
                          alt={item.description || item.original_filename}
                          className="w-full h-32 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity bg-gray-100"
                          onClick={async () => {
                            // Открываем скриншот в полном размере
                            const modal = document.createElement('div');
                            modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                            modal.onclick = () => document.body.removeChild(modal);
                            
                            try {
                              const token = localStorage.getItem('token');
                              if (!token) {
                                alert('Необходима авторизация для просмотра изображения');
                                return;
                              }

                              const response = await fetch(`http://localhost:8000/screenshots/${item.id}/file`, {
                                headers: {
                                  'Authorization': `Bearer ${token}`
                                }
                              });

                              if (response.ok) {
                                const blob = await response.blob();
                                const url = URL.createObjectURL(blob);
                                
                                const img = document.createElement('img');
                                img.src = url;
                                img.className = 'max-w-full max-h-full object-contain';
                                img.onclick = (e) => e.stopPropagation();
                                img.onload = () => {
                                  // Очищаем URL после загрузки
                                  URL.revokeObjectURL(url);
                                };
                                
                                const closeBtn = document.createElement('button');
                                closeBtn.innerHTML = '×';
                                closeBtn.className = 'absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold';
                                closeBtn.onclick = () => document.body.removeChild(modal);
                                
                                modal.appendChild(img);
                                modal.appendChild(closeBtn);
                                document.body.appendChild(modal);
                              } else {
                                alert('Ошибка загрузки изображения');
                              }
                            } catch (error) {
                              console.error('Ошибка при открытии изображения:', error);
                              alert('Ошибка при открытии изображения');
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.category && <CategoryBadge category={item.category} />}
                        <span className="text-xs text-gray-400">
                          {item.mime_type.split('/')[1].toUpperCase()}
                        </span>
                      </div>
                    </>
                  )}
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
        categories={allCategories}
      />

      {/* Модальное окно добавления скриншота */}
      <AddScreenshotModal
        isOpen={showAddScreenshotModal}
        onClose={() => setShowAddScreenshotModal(false)}
        onSuccess={handleScreenshotUpload}
      />
    </div>
  );
};

export default Bookmarks; 