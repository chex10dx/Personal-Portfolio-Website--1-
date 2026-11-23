import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { developmentTopics, skillCategories } from '../data/techStack';
import { TechStackNetwork } from './skills/TechStackNetwork';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-gradient-to-b from-section to-section-alt overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={reducedMotion ? false : { opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-brand-purple mb-4 text-sm md:text-base tracking-wider uppercase"
            >
              Skills and Expertise
            </motion.span>
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            >
              Technical Stack
            </motion.h2>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Technologies and practices from enterprise .NET, web development, and day-to-day engineering work.
            </motion.p>
          </div>

          <TechStackNetwork />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.08, duration: 0.6 }}
                className="min-w-0 rounded-2xl border border-surface-line/50 bg-gradient-to-br from-card/80 to-raised/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-purple-500/50 md:p-6"
              >
                <h3 className={`mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-xl text-transparent`}>
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="rounded-full border border-surface-line/50 bg-raised/80 px-3 py-1.5 text-sm text-subtle-foreground dark:text-slate-200"
                    >
                      {skill.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-surface-line/50 bg-glass p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground">Currently Exploring</h3>
            <p className="mt-2 text-muted-foreground">Topics I’m developing through study and experimentation.</p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-subtle-foreground sm:grid-cols-2">
              {developmentTopics.map((topic) => <li key={topic} className="border-l border-brand-purple/40 pl-3">{topic}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
