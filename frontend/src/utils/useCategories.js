import { useState, useEffect } from 'react';

const CATEGORIES_STORAGE_KEY = 'digital-organizer-categories';
const DEFAULT_CATEGORIES = ['Обучение', 'Игры', 'Работа', 'Спорт', 'donate'];

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  // Инициализация категорий при первом запуске
  useEffect(() => {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      // Записываем дефолтные категории при первом запуске
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  const addCategory = (name) => {
    if (!name.trim()) return;
    
    const trimmedName = name.trim();
    
    // Проверяем, что категория не существует
    if (categories.includes(trimmedName)) {
      throw new Error('Категория уже существует');
    }
    
    const newCategories = [...categories, trimmedName];
    setCategories(newCategories);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(newCategories));
  };

  const deleteCategory = (name) => {
    const newCategories = categories.filter(cat => cat !== name);
    setCategories(newCategories);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(newCategories));
  };

  return {
    categories,
    addCategory,
    deleteCategory
  };
}; 