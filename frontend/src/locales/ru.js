export default {
  // Header
  header: {
    logo: 'Цифровой Органайзер',
    home: 'Главная',
    addLink: 'Добавить ссылку',
    bookmarks: 'Мои закладки',
    support: 'Поддержать',
    about: 'О проекте',
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
    signUp: 'Регистрация',
    createAccount: 'Создать аккаунт',
    email: 'Email',
    emailPlaceholder: 'Введите ваш email',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    confirmPassword: 'Подтвердите пароль',
    confirmPasswordPlaceholder: 'Повторите пароль',
    passwordMinLength: 'Минимум 6 символов',
    or: 'или',
    orContinueWith: 'или продолжить с',
    signingIn: 'Вход...',
    creatingAccount: 'Создание аккаунта...',
    passwordTooShort: 'Пароль должен содержать минимум 6 символов',
    passwordsDoNotMatch: 'Пароли не совпадают',
    invalidEmail: 'Неверный формат email',
    registrationSuccess: 'Аккаунт успешно создан! Теперь вы можете войти.',
    loginWithGoogle: 'Войти через Google',
    loginWithGitHub: 'Войти через GitHub'
  },

  // Home page
  home: {
    welcome: 'Добро пожаловать!',
    description: 'Цифровой Органайзер поможет вам сохранять и организовывать ссылки с помощью ИИ',
    apiStatus: 'Статус Backend API:',
    apiWorking: '✓ API работает',
    apiUnavailable: '✗ API недоступен',
    checking: 'Проверка...',
    addLink: 'Добавить ссылку',
    myBookmarks: 'Мои закладки',
    supportProject: 'Поддержать проект'
  },

  // Add Link page
  addLink: {
    title: 'Добавить ссылку',
    description: 'Введите URL и мы автоматически заполним информацию о странице',
    back: 'Назад',
    url: 'URL *',
    urlPlaceholder: 'https://example.com',
    parse: 'Парсить',
    titleField: 'Заголовок *',
    titlePlaceholder: 'Название страницы',
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

  // Bookmarks page
  bookmarks: {
    title: 'Мои закладки',
    addLink: 'Добавить ссылку',
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
    read: 'Прочитано',
    unread: 'Не прочитано'
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

  // Donate page
  donate: {
    title: 'Поддержать проект',
    description: 'Если тебе нравится Цифровой Органайзер и ты хочешь помочь с его развитием — буду благодарен за любую поддержку.',
    info: 'Этот проект делается в свободное время, а донаты помогают покрыть расходы на сервер, домен, OpenAI API и новые фичи.',
    bankTransfers: 'Банковские переводы',
    georgia: 'Грузия:',
    russia: 'Россия (Тинькофф):',
    international: 'Международно через PayPal',
    crypto: 'Криптовалюта',
    paypalNote: '(можно отправить любую сумму в любой валюте)',
    backToBookmarks: 'Вернуться к закладкам',
    bankOfGeorgia: 'Bank of Georgia',
    tbcBank: 'TBC Bank',
    recipient: 'Получатель',
    cardNumber: 'Номер карты'
  },

  // About page
  about: {
    title: 'О проекте',
    description: 'Цифровой Органайзер - веб-приложение для сохранения и организации ссылок с автоматической классификацией с помощью ИИ.',
    features: 'Возможности',
    featuresList: [
      'Автоматическое извлечение метаданных из ссылок',
      'ИИ-классификация по категориям и тегам',
      'Удобный поиск и фильтрация закладок',
      'Отслеживание статуса прочтения',
      'Адаптивный дизайн для всех устройств',
      'Сохранение черновиков в localStorage'
    ],
    technologies: 'Технологии',
    frontend: 'Frontend',
    backend: 'Backend',
    plans: 'Планы развития',
    plansList: [
      'Telegram Bot - добавление ссылок через Telegram',
      'Экспорт данных - экспорт в различные форматы',
      'Синхронизация - синхронизация между устройствами',
      'Пользователи - система аутентификации',
      'Коллекции - группировка закладок',
      'Статистика - аналитика использования'
    ]
  },

  // Common
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    previous: 'Назад',
    search: 'Поиск',
    filter: 'Фильтр',
    clear: 'Очистить',
    all: 'Все',
    none: 'Нет',
    yes: 'Да',
    no: 'Нет',
    ok: 'ОК'
  }
}; 