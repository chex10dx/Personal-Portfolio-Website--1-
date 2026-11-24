import { useLocale } from '../../i18n/LocaleProvider';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import { useState } from 'react';
import { Activity, ArrowRight, Boxes, Braces, ClipboardCheck, FlaskConical, PackageCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioSection } from './PortfolioSection';

const pipelineIcons = [Braces, Boxes, FlaskConical, ClipboardCheck, PackageCheck, Activity];

export function EngineeringDelivery() {
  const [active, setActive] = useState(0);
  const { locale, messages: { delivery: copy } } = useLocale();
  const stage = copy.items[active];
  const number = new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en', { minimumIntegerDigits: 2 });

  return (
    <PortfolioSection id="delivery" title={copy.title} description={copy.description}>
      <div className="rounded-2xl border border-surface-line/50 bg-glass p-4 sm:p-6">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {copy.items.map(({ title }, index) => (
            <li key={index} className="min-w-0">
              <button
                type="button"
                aria-pressed={active === index}
                aria-controls="delivery-stage"
                onClick={() => setActive(index)}
                className="flex h-full w-full flex-col gap-2 rounded-xl border border-surface-line/50 bg-card/60 p-3 text-start text-sm leading-snug text-subtle-foreground transition-colors hover:border-brand-purple/60 aria-pressed:border-brand-purple/65 aria-pressed:bg-brand-purple/10 aria-pressed:text-foreground"
              >
                <span aria-hidden="true" className="font-mono text-xs font-semibold text-brand-purple">{number.format(index + 1)}</span>
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
  const reduced = usePortfolioReducedMotion();
  const { messages: { devops: copy } } = useLocale();

  return (
    <PortfolioSection id="devops" title={copy.title} description={copy.description} alternate>
      <figure className="rounded-2xl border border-surface-line/50 bg-glass p-5 md:p-7">
        <figcaption className="mb-4 text-sm font-semibold text-subtle-foreground">{copy.example}</figcaption>
        <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {copy.stages.map((label, index) => {
            const Icon = pipelineIcons[index];
            return (
              <motion.li
                key={index}
                initial={reduced ? false : { opacity: 0.5, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0 : 0.33, delay: reduced ? 0 : index * 0.085 }}
                className="flex min-w-0 items-center gap-2 rounded-xl border border-surface-line/50 bg-card/65 p-3 text-sm font-medium text-foreground"
              >
                <Icon size={17} aria-hidden="true" className="shrink-0 text-brand-cyan" />
                <span>{label}</span>
                {index < copy.stages.length - 1 && <ArrowRight size={13} aria-hidden="true" className="mirror-in-rtl ms-auto shrink-0 text-brand-purple/65" />}
              </motion.li>
            );
          })}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {copy.caption}
        </p>
      </figure>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-line/50 bg-glass p-5">
          <h3 className="text-lg font-semibold text-foreground">{copy.operations}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.operationsDescription}</p>
        </div>
        <div className="rounded-2xl border border-surface-line/50 bg-glass p-5">
          <h3 className="text-lg font-semibold text-foreground">{copy.exploring}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.exploringDescription}</p>
        </div>
      </div>
    </PortfolioSection>
  );
}
