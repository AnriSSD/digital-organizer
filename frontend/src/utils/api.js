const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Закладки
  async getBookmarks() {
    return this.request('/bookmarks');
  }

  async createBookmark(bookmarkData) {
    return this.request('/bookmarks', {
      method: 'POST',
      body: JSON.stringify(bookmarkData),
    });
  }

  async toggleReadStatus(bookmarkId) {
    return this.request(`/bookmarks/${bookmarkId}/toggle-read`, {
      method: 'PATCH',
    });
  }

  // Парсинг URL
  async parseUrl(url) {
    return this.request('/parse-url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  }

  // Проверка здоровья API
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 