const SECURITY = {
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  maxImageSize: 5 * 1024 * 1024,
  maxVideoSize: 25 * 1024 * 1024,

  validateFile(file, options = {}) {
    const allowedTypes = options.allowedTypes || this.allowedImageTypes;
    const maxSize = options.maxSize || this.maxImageSize;

    if (!file) return { valid: false, reason: 'لا يوجد ملف.' };
    if (file.size > maxSize) return { valid: false, reason: `حجم الملف أكبر من ${Math.round(maxSize / (1024 * 1024))}MB.` };
    if (!allowedTypes.includes(file.type)) return { valid: false, reason: 'نوع الملف غير مسموح به.' };
    return { valid: true };
  },

  sanitizeUserContent(input) {
    if (typeof input !== 'string') return '';
    return input
      .replace(/<script\s*>.*?<\/script>/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
      .trim();
  },

  isSafeExternalLink(url) {
    try {
      const parsed = new URL(url, window.location.href);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },

  secureAnchor(anchor) {
    if (!anchor) return;
    anchor.rel = 'noopener noreferrer';
    anchor.target = '_blank';
  },

  isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password || '');
  }
};

window.AI_TECH_ACADEMY_SECURITY = SECURITY;

// Security note: frontend validation is not a substitute for secure backend validation.
// Production must enforce authorization, rate limiting, secret management, and secure storage server-side.


