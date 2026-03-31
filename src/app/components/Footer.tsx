import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-slate-950 border-t border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Tariq Yasser
            </h3>
            <p className="text-slate-400">Full Stack Web Developer</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400">
            <span>© {currentYear} Built with</span>
            <Heart className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span>by Tariq Yasser</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
