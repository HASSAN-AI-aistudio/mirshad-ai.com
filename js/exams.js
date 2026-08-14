document.addEventListener('DOMContentLoaded', () => {
  renderExams();
  bindExamButtons();
});

function renderExams() {
  const root = document.getElementById('exam-list');
  if (!root) return;

  const exams = window.AI_TECH_ACADEMY_DEMO?.exams || [];
  root.innerHTML = exams.map((exam) => `
    <article class="card">
      <div class="card-body">
        <span class="tag warning">${escapeHtml(exam.difficulty)}</span>
        <h3 class="card-title">${escapeHtml(exam.title)}</h3>
        <p class="card-text">الموضوع: ${escapeHtml(exam.course)}</p>
        <p class="card-text">الأسئلة: ${exam.questions} • الوقت: ${exam.totalTime} دقيقة</p>
        <button class="btn btn-primary" type="button" data-exam-start="${exam.id}">ابدأ الاختبار</button>
      </div>
    </article>
  `).join('');
}

function bindExamButtons() {
  document.querySelectorAll('[data-exam-start]').forEach((button) => {
    button.addEventListener('click', () => {
      showToast('info', 'تم فتح اختبار Demo. Production: fetch exam from protected backend endpoint.');
    });
  });
}


