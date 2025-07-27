import { useState, useEffect } from 'react';
import en from '../locales/en';
import ru from '../locales/ru';

const LANG_STORAGE_KEY = 'digital-organizer-language';

const translations = {
  en,
  ru
};

export const useLanguage = () => {
  const [language, setLanguage] = useState('en');

  // Инициализация языка при первом запуске
  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage);
    } else {
      // По умолчанию английский
      localStorage.setItem(LANG_STORAGE_KEY, 'en');
      setLanguage('en');
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem(LANG_STORAGE_KEY, newLanguage);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey] !== undefined) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return value || key;
  };

  return {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };
}; 