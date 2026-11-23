import { useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// Keep these settings in sync with the pre-paint script in index.html.
const storageKey = 'portfolio-theme';
const systemThemeQuery = '(prefers-color-scheme: dark)';

function getSavedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [savedTheme, setSavedTheme] = useState(getSavedTheme);
  const [systemDark, setSystemDark] = useState(() => matchMedia(systemThemeQuery).matches);
  const theme = savedTheme ?? (systemDark ? 'dark' : 'light');

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const colorScheme = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (colorScheme) {
      colorScheme.content = theme;
    }

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const color = themeColor?.dataset[theme];
    if (themeColor && color) {
      themeColor.content = color;
    }
  }, [theme]);

  useEffect(() => {
    const query = matchMedia(systemThemeQuery);
    const updateSystemTheme = () => setSystemDark(query.matches);
    const updateSavedTheme = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) {
        setSavedTheme(getSavedTheme());
      }
    };

    query.addEventListener('change', updateSystemTheme);
    window.addEventListener('storage', updateSavedTheme);
    updateSystemTheme();
    return () => {
      query.removeEventListener('change', updateSystemTheme);
      window.removeEventListener('storage', updateSavedTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setSavedTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Keep the selected theme for this visit if storage is unavailable.
    }
  };

  return { theme, toggleTheme };
}
