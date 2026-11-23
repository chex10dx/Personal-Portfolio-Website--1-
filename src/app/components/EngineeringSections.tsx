import {
  Bot, Braces, Database, FileCheck2, GitPullRequest, Layers3, Network, Route,
  Search, ShieldCheck, Sparkles, Users, Workflow, type LucideIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PortfolioSection } from './PortfolioSection';

type Capability = { icon: LucideIcon; title: string; description: string };

const architecture: Capability[] = [
  { icon: Network, title: 'Distributed Systems', description: 'Work across service boundaries, balancing request-response APIs with asynchronous messaging and investigating consistency when data moves between services.' },
  { icon: Layers3, title: 'Domain-Driven Design', description: 'Model business rules in domain code, coordinate use cases through application services, and give each module a clear responsibility.' },
  { icon: Workflow, title: 'Event-Driven Architecture', description: 'Use RabbitMQ for asynchronous service communication and Hangfire for background jobs that can run outside a request.' },
  { icon: Braces, title: 'API Design & Integration', description: 'Build REST APIs and work with gRPC contracts, validation, and authorization at the boundaries between clients and services.' },
  { icon: Database, title: 'Performance & Optimization', description: 'Trace slow workflows to query behavior, database access patterns, or background processing. Use Redis caching where it fits the workload.' },
  { icon: ShieldCheck, title: 'Security & Reliability', description: 'Apply authentication and permissions at application boundaries. Consider transaction scope, failure paths, and clear error handling when changing workflows.' },
  { icon: FileCheck2, title: 'Code Quality & Maintainability', description: 'Use clear interfaces, focused responsibilities, reviews, and automated tests to make changes easier to reason about and regressions easier to catch.' },
  { icon: Users, title: 'Engineering Collaboration', description: 'Clarify requirements with stakeholders, discuss technical trade-offs with teammates, and help junior developers troubleshoot and review changes.' },
];

const leadership: Capability[] = [
  { icon: Search, title: 'Hands-on Problem Solving', description: 'Follow backend issues through logs, service interactions, and SQL queries to isolate the cause before changing behavior.' },
  { icon: Route, title: 'Architecture & Technical Decisions', description: 'Contribute to design discussions about service boundaries, dependencies, and the cost of maintaining a solution over time.' },
  { icon: GitPullRequest, title: 'Code Quality & Reviews', description: 'Review correctness, edge cases, readability, and test coverage. Explain the trade-offs behind suggested changes.' },
  { icon: Users, title: 'Mentoring & Knowledge Sharing', description: 'Support junior developers through code discussions, technical guidance, and hands-on troubleshooting.' },
  { icon: FileCheck2, title: 'Stakeholder Collaboration', description: 'Turn business requirements into reviewable workflows, clarify edge cases, and validate proposed behavior with stakeholders.' },
  { icon: Workflow, title: 'Engineering Improvement', description: 'Look for repeatable improvements in testing, automation, and AI-assisted planning that reduce friction in day-to-day work.' },
];

const ai: Capability[] = [
  { icon: Route, title: 'Requirements to Implementation', description: 'Use coding agents to unpack user stories, identify missing acceptance criteria, and break work into reviewable changes.' },
  { icon: Bot, title: 'AI-Assisted Code Analysis', description: 'Explore unfamiliar code paths, trace dependencies, compare implementation options, and surface debugging hypotheses.' },
  { icon: Sparkles, title: 'Engineering Productivity', description: 'Use AI to draft documentation, suggest test cases, and accelerate repetitive investigation and development tasks.' },
  { icon: ShieldCheck, title: 'Human-Led Architecture', description: 'Review suggestions for correctness, maintainability, security, and fit with existing architecture. Keep design decisions and final approval with the engineer.' },
];

const principles = [
  { title: 'Build for Maintainability', description: 'Keep software understandable, testable, and adaptable as requirements change.' },
  { title: 'Understand the Business', description: 'Clarify the workflow, constraints, and desired outcome before choosing an implementation.' },
  { title: 'Solve Problems at the Root', description: 'Trace failures to the system behavior that caused them and verify the fix with a regression check.' },
  { title: 'Improve Continuously', description: 'Use feedback, tests, reviews, and experimentation to make the next change easier to deliver.' },
];

function CapabilityGrid({ items }: { items: Capability[] }) {
  const reduced = useReducedMotion();

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${items.length === 6 ? 'lg:grid-cols-3' : 'xl:grid-cols-4'}`}>
      {items.map(({ icon: Icon, title, description }, index) => (
        <motion.li
          key={title}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : (index % 4) * 0.05 }}
          className="group rounded-2xl border border-surface-line/50 bg-glass p-5 transition-colors hover:border-brand-purple/50 md:p-6"
        >
          <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500/15 to-blue-500/15 p-2.5 text-brand-purple motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5">
            <Icon size={21} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </motion.li>
      ))}
    </ul>
  );
}

export function EngineeringArchitecture() {
  return (
    <PortfolioSection id="architecture" title="Software Architecture & Engineering Practices" description="Designing maintainable, resilient, and scalable systems for complex business environments." alternate>
      <CapabilityGrid items={architecture} />
    </PortfolioSection>
  );
}

export function EngineeringLeadership() {
  return (
    <PortfolioSection id="leadership" title="Technical Ownership & Engineering Leadership" description="Combining hands-on engineering with collaboration, mentoring, and architectural thinking." alternate>
      <CapabilityGrid items={leadership} />
    </PortfolioSection>
  );
}

export function AssistedEngineering() {
  return (
    <PortfolioSection id="ai-engineering" title="AI-Assisted Software Engineering" description="Using AI tools to support analysis and implementation while keeping technical decisions under human control.">
      <CapabilityGrid items={ai} />
    </PortfolioSection>
  );
}

export function EngineeringPrinciples() {
  return (
    <PortfolioSection id="principles" title="How I Approach Engineering" alternate>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ title, description }) => (
          <li key={title} className="border-l border-brand-purple/45 pl-4">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </PortfolioSection>
  );
}
