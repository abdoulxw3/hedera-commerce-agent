const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours

export function saveSession(accountId) {
  const session = {
    accountId,
    expiresAt: Date.now() + SESSION_DURATION
  };
  localStorage.setItem('hashpay_session', JSON.stringify(session));
}

export function loadSession() {
  try {
    const raw = localStorage.getItem('hashpay_session');
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem('hashpay_session');
      return null;
    }
    return session.accountId;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem('hashpay_session');
}
