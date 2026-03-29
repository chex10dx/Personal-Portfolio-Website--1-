import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Enterprise Dashboard Platform',
      description: 'A comprehensive analytics and management dashboard for enterprise clients, featuring real-time data visualization, custom reporting, and role-based access control.',
      image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzQ1MjkzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Recharts', 'Tailwind CSS'],
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'E-Commerce Marketplace',
      description: 'Full-featured e-commerce platform with product catalog, shopping cart, secure payment integration, order tracking, and admin panel for inventory management.',
      image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMHBsYXRmb3JtfGVufDF8fHx8MTc3NDUyOTM3MXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['Next.js', 'Redux', 'Express.js', 'MongoDB', 'Stripe API', 'AWS S3'],
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Social Networking Mobile App',
      description: 'Cross-platform mobile application with real-time messaging, media sharing, user profiles, and social features. Built with React Native for iOS and Android.',
      image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc0NDc4MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React Native', 'Firebase', 'Socket.io', 'Redux', 'Node.js', 'MongoDB'],
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Data Analytics Platform',
      description: 'Advanced data analytics and visualization platform with machine learning integration, predictive analytics, and customizable dashboards for business intelligence.',
      image: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzQ1MTQxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background effects */}
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
              Showcasing solutions that blend innovation, functionality, and exceptional design
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Project image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60"></div>
                </div>

                {/* Project info */}
                <div className="p-8">
                  <h3 className={`text-2xl md:text-3xl mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800/80 text-purple-300 text-sm rounded-full border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveLink}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-lg hover:border-purple-500 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
