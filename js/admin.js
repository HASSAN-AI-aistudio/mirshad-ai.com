document.addEventListener('DOMContentLoaded', () => {
  if (!window.AI_TECH_ACADEMY_UTILS || !window.AI_TECH_ACADEMY_UTILS.requireRole('admin')) return;
  renderAdminQueue();
  renderAdminAiInsights();
  bindAdminActions();
});

function bindAdminActions() {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-approve-course]');
    if (target) {
      const item = target.closest('.course-item');
      if (item) item.querySelector('.badge')?.replaceWith(Object.assign(document.createElement('span'), { className: 'badge success', textContent: 'PUBLISHED' }));
      showToast('success', 'تمت الموافقة على الكورس بنجاح.');
    }
    const reject = event.target.closest('[data-reject-course]');
    if (reject) {
      const item = reject.closest('.course-item');
      if (item) item.querySelector('.badge')?.replaceWith(Object.assign(document.createElement('span'), { className: 'badge danger', textContent: 'REJECTED' }));
      showToast('error', 'تم رفض الكورس، مع طلب تعديلات.');
    }

    const quickAction = event.target.closest('[data-admin-quick-action]');
    if (quickAction) {
      const action = quickAction.dataset.adminQuickAction;
      if (action === 'approve-all') showToast('success', 'تمت الموافقة على جميع الطلبات المعلقة.');
      if (action === 'review-queue') showToast('info', 'تم تحديث قائمة المراجعة بناءً على أولويات التقييم.');
      if (action === 'broadcast') showToast('info', 'تم تجهيز إشعار جماعي جديد لمستخدمي المنصة.');
    }
  });
}

function renderAdminAiInsights() {
  const root = document.getElementById('admin-ai-insights');
  if (!root) return;

  const insights = [
    { title: 'AI: زيادة الطلبات على مسار Python', value: '+18%' },
    { title: 'AI: تعزيز مشاركة الطلاب في AI Basics', value: '+12%' },
    { title: 'AI: تحتاج مسارات الويب لمراجعة التفاعل', value: '3 قضايا' }
  ];

  root.innerHTML = insights.map((item) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
      </div>
      <span class="badge info">${escapeHtml(item.value)}</span>
    </div>
  `).join('');
}

function renderAdminQueue() {
  const root = document.getElementById('admin-review-queue');
  if (!root) return;

  const queue = [
    { title: 'تطوير الويب المتقدم', state: 'PENDING_REVIEW' },
    { title: 'إطلاق دورة AI Basics', state: 'PENDING_REVIEW' },
    { title: 'مقدمة إلى الشبكات', state: 'REJECTED' }
  ];

  root.innerHTML = queue.map((item) => `
    <div class="course-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong><br />
        <span class="badge warning">${escapeHtml(item.state)}</span>
      </div>
      <div>
        <button type="button" class="btn btn-success" data-approve-course style="padding: 0.45rem 0.7rem; font-size: 0.8rem;">Approve</button>
        <button type="button" class="btn btn-danger" data-reject-course style="padding: 0.45rem 0.7rem; font-size: 0.8rem;">Reject</button>
      </div>
    </div>
  `).join('');
}


