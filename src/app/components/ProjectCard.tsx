import { useLocale } from '../../i18n/LocaleProvider';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ProjectCard({ project }: { project: CaseStudy }) {
  const reduced = usePortfolioReducedMotion();
  const { messages: { projects: catalog } } = useLocale();
  const copy = catalog.cases[project.id];
  const { featured } = project;
  const technologyLabels: Partial<Record<string, string>> = {
    Microservices: catalog.terms.microservices,
    'Domain-Driven Design': catalog.terms.ddd,
    'REST APIs': catalog.terms.rest,
  };
  const details = [
    { label: catalog.challenge, text: copy.challenge },
    { label: catalog.approach, text: copy.approach },
    { label: catalog.contributions, list: copy.contributions },
    { label: catalog.outcome, text: copy.outcome },
  ];

  return (
    <motion.article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.4 }}
      className={`min-w-0 scroll-mt-24 rounded-3xl border border-surface-line/50 bg-gradient-to-br from-card/90 to-raised/65 p-5 shadow-[0_14px_42px_var(--glass-shadow)] sm:p-7 ${featured ? 'lg:p-10' : ''}`}
    >
      <header>
        <p className="text-sm leading-relaxed font-medium text-brand-purple">{copy.type}</p>
        <h3 id={`${project.id}-title`} className={`mt-2 font-semibold text-foreground ${featured ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{copy.title}</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-subtle-foreground">{copy.context}</p>
      </header>

      <ul aria-label={catalog.technologies} className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <li key={technology} className="rounded-full border border-surface-line/50 bg-glass px-3 py-1 text-sm text-subtle-foreground"><bdi>{technologyLabels[technology] ?? technology}</bdi></li>
        ))}
      </ul>

      {featured && <div className="mt-7"><ArchitectureDiagram /></div>}

      <details open={featured ? true : undefined} className="group mt-6 border-t border-surface-line/50 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg py-2 font-semibold text-brand-purple [&::-webkit-details-marker]:hidden">
          {catalog.details}
          <ChevronDown size={18} aria-hidden="true" className="shrink-0 motion-safe:transition-transform group-open:rotate-180" />
        </summary>
        <dl className={`mt-4 grid gap-5 text-sm leading-relaxed text-muted-foreground ${featured ? 'sm:grid-cols-2' : ''}`}>
          {details.map(({ label, text, list }, index) => (
            <div key={index}>
              <dt className="font-semibold text-foreground">{label}</dt>
              <dd className="mt-1">
                {list ? <ul className="list-disc space-y-1 ps-5">{list.map((item, i) => <li key={i}>{item}</li>)}</ul> : text}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </motion.article>
  );
}
