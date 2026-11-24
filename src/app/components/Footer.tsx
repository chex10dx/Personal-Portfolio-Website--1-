import { useLocale } from '../../i18n/LocaleProvider';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  const { locale, messages } = useLocale();
  const year = new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en', { useGrouping: false }).format(new Date().getUTCFullYear());

  return (
    <footer className="relative py-12 bg-section border-t border-surface-line/50 dark:border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent mb-2">
              {messages.common.name}
            </h3>
            <p className="text-muted-foreground">{messages.common.role}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span suppressHydrationWarning>© {year}</span>
            <Heart aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-purple fill-brand-purple" />
            <span>{messages.footer.credit.replace('{name}', messages.common.name)}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
