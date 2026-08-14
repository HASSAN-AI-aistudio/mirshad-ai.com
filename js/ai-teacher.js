document.addEventListener('DOMContentLoaded', () => {
  bindChat();
});

function bindChat() {
  const input = document.getElementById('chat-input');
  const button = document.getElementById('send-chat');
  const body = document.getElementById('chat-body');

  if (!input || !button || !body) return;

  button.addEventListener('click', () => sendMessage(input.value.trim(), body));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage(input.value.trim(), body);
  });
}

function sendMessage(message, body) {
  if (!message) return;
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  body.appendChild(userMessage);

  const aiReply = document.createElement('div');
  aiReply.className = 'message ai';
  aiReply.textContent = generateDemoAssistantReply(message);
  body.appendChild(aiReply);

  const input = document.getElementById('chat-input');
  if (input) input.value = '';
  body.scrollTop = body.scrollHeight;
}

function generateDemoAssistantReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('شرح') || lower.includes('explain')) return 'بالتأكيد، دعني أشرحها خطوة بخطوة: أولاً تحدد الهدف، ثم الخطوات الأساسية، ثم مثال عملي بسيط مع كود.';
  if (lower.includes('أمثلة') || lower.includes('example')) return 'إليك مثال عملي: استخدم دالة for لاجتياز العناصر، ثم اطبع كل عنصر مع حالة شرطية.';
  if (lower.includes('تمرين') || lower.includes('exercise')) return 'تمرين مقترح: أنشئ قائمة من 5 أرقام واحسب مجموعها باستخدام Python أو JavaScript.';
  if (lower.includes('مشروع') || lower.includes('project')) return 'يمكنك بناء مشروع صغير: موقع شخصي أو قائمة مهام مع إضافة وحذف العناصر.';
  if (lower.includes('كود') || lower.includes('code')) return 'مثال كود: const numbers = [1,2,3]; const total = numbers.reduce((sum, x) => sum + x, 0); console.log(total);';
  return 'هذه فكرة جيدة. يمكنني مساعدتك في شرحها، تبسيطها، إعطائك أمثلة، أو تصميم تمارين مناسبة لمستواك.';
}
