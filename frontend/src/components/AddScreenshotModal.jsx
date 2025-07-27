import React, { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useCategories } from '../utils/useCategories';
import axios from 'axios';

const AddScreenshotModal = ({ isOpen, onClose, onSuccess }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    category: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.match('image/(jpeg|jpg|png)')) {
        setError('Пожалуйста, выберите файл формата JPG или PNG');
        return;
      }

      // Проверяем размер файла (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер файла не должен превышать 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    if (!formData.category) {
      setError('Пожалуйста, выберите категорию');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedFile);
      formDataToSend.append('category', formData.category);
      if (formData.description) {
        formDataToSend.append('description', formData.description);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post('/screenshots/upload', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Сбрасываем форму
      setFormData({ category: '', description: '' });
      setSelectedFile(null);
      setPreview(null);
      
      onSuccess(response.data);
      onClose();
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setError(err.response?.data?.detail || 'Ошибка при загрузке файла');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ category: '', description: '' });
    setSelectedFile(null);
    setPreview(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Добавить скриншот
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Загрузка файла */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите файл *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {preview ? (
                  <div className="mb-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto h-32 w-auto rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Загрузить файл</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">или перетащите сюда</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG до 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Описание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Краткое описание скриншота..."
            />
          </div>

          {/* Ошибка */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Загрузка...' : 'Загрузить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScreenshotModal; 