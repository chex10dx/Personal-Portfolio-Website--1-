import { useId, useState } from 'react';
import { ArrowRight, Braces, Database, Layers3, Monitor, Workflow } from 'lucide-react';

const layers = [
  { title: 'Web interface', technology: 'Blazor WebAssembly', icon: Monitor, detail: 'The browser interface presents financial workflows and calls application APIs.' },
  { title: 'Application APIs', technology: 'ASP.NET Core · ABP', icon: Braces, detail: 'Application services expose use cases and apply validation and permissions at the application boundary.' },
  { title: 'Domain workflows', technology: 'C# · Domain-Driven Design', icon: Layers3, detail: 'Domain logic models financial rules. Service interactions coordinate workflows that cross business boundaries.' },
  { title: 'Data access', technology: 'EF Core · SQL Server · Redis', icon: Database, detail: 'EF Core and SQL Server handle relational data. Redis supports caching where appropriate.' },
];

const asyncLayer = { title: 'Asynchronous work', technology: 'RabbitMQ · Hangfire', icon: Workflow, detail: 'RabbitMQ supports asynchronous service communication. Hangfire runs scheduled and background jobs outside the request path.' };

export function ArchitectureDiagram() {
  const [selected, setSelected] = useState(0);
  const detailId = useId();
  const active = [...layers, asyncLayer][selected];
  const nodeStyle = 'flex h-full min-w-0 flex-col gap-1.5 rounded-xl border border-surface-line/50 bg-card/75 p-3 text-left transition-colors hover:border-brand-purple/55 aria-pressed:border-brand-purple/65 aria-pressed:bg-brand-purple/10';

  return (
    <figure className="rounded-2xl border border-surface-line/50 bg-gradient-to-br from-card to-raised/75 p-4 sm:p-6">
      <figcaption className="mb-4">
        <h4 className="text-lg font-semibold text-foreground">Conceptual architecture</h4>
        <p className="mt-1 text-sm text-muted-foreground">Select a layer to see its role in the platform.</p>
      </figcaption>
      <ol className="grid gap-2 lg:grid-cols-4">
        {layers.map(({ title, technology, icon: Icon }, index) => (
          <li key={title} className="flex min-w-0 items-center gap-1">
            <button type="button" aria-pressed={selected === index} aria-controls={detailId} onClick={() => setSelected(index)} className={`${nodeStyle} grow`}>
              <Icon size={18} aria-hidden="true" className="text-brand-purple" />
              <span className="break-words font-semibold text-foreground">{title}</span>
              <span className="break-words text-xs leading-relaxed text-muted-foreground">{technology}</span>
            </button>
            {index < layers.length - 1 && <ArrowRight size={14} aria-hidden="true" className="hidden shrink-0 text-brand-purple/70 lg:block" />}
          </li>
        ))}
      </ol>
      <div className="ml-4 border-l border-dashed border-brand-cyan/60 pl-3 pt-3">
        <button type="button" aria-pressed={selected === layers.length} aria-controls={detailId} onClick={() => setSelected(layers.length)} className={`${nodeStyle} w-full`}>
          <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
            <Workflow size={17} aria-hidden="true" className="text-brand-cyan" />
            {asyncLayer.title}
          </span>
          <span className="text-xs text-muted-foreground">{asyncLayer.technology}</span>
        </button>
      </div>
      <div id={detailId} aria-live="polite" className="mt-4 min-h-24 rounded-xl border border-surface-line/45 bg-glass p-4">
        <p className="font-semibold text-foreground">{active.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.detail}</p>
      </div>
    </figure>
  );
}
