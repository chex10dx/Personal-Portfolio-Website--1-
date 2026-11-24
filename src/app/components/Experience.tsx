import { Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale } from '../../i18n/LocaleProvider';
import { career, formatCareerMonth } from '../data/career';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import { PortfolioSection } from './PortfolioSection';

export function Experience() {
  const reduced = usePortfolioReducedMotion();
  const { locale, messages } = useLocale();
  const copy = messages.career;

  return (
    <PortfolioSection id="experience" title={copy.title} description={copy.description}>
      <ol className="space-y-4">
        {career.map(({ id, start, end }) => {
          const { role, company, summary, contributions } = copy.jobs[id];
          const period = `${formatCareerMonth(start, locale)} – ${end ? formatCareerMonth(end, locale) : copy.present}`;
          return (
            <motion.li
              key={id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="grid gap-4 rounded-2xl border border-surface-line/50 bg-gradient-to-br from-card/90 to-raised/50 p-5 sm:grid-cols-[auto_minmax(0,1fr)] md:p-7"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple">
                <Briefcase size={20} aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{role}</h3>
                    <p className="mt-1 text-brand-purple"><bdi>{company}</bdi></p>
                  </div>
                  <p className="rounded-full border border-surface-line/50 bg-glass px-3 py-1 text-sm text-subtle-foreground">{period}</p>
                </div>
                <p className="mt-3 text-subtle-foreground">{summary}</p>
                <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
                  {contributions.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </PortfolioSection>
  );
}
