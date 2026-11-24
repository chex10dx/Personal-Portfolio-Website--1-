import { useLocale } from '../../i18n/LocaleProvider';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import {
  Bot, Braces, Database, FileCheck2, GitPullRequest, Layers3, Network, Route,
  Search, ShieldCheck, Sparkles, Users, Workflow, type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioSection } from './PortfolioSection';

type Capability = { title: string; description: string };

const architectureIcons = [Network, Layers3, Workflow, Braces, Database, ShieldCheck, FileCheck2, Users];
const leadershipIcons = [Search, Route, GitPullRequest, Users, FileCheck2, Workflow];
const aiIcons = [Route, Bot, Sparkles, ShieldCheck];

function CapabilityGrid({ items, icons }: { items: Capability[]; icons: LucideIcon[] }) {
  const reduced = usePortfolioReducedMotion();

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${items.length === 6 ? 'lg:grid-cols-3' : 'xl:grid-cols-4'}`}>
      {items.map(({ title, description }, index) => {
        const Icon = icons[index];
        return (
          <motion.li
            key={index}
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
        );
      })}
    </ul>
  );
}

export function EngineeringArchitecture() {
  const { messages: { architecture: copy } } = useLocale();
  return (
    <PortfolioSection id="architecture" title={copy.title} description={copy.description} alternate>
      <CapabilityGrid items={copy.items} icons={architectureIcons} />
    </PortfolioSection>
  );
}

export function EngineeringLeadership() {
  const { messages: { leadership: copy } } = useLocale();
  return (
    <PortfolioSection id="leadership" title={copy.title} description={copy.description} alternate>
      <CapabilityGrid items={copy.items} icons={leadershipIcons} />
    </PortfolioSection>
  );
}

export function AssistedEngineering() {
  const { messages: { ai: copy } } = useLocale();
  return (
    <PortfolioSection id="ai-engineering" title={copy.title} description={copy.description}>
      <CapabilityGrid items={copy.items} icons={aiIcons} />
    </PortfolioSection>
  );
}

export function EngineeringPrinciples() {
  const { messages: { principles: copy } } = useLocale();
  return (
    <PortfolioSection id="principles" title={copy.title} alternate>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map(({ title, description }, index) => (
          <li key={index} className="border-s border-brand-purple/45 ps-4">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </PortfolioSection>
  );
}
