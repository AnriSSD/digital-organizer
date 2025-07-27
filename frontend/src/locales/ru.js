export default {
  // Header
  header: {
    logo: 'Цифровой Органайзер',
    home: 'Главная',
    bookmarks: 'Мои закладки',
    addLink: 'Добавить ссылку',
    about: 'О проекте',
    support: 'Поддержать',
    more: 'Ещё',
    logout: 'Выйти'
  },

  // Footer
  footer: {
    copyright: '© 2025 Цифровой Органайзер. Все права защищены.'
  },

  // Auth
  auth: {
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    forgotPassword: 'Забыли пароль?',
    resetPassword: 'Сбросить пароль',
    createAccount: 'Создать аккаунт',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    emailPlaceholder: 'Введите email',
    passwordPlaceholder: 'Введите пароль',
    confirmPasswordPlaceholder: 'Повторите пароль',
    signInWithGoogle: 'Войти через Google',
    signInWithGitHub: 'Войти через GitHub',
    orContinueWith: 'Или продолжить с',
    signingIn: 'Вход...',
    creatingAccount: 'Создание аккаунта...',
    passwordTooShort: 'Пароль должен содержать минимум 6 символов',
    passwordsDoNotMatch: 'Пароли не совпадают',
    invalidEmail: 'Неверный формат email',
    registrationSuccess: 'Регистрация прошла успешно! Теперь войдите в систему.',
    loginError: 'Ошибка входа',
    registrationError: 'Ошибка регистрации'
  },

  // Home page
  home: {
    welcome: 'Добро пожаловать в Цифровой Органайзер',
    description: 'Управляйте своими закладками и скриншотами эффективно',
    apiStatus: 'Статус API',
    apiWorking: 'API работает',
    apiUnavailable: 'API недоступен',
    checking: 'Проверка...',
    addLink: 'Добавить ссылку',
    myBookmarks: 'Мои закладки',
    supportProject: 'Поддержать проект',
    title: 'Добро пожаловать в Цифровой Органайзер',
    subtitle: 'Управляйте своими закладками и скриншотами эффективно',
    apiConnected: 'API подключен',
    apiDisconnected: 'API отключен',
    quickActions: 'Быстрые действия',
    addBookmark: 'Добавить закладку',
    viewBookmarks: 'Просмотреть закладки',
    addScreenshot: 'Добавить скриншот',
    features: 'Возможности',
    featuresList: [
      'Сохраняйте важные ссылки',
      'Организуйте закладки по категориям',
      'Добавляйте теги для быстрого поиска',
      'Загружайте скриншоты',
      'Отслеживайте прочитанные материалы',
      'Безопасная аутентификация'
    ]
  },

  // Add Link page
  addLink: {
    title: 'Добавить ссылку',
    description: 'Введите URL и мы автоматически заполним информацию о странице',
    back: 'Назад',
    url: 'URL *',
    urlPlaceholder: 'https://example.com',
    parse: 'Обработать',
    titleField: 'Заголовок *',
    titlePlaceholder: 'Заголовок страницы',
    description: 'Описание',
    descriptionPlaceholder: 'Краткое описание содержимого',
    category: 'Категория',
    selectCategory: 'Выберите категорию',
    tags: 'Теги',
    tagsPlaceholder: 'react, javascript, tutorial (разделяйте запятыми)',
    tagsHint: 'Разделяйте теги запятыми',
    clear: 'Очистить',
    cancel: 'Отмена',
    save: 'Сохранить',
    saving: 'Сохранение...',
    errors: {
      urlRequired: 'Пожалуйста, введите URL',
      titleRequired: 'Пожалуйста, заполните URL и заголовок',
      parseError: 'Не удалось обработать URL. Попробуйте ввести данные вручную.',
      saveError: 'Не удалось сохранить закладку. Попробуйте еще раз.'
    }
  },

  // Add Screenshot page
  addScreenshot: {
    title: 'Добавить скриншот',
    description: 'Загрузите изображение и добавьте описание',
    selectFile: 'Выберите файл *',
    dragDrop: 'или перетащите сюда',
    fileTypes: 'PNG, JPG до 5MB',
    category: 'Категория *',
    selectCategory: 'Выберите категорию',
    description: 'Описание',
    descriptionPlaceholder: 'Краткое описание скриншота...',
    upload: 'Загрузить',
    uploading: 'Загрузка...',
    cancel: 'Отмена',
    errors: {
      fileRequired: 'Пожалуйста, выберите файл',
      categoryRequired: 'Пожалуйста, выберите категорию',
      fileTypeError: 'Пожалуйста, выберите файл формата JPG или PNG',
      fileSizeError: 'Размер файла не должен превышать 5MB',
      uploadError: 'Ошибка при загрузке файла'
    }
  },

  // Bookmarks page
  bookmarks: {
    title: 'Мои закладки',
    addLink: 'Добавить ссылку',
    addScreenshot: 'Добавить скриншот',
    addCategory: 'Добавить категорию',
    searchPlaceholder: 'Поиск по заголовку или тегам...',
    allCategories: 'Все категории',
    all: 'Все',
    read: 'Прочитанные',
    unread: 'Непрочитанные',
    addTag: 'Добавить тег',
    categoryManagement: 'Управление категориями',
    categories: 'категорий',
    noBookmarks: 'Нет закладок',
    noBookmarksFilter: 'Попробуйте изменить фильтры',
    addFirstBookmark: 'Добавьте свою первую закладку',
    showMore: 'Показать ещё',
    screenshots: 'Скриншоты',
    noScreenshots: 'Нет скриншотов',
    addFirstScreenshot: 'Добавьте свой первый скриншот'
  },

  // Category management
  categories: {
    addCategory: 'Добавить категорию',
    newCategory: 'Новая категория',
    categoryName: 'Название категории',
    categoryNamePlaceholder: 'Введите название категории',
    add: 'Добавить',
    cancel: 'Отмена',
    existingCategories: 'Существующие категории:',
    deleteConfirm: 'Удалить категорию "{name}"?',
    errors: {
      nameRequired: 'Введите название категории',
      alreadyExists: 'Категория уже существует'
    }
  },

  // Screenshot management
  screenshots: {
    deleteConfirm: 'Вы уверены, что хотите удалить этот скриншот?',
    deleteError: 'Ошибка при удалении скриншота',
    fileSize: 'Размер',
    uploadDate: 'Дата загрузки',
    viewFull: 'Просмотреть полное изображение',
    delete: 'Удалить скриншот'
  },

  // About page
  about: {
    title: 'О проекте',
    description: 'Цифровой Органайзер - это современное веб-приложение для управления закладками и скриншотами.',
    features: 'Возможности',
    featuresList: [
      'Быстрое сохранение ссылок',
      'Автоматическое извлечение метаданных',
      'Организация по категориям и тегам',
      'Загрузка и управление скриншотами',
      'Поиск и фильтрация',
      'Безопасная аутентификация',
      'Адаптивный дизайн'
    ],
    technologies: 'Технологии',
    backend: 'Backend',
    frontend: 'Frontend',
    backendTech: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JWT', 'Python'],
    frontendTech: ['React', 'Tailwind CSS', 'Vite', 'Axios', 'JavaScript']
  },

  // Donate page
  donate: {
    title: 'Поддержать проект',
    description: 'Если вам нравится проект, вы можете поддержать его развитие',
    thankYou: 'Спасибо за поддержку!'
  },

  // 404 page
  notFound: {
    title: 'Страница не найдена',
    description: 'Извините, запрашиваемая страница не существует.',
    goHome: 'Вернуться на главную',
    goBack: 'Назад'
  }
}; 