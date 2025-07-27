import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AddCategoryModal = ({ isOpen, onClose, onAddCategory, categories }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setError('Введите название категории');
      return;
    }

    try {
      onAddCategory(newCategoryName);
      setNewCategoryName('');
      setError('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setNewCategoryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Добавить категорию</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
              Название категории
            </label>
            <input
              type="text"
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Введите название категории"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Существующие категории:</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal; 