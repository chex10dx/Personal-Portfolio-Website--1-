import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveLink: string;
  githubLink: string;
  gradient: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  isInView: boolean;
};

export function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50"
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
      </div>

      <div className="p-8">
        <h3
          className={`mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-2xl text-transparent md:text-3xl`}
        >
          {project.title}
        </h3>
        <p className="mb-6 leading-relaxed text-slate-300">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-700/50 bg-slate-800/80 px-3 py-1 text-sm text-purple-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.liveLink}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white transition-transform duration-300 hover:scale-105"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={project.githubLink}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 text-white transition-all duration-300 hover:border-purple-500"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
