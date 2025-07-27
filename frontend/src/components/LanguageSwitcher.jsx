import { useState } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = {
    en: 'English',
    ru: 'Русский'
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
      >
        <GlobeAltIcon className="h-4 w-4" />
        <span>{languageNames[language]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === lang
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher; 