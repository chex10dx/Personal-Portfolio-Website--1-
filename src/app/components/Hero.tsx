import { useLocale } from '../../i18n/LocaleProvider';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import { motion } from 'motion/react';
import { ChevronDown, Download } from 'lucide-react';
import { portfolioLinks } from '../data/career';

const secondaryAction = 'inline-flex items-center gap-2 rounded-full border border-glass-line/12 bg-glass px-5 py-3 text-sm font-medium text-foreground backdrop-blur-xl transition-colors hover:border-brand-cyan/40 hover:bg-raised';

export function Hero() {
  const reduced = usePortfolioReducedMotion();
  const { locale, messages } = useLocale();
  const copy = messages.hero;
  const [introStart, introEnd] = copy.intro.split('{name}');
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[image:var(--hero-background)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -start-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute end-0 top-16 h-[28rem] w-[28rem] rounded-full bg-blue-500/18 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(var(--hero-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--hero-grid-line)_1px,transparent_1px)] bg-[size:88px_88px] opacity-35 dark:opacity-[0.16]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-[22rem] md:px-12 md:pt-[24rem] lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="grid w-full items-center gap-14 lg:grid-cols-[28rem_minmax(0,1fr)]"
        >
          <div className="hidden lg:block" />

          <div className="text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-glass px-4 py-2 backdrop-blur-xl"
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-cyan sm:text-sm dark:text-cyan-100/80">
                {copy.role}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mb-6 text-4xl leading-[1.08] font-semibold sm:text-5xl xl:text-6xl"
            >
              <span className="block text-foreground">{copy.heading}</span>
              <span className="mt-2 block bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-blue dark:from-cyan-200 dark:via-violet-200 dark:to-blue-300 bg-clip-text text-transparent">
                {copy.gradient}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8 }}
              className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-subtle-foreground md:text-lg lg:mx-0"
            >
              {introStart}<span className="font-semibold text-foreground">{messages.common.name}</span>{introEnd}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <a
                href="#projects"
                className="inline-flex items-center rounded-full bg-[linear-gradient(135deg,#4f46e5,#2563eb,#0e7490)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,99,235,0.28)] transition-shadow hover:shadow-[0_16px_48px_rgba(79,70,229,0.4)]"
              >
                {copy.projects}
              </a>
              <a href="#skills" className={secondaryAction}>{copy.expertise}</a>
              <a href={`${import.meta.env.BASE_URL}${portfolioLinks.resume[locale]}`} download className={secondaryAction}>
                <Download size={16} aria-hidden="true" /> {messages.common.download}
              </a>
              <a href="#contact" className={secondaryAction}>{copy.contact}</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.64, duration: 0.8 }}
              className="mb-12 grid gap-3 text-start sm:grid-cols-3 lg:mb-14"
            >
              <div className="rounded-3xl border border-glass-line/8 bg-glass p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-foreground">{copy.highlights[0]}</p>
              </div>
              <div className="rounded-3xl border border-glass-line/8 bg-glass p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-foreground">{copy.highlights[1]}</p>
              </div>
              <div className="rounded-3xl border border-glass-line/8 bg-glass p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-foreground">{copy.highlights[2]}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="flex flex-col items-center gap-3 lg:items-start"
            >
              <span className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{copy.scroll}</span>
              <motion.div
                animate={reduced ? { y: 0 } : { y: [0, 8, 0] }}
                transition={reduced ? { duration: 0 } : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-6 w-6 text-brand-cyan dark:text-cyan-300" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
