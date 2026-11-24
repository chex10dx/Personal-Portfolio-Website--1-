import type { Messages } from './catalogs';
import { defaultLocale, localePath, locales, type Locale } from './routing';

export function pageMetadata(locale: Locale, messages: Messages, origin: string) {
  const href = (language: Locale) => `${origin}${localePath(language)}`;
  const canonical = href(locale);
  const ogLocales = { en: 'en_US', ar: 'ar_SY' };

  return [
    { name: 'description', content: messages.seo.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: messages.seo.title },
    { property: 'og:description', content: messages.seo.social },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: ogLocales[locale] },
    { property: 'og:locale:alternate', content: ogLocales[locale === 'ar' ? 'en' : 'ar'] },
    { rel: 'manifest', href: `${import.meta.env.BASE_URL}${locale === 'ar' ? 'site-ar.webmanifest' : 'site.webmanifest'}` },
    { rel: 'canonical', href: canonical },
    ...locales.map((language) => ({ rel: 'alternate', hreflang: language, href: href(language) })),
    { rel: 'alternate', hreflang: 'x-default', href: href(defaultLocale) },
  ];
}

export function configuredOrigin() {
  const configured = import.meta.env.VITE_SITE_URL;
  if (!configured) return '';
  const url = new URL(configured);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('VITE_SITE_URL must be an HTTP(S) URL.');
  }
  return url.origin;
}
