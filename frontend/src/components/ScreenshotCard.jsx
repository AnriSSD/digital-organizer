import React, { useState } from 'react';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import CategoryBadge from './CategoryBadge';
import axios from 'axios';

const ScreenshotCard = ({ screenshot, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот скриншот?')) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/screenshots/${screenshot.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onDelete(screenshot.id);
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении скриншота');
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Превью изображения */}
        <div className="relative group">
          <img
            src={`/screenshots/${screenshot.id}/file`}
            alt={screenshot.description || screenshot.original_filename}
            className="w-full h-48 object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
            onClick={() => setShowFullImage(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <EyeIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>

        {/* Информация */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {screenshot.original_filename}
              </h3>
              {screenshot.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {screenshot.description}
                </p>
              )}
            </div>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
              title="Удалить скриншот"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Метаданные */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Размер: {formatFileSize(screenshot.file_size)}</span>
              <span>{formatDate(screenshot.created_at)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <CategoryBadge category={screenshot.category} />
              <span className="text-xs text-gray-400">
                {screenshot.mime_type.split('/')[1].toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с полным изображением */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={`/screenshots/${screenshot.id}/file`}
              alt={screenshot.description || screenshot.original_filename}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenshotCard; 