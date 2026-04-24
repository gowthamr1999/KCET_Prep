'use client';

import { useState } from 'react';

function applyTheme(nextTheme) {
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem('theme', nextTheme);
  } catch {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.dataset.theme || 'light';
  });

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      suppressHydrationWarning
    >
      <span aria-hidden="true" className="theme-toggle-icon" suppressHydrationWarning>
        {isDark ? '☀' : '☾'}
      </span>
      <span className="theme-toggle-label" suppressHydrationWarning>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
