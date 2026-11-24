import { motion } from 'motion/react';
import { useLocale } from '../../i18n/LocaleProvider';
import { caseStudySkills } from '../data/skillRelations';
import { skillCategories, type Proficiency } from '../data/techStack';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import { DesignPatterns } from './skills/DesignPatterns';
import { LearningTopics } from './skills/LearningTopics';
import { ObservabilityOverview } from './skills/ObservabilityOverview';
import { SkillCategoryCard } from './skills/SkillCategoryCard';
import { ProficiencyLabel, skillText } from './skills/SkillDetails';
import { TechStackNetwork } from './skills/TechStackNetwork';

const proficiencyLevels: readonly Proficiency[] = ['professional', 'knowledge', 'exploring'];

export function Skills() {
  const reducedMotion = usePortfolioReducedMotion();
  const { messages: { stack: copy, projects } } = useLocale();

  return (
    <section id="skills" aria-labelledby="stack-title" className="relative overflow-hidden bg-gradient-to-b from-section to-section-alt py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute end-1/4 bottom-1/3 size-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
          className="mb-10 text-center md:mb-12"
        >
          <p className="mb-4 text-sm tracking-wider text-brand-purple uppercase md:text-base">{copy.eyebrow}</p>
          <h2 id="stack-title" className="mb-5 text-4xl text-foreground md:text-5xl lg:text-6xl">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">{copy.description}</p>
        </motion.header>

        <TechStackNetwork />



        {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.filter(({ id }) => id !== 'frontend').map(({ id }) => <SkillCategoryCard key={id} id={id} copy={copy} />)}
          <SkillCategoryCard id="frontend" copy={copy} />
        </div> */}

        <div className="mt-8 grid gap-5">
          <DesignPatterns copy={copy} />
          <ObservabilityOverview copy={copy} />
          <div className="grid items-start gap-5 lg:grid-cols-2">
            {/* <LearningTopics copy={copy} /> */}
            <section aria-labelledby="stack-cases" className="min-w-0 rounded-3xl border border-surface-line/55 bg-glass p-5 sm:p-7">
              <h3 id="stack-cases" className="text-xl font-semibold text-foreground">{copy.cases.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{copy.cases.description}</p>
              <ul className="mt-4 space-y-4">
                {caseStudySkills.map(({ id, skills }) => (
                  <li key={id} className="border-s-2 border-brand-purple/35 ps-3">
                    <a href={`#${id}`} className="font-semibold text-brand-purple underline decoration-brand-purple/40 underline-offset-4 hover:decoration-current">{projects.cases[id].title}</a>
                    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-subtle-foreground">
                      {skills.map((skill) => <li key={skill}><bdi>{skillText(copy, skill).label}</bdi></li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
