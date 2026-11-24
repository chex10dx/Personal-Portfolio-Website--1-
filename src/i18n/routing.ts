export const locales = ['en', 'ar'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';
export const localeStorageKey = 'portfolio-locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ar';
}

export function directionOf(locale: Locale) {
  return locale === 'ar' ? 'rtl' as const : 'ltr' as const;
}

export function localePath(locale: Locale, base = import.meta.env.BASE_URL) {
  return `${base}${locale}`;
}

export function pathLocale(pathname: string, base = import.meta.env.BASE_URL): Locale | null {
  const path = pathname.slice(base.length).replace(/\/(?:index\.html)?$/, '');
  return pathname.startsWith(base) && isLocale(path) ? path : null;
}

export function preferredLocale(): Locale {
  try {
    const stored = localStorage.getItem(localeStorageKey);
    if (isLocale(stored)) return stored;
  } catch {
    // URL-based navigation still works in browsers with storage disabled.
  }
  return defaultLocale;
}

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(localeStorageKey, locale);
  } catch {
    // URL-based navigation still works in browsers with storage disabled.
  }
}
