import { Minus, Plus, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useId, useRef, useState } from 'react';
import { connections, skillCategories, skillNodes } from '../../data/techStack';
import { useNetworkCanvas } from './useNetworkCanvas';

const nodeIndexes = new Map(skillNodes.map((node, index) => [node.id, index]));
const controlStyle = 'grid size-10 place-items-center rounded-xl border border-surface-line/50 bg-card/75 text-foreground transition-colors hover:bg-raised hover:text-brand-purple';

export function TechStackNetwork() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(-1);
  const controls = useNetworkCanvas(stage, canvas, setSelected);
  const reducedMotion = useReducedMotion();
  const selectId = useId();
  const selection = skillNodes[selected];
  const category = skillCategories.find(({ id }) => id === selection?.category);
  const related = selection?.type === 'category'
    ? category?.skills.map(({ label }) => label)
    : selection && [...connections[selected]]
      .filter((index) => skillNodes[index].type === 'technology')
      .map((index) => skillNodes[index].label);

  return (
    <motion.div
      role="region"
      aria-label="Technical stack network"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
      className="mb-10 overflow-hidden rounded-3xl border border-surface-line/50 bg-card/90 shadow-[0_18px_64px_var(--glass-shadow)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line/40 bg-glass p-3 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <label htmlFor={selectId} className="text-sm font-semibold text-foreground">Explore a skill</label>
          <select
            id={selectId}
            className="w-full min-w-0 max-w-54 rounded-xl border border-surface-line/60 bg-card px-3 py-2 text-sm text-foreground sm:w-auto"
            value={selected < 0 ? '' : selected}
            onChange={(event) => controls.current?.select(event.target.value === '' ? -1 : Number(event.target.value))}
          >
            <option value="">All skills</option>
            {skillCategories.map((group) => (
              <optgroup key={group.id} label={group.title}>
                <option value={nodeIndexes.get(group.id)}>{group.title} overview</option>
                {group.skills.map((skill) => (
                  <option key={skill.id} value={nodeIndexes.get(skill.id)}>{skill.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div role="group" aria-label="Network view controls" className="flex shrink-0 gap-2">
          <button type="button" aria-label="Zoom in" title="Zoom in" className={controlStyle} onClick={() => controls.current?.zoom(1.25)}>
            <Plus size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Zoom out" title="Zoom out" className={controlStyle} onClick={() => controls.current?.zoom(0.8)}>
            <Minus size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Reset view" title="Reset view" className={controlStyle} onClick={() => controls.current?.reset()}>
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={stage}
        className="relative isolate h-[468px] cursor-grab overflow-hidden select-none sm:h-[580px] lg:h-[720px]
          bg-[radial-gradient(ellipse_at_20%_14%,#e8e6ff,transparent_48%),radial-gradient(ellipse_at_83%_86%,#dceffb,transparent_50%),linear-gradient(150deg,#f9fbff,#f0f4fc)]
          dark:bg-[radial-gradient(ellipse_at_20%_14%,#191435,transparent_48%),radial-gradient(ellipse_at_83%_86%,#10253c,transparent_52%),linear-gradient(150deg,#080b1a,#080f20)]"
      >
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 block size-full touch-pan-y" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden [@media(any-pointer:coarse)]:block">
          {skillNodes.map((node, index) => (
            <span key={node.id} data-network-node={index} className="pointer-events-auto absolute top-0 left-0 size-6 origin-top-left touch-none rounded-full" />
          ))}
        </div>
      </div>

      <div aria-live="polite" className="min-h-24 border-t border-surface-line/40 bg-glass px-4 py-4 sm:px-5">
        {selection ? (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base font-semibold text-foreground">{selection.label}</h3>
              {selection.type === 'technology' && <span className="text-sm text-brand-purple">{category?.title}</span>}
            </div>
            {selection.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selection.description}</p>}
            {!!related?.length && <p className="mt-1 text-sm leading-relaxed text-subtle-foreground">{related.join(' · ')}</p>}
          </>
        ) : (
          <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
            Select a node to see its connections.
            <span className="hidden [@media(any-pointer:fine)]:inline"> Drag to move nodes or pan the view. Scroll over the graph to zoom.</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
