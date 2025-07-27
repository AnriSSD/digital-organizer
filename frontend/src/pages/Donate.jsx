import { Link } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';

const Donate = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          to="/bookmarks"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <HeartIcon className="w-8 h-8 text-red-500 mr-3" />
            Поддержать проект
          </h1>
          <p className="text-gray-600 mt-1">
            Если тебе нравится Цифровой Органайзер и ты хочешь помочь с его развитием — буду благодарен за любую поддержку.
          </p>
        </div>
      </div>

      {/* Основная информация */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <p className="text-gray-800 leading-relaxed">
          Этот проект делается в свободное время, а донаты помогают покрыть расходы на сервер, домен, OpenAI API и новые фичи.
        </p>
      </div>

      {/* Способы поддержки */}
      <div className="space-y-6">
        {/* Банковские переводы */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📦 Банковские переводы</h2>
          
          {/* Грузия */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Грузия:</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Bank of Georgia</h4>
                <p className="text-sm text-gray-600 mb-1">IBAN: <span className="font-mono">GEXXBOGGXXXXXXXXXXXXXX</span></p>
                <p className="text-sm text-gray-600">Получатель: Anri G</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">TBC Bank</h4>
                <p className="text-sm text-gray-600 mb-1">IBAN: <span className="font-mono">GEXXTBXXYYYYYYYYYYYYYY</span></p>
                <p className="text-sm text-gray-600">Получатель: Anri G</p>
              </div>
            </div>
          </div>
          
          {/* Россия */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Россия (Тинькофф):</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Номер карты: <span className="font-mono">5536 XXXX XXXX XXXX</span></p>
              <p className="text-sm text-gray-600">Получатель: А.Э. Галустов</p>
            </div>
          </div>
        </div>

        {/* PayPal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🌍 Международно через PayPal</h2>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-lg font-medium text-blue-900 mb-2">
              <a 
                href="https://paypal.me/anrissd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                paypal.me/anrissd
              </a>
            </p>
            <p className="text-sm text-blue-700">(можно отправить любую сумму в любой валюте)</p>
          </div>
        </div>

        {/* Криптовалюта */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">₿ Криптовалюта</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">USDT (TRC20)</h4>
              <p className="font-mono text-sm text-gray-600 break-all">TLaXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Bitcoin (BTC)</h4>
              <p className="font-mono text-sm text-gray-600 break-all">bc1qXXXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка возврата */}
      <div className="mt-8 text-center">
        <Link
          to="/bookmarks"
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Вернуться к закладкам
        </Link>
      </div>
    </div>
  );
};

export default Donate; 