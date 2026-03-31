import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['C#', 'JavaScript'],
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Frameworks',
      skills: ['.NET Core', 'ASP.NET', 'Next.js', 'Vue', 'Blazor'],
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Databases',
      skills: ['SQL Server', 'Redis', 'Entity Framework Core'],
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      title: 'APIs and Architecture',
      skills: ['REST APIs', 'gRPC', 'Microservices', 'Monolith'],
      gradient: 'from-orange-600 to-red-600',
    },
    {
      title: 'Cloud and Tools',
      skills: ['Azure', 'AWS', 'RabbitMQ', 'Hangfire', 'Git', 'Swagger', 'Postman'],
      gradient: 'from-fuchsia-600 to-violet-600',
    },
    {
      title: 'Testing',
      skills: ['Unit Testing', 'Integration Testing'],
      gradient: 'from-teal-600 to-sky-600',
    },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-purple-400 mb-4 text-sm md:text-base tracking-wider uppercase"
            >
              Skills and Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Technical Stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Tools and technologies used across enterprise .NET and full-stack delivery
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.08, duration: 0.6 }}
                className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className={`text-2xl md:text-3xl mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-800/80 text-slate-200 text-sm rounded-full border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}