import {
  Activity, AppWindow, Blocks, BrainCircuit, ChevronDown, Cloud, Database, FlaskConical,
  Gauge, Network, Server, ShieldCheck,
} from 'lucide-react';
import { categoryById } from '../../data/skillRelations';
import { skillsInGroup, type CategoryId, type SkillId } from '../../data/techStack';
import { SkillChip, type StackCopy } from './SkillDetails';

const categoryIcons = {
  backend: Server, architecture: Blocks, messaging: Network, data: Database, performance: Gauge,
  observability: Activity, quality: FlaskConical, devops: Cloud, security: ShieldCheck,
  ai: BrainCircuit, frontend: AppWindow,
};

function SkillList({ skills, copy }: { skills: readonly SkillId[]; copy: StackCopy }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => <li key={skill} className="max-w-full"><SkillChip skill={skill} copy={copy} /></li>)}
    </ul>
  );
}

export function SkillCategoryCard({ id, copy }: { id: CategoryId; copy: StackCopy }) {
  const { groups, highlights } = categoryById[id];
  const category = copy.categories[id];
  const Icon = categoryIcons[id];

  return (
    <article className="min-w-0 self-start rounded-2xl border border-surface-line/55 bg-gradient-to-br from-card/85 to-raised/55 p-5 backdrop-blur-sm hover:border-brand-purple/40 motion-safe:transition-colors md:p-6">
      <header className="mb-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-brand-purple/20 bg-brand-purple/10 text-brand-purple">
            <Icon size={17} aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold leading-snug text-foreground">{category.label}</h3>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">{category.description}</p>
      </header>
      <SkillList skills={highlights} copy={copy} />
      <details className="group/skills mt-4 border-t border-surface-line/55 pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg py-1 font-medium text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple [&::-webkit-details-marker]:hidden">
          <span className="group-open/skills:hidden">{copy.actions.more}</span>
          <span className="hidden group-open/skills:inline">{copy.actions.less}</span>
          <ChevronDown size={17} aria-hidden="true" className="shrink-0 motion-safe:transition-transform group-open/skills:rotate-180" />
        </summary>
        <div className="mt-4 space-y-5">
          {groups.map((group) => {
            const text: { label: string; description?: string } = copy.groups[group.id];
            const skills = skillsInGroup(group).filter((skill) => !(highlights as readonly SkillId[]).includes(skill));
            return (
              <div key={group.id}>
                <h4 className="mb-2 text-sm font-semibold text-foreground">{text.label}</h4>
                {text.description && <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{text.description}</p>}
                <SkillList skills={skills} copy={copy} />
              </div>
            );
          })}
        </div>
      </details>
    </article>
  );
}
