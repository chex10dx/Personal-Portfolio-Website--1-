import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import { initialBrowserLocale, LocaleProvider } from './i18n/LocaleProvider';
import { loadMessages } from './i18n/catalogs';
import { directionOf, localePath, pathLocale } from './i18n/routing';
import './styles/index.css';

async function start() {
  const root = document.getElementById('root')!;
  const locale = initialBrowserLocale();
  const messages = await loadMessages(locale);

  if (!pathLocale(location.pathname) && locale === 'ar' && location.pathname === import.meta.env.BASE_URL) {
    history.replaceState(history.state, '', `${localePath(locale)}${location.search}${location.hash}`);
  }
  document.documentElement.lang = locale;
  document.documentElement.dir = directionOf(locale);

  const app = <LocaleProvider initial={{ locale, messages }}><App /></LocaleProvider>;
  if (root.dataset.locale === locale) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}

void start().catch((error) => {
  // Leave the prerendered page available if the initial locale fails to load.
  console.error('Unable to start the portfolio:', error);
});
