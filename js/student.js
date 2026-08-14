document.addEventListener('DOMContentLoaded', () => {
  if (!window.AI_TECH_ACADEMY_UTILS || !window.AI_TECH_ACADEMY_UTILS.requireRole('student')) return;
  renderStudentCourses();
  renderStudentExams();
  renderStudentNotifications();
  renderStudentProfileName();
  renderSmartLearningPlan();
  renderStudentAiRecommendations();
});

function renderStudentProfileName() {
  const auth = window.AI_TECH_ACADEMY_UTILS.getAuthState();
  const title = document.querySelector('.dashboard-header h1');
  if (title && auth.user) title.textContent = auth.user.name || 'أحمد السلمي';
}

function renderSmartLearningPlan() {
  const root = document.getElementById('student-smart-plan');
  if (!root) return;

  const items = [
    { title: 'مراجعة الوحدة الحالية', value: '90 دقيقة', tone: 'success' },
    { title: 'تمرين JavaScript يومي', value: '3 أسئلة', tone: 'info' },
    { title: 'جلسة AI Review', value: '15 دقيقة', tone: 'warning' }
  ];

  root.innerHTML = items.map((item) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
      </div>
      <span class="badge ${item.tone}">${escapeHtml(item.value)}</span>
    </div>
  `).join('');
}

function renderStudentAiRecommendations() {
  const root = document.getElementById('student-ai-recommendations');
  if (!root) return;

  const items = [
    { title: 'تأكيد: ركز على DOM Events اليوم', time: 'الآن' },
    { title: 'اقتراح: أعد حل تمرين Python الأسبوعي', time: 'غداً' },
    { title: 'توصية: ابدأ الوحدة المختصة بالأمان', time: 'هذا الأسبوع' }
  ];

  root.innerHTML = items.map((item) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong><br />
        <small>${escapeHtml(item.time)}</small>
      </div>
      <span class="badge info">AI</span>
    </div>
  `).join('');
}

function renderStudentCourses() {
  const root = document.getElementById('student-course-list');
  if (!root) return;

  const courses = [
    { title: 'أساسيات البرمجة باستخدام Python', progress: 78 },
    { title: 'JavaScript moderno', progress: 64 },
    { title: 'تطوير الويب المتقدم', progress: 52 },
    { title: 'أمن المعلومات', progress: 35 }
  ];

  root.innerHTML = courses.map((course) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(course.title)}</strong>
        <div class="progress-bar" style="margin-top:8px; width: 180px;">
          <span style="width: ${course.progress}%"></span>
        </div>
      </div>
      <span class="badge ${course.progress > 60 ? 'success' : 'warning'}">${course.progress}%</span>
    </div>
  `).join('');
}

function renderStudentExams() {
  const root = document.getElementById('student-exams');
  if (!root) return;

  const exams = [
    { title: 'اختبار Python 1', score: '7 / 10' },
    { title: 'اختبار JavaScript', score: '9 / 10' },
    { title: 'اختبار الأمان', score: '6 / 10' }
  ];

  root.innerHTML = exams.map((exam) => `
    <div class="course-item">
      <div><strong>${escapeHtml(exam.title)}</strong></div>
      <span class="badge info">${escapeHtml(exam.score)}</span>
    </div>
  `).join('');
}

function renderStudentNotifications() {
  const root = document.getElementById('student-notifications');
  if (!root) return;

  const items = window.AI_TECH_ACADEMY_DEMO?.notifications || [];
  root.innerHTML = items.slice(0, 4).map((item) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong><br />
        <small>${escapeHtml(item.time)}</small>
      </div>
      <span class="badge ${item.type === 'ai' ? 'info' : 'success'}">${escapeHtml(item.type)}</span>
    </div>
  `).join('');
}


