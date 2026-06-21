// Server-seitige Eingabe-Helfer gemäß WEBSECURITY_GDPR_GUIDE.md.

export function sanitizeText(text: unknown): string {
  return String(text ?? "")
    .replace(/[<>]/g, "") // einfache XSS-Entschärfung
    .trim();
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.length <= 254;
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true; // optional
  const clean = phone.replace(/\D/g, "");
  return clean.length >= 6 && clean.length <= 15;
}
