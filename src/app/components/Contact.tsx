import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Send, MapPin, MessageCircle, Facebook, Linkedin, Github, Download } from 'lucide-react';
import { useLocale } from '../../i18n/LocaleProvider';
import { portfolioLinks } from '../data/career';
import { usePortfolioReducedMotion } from '../usePortfolioMotion';

const fields = ['name', 'email', 'message'] as const;
type Field = typeof fields[number];

export function Contact() {
  const { locale, messages } = useLocale();
  const copy = messages.contact;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = usePortfolioReducedMotion();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const fieldsRef = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = fields.filter((field) => !values[field].trim() || !fieldsRef.current[field]?.validity.valid);
    if (invalid.length) {
      setErrors(Object.fromEntries(invalid.map((field) => [field, true])));
      fieldsRef.current[invalid[0]]?.focus();
      return;
    }

    const subject = copy.subject.replace('{name}', values.name);
    const body = `${copy.name}: ${values.name}\n${copy.email}: ${values.email}\n\n${copy.message}:\n${values.message}`;
    window.location.href = `mailto:${portfolioLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setValues({ name: '', email: '', message: '' });
    setErrors({});
  }

  const contacts = [
    { icon: Mail, label: copy.email, value: portfolioLinks.email, link: `mailto:${portfolioLinks.email}`, direction: 'ltr' },
    { icon: MessageCircle, label: copy.whatsapp, value: '+963930675426', link: 'https://wa.me/963930675426', direction: 'ltr' },
    { icon: Facebook, label: copy.facebook, value: 'facebook.com/tareq.yasser.1', link: 'https://www.facebook.com/tareq.yasser.1/', direction: 'ltr' },
    { icon: Linkedin, label: copy.linkedin, value: 'linkedin.com/in/tariq-yasser-78982731a', link: portfolioLinks.linkedIn, direction: 'ltr' },
    { icon: Github, label: copy.github, value: copy.source, link: portfolioLinks.source, direction: 'auto' },
    { icon: MapPin, label: copy.location, value: copy.city, link: null, direction: 'auto' },
  ] as const;

  const inputStyle = 'w-full rounded-lg border border-field-line bg-card/50 px-4 py-3 text-foreground placeholder-placeholder transition-colors focus:border-brand-purple aria-invalid:border-red-500/80';

  return (
    <section id="contact" className="relative overflow-hidden bg-section py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute start-1/2 top-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute end-1/2 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.6 }}
        className="relative mx-auto max-w-7xl px-6 md:px-12"
      >
        <header className="mb-16 text-center">
          <p className="mb-4 text-sm tracking-wider text-brand-purple uppercase">{copy.eyebrow}</p>
          <h2 className="mb-6 text-4xl text-foreground md:text-5xl lg:text-6xl">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">{copy.description}</p>
        </header>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <form onSubmit={submit} noValidate className="space-y-6">
            {fields.map((field) => {
              const attributes = {
                id: field,
                name: field,
                value: values[field],
                dir: field === 'email' ? 'ltr' : 'auto',
                required: true,
                'aria-invalid': errors[field] || undefined,
                'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
                onChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  const value = event.currentTarget.value;
                  setValues((previous) => ({ ...previous, [field]: value }));
                  if (errors[field]) setErrors((previous) => ({ ...previous, [field]: false }));
                },
              };
              return (
                <div key={field}>
                  <label htmlFor={field} className="mb-2 block text-subtle-foreground">{copy[field]}</label>
                  {field === 'message' ? (
                    <textarea {...attributes} ref={(element) => { fieldsRef.current[field] = element; }} rows={6} className={`${inputStyle} resize-none`} placeholder={copy.messagePlaceholder} />
                  ) : (
                    <input {...attributes} ref={(element) => { fieldsRef.current[field] = element; }} type={field === 'email' ? 'email' : 'text'} autoComplete={field} className={inputStyle} placeholder={field === 'email' ? copy.emailPlaceholder : copy.namePlaceholder} />
                  )}
                  {errors[field] && <p id={`contact-${field}-error`} role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{copy.errors[field]}</p>}
                </div>
              );
            })}
            <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-medium text-white motion-safe:transition-transform motion-safe:hover:scale-105 md:w-auto">
              <span>{copy.send}</span>
              <Send aria-hidden="true" className="mirror-in-rtl size-4" />
            </button>
          </form>
          <div className="rounded-[2rem] border border-glass-line/10 bg-glass p-6 shadow-[0_18px_60px_var(--glass-shadow)] backdrop-blur-xl md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl text-foreground">{copy.info}</h3>
              <a href={`${import.meta.env.BASE_URL}${portfolioLinks.resume[locale]}`} download className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-brand-purple hover:bg-raised">
                <Download size={16} aria-hidden="true" /> {messages.common.download}
              </a>
            </div>
            <ul className="space-y-3">
              {contacts.map(({ icon: Icon, label, value, link, direction }) => (
                <li key={link ?? 'location'} className="flex items-start gap-4 rounded-2xl border border-glass-line/8 bg-raised/45 p-4 transition-colors hover:border-brand-cyan/20 hover:bg-raised/70 dark:bg-card/45">
                  <span className="shrink-0 rounded-2xl bg-gradient-to-br from-cyan-400/12 to-blue-400/10 p-3 ring-1 ring-glass-line/8">
                    <Icon aria-hidden="true" className="size-5 text-brand-cyan" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm tracking-wider text-muted-foreground uppercase">{label}</p>
                    {link ? (
                      <a href={link} target="_blank" rel="noreferrer" className="mt-2 inline-block break-all text-foreground transition-colors hover:text-brand-cyan">
                        <bdi dir={direction}>{value}</bdi>
                      </a>
                    ) : <p className="mt-2 text-foreground">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
