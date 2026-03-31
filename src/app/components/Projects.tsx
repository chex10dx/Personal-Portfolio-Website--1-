import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ProjectCard, type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: 'Clinic ERP System',
    description:
      'Custom ERP solution built as a freelance project to support clinic workflows and business operations.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tech: ['Next.js', 'JavaScript', 'REST APIs'],
    liveLink: '#',
    githubLink: '#',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: 'E-commerce Platform with Payments',
    description:
      'Built a secure e-commerce platform with integrated payments using ASP.NET Core best practices.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tech: ['ASP.NET Core', 'C#', 'SQL Server', 'JWT'],
    liveLink: '#',
    githubLink: '#',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Microservices and API Platform',
    description:
      'Designed and delivered .NET backend services with asynchronous processing and automated testing workflows.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tech: ['.NET', 'Microservices', 'RabbitMQ', 'Hangfire', 'Blazor','ABP Framework'],
    liveLink: '#',
    githubLink: '#',
    gradient: 'from-green-600 to-emerald-600',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
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
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Real project work across full-stack delivery, secure commerce, and .NET microservices
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
