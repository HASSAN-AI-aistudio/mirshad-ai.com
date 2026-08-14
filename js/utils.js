const isObject = (value) => value !== null && typeof value === 'object';

function getAuthState() {
  try {
    const raw = localStorage.getItem('nexora-demo-auth');
    return raw ? JSON.parse(raw) : { isLoggedIn: false, user: null };
  } catch {
    return { isLoggedIn: false, user: null };
  }
}

function setAuthState(authState) {
  localStorage.setItem('nexora-demo-auth', JSON.stringify(authState));
}

function clearAuthState() {
  localStorage.removeItem('nexora-demo-auth');
}

function requireRole(roleName) {
  const authState = getAuthState();
  if (!authState.isLoggedIn || !authState.user) {
    window.location.href = 'login.html';
    return false;
  }
  if (roleName && authState.user.role !== roleName) {
    const fallbackMap = { student: 'student-dashboard.html', teacher: 'teacher-dashboard.html', admin: 'admin-dashboard.html' };
    window.location.href = fallbackMap[authState.user.role] || 'index.html';
    return false;
  }
  return true;
}

function safeText(input) {
  if (input === null || input === undefined) return '';
  const text = String(input);
  return text.replace(/[<>]/g, (char) => ({ '<': '&lt;', '>': '&gt;' }[char] || char));
}

function sanitizeHtml(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return { score: 0, label: 'ضعيفة', className: 'danger' };
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 20, label: 'ضعيفة', className: 'danger' };
  if (score === 2) return { score: 45, label: 'متوسطة', className: 'warning' };
  if (score === 3) return { score: 70, label: 'قوية', className: 'info' };
  return { score: 100, label: 'قوية جدًا', className: 'success' };
}

function showToast(type, message) {
  const container = document.querySelector('.notification-center') || createNotificationCenter();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function createNotificationCenter() {
  const wrapper = document.createElement('div');
  wrapper.className = 'notification-center';
  document.body.appendChild(wrapper);
  return wrapper;
}

function syncThemeToggleButtons() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const buttons = document.querySelectorAll('[data-theme-toggle]');

  buttons.forEach((button) => {
    const icon = button.querySelector('.theme-toggle__icon');
    const label = button.querySelector('.theme-toggle__label');

    if (icon) {
      icon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
    }

    if (label) {
      label.textContent = currentTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
    }

    button.setAttribute('aria-label', currentTheme === 'light' ? 'تبديل إلى الوضع الداكن' : 'تبديل إلى الوضع الفاتح');
  });
}

function setTheme(theme) {
  const root = document.documentElement;
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  root.setAttribute('data-theme', safeTheme);
  localStorage.setItem('nexora-theme', safeTheme);
  syncThemeToggleButtons();
}

function initTheme() {
  const savedTheme = localStorage.getItem('nexora-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

const AI_TECH_ACADEMY_TRANSLATIONS = {
  ar: {
    home: 'الرئيسية',
    courses: 'الكورسات',
    paths: 'المسارات',
    exams: 'الاختبارات',
    certificates: 'الشهادات',
    reviews: 'المراجعات',
    dashboardStudent: 'لوحة الطالب',
    dashboardTeacher: 'لوحة المعلم',
    dashboardAdmin: 'لوحة المسؤول',
    teacherAI: 'المعلم الذكي',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    switchTheme: 'التبديل',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    startLearning: 'ابدأ التعلم',
    exploreCourses: 'استكشف الكورسات',
    talkToAI: 'تحدث مع المعلم الذكي',
    welcomeBack: 'مرحباً بعودتك',
    createAccount: 'إنشاء حساب',
    accountType: 'نوع الحساب',
    student: 'طالب',
    teacher: 'معلم',
    admin: 'مسؤول',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    google: 'Google',
    github: 'GitHub',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'هل لديك حساب؟',
    submitLogin: 'تسجيل الدخول',
    submitRegister: 'إنشاء الحساب',
    learnTech: 'تعلّم التكنولوجيا بذكاء',
    heroTitle: 'تعلّم التكنولوجيا بذكاء',
    heroSubtitle: 'تعلم من المعلمين، واستعن بالذكاء الاصطناعي، وابنِ مهاراتك خطوة بخطوة.',
    heroKicker: '⚡ تعلم بتجربة ذكية وموجهة',
    featuredCoursesTag: 'الكورسات المميزة',
    featuredCoursesHeading: 'منصات تعلم تقني تركز على النتائج',
    viewAllCourses: 'عرض جميع الكورسات',
    platformFeaturesTag: 'مميزات المنصة',
    platformFeaturesHeading: 'كل ما يحتاجه المتعلم ليصبح أكثر فاعلية',
    learningFieldsTag: 'مجالات تعليمية',
    learningFieldsHeading: 'المجالات التي تغطيها المنصة',
    teachersTag: 'المعلمون',
    teachersHeading: 'معلمون خبراء في مجالاتهم',
    aiTeacherTag: 'المعلم الذكي',
    aiTeacherHeading: 'AI Teacher داخل المنصة',
    webTrackTitle: 'مسار تطوير الويب',
    pageLoginTitle: 'تسجيل الدخول | AI Tech Academy',
    pageRegisterTitle: 'إنشاء حساب | AI Tech Academy',
    loginTitle: 'تسجيل الدخول',
    loginSubtitle: 'مرحباً بعودتك، تابع رحلتك التعليمية.',
    registerTitle: 'إنشاء حساب',
    registerSubtitle: 'ابدأ رحلتك كطالب، معلم، أو مسؤول.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    showPassword: 'عرض',
    hidePassword: 'إخفاء',
    placeholderName: 'أدخل اسمك',
    placeholderEmail: 'name@example.com',
    placeholderPassword: '••••••••',
    placeholderConfirmPassword: 'أعد إدخال كلمة المرور',
    submit: 'إرسال',
    acceptTerms: 'أوافق على الشروط والأحكام.',
    accountPrompt: 'هل لديك حساب؟',
    noAccountPrompt: 'ليس لديك حساب؟'
  },
  en: {
    home: 'Home',
    courses: 'Courses',
    paths: 'Learning Paths',
    exams: 'Exams',
    certificates: 'Certificates',
    reviews: 'Reviews',
    dashboardStudent: 'Student Dashboard',
    dashboardTeacher: 'Teacher Dashboard',
    dashboardAdmin: 'Admin Dashboard',
    teacherAI: 'AI Teacher',
    login: 'Login',
    register: 'Sign Up',
    switchTheme: 'Toggle',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    startLearning: 'Start learning',
    exploreCourses: 'Explore courses',
    talkToAI: 'Talk to AI Teacher',
    welcomeBack: 'Welcome back',
    createAccount: 'Create account',
    accountType: 'Account type',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    google: 'Google',
    github: 'GitHub',
    noAccount: 'Don’t have an account?',
    haveAccount: 'Already have an account?',
    submitLogin: 'Login',
    submitRegister: 'Create account',
    learnTech: 'Learn technology intelligently',
    heroTitle: 'Learn technology intelligently',
    heroSubtitle: 'Learn from teachers, use AI, and build your skills step by step.',
    heroKicker: '⚡ Learn with a smart guided experience',
    featuredCoursesTag: 'Featured courses',
    featuredCoursesHeading: 'Technology learning platforms focused on outcomes',
    viewAllCourses: 'View all courses',
    platformFeaturesTag: 'Platform features',
    platformFeaturesHeading: 'Everything a learner needs to become more effective',
    learningFieldsTag: 'Learning fields',
    learningFieldsHeading: 'Fields covered by the platform',
    teachersTag: 'Teachers',
    teachersHeading: 'Expert instructors in their fields',
    aiTeacherTag: 'AI Teacher',
    aiTeacherHeading: 'AI Teacher inside the platform',
    webTrackTitle: 'Web Development Track',
    pageLoginTitle: 'Login | AI Tech Academy',
    pageRegisterTitle: 'Create account | AI Tech Academy',
    loginTitle: 'Login',
    loginSubtitle: 'Welcome back, continue your learning journey.',
    registerTitle: 'Create account',
    registerSubtitle: 'Start your journey as a student, teacher, or admin.',
    fullName: 'Full name',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    showPassword: 'Show',
    hidePassword: 'Hide',
    placeholderName: 'Enter your name',
    placeholderEmail: 'name@example.com',
    placeholderPassword: '••••••••',
    placeholderConfirmPassword: 'Re-enter your password',
    submit: 'Submit',
    acceptTerms: 'I agree to the terms and conditions.',
    accountPrompt: 'Already have an account?',
    noAccountPrompt: 'Don’t have an account?'
  }
};

function getPreferredLanguage() {
  const saved = localStorage.getItem('ai-tech-language');
  if (saved === 'ar' || saved === 'en') return saved;
  return navigator.language && navigator.language.toLowerCase().startsWith('en') ? 'en' : 'ar';
}

function injectLanguageToggle() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions || navActions.querySelector('[data-lang-toggle]')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-ghost lang-toggle';
  button.setAttribute('data-lang-toggle', 'toggle');
  button.setAttribute('aria-label', 'Toggle language');
  button.innerHTML = '<span class="lang-toggle__icon" aria-hidden="true">🇸🇦</span><span class="lang-toggle__label">AR</span>';
  navActions.insertBefore(button, navActions.firstChild);

  button.onclick = () => {
    const current = getPreferredLanguage();
    const next = current === 'ar' ? 'en' : 'ar';
    applyLanguage(next);
  };
}

function applyLanguage(lang) {
  const selected = lang === 'en' ? 'en' : 'ar';
  document.documentElement.lang = selected;
  document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('ai-tech-language', selected);

  const translations = AI_TECH_ACADEMY_TRANSLATIONS[selected];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[key]) {
      element.placeholder = translations[key];
    }
  });

  document.querySelectorAll('[data-i18n-label]').forEach((element) => {
    const key = element.dataset.i18nLabel;
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  const navLinks = document.querySelectorAll('.nav-links a');
  const navMap = [
    'home', 'courses', 'paths', 'exams', 'certificates', 'reviews',
    'dashboardStudent', 'dashboardTeacher', 'dashboardAdmin', 'teacherAI'
  ];
  navLinks.forEach((link, index) => {
    const key = navMap[index];
    if (key && translations[key]) link.textContent = translations[key];
  });

  const loginLink = document.querySelector('a[href="login.html"]');
  const registerLink = document.querySelector('a[href="register.html"]');
  if (loginLink && translations.login) loginLink.textContent = translations.login;
  if (registerLink && translations.register) registerLink.textContent = translations.register;

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && translations.heroTitle) heroTitle.textContent = translations.heroTitle;

  const heroSubtitle = document.querySelector('.hero p');
  if (heroSubtitle && translations.heroSubtitle) heroSubtitle.textContent = translations.heroSubtitle;

  const loginBtn = document.querySelector('#login-form button[type="submit"]');
  if (loginBtn && translations.submitLogin) loginBtn.innerHTML = '<span class="btn-icon" aria-hidden="true">🔑</span><span>' + translations.submitLogin + '</span>';

  const registerBtn = document.querySelector('#register-form button[type="submit"]');
  if (registerBtn && translations.submitRegister) registerBtn.innerHTML = '<span class="btn-icon" aria-hidden="true">✨</span><span>' + translations.submitRegister + '</span>';

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'login.html') {
    document.title = translations.pageLoginTitle;
  } else if (currentPage === 'register.html') {
    document.title = translations.pageRegisterTitle;
  }

  const toggle = document.querySelector('[data-lang-toggle]');
  if (toggle) {
    const icon = toggle.querySelector('.lang-toggle__icon');
    const label = toggle.querySelector('.lang-toggle__label');
    if (icon) icon.textContent = selected === 'ar' ? '🇸🇦' : '🇬🇧';
    if (label) label.textContent = selected === 'ar' ? 'AR' : 'EN';
    toggle.setAttribute('aria-label', selected === 'ar' ? 'Switch to English' : 'تبديل إلى العربية');
  }
}

function initLanguage() {
  injectLanguageToggle();
  applyLanguage(getPreferredLanguage());
}

function escapeHtml(value) {
  return sanitizeHtml(value);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function renderProgress(value) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));
  return `${safeValue}%`;
}

function initFloatingAIWidget() {
  if (document.querySelector('.ai-floating-widget')) return;
  const widget = document.createElement('div');
  widget.className = 'ai-floating-widget';
  widget.innerHTML = `
    <button type="button" class="ai-float-button" aria-label="فتح المعلم الذكي">AI</button>
    <div class="ai-float-panel hidden">
      <div class="ai-float-header">
        <strong>المعلم الذكي</strong>
        <button type="button" class="ai-close">×</button>
      </div>
      <div class="ai-float-body">
        <div class="message ai">مرحباً! أنا مساعدك الذكي. أستطيع شرح الدروس، مراجعة الكود، أو تصميم خطة تعلم لك.</div>
      </div>
      <div class="ai-float-input-row">
        <input type="text" class="ai-float-input" placeholder="اكتب سؤالك..." aria-label="سؤال المعلم الذكي" />
        <button type="button" class="btn btn-primary ai-send">إرسال</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  const button = widget.querySelector('.ai-float-button');
  const panel = widget.querySelector('.ai-float-panel');
  const input = widget.querySelector('.ai-float-input');
  const body = widget.querySelector('.ai-float-body');
  const send = widget.querySelector('.ai-send');

  button.addEventListener('click', () => panel.classList.toggle('hidden'));
  widget.querySelector('.ai-close').addEventListener('click', () => panel.classList.add('hidden'));
  send.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = value;
    body.appendChild(userMsg);
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai';
    aiMsg.textContent = value.toLowerCase().includes('كورس') ? 'أقترح عليك بداية بمسار Python أو JavaScript حسب هدفك، ثم أضيف لك خطة دروس أسبوعية.' : 'هذا سؤال ممتاز. سأساعدك بتبسيطه، شرح المثال، أو اقتراح تمرين مناسب لمستواك.';
    body.appendChild(aiMsg);
    input.value = '';
  });
}

function addDefaultDemoState() {
  const key = 'nexora-demo-state';
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify({
      user: { role: 'student', name: 'أحمد السلمي' },
      progress: { 'course-1': 70, 'course-2': 45, 'course-3': 30 },
      notifications: window.AI_TECH_ACADEMY_DEMO ? window.AI_TECH_ACADEMY_DEMO.notifications : [],
      approvalState: 'DRAFT'
    }));
  }
}

// Production note: real apps must store server-side data in a trusted database.
// Demo only: localStorage is used for mock state and UI interactions.
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  addDefaultDemoState();
  initFloatingAIWidget();
});

window.AI_TECH_ACADEMY_UTILS = {
  isObject,
  safeText,
  sanitizeHtml,
  isValidEmail,
  getPasswordStrength,
  showToast,
  setTheme,
  initTheme,
  applyLanguage,
  initLanguage,
  getPreferredLanguage,
  escapeHtml,
  openModal,
  closeModal,
  renderProgress,
  getAuthState,
  setAuthState,
  clearAuthState,
  requireRole,
  initFloatingAIWidget
};


