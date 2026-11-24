import { Close as PopoverClose } from '@radix-ui/react-popover';
import { Info, X } from 'lucide-react';
import type { Messages } from '../../../i18n/catalogs';
import { proficiencyOf, type Proficiency, type SkillId } from '../../data/techStack';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type StackCopy = Messages['stack'];

export function skillText(copy: StackCopy, id: SkillId): { label: string; short?: string; description?: string } {
  return copy.skills[id];
}

const proficiencyStyles: Record<Proficiency, string> = {
  professional: 'rounded-full bg-emerald-600 dark:bg-emerald-400',
  knowledge: 'rounded-[1px] bg-blue-600 dark:bg-blue-400',
  exploring: 'rotate-45 rounded-[1px] bg-purple-600 dark:bg-purple-400',
};

export function ProficiencyDot({ level }: { level: Proficiency }) {
  return <span aria-hidden="true" className={`size-2 shrink-0 ${proficiencyStyles[level]}`} />;
}

export function ProficiencyLabel({ level, copy }: { level: Proficiency; copy: StackCopy }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-subtle-foreground">
      <ProficiencyDot level={level} />
      {copy.proficiency[level].label}
    </span>
  );
}

export function SkillChip({ skill, copy }: { skill: SkillId; copy: StackCopy }) {
  const { label, description } = skillText(copy, skill);
  const level = proficiencyOf(skill);
  const shape = 'inline-flex max-w-full items-center gap-1.5 rounded-xl border border-surface-line/60 bg-raised/65 px-2.5 py-1.5 text-start text-sm leading-snug text-subtle-foreground';
  const badge = (
    <>
      <ProficiencyDot level={level} />
      <bdi className="min-w-0 wrap-anywhere">{label}</bdi>
      <span className="sr-only"> ({copy.proficiency[level].label})</span>
    </>
  );

  if (!description) return <span className={shape} title={copy.proficiency[level].label}>{badge}</span>;

  return (
    <Popover>
      <PopoverTrigger className={`${shape} cursor-pointer hover:border-brand-purple/50 hover:text-foreground motion-safe:transition-colors`}>
        {badge}
        <Info size={13} className="shrink-0 text-brand-purple" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        aria-label={label}
        sideOffset={8}
        collisionPadding={12}
        className="z-[70] w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border-surface-line p-4 text-start shadow-[0_12px_38px_var(--glass-shadow)] motion-reduce:animate-none"
      >
        <div className="flex items-start justify-between gap-3">
          <h4 className="min-w-0 font-semibold text-foreground"><bdi>{label}</bdi></h4>
          <PopoverClose aria-label={copy.actions.close} className="-me-1 -mt-1 grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-raised hover:text-foreground">
            <X size={16} aria-hidden="true" />
          </PopoverClose>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-3"><ProficiencyLabel level={level} copy={copy} /></div>
      </PopoverContent>
    </Popover>
  );
}
