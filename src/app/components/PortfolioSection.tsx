import { usePortfolioReducedMotion } from '../usePortfolioMotion';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type PortfolioSectionProps = {
  id: string;
  title: string;
  description?: string;
  alternate?: boolean;
  children: ReactNode;
};

export function PortfolioSection({ id, title, description, alternate, children }: PortfolioSectionProps) {
  const reduced = usePortfolioReducedMotion();

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 md:py-24 ${alternate ? 'bg-section-alt' : 'bg-section'}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.4 }}
          className="mb-8 max-w-3xl md:mb-12"
        >
          <h2 id={`${id}-title`} className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
