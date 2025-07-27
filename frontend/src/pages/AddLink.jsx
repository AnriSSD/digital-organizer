import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { apiClient } from '../utils/api';
import { useCategories } from '../utils/useCategories';

const AddLink = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    tags: [],
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Загрузка черновика из localStorage
  useEffect(() => {
    const draft = localStorage.getItem('linkDraft');
    if (draft) {
      setFormData(JSON.parse(draft));
    }
  }, []);

  // Сохранение черновика в localStorage
  useEffect(() => {
    if (formData.url || formData.title || formData.description) {
      localStorage.setItem('linkDraft', JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const parseUrl = async () => {
    if (!formData.url) {
      setError('Пожалуйста, введите URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await apiClient.parseUrl(formData.url);
      
      setFormData(prev => ({
        ...prev,
        title: data.title || '',
        description: data.description || '',
        tags: data.tags || [],
        category: data.category || ''
      }));
      
      setIsEditing(true);
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Не удалось обработать URL. Попробуйте ввести данные вручную.');
      setIsEditing(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmark = async () => {
    if (!formData.url || !formData.title) {
      setError('Пожалуйста, заполните URL и заголовок');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Временно сохраняем в localStorage
      const newBookmark = {
        id: Date.now(),
        ...formData,
        is_read: false,
        created_at: new Date().toISOString()
      };

      // Получаем существующие закладки
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const updatedBookmarks = [...existingBookmarks, newBookmark];
      
      // Сохраняем в localStorage
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      console.log('Сохраненная закладка:', newBookmark);

      // Очищаем черновик
      localStorage.removeItem('linkDraft');
      
      // Переходим на страницу закладок
      navigate('/bookmarks');
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Не удалось сохранить закладку. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearDraft = () => {
    setFormData({
      url: '',
      title: '',
      description: '',
      tags: [],
      category: ''
    });
    localStorage.removeItem('linkDraft');
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Назад
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Добавить ссылку</h1>
        <p className="text-gray-600 mt-2">Введите URL и мы автоматически заполним информацию о странице</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                disabled={isLoading}
              />
              <button
                onClick={parseUrl}
                disabled={isLoading || !formData.url}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  'Парсить'
                )}
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Название страницы"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Краткое описание содержимого"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Категория
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="react, javascript, tutorial (разделяйте запятыми)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <p className="text-sm text-gray-500 mt-1">Разделяйте теги запятыми</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={clearDraft}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Очистить
            </button>
            <div className="space-x-3">
              <button
                onClick={() => navigate('/bookmarks')}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={saveBookmark}
                disabled={isLoading || !formData.url || !formData.title}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Сохранить
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLink; 