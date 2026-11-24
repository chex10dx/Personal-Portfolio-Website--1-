import { useLocale } from '../../i18n/LocaleProvider';
import { caseStudies } from '../data/caseStudies';
import { PortfolioSection } from './PortfolioSection';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const { messages } = useLocale();
  const [featured, ...projects] = caseStudies;
  return (
    <PortfolioSection id="projects" title={messages.projects.title} description={messages.projects.description}>
      <ProjectCard project={featured} />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </PortfolioSection>
  );
}
