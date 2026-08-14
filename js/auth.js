document.addEventListener('DOMContentLoaded', () => {
  bindThemeToggle();
  bindPasswordToggle();
  bindLogin();
  bindRegister();
  bindForgotPassword();
  bindLogoutButtons();
});

function bindThemeToggle() {
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach((button) => {
    const syncButtonState = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const icon = button.querySelector('.theme-toggle__icon');
      const label = button.querySelector('.theme-toggle__label');

      if (icon) icon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
      if (label) label.textContent = currentTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
      button.setAttribute('aria-label', currentTheme === 'light' ? 'تبديل إلى الوضع الداكن' : 'تبديل إلى الوضع الفاتح');
    };

    syncButtonState();
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      window.AI_TECH_ACADEMY_UTILS.setTheme(next);
      syncButtonState();
    });
  });
}

function bindPasswordToggle() {
  document.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.togglePassword);
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      button.textContent = isHidden ? 'إخفاء' : 'عرض';
    });
  });
}

function bindLogoutButtons() {
  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.removeItem('nexora-demo-auth');
      window.location.href = 'login.html';
    });
  });
}

function bindLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const alertBox = document.getElementById('login-alert');
    const loginIdentifier = (emailInput.value || '').trim();
    const password = (passwordInput.value || '').trim();

    if (!loginIdentifier || !password) {
      showAuthError('login-email', 'يرجى إدخال البريد أو اسم المستخدم وكلمة المرور.');
      return;
    }

    const adminIdentifiers = ['admin@nexora.ai', 'adminai.ai'];
    const isAdminDemoLogin = adminIdentifiers.includes(loginIdentifier) && password === 'admin@#ai';
    const isEmailLogin = window.AI_TECH_ACADEMY_UTILS.isValidEmail(loginIdentifier);

    if (!isEmailLogin && !isAdminDemoLogin) {
      showAuthError('login-email', 'صيغة البريد أو اسم المستخدم غير صحيحة.');
      return;
    }

    const state = JSON.parse(localStorage.getItem('nexora-demo-state') || '{}');
    const auth = isAdminDemoLogin ? {
      isLoggedIn: true,
      user: {
        role: 'admin',
        name: 'Admin AI',
        email: 'admin@nexora.ai',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      }
    } : {
      isLoggedIn: true,
      user: {
        role: 'student',
        name: state.user?.name || 'أحمد السلمي',
        email: loginIdentifier,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    };

    window.AI_TECH_ACADEMY_UTILS.setAuthState(auth);

    alertBox.className = 'alert success';
    alertBox.textContent = isAdminDemoLogin ? 'تم تسجيل الدخول بنجاح. سيتم تحويلك إلى لوحة المسؤول.' : 'تم تسجيل الدخول بنجاح. سيتم تحويلك إلى لوحة الطالب.';
    alertBox.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = isAdminDemoLogin ? 'admin-dashboard.html' : 'student-dashboard.html';
    }, 1100);
  });
}

function bindRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;

  const passwordInput = document.getElementById('register-password');
  const meter = document.getElementById('password-meter-bar');
  const strengthText = document.getElementById('password-strength-text');

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const result = window.AI_TECH_ACADEMY_UTILS.getPasswordStrength(passwordInput.value);
      meter.style.width = `${result.score}%`;
      meter.style.background = result.className === 'danger' ? '#ff5d6c' : result.className === 'warning' ? '#ffb454' : result.className === 'info' ? '#6ea8fe' : '#24c38e';
      strengthText.textContent = `قوة كلمة المرور: ${result.label}`;
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('full-name');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');
    const confirmPassword = document.getElementById('confirm-password');
    const role = document.getElementById('account-role');

    if (!name.value.trim()) {
      showAuthError('full-name', 'يرجى إدخال الاسم الكامل.');
      return;
    }
    if (!window.AI_TECH_ACADEMY_UTILS.isValidEmail(email.value)) {
      showAuthError('register-email', 'البريد الإلكتروني غير صحيح.');
      return;
    }
    if (!window.AI_TECH_ACADEMY_SECURITY.isStrongPassword(password.value)) {
      showAuthError('register-password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على أرقام وحروف كبيرة ومميزة.');
      return;
    }
    if (password.value !== confirmPassword.value) {
      showAuthError('confirm-password', 'كلمتا المرور غير متطابقتين.');
      return;
    }

    const safeRole = role.value || 'student';
    const state = JSON.parse(localStorage.getItem('nexora-demo-state') || '{}');
    state.user = { role: safeRole, name: name.value.trim() };
    localStorage.setItem('nexora-demo-state', JSON.stringify(state));

    window.AI_TECH_ACADEMY_UTILS.setAuthState({
      isLoggedIn: true,
      user: {
        role: safeRole,
        name: name.value.trim(),
        email: email.value.trim(),
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    });

    showAuthSuccess('تم إنشاء الحساب بنجاح.');
    setTimeout(() => {
      if (safeRole === 'teacher') window.location.href = 'teacher-dashboard.html';
      else if (safeRole === 'admin') window.location.href = 'admin-dashboard.html';
      else window.location.href = 'student-dashboard.html';
    }, 1000);
  });
}

function bindForgotPassword() {
  const form = document.getElementById('forgot-password-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('reset-email');
    const alertBox = document.getElementById('reset-alert');

    if (!window.AI_TECH_ACADEMY_UTILS.isValidEmail(emailInput.value)) {
      showResetError('reset-email', 'يرجى إدخال بريد صحيح.');
      return;
    }

    alertBox.className = 'alert success';
    alertBox.textContent = 'تم إرسال رابط الاستعادة إلى بريدك الإلكتروني.';
    alertBox.classList.remove('hidden');
  });
}

function showAuthError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const messageBox = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (field) field.style.borderColor = 'var(--danger)';
  if (messageBox) messageBox.textContent = message;
}

function showResetError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const messageBox = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (field) field.style.borderColor = 'var(--danger)';
  if (messageBox) messageBox.textContent = message;
}

function showAuthSuccess(message) {
  const alertBox = document.createElement('div');
  alertBox.className = 'alert success';
  alertBox.textContent = message;
  const form = document.getElementById('register-form');
  if (form) form.insertAdjacentElement('afterend', alertBox);
}

