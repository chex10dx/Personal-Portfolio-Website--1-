import { useState } from 'react';
import { Activity, ArrowRight, Boxes, Braces, ClipboardCheck, FlaskConical, PackageCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PortfolioSection } from './PortfolioSection';

const deliveryStages = [
  { title: 'Requirements Analysis', description: 'Clarify the workflow with stakeholders, document acceptance criteria and edge cases, and agree on what a successful delivery looks like.' },
  { title: 'Solution Design', description: 'Compare options against business constraints. Document API contracts, data changes, and integration behavior for the people who will build and review the change.' },
  { title: 'Architecture & Technical Planning', description: 'Map dependencies, design for testability, identify delivery risks, and split changes into reviewable steps. Record significant trade-offs and technical debt.' },
  { title: 'Implementation', description: 'Keep changes focused, follow existing conventions, and build explicit validation and error handling around business rules.' },
  { title: 'Code Review', description: 'Review behavior, maintainability, and compatibility with the architecture. Discuss trade-offs and ask for regression coverage where a change could affect existing users.' },
  { title: 'Automated Testing', description: 'Test business rules in isolation and verify critical API and database interactions. Reproduce defects in regression tests when their cause is understood.' },
  { title: 'Build & Deployment', description: 'Use consistent builds, CI checks, and deployment steps. Document configuration, database migrations, and rollback considerations before release.' },
  { title: 'Monitoring & Continuous Improvement', description: 'Use logs and performance signals to investigate release behavior. Share root-cause findings and prioritize follow-up work with the teams affected.' },
];

const pipeline = [
  { label: 'Code', icon: Braces },
  { label: 'Build', icon: Boxes },
  { label: 'Test', icon: FlaskConical },
  { label: 'Quality Checks', icon: ClipboardCheck },
  { label: 'Deployment', icon: PackageCheck },
  { label: 'Monitoring', icon: Activity },
];

export function EngineeringDelivery() {
  const [active, setActive] = useState(0);
  const stage = deliveryStages[active];

  return (
    <PortfolioSection id="delivery" title="Engineering Quality & Delivery Practices" description="How I approach the software development lifecycle, from defining a change to learning from its release.">
      <div className="rounded-2xl border border-surface-line/50 bg-glass p-4 sm:p-6">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {deliveryStages.map(({ title }, index) => (
            <li key={title} className="min-w-0">
              <button
                type="button"
                aria-pressed={active === index}
                aria-controls="delivery-stage"
                onClick={() => setActive(index)}
                className="flex h-full w-full flex-col gap-2 rounded-xl border border-surface-line/50 bg-card/60 p-3 text-left text-sm leading-snug text-subtle-foreground transition-colors hover:border-brand-purple/60 aria-pressed:border-brand-purple/65 aria-pressed:bg-brand-purple/10 aria-pressed:text-foreground"
              >
                <span aria-hidden="true" className="font-mono text-xs font-semibold text-brand-purple">{String(index + 1).padStart(2, '0')}</span>
                <span className="break-words font-medium">{title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div id="delivery-stage" aria-live="polite" className="mt-5 border-t border-surface-line/45 pt-5">
          <h3 className="text-lg font-semibold text-foreground">{stage.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
        </div>
      </div>
    </PortfolioSection>
  );
}

export function DevOpsReliability() {
  const reduced = useReducedMotion();

  return (
    <PortfolioSection id="devops" title="DevOps, Reliability & Continuous Delivery" description="Connecting software development with repeatable builds, reliable deployment, and useful operational feedback." alternate>
      <figure className="rounded-2xl border border-surface-line/50 bg-glass p-5 md:p-7">
        <figcaption className="mb-4 text-sm font-semibold text-subtle-foreground">Example CI/CD pipeline</figcaption>
        <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {pipeline.map(({ label, icon: Icon }, index) => (
            <motion.li
              key={label}
              initial={reduced ? false : { opacity: 0.5, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0 : 0.33, delay: reduced ? 0 : index * 0.085 }}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-surface-line/50 bg-card/65 p-3 text-sm font-medium text-foreground"
            >
              <Icon size={17} aria-hidden="true" className="shrink-0 text-brand-cyan" />
              <span>{label}</span>
              {index < pipeline.length - 1 && <ArrowRight size={13} aria-hidden="true" className="ml-auto shrink-0 text-brand-purple/65" />}
            </motion.li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Version control starts a repeatable build. Automated tests and quality gates check the release candidate, and post-release logs and monitoring help teams investigate failures and performance changes.
        </p>
      </figure>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-line/50 bg-glass p-5">
          <h3 className="text-lg font-semibold text-foreground">Operational considerations</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Check environment configuration and migrations, use diagnostics to investigate database and application performance, and document how to verify or roll back a release.</p>
        </div>
        <div className="rounded-2xl border border-surface-line/50 bg-glass p-5">
          <h3 className="text-lg font-semibold text-foreground">Areas I’m developing</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Docker and repeatable environments, cloud infrastructure and cost trade-offs, zero-downtime releases, DevSecOps, deployment automation, and advanced observability.</p>
        </div>
      </div>
    </PortfolioSection>
  );
}
