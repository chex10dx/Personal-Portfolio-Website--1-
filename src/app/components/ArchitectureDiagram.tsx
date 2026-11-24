import { useLocale } from '../../i18n/LocaleProvider';
import { useId, useState } from 'react';
import { ArrowRight, Braces, Database, Layers3, Monitor, Workflow } from 'lucide-react';

const layerIcons = [Monitor, Braces, Layers3, Database];

export function ArchitectureDiagram() {
  const [selected, setSelected] = useState(0);
  const { messages: { diagram: copy } } = useLocale();
  const layers = copy.layers.slice(0, layerIcons.length);
  const asyncLayer = copy.layers[layerIcons.length];
  const detailId = useId();
  const active = copy.layers[selected];
  const nodeStyle = 'flex h-full min-w-0 flex-col gap-1.5 rounded-xl border border-surface-line/50 bg-card/75 p-3 text-start transition-colors hover:border-brand-purple/55 aria-pressed:border-brand-purple/65 aria-pressed:bg-brand-purple/10';

  return (
    <figure className="rounded-2xl border border-surface-line/50 bg-gradient-to-br from-card to-raised/75 p-4 sm:p-6">
      <figcaption className="mb-4">
        <h4 className="text-lg font-semibold text-foreground">{copy.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{copy.instruction}</p>
      </figcaption>
      <ol className="grid gap-2 lg:grid-cols-4">
        {layers.map(({ title, technology }, index) => {
          const Icon = layerIcons[index];
          return (
            <li key={index} className="flex min-w-0 items-center gap-1">
              <button type="button" aria-pressed={selected === index} aria-controls={detailId} onClick={() => setSelected(index)} className={`${nodeStyle} grow`}>
                <Icon size={18} aria-hidden="true" className="text-brand-purple" />
                <span className="break-words font-semibold text-foreground">{title}</span>
                <span className="break-words text-xs leading-relaxed text-muted-foreground"><bdi>{technology}</bdi></span>
              </button>
              {index < layers.length - 1 && <ArrowRight size={14} aria-hidden="true" className="mirror-in-rtl hidden shrink-0 text-brand-purple/70 lg:block" />}
            </li>
          );
        })}
      </ol>
      <div className="ms-4 border-s border-dashed border-brand-cyan/60 ps-3 pt-3">
        <button type="button" aria-pressed={selected === layers.length} aria-controls={detailId} onClick={() => setSelected(layers.length)} className={`${nodeStyle} w-full`}>
          <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
            <Workflow size={17} aria-hidden="true" className="text-brand-cyan" />
            {asyncLayer.title}
          </span>
          <span className="text-xs text-muted-foreground"><bdi>{asyncLayer.technology}</bdi></span>
        </button>
      </div>
      <div id={detailId} aria-live="polite" className="mt-4 min-h-24 rounded-xl border border-surface-line/45 bg-glass p-4">
        <p className="font-semibold text-foreground">{active.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.detail}</p>
      </div>
    </figure>
  );
}
