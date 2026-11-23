import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ProjectCard({ project, featured = false }: { project: CaseStudy; featured?: boolean }) {
  const reduced = useReducedMotion();
  const details = [
    { label: 'Technical challenge', text: project.challenge },
    { label: 'Architecture and implementation', text: project.approach },
    { label: 'My contributions', list: project.contributions },
    { label: 'Outcome', text: project.outcome },
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
        <p className="text-sm leading-relaxed font-medium text-brand-purple">{project.type}</p>
        <h3 id={`${project.id}-title`} className={`mt-2 font-semibold text-foreground ${featured ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{project.title}</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-subtle-foreground">{project.context}</p>
      </header>

      <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <li key={technology} className="rounded-full border border-surface-line/50 bg-glass px-3 py-1 text-sm text-subtle-foreground">{technology}</li>
        ))}
      </ul>

      {featured && <div className="mt-7"><ArchitectureDiagram /></div>}

      <details open={featured ? true : undefined} className="group mt-6 border-t border-surface-line/50 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg py-2 font-semibold text-brand-purple [&::-webkit-details-marker]:hidden">
          Engineering details
          <ChevronDown size={18} aria-hidden="true" className="shrink-0 motion-safe:transition-transform group-open:rotate-180" />
        </summary>
        <dl className={`mt-4 grid gap-5 text-sm leading-relaxed text-muted-foreground ${featured ? 'sm:grid-cols-2' : ''}`}>
          {details.map(({ label, text, list }) => (
            <div key={label}>
              <dt className="font-semibold text-foreground">{label}</dt>
              <dd className="mt-1">
                {list ? <ul className="list-disc space-y-1 pl-5">{list.map((item) => <li key={item}>{item}</li>)}</ul> : text}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </motion.article>
  );
}
