import { Download, Facebook, Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLocale } from '../../i18n/LocaleProvider';
import { portfolioLinks } from '../data/career';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

function WhatsAppIcon() {
  return (
    <span aria-hidden="true" className="relative grid size-6 place-items-center">
      <MessageCircle className="absolute inset-0 size-full" />
      <Phone className="size-3" />
    </span>
  );
}

const contacts = [
  { id: 'email', icon: Mail, href: `mailto:${portfolioLinks.email}` },
  { id: 'whatsapp', icon: WhatsAppIcon, href: portfolioLinks.whatsapp },
  { id: 'facebook', icon: Facebook, href: portfolioLinks.facebook },
  { id: 'linkedin', icon: Linkedin, href: portfolioLinks.linkedIn },
  { id: 'github', icon: Github, href: portfolioLinks.github },
  { id: 'location', icon: MapPin, href: portfolioLinks.location },
] as const;

export function Contact() {
  const { locale, direction, messages } = useLocale();
  const copy = messages.contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate bg-section py-10 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute start-1/4 -top-24 size-64 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute end-1/4 -bottom-24 size-64 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-12">
        <div className="rounded-3xl border border-surface-line/40 bg-gradient-to-br from-glass to-brand-blue/5 px-4 py-5 shadow-[0_18px_48px_var(--glass-shadow)] backdrop-blur-xl sm:p-6">
          <header className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-b border-surface-line/40 pb-4 text-center sm:justify-between sm:text-start">
            <h2 id="contact-heading" className="text-xl font-semibold text-foreground sm:text-2xl">{copy.info}</h2>
            <a
              href={`${import.meta.env.BASE_URL}${portfolioLinks.resume[locale]}`}
              download
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-brand-purple/25 bg-brand-purple/10 px-3 text-sm font-semibold text-brand-purple hover:border-brand-purple/50 hover:bg-brand-purple/15 motion-safe:transition-colors"
            >
              <Download size={16} aria-hidden="true" />
              {messages.common.download}
            </a>
          </header>

          <ul className="mx-auto mt-5 grid w-fit grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {contacts.map(({ id, icon: Icon, href }) => (
              <li key={id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={copy[id]}
                      className="grid size-12 place-items-center rounded-2xl border border-brand-cyan/25 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 text-brand-cyan hover:border-brand-cyan/60 hover:shadow-[0_6px_20px] hover:shadow-brand-cyan/25 focus-visible:border-brand-cyan/60 motion-safe:transition-[translate,scale,box-shadow,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-105 sm:size-14"
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent dir={direction} side="bottom" sideOffset={8} className="motion-reduce:animate-none">
                    {copy[id]}
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
