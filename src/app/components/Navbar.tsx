import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 max-md:has-[#mobile-navigation]:z-[70] ${
        isScrolled
          ? 'border-b border-glass-line/10 bg-background/90 backdrop-blur-xl dark:bg-background/78'
          : 'bg-transparent'
      }`}
    >
      <div className="flex h-20 items-center gap-4 px-6 md:px-12">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          className="shrink-0 text-2xl font-semibold tracking-[0.24em] text-foreground transition-colors duration-300 hover:text-brand-cyan md:text-3xl"
        >
          TY
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-4">
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 rounded-full border border-glass-line/10 bg-glass px-5 py-3 shadow-[0_10px_40px_var(--glass-shadow)] backdrop-blur-xl md:flex lg:gap-8 dark:bg-glass-line/[0.03]">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-subtle-foreground transition-colors duration-300 hover:text-brand-cyan"
              >
                {item.label}
              </button>
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-full border border-glass-line/10 bg-glass p-2 text-foreground hover:bg-raised hover:text-brand-cyan md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? 'mobile-navigation' : undefined}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" className="w-6 h-6" /> : <Menu aria-hidden="true" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full py-2 text-left text-subtle-foreground transition-colors duration-300 hover:text-brand-cyan"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
