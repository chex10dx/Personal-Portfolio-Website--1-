import type English from './messages/en.json';
import type { Locale } from './routing';

export type Messages = typeof English;

const loaders = {
  en: () => import('./messages/en.json').then(({ default: catalog }) => catalog),
  ar: () => import('./messages/ar.json').then(({ default: catalog }) => catalog),
} satisfies Record<Locale, () => Promise<Messages>>;

export function loadMessages(locale: Locale): Promise<Messages> {
  return loaders[locale]();
}
