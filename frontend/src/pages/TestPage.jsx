import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Тестовая страница работает! ✅
        </h1>
        <p className="text-lg text-gray-600">
          Если вы видите этот текст, значит роутинг функционирует нормально.
        </p>
      </div>
    </div>
  );
};

export default TestPage; 