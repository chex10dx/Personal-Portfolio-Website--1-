import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#172554_0%,#090d1a_38%,#050816_72%)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute right-0 top-16 h-[28rem] w-[28rem] rounded-full bg-blue-500/18 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.16]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-[22rem] md:px-12 md:pt-[24rem] lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="grid w-full items-center gap-14 lg:grid-cols-[28rem_minmax(0,1fr)]"
        >
          <div className="hidden lg:block" />

          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
              <span className="text-sm uppercase tracking-[0.28em] text-cyan-100/80 md:text-base">
                Full Stack Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mb-6 text-5xl leading-none md:text-6xl lg:text-7xl xl:text-[6.75rem]"
            >
              <span className="block text-white">Designing digital products</span>
              <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-violet-200 to-blue-300 bg-clip-text text-transparent">
                with depth, speed, and glow.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8 }}
              className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-300 md:text-2xl lg:mx-0"
            >
              I'm <span className="text-white">Tareq Yasser</span>, building premium web experiences with
              neon clarity, scalable engineering, and a product eye shaped by{' '}
              <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                8+ years
              </span>{' '}
              of hands-on delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-12 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4)] px-8 py-4 text-white shadow-[0_18px_50px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(79,70,229,0.45)]"
              >
                View Projects
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-full border border-white/12 bg-white/[0.04] px-8 py-4 text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                Contact Me
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.64, duration: 0.8 }}
              className="mb-16 grid gap-5 md:grid-cols-3 lg:mb-20"
            >
              <div className="rounded-3xl border border-white/8 bg-white/[0.04] p-5 text-left backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Specialty</p>
                <p className="mt-3 text-lg text-white">React, Node.js, system design</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/[0.04] p-5 text-left backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Focus</p>
                <p className="mt-3 text-lg text-white">Premium interfaces and resilient architecture</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/[0.04] p-5 text-left backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Based In</p>
                <p className="mt-3 text-lg text-white">Iraq, building globally</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="flex flex-col items-center gap-3 lg:items-start"
            >
              <span className="text-sm uppercase tracking-[0.28em] text-slate-400">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-6 w-6 text-cyan-300" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
