import { ChevronLeft, ChevronRight, Hand, Minus, Plus, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleProvider';
import { categoriesBySkill, relatedSkills } from '../../data/skillRelations';
import { proficiencyOf, skillCategories, type CategoryId, type SkillId } from '../../data/techStack';
import { usePortfolioReducedMotion } from '../../usePortfolioMotion';
import {
  graphFor, networkSkills, selectionForSkill, skillsPerPage,
  type Selection, type SkillNode,
} from './networkData';
import { ProficiencyLabel, skillText } from './SkillDetails';
import { useNetworkCanvas } from './useNetworkCanvas';

const controlStyle = 'grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-surface-line/60 bg-card/75 text-foreground hover:bg-raised hover:text-brand-purple disabled:opacity-40 disabled:cursor-default motion-safe:transition-colors';
const relationStyle = 'min-w-0 cursor-pointer rounded-lg border border-surface-line/50 bg-card/70 px-2.5 py-1 text-sm leading-snug text-subtle-foreground hover:border-brand-purple/45 hover:text-brand-purple';
const touchTargets = graphFor().nodes.map(({ id }) => id);

export function TechStackNetwork() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [touchPan, setTouchPan] = useState(false);
  const { locale, messages: { stack: copy } } = useLocale();
  const graph = copy.graph;
  const category = selection?.category;
  const skill = selection?.skill;
  const page = selection?.page ?? 0;
  const network = useMemo(() => graphFor(category, page), [category, page]);
  const onCanvasSelect = useCallback((node: SkillNode | null) => {
    setSelection((current) => {
      if (!node) return null;
      if (node.type === 'technology') return selectionForSkill(node.category, node.id);
      return { category: node.id, page: current?.category === node.id ? current.page : 0 };
    });
  }, []);
  const controls = useNetworkCanvas(stage, canvas, onCanvasSelect, locale, copy, network, skill);
  const reducedMotion = usePortfolioReducedMotion();
  const selectId = useId();
  const pages = category ? Math.ceil(networkSkills(category).length / skillsPerPage) : 0;
  const selectedSkill = skill && skillText(copy, skill);
  const alsoIn = skill ? (categoriesBySkill.get(skill) ?? []).filter((id) => id !== category) : [];
  const related = skill ? relatedSkills(skill).slice(0, 6) : [];

  function chooseSkill(id: SkillId, preferred?: CategoryId) {
    const groups = categoriesBySkill.get(id);
    const target = preferred && groups?.includes(preferred) ? preferred : groups?.[0];
    if (target) setSelection(selectionForSkill(target, id));
  }

  function changePage(offset: number) {
    if (category) setSelection({ category, page: page + offset });
  }

  return (
    <motion.div
      role="region"
      data-portfolio-interactive
      aria-label={graph.title}
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
      className="mb-8 overflow-hidden rounded-3xl border border-surface-line/55 bg-card/90 shadow-[0_18px_64px_var(--glass-shadow)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line/50 bg-glass p-3 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <label htmlFor={selectId} className="text-sm font-semibold text-foreground">{graph.explore}</label>
          <select
            id={selectId}
            className="w-full min-w-0 max-w-72 rounded-xl border border-surface-line/60 bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple sm:w-72"
            value={category ? `${category}/${skill ?? ''}` : ''}
            onChange={(event) => {
              if (!event.target.value) {
                setSelection(null);
                return;
              }
              const [group, id] = event.target.value.split('/') as [CategoryId, SkillId | ''];
              setSelection(id ? selectionForSkill(group, id) : { category: group, page: 0 });
            }}
          >
            <option value="">{graph.all}</option>
            {skillCategories.map(({ id }) => (
              <optgroup key={id} label={copy.categories[id].label}>
                <option value={`${id}/`}>{graph.overview.replace('{category}', copy.categories[id].label)}</option>
                {networkSkills(id).map((skill) => (
                  <option key={skill} dir="auto" value={`${id}/${skill}`}>{skillText(copy, skill).label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div role="group" aria-label={graph.controls} className="flex flex-wrap gap-2">
          <button type="button" aria-label={graph.zoomIn} title={graph.zoomIn} className={controlStyle} onClick={() => controls.current?.zoom(1.25)}>
            <Plus size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label={graph.zoomOut} title={graph.zoomOut} className={controlStyle} onClick={() => controls.current?.zoom(0.8)}>
            <Minus size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label={graph.reset} title={graph.reset} className={controlStyle} onClick={() => controls.current?.reset()}>
            <RotateCcw size={16} aria-hidden="true" />
          </button>
          <button type="button" aria-label={graph.touchPan} title={graph.touchPan} aria-pressed={touchPan} className={`${controlStyle} hidden aria-pressed:border-brand-purple aria-pressed:text-brand-purple [@media(any-pointer:coarse)]:grid`} onClick={() => setTouchPan((enabled) => !enabled)}>
            <Hand size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={stage}
        data-touch-pan={touchPan}
        dir="ltr"
        className={`relative isolate cursor-grab overflow-hidden select-none
          ${category ? 'h-[400px] md:h-[300px]' : 'h-[650px] md:h-[475px]'}
          bg-[radial-gradient(ellipse_at_20%_14%,#e8e6ff,transparent_48%),radial-gradient(ellipse_at_83%_86%,#dceffb,transparent_50%),linear-gradient(150deg,#f9fbff,#f0f4fc)]
          dark:bg-[radial-gradient(ellipse_at_20%_14%,#191435,transparent_48%),radial-gradient(ellipse_at_83%_86%,#10253c,transparent_52%),linear-gradient(150deg,#080b1a,#080f20)]`}
      >
        <canvas ref={canvas} aria-hidden="true" className={`absolute inset-0 block size-full ${touchPan ? 'touch-none' : 'touch-pan-y'}`} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden [@media(any-pointer:coarse)]:block">
          {touchTargets.map((id, index) => (
            <span key={id} data-network-node={index} hidden className="pointer-events-auto absolute top-0 left-0 size-6 origin-top-left touch-none rounded-full" />
          ))}
        </div>
      </div>

      <div className="min-h-24 border-t border-surface-line/50 bg-glass px-4 py-4 sm:px-5">
        {category ? (
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
            <div className="min-w-0">
              <div aria-live="polite">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold text-foreground"><bdi>{selectedSkill ? selectedSkill.label : copy.categories[category].label}</bdi></h3>
                  {skill && <ProficiencyLabel level={proficiencyOf(skill)} copy={copy} />}
                </div>
                {(selectedSkill?.description || !skill) && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selectedSkill?.description ?? copy.categories[category].description}</p>
                )}
                {skill && <p className="mt-1 text-sm text-muted-foreground">{copy.categories[category].label}</p>}
              </div>
              {alsoIn.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">{copy.actions.alsoIn}</span>
                  {alsoIn.map((id) => (
                    <button type="button" key={id} className={relationStyle} onClick={() => chooseSkill(skill!, id)}>{copy.categories[id].short}</button>
                  ))}
                </div>
              )}
              {related.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">{copy.actions.related}</span>
                  {related.map((id) => (
                    <button type="button" key={id} className={relationStyle} onClick={() => chooseSkill(id, category)}><bdi>{skillText(copy, id).label}</bdi></button>
                  ))}
                </div>
              )}
            </div>
            {pages > 1 && (
              <div className="flex items-center gap-2">
                <button type="button" disabled={page === 0} aria-label={graph.previous} className={controlStyle} onClick={() => changePage(-1)}>
                  <ChevronLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
                </button>
                <span aria-live="polite" className="text-sm text-muted-foreground">{graph.page.replace('{page}', Intl.NumberFormat(locale).format(page + 1)).replace('{total}', Intl.NumberFormat(locale).format(pages))}</span>
                <button type="button" disabled={page + 1 === pages} aria-label={graph.next} className={controlStyle} onClick={() => changePage(1)}>
                  <ChevronRight size={16} className="rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {graph.hint}
            <span className="hidden [@media(any-pointer:fine)]:inline"> {graph.mouseHint}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
