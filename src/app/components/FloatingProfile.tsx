import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import profileImage from '../../assets/TareqPic.png';

function getProfileMetrics(viewportWidth: number, viewportHeight: number) {
  const isDesktop = viewportWidth >= 1024;
  const finalSize = isDesktop ? 56 : 46;
  const startSize = isDesktop
    ? Math.min(420, Math.max(280, viewportWidth * 0.29))
    : Math.min(290, Math.max(210, viewportWidth * 0.58));

  return {
    startX: isDesktop ? Math.max(24, viewportWidth * 0.08) : Math.max(20, (viewportWidth - startSize) / 2),
    startY: isDesktop ? Math.max(126, viewportHeight * 0.22) : 104,
    finalX: isDesktop ? 92 : 72,
    finalY: isDesktop ? 14 : 18,
    startSize,
    finalSize,
    travel: isDesktop ? Math.max(420, viewportHeight * 0.82) : Math.max(300, viewportHeight * 0.56),
  };
}

export function FloatingProfile() {
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const metrics = getProfileMetrics(viewport.width, viewport.height);
  const rawProgress = useTransform(scrollY, [0, metrics.travel], [0, 1]);
  const progress = useSpring(rawProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  const x = useTransform(progress, [0, 1], [metrics.startX, metrics.finalX]);
  const y = useTransform(progress, [0, 1], [metrics.startY, metrics.finalY]);
  const size = useTransform(progress, [0, 1], [metrics.startSize, metrics.finalSize]);
  const glowOpacity = useTransform(progress, [0, 1], [0.55, 0.26]);
  const ringOpacity = useTransform(progress, [0, 1], [1, 0.9]);
  const imageInset = useTransform(progress, [0, 1], [14, 4]);
  const shadowBlur = useTransform(progress, [0, 1], [90, 30]);
  const shadowSpread = useTransform(progress, [0, 1], [12, 2]);
  const shadow = useMotionTemplate`0 0 ${shadowBlur}px ${shadowSpread}px rgba(99, 102, 241, 0.32)`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{
        x,
        y,
        width: size,
        height: size,
      }}
    >
      <motion.div
        className="relative h-full w-full rounded-full"
        style={{
          boxShadow: shadow,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 blur-3xl"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(139,92,246,0.95),rgba(59,130,246,0.9),rgba(34,211,238,0.88))] p-[2px] animate-spin-slow"
          style={{ opacity: ringOpacity }}
        >
          <div className="h-full w-full rounded-full bg-[#050816]" />
        </motion.div>
        <motion.div
          className="absolute overflow-hidden rounded-full border border-white/10 bg-slate-950"
          style={{ inset: imageInset }}
        >
          <img src={profileImage} alt="Tariq Yasser" className="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
