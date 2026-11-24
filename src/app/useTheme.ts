import { useEffect, useState } from 'react';

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
  const [savedTheme, setSavedTheme] = useState<Theme | null>(null);
  const [systemDark, setSystemDark] = useState(false);
  const [ready, setReady] = useState(false);
  const theme = savedTheme ?? (systemDark ? 'dark' : 'light');

  useEffect(() => {
    if (!ready) return;
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
  }, [ready, theme]);

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
    setSavedTheme(getSavedTheme());
    setReady(true);
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
