/**
 * Security and input validation helper functions.
 */

/**
 * Sanitizes a string input by escaping HTML tags and dangerous characters to prevent XSS.
 * @param val The string to sanitize.
 */
export const sanitizeInput = (val: string): string => {
  if (typeof val !== 'string') return '';
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates whether an email string is formatted correctly.
 * @param email The email address to check.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Simple rate limiter stored in localStorage.
 * Returns whether the operation is allowed and the remaining cooldown in seconds.
 * @param key Unique key for the operation (e.g. 'newsletter', 'contact').
 * @param cooldownMs Cooldown time in milliseconds.
 */
export const checkRateLimit = (
  key: string,
  cooldownMs: number
): { allowed: boolean; timeLeft: number } => {
  const storageKey = `rate_limit_${key}`;
  const now = Date.now();
  const lastTime = localStorage.getItem(storageKey);

  if (lastTime) {
    const elapsed = now - parseInt(lastTime, 10);
    if (elapsed < cooldownMs) {
      return {
        allowed: false,
        timeLeft: Math.ceil((cooldownMs - elapsed) / 1000)
      };
    }
  }

  localStorage.setItem(storageKey, now.toString());
  return { allowed: true, timeLeft: 0 };
};
