import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCategories } from '../utils/useCategories';

const Categories = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setError('Введите название категории');
      return;
    }

    try {
      addCategory(newCategoryName);
      setNewCategoryName('');
      setShowAddForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = (categoryName) => {
    if (window.confirm(`Удалить категорию "${categoryName}"?`)) {
      deleteCategory(categoryName);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление категориями</h1>
            <p className="text-gray-600 mt-1">
              Создавайте и удаляйте категории для организации закладок
            </p>
          </div>
        </div>
      </div>

      {/* Кнопка добавления */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Добавить категорию
        </button>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Новая категория</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex space-x-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Введите название категории"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Добавить
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewCategoryName('');
                setError('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список категорий */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Категории ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">Категории не найдены</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <div
                key={index}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-900 font-medium">{category}</span>
                </div>
                
                <button
                  onClick={() => handleDeleteCategory(category)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Удалить категорию"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories; 