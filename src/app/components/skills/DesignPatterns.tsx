import { ChevronDown } from 'lucide-react';
import { designPatterns } from '../../data/techStack';
import type { StackCopy } from './SkillDetails';

const patternTypes = ['creational', 'structural', 'behavioral'] as const;

export function DesignPatterns({ copy }: { copy: StackCopy }) {
  const patterns = copy.patterns;

  return (
    <section aria-labelledby="stack-patterns" className="rounded-3xl border border-surface-line/55 bg-glass p-5 sm:p-7">
      <h3 id="stack-patterns" className="text-2xl font-semibold text-foreground">{patterns.title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{patterns.description}</p>
      <div className="mt-5 grid items-start gap-4 md:grid-cols-3">
        {patternTypes.map((type) => (
          <div key={type} className="min-w-0 rounded-2xl border border-surface-line/55 bg-card/75 p-3.5 sm:p-4">
            <h4 className="mb-2 border-b border-brand-purple/25 pb-2 font-semibold text-brand-purple">{patterns.types[type]}</h4>
            <div className="divide-y divide-surface-line/60">
              {designPatterns[type].map((id) => {
                const pattern = patterns.items[id];
                return (
                  <details key={id} className="group/pattern py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple [&::-webkit-details-marker]:hidden">
                      <span>
                        <span className="block font-semibold text-foreground">{pattern.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{pattern.description}</span>
                      </span>
                      <ChevronDown size={16} aria-hidden="true" className="mt-1 shrink-0 text-brand-purple motion-safe:transition-transform group-open/pattern:rotate-180" />
                    </summary>
                    <div className="mt-3 rounded-lg bg-brand-purple/8 p-3 text-sm leading-relaxed text-subtle-foreground">
                      <p className="mb-1 font-semibold text-brand-purple">{patterns.example}</p>
                      <p>{pattern.example}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
