import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Send, MapPin, MessageCircle, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

export function Contact() {
  const recipientEmail = 'tareqyasser.dev@gmail.com';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
      value: 'tareqyasser.dev@gmail.com',
      link: 'mailto:tareqyasser.dev@gmail.com',
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
      link: 'https://www.linkedin.com/in/tariq-yasser-78982731a',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Damascus, Syria',
      link: null,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
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
              className="inline-block text-purple-400 mb-4 text-sm md:text-base tracking-wider uppercase"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Open to freelance and full-time opportunities in .NET and full-stack development.
            </motion.p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
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
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl md:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl text-white">Contact Information</h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-slate-300">
                    Reach out through the channel that feels easiest for you. Everything here is
                    direct, clickable, and kept intentionally simple.
                  </p>
                </div>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="rounded-2xl border border-white/8 bg-slate-900/45 p-4 transition-colors duration-300 hover:border-cyan-300/20 hover:bg-slate-900/65"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-gradient-to-br from-cyan-400/12 to-blue-400/10 p-3 ring-1 ring-white/8">
                          <info.icon className="h-5 w-5 text-cyan-200" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{info.label}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-2 break-all text-base text-white transition-colors duration-300 hover:text-cyan-200"
                            >
                              <span>{info.value}</span>
                              <ArrowUpRight className="h-4 w-4 shrink-0" />
                            </a>
                          ) : (
                            <p className="mt-2 text-base text-white">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-cyan-200/10 bg-gradient-to-br from-cyan-400/10 via-slate-900/40 to-blue-500/10 p-6 shadow-[0_12px_40px_rgba(8,47,73,0.2)] md:p-8">
                <h3 className="text-xl text-white mb-3">Open to Opportunities</h3>
                <p className="text-slate-300 leading-7">
                  I am currently available for freelance projects and full-time positions in backend and full-stack roles.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
