const STORAGE_KEY = 'nearwear-debug-preferences';
const errors = [];

export function captureDebugError(error, source = 'runtime') {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack || '' : '',
    source,
    time: new Date().toLocaleTimeString(),
  };
  errors.unshift(entry);
  if (errors.length > 20) errors.length = 20;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nearwear:debug-error', { detail: entry }));
  }
  return entry;
}

export function getCapturedErrors() {
  return [...errors];
}

export function clearCapturedErrors() {
  errors.length = 0;
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('nearwear:debug-clear'));
}

export function getDebugPreferences() {
  const fallback = { openOnError: true };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return fallback;
  }
}

export function saveDebugPreferences(preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}
