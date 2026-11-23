import { Briefcase } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { career } from '../data/career';
import { PortfolioSection } from './PortfolioSection';

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <PortfolioSection id="experience" title="Professional Experience" description="Hands-on engineering across financial systems, enterprise ERP, and client-facing web applications.">
      <ol className="space-y-4">
        {career.map(({ role, company, period, summary, contributions }) => (
          <motion.li
            key={role}
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
                  <p className="mt-1 text-brand-purple">{company}</p>
                </div>
                <p className="rounded-full border border-surface-line/50 bg-glass px-3 py-1 text-sm text-subtle-foreground">{period}</p>
              </div>
              <p className="mt-3 text-subtle-foreground">{summary}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {contributions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </PortfolioSection>
  );
}
