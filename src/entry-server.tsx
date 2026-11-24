import { renderToString } from 'react-dom/server';
import App from './app/App';
import { LocaleProvider } from './i18n/LocaleProvider';
import { loadMessages } from './i18n/catalogs';
import { configuredOrigin, pageMetadata } from './i18n/metadata';
import { directionOf, type Locale } from './i18n/routing';

export async function renderPortfolio(locale: Locale) {
  const messages = await loadMessages(locale);
  return {
    title: messages.seo.title,
    direction: directionOf(locale),
    metadata: pageMetadata(locale, messages, configuredOrigin()),
    markup: renderToString(
      <LocaleProvider initial={{ locale, messages }}>
        <App />
      </LocaleProvider>,
    ),
  };
}
