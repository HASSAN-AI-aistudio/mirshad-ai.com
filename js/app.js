document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initModals();
  renderHomepageSections();
  renderPlatformFeatures();
  renderReviewCards();
  renderCertificates();
  renderNotificationCenter();
  bindGlobalEvents();
  enhanceTopbarForSession();
  hydrateAuthenticatedProfile();
  bindSettingsForm();
});

function hydrateAuthenticatedProfile() {
  const auth = window.AI_TECH_ACADEMY_UTILS?.getAuthState?.() || { isLoggedIn: false, user: null };
  if (!auth.isLoggedIn || !auth.user) return;

  const nameNode = document.querySelector('[data-user-name]');
  const roleNode = document.querySelector('[data-user-role]');
  const emailNode = document.querySelector('[data-user-email]');
  const displayName = document.getElementById('settings-display-name');

  if (nameNode) nameNode.textContent = auth.user.name || 'مستخدم جديد';
  if (roleNode) roleNode.textContent = `${auth.user.role === 'admin' ? 'مسؤول' : auth.user.role === 'teacher' ? 'معلم' : 'طالب'} • ${auth.user.email || 'Learning Path'}`;
  if (emailNode) emailNode.textContent = `البريد: ${auth.user.email || 'no-email@example.com'}`;
  if (displayName) displayName.value = auth.user.name || 'مستخدم جديد';
}

function bindSettingsForm() {
  const form = document.getElementById('settings-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const displayName = document.getElementById('settings-display-name');
    const language = document.getElementById('settings-language');
    const darkMode = document.getElementById('dark-mode-pref');
    const notifications = document.getElementById('notifications-pref');
    const preferences = {
      displayName: displayName?.value || 'مستخدم جديد',
      language: language?.value || 'ar',
      darkMode: !!darkMode?.checked,
      notifications: !!notifications?.checked
    };
    localStorage.setItem('nexora-user-preferences', JSON.stringify(preferences));
    showToast('success', 'تم حفظ الإعدادات بنجاح.');
  });
}

function enhanceTopbarForSession() {
  const authState = window.AI_TECH_ACADEMY_UTILS?.getAuthState?.() || { isLoggedIn: false, user: null };
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  if (authState.isLoggedIn && authState.user) {
    const userChip = document.createElement('div');
    userChip.className = 'nav-user-chip';
    userChip.innerHTML = `
      <span class="tag success">${escapeHtml(authState.user.role)}</span>
      <span>${escapeHtml(authState.user.name)}</span>
      <button type="button" class="btn btn-ghost" data-logout>تسجيل الخروج</button>
    `;
    navActions.innerHTML = '';
    navActions.appendChild(userChip);
    document.querySelectorAll('[data-logout]').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.removeItem('nexora-demo-auth');
        window.location.href = 'login.html';
      });
    });
  }
}

function renderHomepageSections() {
  const coursesRoot = document.getElementById('featured-courses');
  const teachersRoot = document.getElementById('featured-teachers');
  const statsRoot = document.getElementById('site-stats');

  if (coursesRoot && window.AI_TECH_ACADEMY_DEMO) {
    coursesRoot.innerHTML = window.AI_TECH_ACADEMY_DEMO.courses.slice(0, 3).map((course) => `
      <article class="card course-card">
        <div class="card-media">
          <img src="${course.image}" alt="${escapeHtml(course.title)}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="tag primary">${escapeHtml(course.level)}</span>
            <span>${escapeHtml(course.duration)}</span>
          </div>
          <h3 class="card-title">${escapeHtml(course.title)}</h3>
          <p class="card-text">${escapeHtml(course.description)}</p>
          <div class="rating-row">
            <span>👨‍🏫 ${escapeHtml(course.teacher)}</span>
            <span>⭐ ${course.rating}</span>
          </div>
          <div class="rating-row" style="margin-top:12px;">
            <span>${course.lessons} دروس</span>
            <a href="course.html?id=${course.id}" class="btn btn-primary">التفاصيل</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  if (teachersRoot && window.AI_TECH_ACADEMY_DEMO) {
    teachersRoot.innerHTML = window.AI_TECH_ACADEMY_DEMO.teachers.slice(0, 3).map((teacher) => `
      <article class="card teacher-card">
        <div class="card-media">
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80" alt="${escapeHtml(teacher.name)}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="tag warning">${escapeHtml(teacher.specialty)}</span>
            <span>${teacher.courses} كورس</span>
          </div>
          <h3 class="card-title">${escapeHtml(teacher.name)}</h3>
          <p class="card-text">مدرسة وتطبيقية في تطوير الويب، البرمجة، والأمن.</p>
          <a href="courses.html" class="btn btn-secondary">عرض الكورسات</a>
        </div>
      </article>
    `).join('');
  }

  if (statsRoot && window.AI_TECH_ACADEMY_DEMO) {
    const stats = [
      { label: 'طلاب', value: window.AI_TECH_ACADEMY_DEMO.siteStats.students },
      { label: 'معلمين', value: window.AI_TECH_ACADEMY_DEMO.siteStats.teachers },
      { label: 'كورس', value: window.AI_TECH_ACADEMY_DEMO.siteStats.courses },
      { label: 'درس', value: window.AI_TECH_ACADEMY_DEMO.siteStats.lessons },
      { label: 'شهادة', value: window.AI_TECH_ACADEMY_DEMO.siteStats.certificates }
    ];

    statsRoot.innerHTML = stats.map((item) => `
      <div class="stat-card">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </div>
    `).join('');
  }
}

function renderPlatformFeatures() {
  const root = document.getElementById('platform-features');
  if (!root || !window.AI_TECH_ACADEMY_DEMO) return;

  root.innerHTML = (window.AI_TECH_ACADEMY_DEMO.platformFeatures || []).map((feature) => `
    <article class="card feature-card">
      <div class="card-body">
        <div class="feature-icon">${escapeHtml(feature.icon || '✨')}</div>
        <h3 class="card-title">${escapeHtml(feature.title)}</h3>
        <p class="card-text">${escapeHtml(feature.description)}</p>
        <a href="${feature.link || 'index.html'}" class="btn btn-secondary">استعراض</a>
      </div>
    </article>
  `).join('');
}

function renderReviewCards() {
  const root = document.getElementById('review-list');
  if (!root || !window.AI_TECH_ACADEMY_DEMO) return;

  root.innerHTML = window.AI_TECH_ACADEMY_DEMO.reviews.map((review) => `
    <article class="card">
      <div class="card-body">
        <span class="tag ${review.status === 'pending' ? 'warning' : 'primary'}">${review.status}</span>
        <h3 class="card-title">${escapeHtml(review.title)}</h3>
        <p class="card-text">${escapeHtml(review.type)} • ${review.details ? escapeHtml(review.details) : 'تحتاج مراجعة إضافية'}</p>
        <button class="btn btn-secondary" type="button">مراجعة</button>
      </div>
    </article>
  `).join('');
}

function renderCertificates() {
  const root = document.getElementById('certificate-list');
  if (!root || !window.AI_TECH_ACADEMY_DEMO) return;

  root.innerHTML = window.AI_TECH_ACADEMY_DEMO.certificates.map((item) => `
    <article class="card">
      <div class="card-body">
        <span class="tag success">شهادة</span>
        <h3 class="card-title">${escapeHtml(item.course)}</h3>
        <p class="card-text">الطالب: ${escapeHtml(item.student)}</p>
        <p class="card-text">التاريخ: ${escapeHtml(item.date)}</p>
        <p class="card-text">الرقم: ${escapeHtml(item.serial)}</p>
        <div class="badge info">QR Placeholder</div>
        <p class="card-text" style="margin-top:10px;">ملاحظة: التحقق الحقيقي يجب أن يحدث في Backend.</p>
      </div>
    </article>
  `).join('');
}

function renderNotificationCenter() {
  const notifications = window.AI_TECH_ACADEMY_DEMO?.notifications || [];
  const center = document.querySelector('.notification-center');
  if (!center) {
    const wrapper = document.createElement('div');
    wrapper.className = 'notification-center';
    document.body.appendChild(wrapper);
  }
  const container = document.querySelector('.notification-center');
  if (!container) return;
  container.innerHTML = notifications.slice(0, 3).map((item) => `
    <div class="toast ${item.type === 'ai' ? 'info' : item.type === 'course' ? 'success' : 'info'}">
      <strong>${escapeHtml(item.title)}</strong><br />
      <small>${escapeHtml(item.time)}</small>
    </div>
  `).join('');
}

function initThemeToggle() {
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach((button) => {
    const syncButtonState = () => {
      const root = document.documentElement;
      const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const icon = button.querySelector('.theme-toggle__icon');
      const label = button.querySelector('.theme-toggle__label');

      if (icon) icon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
      if (label) label.textContent = currentTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
      button.setAttribute('aria-label', currentTheme === 'light' ? 'تبديل إلى الوضع الداكن' : 'تبديل إلى الوضع الفاتح');
    };

    syncButtonState();
    button.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  });
}

function initModals() {
  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openModal));
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.remove('open');
    });
  });
}

function bindGlobalEvents() {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-ai-chat-open]');
    if (trigger) {
      window.open('ai-teacher.html', '_self');
    }
  });
}

window.AI_TECH_ACADEMY_APP = {
  renderHomepageSections,
  renderPlatformFeatures,
  renderReviewCards,
  renderCertificates,
  renderNotificationCenter
};


