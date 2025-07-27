export default {
  // Header
  header: {
    logo: 'Digital Organizer',
    home: 'Home',
    bookmarks: 'My Bookmarks',
    addLink: 'Add Link',
    about: 'About',
    support: 'Support',
    more: 'More',
    logout: 'Logout'
  },

  // Footer
  footer: {
    copyright: '© 2025 Digital Organizer. All rights reserved.'
  },

  // Auth
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    emailPlaceholder: 'Enter email',
    passwordPlaceholder: 'Enter password',
    confirmPasswordPlaceholder: 'Repeat password',
    signInWithGoogle: 'Sign in with Google',
    signInWithGitHub: 'Sign in with GitHub',
    orContinueWith: 'Or continue with',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    invalidEmail: 'Invalid email format',
    registrationSuccess: 'Registration successful! Now sign in.',
    loginError: 'Login error',
    registrationError: 'Registration error'
  },

  // Home page
  home: {
    welcome: 'Welcome to Digital Organizer',
    description: 'Manage your bookmarks and screenshots efficiently',
    apiStatus: 'API Status',
    apiWorking: 'API is working',
    apiUnavailable: 'API unavailable',
    checking: 'Checking...',
    addLink: 'Add Link',
    myBookmarks: 'My Bookmarks',
    supportProject: 'Support Project',
    title: 'Welcome to Digital Organizer',
    subtitle: 'Manage your bookmarks and screenshots efficiently',
    apiConnected: 'API Connected',
    apiDisconnected: 'API Disconnected',
    quickActions: 'Quick Actions',
    addBookmark: 'Add Bookmark',
    viewBookmarks: 'View Bookmarks',
    addScreenshot: 'Add Screenshot',
    features: 'Features',
    featuresList: [
      'Save important links',
      'Organize bookmarks by categories',
      'Add tags for quick search',
      'Upload screenshots',
      'Track read materials',
      'Secure authentication'
    ]
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

  // Add Screenshot page
  addScreenshot: {
    title: 'Add Screenshot',
    description: 'Upload an image and add description',
    selectFile: 'Select file *',
    dragDrop: 'or drag and drop here',
    fileTypes: 'PNG, JPG up to 5MB',
    category: 'Category *',
    selectCategory: 'Select category',
    description: 'Description',
    descriptionPlaceholder: 'Brief screenshot description...',
    upload: 'Upload',
    uploading: 'Uploading...',
    cancel: 'Cancel',
    errors: {
      fileRequired: 'Please select a file',
      categoryRequired: 'Please select a category',
      fileTypeError: 'Please select a JPG or PNG file',
      fileSizeError: 'File size should not exceed 5MB',
      uploadError: 'Error uploading file'
    }
  },

  // Bookmarks page
  bookmarks: {
    title: 'My Bookmarks',
    addLink: 'Add Link',
    addScreenshot: 'Add Screenshot',
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
    screenshots: 'Screenshots',
    noScreenshots: 'No screenshots',
    addFirstScreenshot: 'Add your first screenshot'
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

  // Screenshot management
  screenshots: {
    deleteConfirm: 'Are you sure you want to delete this screenshot?',
    deleteError: 'Error deleting screenshot',
    fileSize: 'Size',
    uploadDate: 'Upload date',
    viewFull: 'View full image',
    delete: 'Delete screenshot'
  },

  // About page
  about: {
    title: 'About',
    description: 'Digital Organizer is a modern web application for managing bookmarks and screenshots.',
    features: 'Features',
    featuresList: [
      'Quick link saving',
      'Automatic metadata extraction',
      'Organization by categories and tags',
      'Screenshot upload and management',
      'Search and filtering',
      'Secure authentication',
      'Responsive design'
    ],
    technologies: 'Technologies',
    backend: 'Backend',
    frontend: 'Frontend',
    backendTech: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JWT', 'Python'],
    frontendTech: ['React', 'Tailwind CSS', 'Vite', 'Axios', 'JavaScript']
  },

  // Donate page
  donate: {
    title: 'Support the Project',
    description: 'If you like the project, you can support its development',
    thankYou: 'Thank you for your support!'
  },

  // 404 page
  notFound: {
    title: 'Page Not Found',
    description: 'Sorry, the requested page does not exist.',
    goHome: 'Go to Home',
    goBack: 'Go Back'
  }
}; 