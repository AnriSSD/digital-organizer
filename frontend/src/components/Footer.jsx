import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 