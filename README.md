# NEXORA AI

منصة تعليمية تقنية احترافية تم تصميمها كـ Prototype Frontend كامل مع بيانات تجريبية، واجهات للطالب والمعلم والمشرف، ومعلم ذكي داخل المنصة.

## التشغيل

1. افتح مجلد المشروع.
2. افتح ملف `index.html` مباشرة في المتصفح.
3. أو استخدم خادم محلي بسيط مثل:
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`
4. ثم اذهب إلى `http://localhost:8000`.

## هيكل المشروع

- `index.html` — الصفحة الرئيسية.
- `login.html` — تسجيل الدخول.
- `register.html` — إنشاء حساب.
- `forgot-password.html` — استعادة كلمة المرور.
- `courses.html` — قائمة الكورسات.
- `course.html` — تفاصيل الكورس.
- `lesson.html` — صفحة الدرس.
- `student-dashboard.html` — لوحة الطالب.
- `teacher-dashboard.html` — لوحة المعلم.
- `admin-dashboard.html` — لوحة المسؤول.
- `ai-teacher.html` — المعلم الذكي.
- `exams.html` — الاختبارات.
- `review.html` — مراجعة الطلاب.
- `certificates.html` — الشهادات.
- `profile.html` — الملف الشخصي.
- `settings.html` — الإعدادات.

## مجلدات التصميم والملحقات

- `css/style.css` — النظام الأساسي للتصميم.
- `css/responsive.css` — الاستجابة للشاشات.
- `css/dashboard.css` — تصميم اللوحات.
- `css/auth.css` — تسجيل الدخول والتسجيل.
- `css/components.css` — مكونات شائعة مثل النوافذ، التنبيهات، والأزرار.
- `js/app.js` — المنطق العام.
- `js/auth.js` — تسجيل الدخول والتسجيل.
- `js/student.js` — منطق الطالب.
- `js/teacher.js` — منطق المعلم.
- `js/admin.js` — منطق المسؤول.
- `js/courses.js` — منطق الكورسات.
- `js/exams.js` — اختبارات Demo.
- `js/ai-teacher.js` — محادثات المعلم الذكي.
- `js/security.js` — ميزات الأمان للواجهة.
- `js/utils.js` — مساعدات عامة.
- `data/demo-data.js` — البيانات التجريبية.

## تعديل الهوية والألوان

- افتح ملف `css/style.css`.
- عدّل متغيرات الـ CSS في بداية الملف مثل:
  - `--primary`
  - `--secondary`
  - `--bg`
  - `--text`
  - `--card`

## إضافة كورس

- افتح ملف `data/demo-data.js`.
- أضف كائنًا جديدًا داخل مصفوفة `courses`.
- تأكد من إدراج `title`, `description`, `level`, `teacher`, `lessons`, `duration`, `category`, `status`, `image`.

## إضافة درس

- أضف كائنًا جديدًا في مصفوفة `lessons` داخل الملف السابق.
- استخدم الحقول: `id`, `courseId`, `title`, `duration`, `level`.

## ربط Backend مستقبلاً

- استخدم `fetch()` إلى نقطة API آمنة.
- قم بإضافة JWT أو Session في الخادم.
- حافظ على التحقق من الإدخال على Backend بشكل كامل.
- لا تعتمد على LocalStorage لتخزين البيانات الحساسة أو الرمز المميز الحقيقي.

## ربط AI API بشكل آمن

- ضع المفتاح الحقيقي في Backend أو Serverless Function.
- لا تضع `API_KEY` داخل Frontend JavaScript.
- مثال في `config.example.js` و `.env.example` فقط.
- في الإنتاج: استخدم متغيرات البيئة أو Secret Manager.

## ما هو Demo فقط

- تمثيل البيانات المحلية.
- تسجيل الدخول الوهمي.
- حفظ الحالة في LocalStorage.
- AI Teacher Demo mock responses.
- نظام الموافقة Demo.

## ما يحتاج Backend للإنتاج

- Authentication الحقيقي.
- Authorization الحقيقي.
- Database وقواعد بيانات موثوقة.
- API Security و rate limiting.
- Storage للملفات والصور والفيديو.
- AI API integration مع secret management.
- HTTPS و Security Headers.
- حماية الملفات والصلاحيات والمراجعات.

## ملاحظات أمان

- تم تطبيق التحقق من المدخلات في الواجهة.
- تم تقييد بعض أنواع الملفات.
- لا يتم استخدام `innerHTML` مع بيانات غير موثوقة.
- لا يتم تخزين Secrets في Frontend.
- هذا المشروع هو Prototype فقط ولا يساوي حماية حقيقية.

> في التطبيق الحقيقي، يجب أن تكون Authentication و Authorization و Database Security و API Security في Backend حقيقي.
