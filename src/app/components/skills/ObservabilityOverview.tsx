import { Activity, ChartNoAxesCombined, FileText, GitBranch, Monitor, Server } from 'lucide-react';
import { skillText, type StackCopy } from './SkillDetails';

const signals = [
  { id: 'logs', Icon: FileText },
  { id: 'metrics', Icon: ChartNoAxesCombined },
  { id: 'traces', Icon: GitBranch },
] as const;
const percentiles = ['p50', 'p90', 'p95', 'p99'] as const;
const endpoint = 'grid min-w-0 justify-items-center content-center gap-2 rounded-xl border border-brand-purple/24 bg-brand-purple/8 p-3 text-center text-sm font-semibold text-foreground';
const connector = 'mx-auto inline-grid size-0 place-self-center border-s-6 border-y-4 border-s-brand-purple border-y-transparent max-sm:ltr:rotate-90 max-sm:rtl:-rotate-90';

export function ObservabilityOverview({ copy }: { copy: StackCopy }) {
  const text = copy.observability;

  return (
    <section aria-labelledby="stack-observability" className="grid min-w-0 gap-5 rounded-3xl border border-surface-line/55 bg-glass p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr]">
      <figure className="min-w-0">
        <figcaption>
          <h3 id="stack-observability" className="text-2xl font-semibold text-foreground">{text.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{text.illustrative}</p>
        </figcaption>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className={endpoint}><Server size={19} aria-hidden="true" className="text-brand-purple" />{text.application}</div>
          <span className={connector} aria-hidden="true" />
          <ul className="grid gap-1.5">
            {signals.map(({ id, Icon }) => (
              <li key={id} className="flex min-w-0 items-center gap-2 rounded-lg border border-surface-line/60 bg-card/90 px-2.5 py-1.5 text-sm text-subtle-foreground">
                <Icon size={14} aria-hidden="true" className="shrink-0 text-brand-purple" />{text[id]}
              </li>
            ))}
          </ul>
          <span className={connector} aria-hidden="true" />
          <div className={endpoint}><Monitor size={19} aria-hidden="true" className="text-brand-purple" />{text.diagnosis}</div>
        </div>
      </figure>
      <div className="min-w-0 rounded-2xl border border-surface-line/55 bg-card/75 p-4">
        <h4 className="flex items-center gap-2 font-semibold text-foreground"><Activity size={17} className="shrink-0 text-brand-purple" aria-hidden="true" />{text.percentiles}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text.percentileDescription}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2">
          {percentiles.map((id) => (
            <div key={id} className="min-w-0 rounded-lg bg-raised/75 px-2.5 py-2">
              <dt className="font-mono text-sm font-semibold text-brand-purple"><bdi>{id}</bdi></dt>
              <dd className="text-sm text-subtle-foreground">{skillText(copy, id).description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
