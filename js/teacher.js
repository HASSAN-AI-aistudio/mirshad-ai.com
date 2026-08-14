document.addEventListener('DOMContentLoaded', () => {
  if (!window.AI_TECH_ACADEMY_UTILS || !window.AI_TECH_ACADEMY_UTILS.requireRole('teacher')) return;
  renderTeacherCourses();
  renderTeacherDrafts();
  bindTeacherForms();
});

function renderTeacherCourses() {
  const root = document.getElementById('teacher-courses');
  if (!root) return;

  const customCourses = JSON.parse(localStorage.getItem('nexora-teacher-courses') || '[]');
  const items = [
    { title: 'JavaScript moderno', status: 'PUBLISHED' },
    { title: 'تطوير الويب المتقدم', status: 'APPROVED' },
    { title: 'Python Basics', status: 'PUBLISHED' },
    ...customCourses
  ];

  root.innerHTML = items.map((item) => `
    <div class="course-item">
      <div><strong>${escapeHtml(item.title)}</strong></div>
      <span class="badge ${item.status === 'PENDING_REVIEW' ? 'warning' : 'success'}">${escapeHtml(item.status)}</span>
    </div>
  `).join('');
}

function renderTeacherDrafts() {
  const root = document.getElementById('teacher-drafts');
  if (!root) return;

  const customLessons = JSON.parse(localStorage.getItem('nexora-teacher-lessons') || '[]');
  const items = [
    { title: 'CSS Advanced Layouts', status: 'DRAFT' },
    { title: 'AI Intro', status: 'PENDING_REVIEW' },
    ...customLessons
  ];

  root.innerHTML = items.map((item) => `
    <div class="course-item">
      <div><strong>${escapeHtml(item.title)}</strong></div>
      <span class="badge warning">${escapeHtml(item.status)}</span>
    </div>
  `).join('');
}

function bindTeacherForms() {
  const courseForm = document.getElementById('ai-course-builder-form');
  const lessonForm = document.getElementById('ai-lesson-builder-form');

  courseForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(courseForm).entries());
    const newItem = {
      title: data.topic || 'عنوان كورس جديد',
      status: 'PENDING_REVIEW'
    };
    const list = JSON.parse(localStorage.getItem('nexora-teacher-courses') || '[]');
    list.unshift(newItem);
    localStorage.setItem('nexora-teacher-courses', JSON.stringify(list));
    renderTeacherCourses();
    showToast('success', 'تم إنشاء الكورس بنجاح في وضع Demo. Production: send request to protected backend endpoint.');
    closeModal('ai-course-builder-modal');
  });

  lessonForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(lessonForm).entries());
    const list = JSON.parse(localStorage.getItem('nexora-teacher-lessons') || '[]');
    list.unshift({ title: data.lessonTitle || 'درس جديد', status: 'DRAFT' });
    localStorage.setItem('nexora-teacher-lessons', JSON.stringify(list));
    renderTeacherDrafts();
    showToast('success', 'تم إنشاء اقتراح الدرس بنجاح، وهو جاهز للمراجعة.');
    closeModal('ai-lesson-builder-modal');
  });
}


