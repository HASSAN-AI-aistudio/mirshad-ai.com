document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  initCourseFilters();
  initCourseDetail();
  bindCourseSearch();
});

function renderCourses() {
  const root = document.getElementById('all-courses');
  if (!root || !window.AI_TECH_ACADEMY_DEMO) return;

  const courses = window.AI_TECH_ACADEMY_DEMO.courses;
  root.innerHTML = courses.map((course) => `
    <article class="card course-card" data-category="${escapeHtml(course.category)}">
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
        <div class="rating-row" style="margin-top: 12px;">
          <span>${course.lessons} دروس</span>
          <a href="course.html?id=${course.id}" class="btn btn-primary">التفاصيل</a>
        </div>
      </div>
    </article>
  `).join('');
}

function initCourseFilters() {
  const chips = document.querySelectorAll('[data-filter]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((btn) => btn.classList.toggle('active', btn === chip));
      const cards = document.querySelectorAll('#all-courses .course-card');
      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? 'block' : 'none';
      });
    });
  });
}

function bindCourseSearch() {
  const input = document.getElementById('course-search');
  if (!input) return;

  input.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('#all-courses .course-card');
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
}

function initCourseDetail() {
  const detailRoot = document.getElementById('course-detail');
  if (!detailRoot || !window.AI_TECH_ACADEMY_DEMO) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'course-1';
  const selected = window.AI_TECH_ACADEMY_DEMO.courses.find((course) => course.id === id) || window.AI_TECH_ACADEMY_DEMO.courses[0];

  detailRoot.innerHTML = `
    <div class="card">
      <div class="card-media">
        <img src="${selected.image}" alt="${escapeHtml(selected.title)}" />
      </div>
    </div>
    <div class="card" style="padding:22px;">
      <span class="tag primary">${escapeHtml(selected.level)}</span>
      <h1>${escapeHtml(selected.title)}</h1>
      <p class="card-text">${escapeHtml(selected.description)}</p>
      <div class="rating-row">
        <span>المعلم: ${escapeHtml(selected.teacher)}</span>
        <span>⭐ ${selected.rating}</span>
      </div>
      <div class="list-stack" style="margin-top:18px;">
        <div class="list-item"><span>عدد الدروس</span><span>${selected.lessons}</span></div>
        <div class="list-item"><span>المدة</span><span>${escapeHtml(selected.duration)}</span></div>
        <div class="list-item"><span>الفئة</span><span>${escapeHtml(selected.category)}</span></div>
        <div class="list-item"><span>حالة الكورس</span><span>${escapeHtml(selected.status)}</span></div>
      </div>
      <div class="hero-actions" style="margin-top: 18px;">
        <button class="btn btn-primary" type="button">بدء التعلم</button>
        <a href="lesson.html" class="btn btn-secondary">فتح أول درس</a>
      </div>
    </div>
  `;
}


