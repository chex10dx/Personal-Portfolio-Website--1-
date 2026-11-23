import { additionalCaseStudies, remittance } from '../data/caseStudies';
import { PortfolioSection } from './PortfolioSection';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <PortfolioSection id="projects" title="Featured Engineering Projects" description="Case studies in financial systems, enterprise ERP, and full-stack delivery.">
      <ProjectCard project={remittance} featured />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {additionalCaseStudies.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </PortfolioSection>
  );
}
