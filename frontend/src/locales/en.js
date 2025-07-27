export default {
  // Header
  header: {
    home: 'Home',
    addLink: 'Add Link',
    bookmarks: 'My Bookmarks',
    support: 'Support',
    about: 'About'
  },

  // Home page
  home: {
    welcome: 'Welcome!',
    description: 'Digital Organizer helps you save and organize links with AI',
    apiStatus: 'Backend API Status:',
    apiWorking: '✓ API is working',
    apiUnavailable: '✗ API unavailable',
    checking: 'Checking...',
    addLink: 'Add Link',
    myBookmarks: 'My Bookmarks',
    supportProject: 'Support Project'
  },

  // Add Link page
  addLink: {
    title: 'Add Link',
    description: 'Enter URL and we will automatically fill in the page information',
    back: 'Back',
    url: 'URL *',
    urlPlaceholder: 'https://example.com',
    parse: 'Parse',
    titleField: 'Title *',
    titlePlaceholder: 'Page title',
    description: 'Description',
    descriptionPlaceholder: 'Brief description of content',
    category: 'Category',
    selectCategory: 'Select category',
    tags: 'Tags',
    tagsPlaceholder: 'react, javascript, tutorial (separate with commas)',
    tagsHint: 'Separate tags with commas',
    clear: 'Clear',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',
    errors: {
      urlRequired: 'Please enter URL',
      titleRequired: 'Please fill in URL and title',
      parseError: 'Failed to process URL. Try entering data manually.',
      saveError: 'Failed to save bookmark. Try again.'
    }
  },

  // Bookmarks page
  bookmarks: {
    title: 'My Bookmarks',
    addLink: 'Add Link',
    addCategory: 'Add Category',
    searchPlaceholder: 'Search by title or tags...',
    allCategories: 'All categories',
    all: 'All',
    read: 'Read',
    unread: 'Unread',
    addTag: 'Add tag',
    categoryManagement: 'Category Management',
    categories: 'categories',
    noBookmarks: 'No bookmarks',
    noBookmarksFilter: 'Try changing filters',
    addFirstBookmark: 'Add your first bookmark',
    showMore: 'Show more',
    read: 'Read',
    unread: 'Unread'
  },

  // Category management
  categories: {
    addCategory: 'Add Category',
    newCategory: 'New Category',
    categoryName: 'Category name',
    categoryNamePlaceholder: 'Enter category name',
    add: 'Add',
    cancel: 'Cancel',
    existingCategories: 'Existing categories:',
    deleteConfirm: 'Delete category "{name}"?',
    errors: {
      nameRequired: 'Enter category name',
      alreadyExists: 'Category already exists'
    }
  },

  // Donate page
  donate: {
    title: 'Support Project',
    description: 'If you like Digital Organizer and want to help with its development — I will be grateful for any support.',
    info: 'This project is made in free time, and donations help cover server costs, domain, OpenAI API and new features.',
    bankTransfers: 'Bank Transfers',
    georgia: 'Georgia:',
    russia: 'Russia (Tinkoff):',
    international: 'International via PayPal',
    crypto: 'Cryptocurrency',
    paypalNote: '(you can send any amount in any currency)',
    backToBookmarks: 'Back to Bookmarks',
    bankOfGeorgia: 'Bank of Georgia',
    tbcBank: 'TBC Bank',
    recipient: 'Recipient',
    cardNumber: 'Card number'
  },

  // About page
  about: {
    title: 'About Project',
    description: 'Digital Organizer is a web application for saving and organizing bookmarks with AI classification.',
    features: 'Features',
    featuresList: [
      'Automatic metadata extraction from links',
      'AI classification by categories and tags',
      'Convenient search and filtering of bookmarks',
      'Reading status tracking',
      'Adaptive design for all devices',
      'Draft saving in localStorage'
    ],
    technologies: 'Technologies',
    frontend: 'Frontend',
    backend: 'Backend',
    plans: 'Development Plans',
    plansList: [
      'Telegram Bot - adding links via Telegram',
      'Data export - export to various formats',
      'Synchronization - sync between devices',
      'Users - authentication system',
      'Collections - grouping bookmarks',
      'Statistics - usage analytics'
    ]
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    ok: 'OK'
  }
}; 