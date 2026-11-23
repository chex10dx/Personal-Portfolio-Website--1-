import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { skillCategories } from '../data/techStack';
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
              Tools and technologies used across enterprise .NET and full-stack delivery
            </motion.p>
          </div>

          <TechStackNetwork />

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.08, duration: 0.6 }}
                className="p-8 bg-gradient-to-br from-card/80 to-raised/50 backdrop-blur-sm border border-surface-line/50 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className={`text-2xl md:text-3xl mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="px-4 py-2 bg-raised/80 text-subtle-foreground dark:text-slate-200 text-sm rounded-full border border-surface-line/50"
                    >
                      {skill.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
