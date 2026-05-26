const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PRIORITIES = ["low", "medium", "high"];
const VALID_STATUSES = ["todo", "in-progress", "completed"];

export function validateEmail(email: unknown): string | null {
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return "Invalid email format";
  }
  return null;
}

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}

export function validateName(name: unknown): string | null {
  if (typeof name !== "string" || name.trim().length < 1) {
    return "Name is required";
  }
  if (name.length > 100) {
    return "Name is too long";
  }
  return null;
}

export function validateTitle(title: unknown): string | null {
  if (typeof title !== "string" || title.trim().length < 1) {
    return "Title is required";
  }
  if (title.length > 200) {
    return "Title is too long";
  }
  return null;
}

export function validatePriority(p: unknown): string | null {
  if (p !== undefined && p !== null && !VALID_PRIORITIES.includes(p as string)) {
    return "Priority must be low, medium, or high";
  }
  return null;
}

export function validateStatus(s: unknown): string | null {
  if (s !== undefined && s !== null && !VALID_STATUSES.includes(s as string)) {
    return "Status must be todo, in-progress, or completed";
  }
  return null;
}

export function checkOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}
