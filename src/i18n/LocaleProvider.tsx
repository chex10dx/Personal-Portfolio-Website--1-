import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { loadMessages, type Messages } from './catalogs';
import { configuredOrigin, pageMetadata } from './metadata';
import { defaultLocale, directionOf, localePath, pathLocale, preferredLocale, rememberLocale, type Locale } from './routing';

type ReadingPosition = { hash: string; offset: number };
type LocalizedPage = { locale: Locale; messages: Messages };
type LocaleContextValue = LocalizedPage & {
  direction: 'ltr' | 'rtl';
  hash: string;
  loading: boolean;
  switchLanguage: (event: MouseEvent<HTMLAnchorElement>, to: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function findAnchor(hash: string) {
  if (!hash) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function readingPosition(): ReadingPosition {
  const line = 82;
  const explicit = findAnchor(location.hash);
  const explicitBounds = explicit?.getBoundingClientRect();
  if (explicitBounds && explicitBounds.bottom > line && explicitBounds.top < window.innerHeight) {
    return { hash: location.hash, offset: Math.max(0, line - explicitBounds.top) };
  }

  const visible = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
  const anchor = visible.find((section) => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= line + 2 && bounds.bottom > line;
  });
  if (!anchor || anchor.id === 'home') return { hash: '', offset: window.scrollY };
  return { hash: `#${anchor.id}`, offset: Math.max(0, line - anchor.getBoundingClientRect().top) };
}

function restorePosition({ hash, offset }: ReadingPosition) {
  const target = findAnchor(hash);
  if (hash && !target) return;
  const top = target ? window.scrollY + target.getBoundingClientRect().top - 80 + offset : offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
}

function synchronizeMetadata({ locale, messages }: LocalizedPage) {
  document.documentElement.lang = locale;
  document.documentElement.dir = directionOf(locale);
  document.title = messages.seo.title;
  const previous = document.head.querySelectorAll('[data-portfolio-seo]');
  previous.forEach((node) => node.remove());

  const tags = document.createDocumentFragment();
  for (const attributes of pageMetadata(locale, messages, configuredOrigin() || location.origin)) {
    const tag = document.createElement('rel' in attributes ? 'link' : 'meta');
    tag.dataset.portfolioSeo = '';
    for (const [key, value] of Object.entries(attributes)) tag.setAttribute(key, value);
    tags.append(tag);
  }
  document.head.append(tags);
}

export function initialBrowserLocale() {
  return pathLocale(location.pathname) ?? (location.pathname === import.meta.env.BASE_URL ? preferredLocale() : defaultLocale);
}

export function LocaleProvider({ initial, children }: { initial: LocalizedPage; children: ReactNode }) {
  const [page, setPage] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [hash, setHash] = useState('');
  const current = useRef(initial);
  const request = useRef(0);
  const nextPosition = useRef<ReadingPosition | null>(null);
  const initialAnchor = useRef(true);

  useBrowserLayoutEffect(() => {
    synchronizeMetadata(page);
    setHash(location.hash);
    if (nextPosition.current) {
      restorePosition(nextPosition.current);
      nextPosition.current = null;
    } else if (initialAnchor.current && location.hash) {
      restorePosition({ hash: location.hash, offset: 0 });
    }
    initialAnchor.current = false;
  }, [page]);

  async function navigate(locale: Locale, position: ReadingPosition | null, push: boolean) {
    const ticket = ++request.current;
    if (current.current.locale === locale) {
      setStatus('idle');
      return;
    }
    setStatus('loading');
    try {
      const messages = await loadMessages(locale);
      if (request.current !== ticket) return;
      if (push && position) {
        history.pushState({ portfolioPosition: position }, '', `${localePath(locale)}${location.search}${position.hash}`);
      }
      nextPosition.current = position;
      current.current = { locale, messages };
      rememberLocale(locale);
      setPage(current.current);
      setStatus('idle');
    } catch {
      if (request.current !== ticket) return;
      // Each locale is also available as a static page if its client chunk fails.
      if (push && position) {
        setStatus('error');
        location.assign(`${localePath(locale)}${location.search}${position.hash}`);
      } else {
        location.reload();
      }
    }
  }

  useEffect(() => {
    if (pathLocale(location.pathname)) rememberLocale(current.current.locale);
    const onPopState = (event: PopStateEvent) => {
      const locale = pathLocale(location.pathname) ?? defaultLocale;
      const saved = event.state?.portfolioPosition as ReadingPosition | undefined;
      const position = saved?.hash === location.hash ? saved : { hash: location.hash, offset: 0 };
      void navigate(locale, position, false);
    };
    window.addEventListener('popstate', onPopState);
    const onHashChange = () => setHash(location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  function switchLanguage(event: MouseEvent<HTMLAnchorElement>, to: Locale) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const position = readingPosition();
    if (to !== current.current.locale) {
      history.replaceState({ ...history.state, portfolioPosition: position }, '', `${location.pathname}${location.search}${position.hash}`);
    }
    void navigate(to, position, true);
  }

  return (
    <LocaleContext.Provider value={{ ...page, hash, direction: directionOf(page.locale), loading: status === 'loading', switchLanguage }}>
      {children}
      <span role="status" className="sr-only">
        {status === 'loading' && page.messages.common.loading}
        {status === 'error' && page.messages.common.loadError}
      </span>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('Portfolio content requires LocaleProvider.');
  return context;
}
