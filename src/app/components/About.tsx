import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Zap, Users } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: 'System Architecture',
      description: 'Designing robust and scalable systems with .NET, APIs, and service-oriented approaches',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Improving backend and database performance with measurable impact',
    },
    {
      icon: Users,
      title: 'Leadership',
      description: 'Leading engineering teams and improving quality, delivery speed, and reliability',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
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
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Software Developer and System Architect
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                I am a Full Stack Web Developer focused on building and optimizing complex systems
                using <span className="text-purple-400">C# and JavaScript</span>.
              </p>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                My background includes designing, coding, and testing solutions across microservices,
                REST and gRPC APIs, and full-stack web platforms using{' '}
                <span className="text-blue-400">.NET Core, ASP.NET Core, Blazor, and Next.js</span>.
              </p>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                I prioritize clean architecture, maintainable code, and performance optimization to
                deliver reliable products that scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <highlight.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2">{highlight.title}</h3>
                      <p className="text-slate-400">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
