import { useState, useEffect } from 'react';

const ScreenshotImage = ({ screenshotId, alt, className, onClick }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError(true);
          setIsLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8000/screenshots/${screenshotId}/file`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Ошибка загрузки изображения:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    // Очистка URL при размонтировании
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [screenshotId]);

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <span className="text-gray-500">Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500">Изображение недоступно</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onClick={onClick}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default ScreenshotImage; 