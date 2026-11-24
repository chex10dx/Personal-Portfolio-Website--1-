import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLocale } from '../../i18n/LocaleProvider';
import { directionOf, localePath, locales } from '../../i18n/routing';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';

const navItems = ['about', 'skills', 'projects', 'experience', 'contact'] as const;
const languageNames = {
  en: { short: 'EN', name: 'English' },
  ar: { short: 'عربي', name: 'العربية' },
};

export function Navbar({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, hash, messages, switchLanguage, loading } = useLocale();
  const copy = messages.nav;
  const themeLabel = isDark ? copy.light : copy.dark;
  const reduced = usePortfolioReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      aria-label={copy.label}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 max-md:has-[#mobile-navigation]:z-[70] ${
        isScrolled ? 'border-b border-glass-line/10 bg-background/90 backdrop-blur-xl dark:bg-background/78' : 'bg-transparent'
      }`}
    >
      <div className="flex h-20 items-center gap-2 px-6 md:gap-4 md:px-12">
        <a
          href="#home"
          dir="ltr"
          aria-label={copy.home}
          onClick={() => setIsMobileMenuOpen(false)}
          className="shrink-0 font-sans text-2xl font-semibold tracking-[0.24em] text-foreground transition-colors hover:text-brand-cyan md:text-3xl"
        >
          TY
        </a>

        <div className="ms-auto flex shrink-0 items-center gap-2 lg:gap-4">
          <div className="hidden items-center gap-3 rounded-full border border-glass-line/10 bg-glass px-4 py-3 shadow-[0_10px_40px_var(--glass-shadow)] backdrop-blur-xl md:flex lg:gap-8 lg:px-5 dark:bg-glass-line/[0.03]">
            {navItems.map((section) => (
              <a key={section} href={`#${section}`} className="text-sm whitespace-nowrap text-subtle-foreground transition-colors hover:text-brand-cyan">
                {copy[section]}
              </a>
            ))}
          </div>

          <div role="group" aria-label={copy.language} aria-busy={loading} className="flex h-11 shrink-0 items-center gap-0.5 rounded-full border border-glass-line/15 bg-glass p-1 backdrop-blur-xl">
            {locales.map((target) => (
              <a
                key={target}
                href={`${localePath(target)}${hash}`}
                lang={target}
                dir={directionOf(target)}
                aria-label={languageNames[target].name}
                aria-current={target === locale ? 'page' : undefined}
                onClick={(event) => switchLanguage(event, target)}
                className="grid h-8 w-9 place-items-center rounded-full text-xs font-semibold text-subtle-foreground transition-colors hover:bg-raised hover:text-brand-purple aria-[current=page]:bg-brand-purple/15 aria-[current=page]:text-brand-purple"
              >
                {languageNames[target].short}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-glass-line/15 bg-glass text-foreground backdrop-blur-xl transition-colors duration-300 hover:bg-raised hover:text-brand-cyan"
          >
            {isDark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-full border border-glass-line/10 bg-glass p-2 text-foreground hover:bg-raised hover:text-brand-cyan md:hidden"
            aria-label={copy.menu}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? 'mobile-navigation' : undefined}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="border-b border-glass-line/10 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="px-6 py-4">
              {navItems.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 text-start text-subtle-foreground transition-colors hover:text-brand-cyan"
                >
                  {copy[section]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
