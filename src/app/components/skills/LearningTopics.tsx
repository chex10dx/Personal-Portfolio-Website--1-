import { Compass } from 'lucide-react';
import { learningTopics } from '../../data/techStack';
import { SkillChip, type StackCopy } from './SkillDetails';

export function LearningTopics({ copy }: { copy: StackCopy }) {
  return (
    <section aria-labelledby="stack-exploring" className="min-w-0 rounded-3xl border border-surface-line/55 bg-glass p-5 sm:p-7">
      <h3 id="stack-exploring" className="flex items-center gap-2 text-xl font-semibold text-foreground">
        <Compass size={20} className="shrink-0 text-brand-purple" aria-hidden="true" />{copy.exploring}
      </h3>
      <p className="mt-2 text-base text-muted-foreground">{copy.exploringDescription}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {learningTopics.map((skill) => <li key={skill} className="max-w-full"><SkillChip skill={skill} copy={copy} /></li>)}
      </ul>
    </section>
  );
}
