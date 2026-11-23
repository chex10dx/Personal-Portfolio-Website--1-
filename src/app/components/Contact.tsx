import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Send, MapPin, MessageCircle, Facebook, Linkedin, Github, Download } from 'lucide-react';
import { portfolioLinks } from '../data/career';

export function Contact() {
  const recipientEmail = portfolioLinks.email;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: recipientEmail,
      link: `mailto:${recipientEmail}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+963930675426',
      link: 'https://wa.me/963930675426',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'facebook.com/tareq.yasser.1',
      link: 'https://www.facebook.com/tareq.yasser.1/',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/tariq-yasser-78982731a',
      link: portfolioLinks.linkedIn,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Portfolio source',
      link: portfolioLinks.source,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Damascus, Syria',
      link: null,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-section overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
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
              className="inline-block text-brand-purple mb-4 text-sm md:text-base tracking-wider uppercase"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            >
              Let&apos;s Build Reliable Software Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              I’m interested in enterprise software engineering, distributed systems, software architecture, and hands-on technical leadership. If you’re building complex systems or growing an engineering team, I’d be happy to connect.
            </motion.p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={reduced ? { duration: 0 } : { delay: 0.5, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-subtle-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card/50 border border-field-line rounded-lg text-foreground placeholder-placeholder focus:border-brand-purple transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-subtle-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card/50 border border-field-line rounded-lg text-foreground placeholder-placeholder focus:border-brand-purple transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-subtle-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-card/50 border border-field-line rounded-lg text-foreground placeholder-placeholder focus:border-brand-purple transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={reduced ? { duration: 0 } : { delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="rounded-[2rem] border border-glass-line/10 bg-glass p-6 shadow-[0_18px_60px_var(--glass-shadow)] dark:shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl text-foreground">Contact Information</h3>
                  <a href={`${import.meta.env.BASE_URL}${portfolioLinks.resume}`} download className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-brand-purple hover:bg-raised">
                    <Download size={16} aria-hidden="true" /> Download Resume
                  </a>
                </div>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="rounded-2xl border border-glass-line/8 bg-raised/45 p-4 transition-colors duration-300 hover:border-brand-cyan/20 hover:bg-raised/70 dark:bg-card/45 dark:hover:border-cyan-300/20 dark:hover:bg-card/65"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-gradient-to-br from-cyan-400/12 to-blue-400/10 p-3 ring-1 ring-glass-line/8">
                          <info.icon className="h-5 w-5 text-brand-cyan" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{info.label}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-2 break-all text-base text-foreground transition-colors duration-300 hover:text-brand-cyan"
                            >
                              <span>{info.value}</span>
                            </a>
                          ) : (
                            <p className="mt-2 text-base text-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
