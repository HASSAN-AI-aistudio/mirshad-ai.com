document.addEventListener('DOMContentLoaded', () => {
  renderNotificationList();
});

function renderNotificationList() {
  const root = document.getElementById('notification-list');
  if (!root || !window.AI_TECH_ACADEMY_DEMO) return;

  root.innerHTML = window.AI_TECH_ACADEMY_DEMO.notifications.map((item) => `
    <div class="list-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong><br />
        <small>${escapeHtml(item.time)}</small>
      </div>
      <span class="badge ${item.type === 'course' ? 'success' : item.type === 'test' ? 'warning' : 'info'}">${escapeHtml(item.type)}</span>
    </div>
  `).join('');
}


