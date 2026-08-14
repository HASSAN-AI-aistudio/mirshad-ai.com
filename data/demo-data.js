window.AI_TECH_ACADEMY_DEMO = {
  appName: 'AI Tech Academy',
  theme: 'dark',
  currentUser: {
    id: 'student-1',
    name: 'أحمد السلمي',
    email: 'ahmed@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  students: [
    { id: 'student-1', name: 'أحمد السلمي', email: 'ahmed@example.com', role: 'student', progress: 78, status: 'active' },
    { id: 'student-2', name: 'سارة العمري', email: 'sara@example.com', role: 'student', progress: 64, status: 'active' },
    { id: 'student-3', name: 'محمود هاشم', email: 'mahmoud@example.com', role: 'student', progress: 52, status: 'active' }
  ],
  teachers: [
    { id: 'teacher-1', name: 'د. ليلى الحربي', email: 'leila@example.com', role: 'teacher', specialty: 'JavaScript & Frontend', courses: 6 },
    { id: 'teacher-2', name: 'أحمد ربيع', email: 'ahmed.riab@example.com', role: 'teacher', specialty: 'Python & AI', courses: 4 },
    { id: 'teacher-3', name: 'م. زينب حسن', email: 'zeinab@example.com', role: 'teacher', specialty: 'Cybersecurity', courses: 5 }
  ],
  admin: { id: 'admin-1', name: 'إدارة المنصة', email: 'admin@nexora.ai', role: 'admin' },
  aiTeacher: {
    id: 'ai-1',
    name: 'AI Tech Academy Tutor',
    specialty: 'AI Learning Coach',
    description: 'مساعد ذكي يشرح المفاهيم، يراجع المشاريع، ويقترح التمارين.',
    courses: 12,
    students: 1800,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
  },
  courses: [
    {
      id: 'course-1',
      title: 'أساسيات البرمجة باستخدام Python',
      description: 'تعلم البرمجة من الصفر مع تمرينات عملية ومشاريع صغيرة.',
      level: 'مبتدئ',
      teacher: 'د. ليلى الحربي',
      rating: 4.9,
      lessons: 14,
      duration: '6 أسابيع',
      category: 'Programming',
      status: 'PUBLISHED',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'course-2',
      title: 'تطوير الويب المتقدم',
      description: 'أتمتة المشاريع، DOM، API، CSS، UX، والبرمجة الحديثة.',
      level: 'متوسط',
      teacher: 'أحمد ربيع',
      rating: 4.8,
      lessons: 18,
      duration: '8 أسابيع',
      category: 'Web Development',
      status: 'PENDING_REVIEW',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'course-3',
      title: 'أمن المعلومات للمبتدئين',
      description: 'تعلم أساسيات الأمان، الهجمات الشائعة، والتحقق الأمني.',
      level: 'مبتدئ',
      teacher: 'م. زينب حسن',
      rating: 4.7,
      lessons: 12,
      duration: '5 أسابيع',
      category: 'Cybersecurity',
      status: 'APPROVED',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'course-4',
      title: 'JavaScript moderno',
      description: 'ES6+، Async/Await، modules، APIs، وقابلية التطوير.',
      level: 'متقدم',
      teacher: 'د. ليلى الحربي',
      rating: 5.0,
      lessons: 20,
      duration: '7 أسابيع',
      category: 'JavaScript',
      status: 'PUBLISHED',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  lessons: [
    { id: 'lesson-1', courseId: 'course-1', title: 'مقدمة إلى Python', duration: '12 دقيقة', level: 'مبتدئ' },
    { id: 'lesson-2', courseId: 'course-1', title: 'المتغيرات والبيانات', duration: '16 دقيقة', level: 'مبتدئ' },
    { id: 'lesson-3', courseId: 'course-2', title: 'DOM & Events', duration: '19 دقيقة', level: 'متوسط' },
    { id: 'lesson-4', courseId: 'course-3', title: 'مفاهيم الأمان الأساسية', duration: '14 دقيقة', level: 'مبتدئ' }
  ],
  exams: [
    { id: 'exam-1', title: 'اختبار الوحدة الأولى', course: 'Python Basics', questions: 10, totalTime: 20, difficulty: 'مبتدئ' },
    { id: 'exam-2', title: 'اختبار JavaScript', course: 'JavaScript moderno', questions: 12, totalTime: 25, difficulty: 'متوسط' },
    { id: 'exam-3', title: 'اختبار الأمان', course: 'أمن المعلومات', questions: 8, totalTime: 15, difficulty: 'مبتدئ' }
  ],
  notifications: [
    { id: 'n-1', type: 'lesson', title: 'درس جديد: المتغيرات في Python', time: 'قبل 2 ساعة' },
    { id: 'n-2', type: 'course', title: 'تم قبول كورسك: JavaScript moderno', time: 'قبل 5 ساعات' },
    { id: 'n-3', type: 'ai', title: 'توصية AI: راجع الوحدة الثانية في Frontend', time: 'اليوم' },
    { id: 'n-4', type: 'test', title: 'اختبار جديد متاح في الوحدة الحالية', time: 'أمس' }
  ],
  certificates: [
    { id: 'cert-1', student: 'أحمد السلمي', course: 'أساسيات البرمجة باستخدام Python', date: '2026-07-12', serial: 'NEX-2026-1001' },
    { id: 'cert-2', student: 'أحمد السلمي', course: 'تطوير الويب المتقدم', date: '2026-06-04', serial: 'NEX-2026-1002' }
  ],
  reviews: [
    { id: 'rev-1', title: 'مراجعة الدرس: المتغيرات', type: 'lesson', status: 'pending' },
    { id: 'rev-2', title: 'اختبار Python - نتائج ضعيفة', type: 'exam', status: 'needs-review', details: 'المنطق الشرطي' },
    { id: 'rev-3', title: 'مراجعة المشروع النهائي: Landing Page', type: 'project', status: 'pending' }
  ],
  siteStats: { students: 5420, teachers: 184, courses: 128, lessons: 960, certificates: 2300 },
  platformFeatures: [
    {
      icon: '🧭',
      title: 'مسارات تعليمية ذكية',
      description: 'خطط تعلم مرنة تبدأ من المبتدئ وتتنوع حسب هدف الطالب ومساره المهني.',
      link: 'learning-path.html'
    },
    {
      icon: '🤖',
      title: 'معلم ذكي داخل المنصة',
      description: 'تفاعل فوري مع مساعد AI يشرح المفاهيم ويقيّم الحلول ويقترح تمارين.',
      link: 'ai-teacher.html'
    },
    {
      icon: '🧪',
      title: 'اختبارات وتقييم مستمر',
      description: 'اختبارات قصيرة، تقييم فوري، وتحليل نقاط القوة والضعف لكل مستخدم.',
      link: 'exams.html'
    },
    {
      icon: '🏅',
      title: 'شهادات ومكافآت',
      description: 'إصدار شهادات متدرجة بعد إكمال المراحل وبناء سجل إنجاز احترافي.',
      link: 'certificates.html'
    },
    {
      icon: '📈',
      title: 'لوحات أداء متقدمة',
      description: 'مؤشرات تقدم، إنجازات، ومراجعة الأداء لكل طالب ومعلم ومسؤول.',
      link: 'student-dashboard.html'
    },
    {
      icon: '👥',
      title: 'مراجعات ومجتمع',
      description: 'تقييم الدروس، مراجعة المشاريع، وبناء مجتمع متعلم نشط داخل المنصة.',
      link: 'review.html'
    }
  ]
};

window.AI_TECH_ACADEMY_ENV = {
  isDemoMode: true,
  apiBase: '/api',
  securityNotice: 'Frontend security best practices are implemented. Real authentication and authorization require a protected backend.'
};


