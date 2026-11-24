import { Navbar } from './components/Navbar';
import { MotionConfig } from 'motion/react';
import { useEffect } from 'react';
import { Hero } from './components/Hero';
import { FloatingProfile } from './components/FloatingProfile';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AssistedEngineering, EngineeringArchitecture, EngineeringLeadership, EngineeringPrinciples } from './components/EngineeringSections';
import { DevOpsReliability, EngineeringDelivery } from './components/DeliveryPractices';
import { useTheme } from './useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.getElementById('root')?.removeAttribute('data-portfolio-pending');
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Navbar isDark={theme === 'dark'} onToggleTheme={toggleTheme} />
        <FloatingProfile />
        <main>
          <Hero />
          <About />
          <Skills />
          <EngineeringArchitecture />
          <Projects />
          <EngineeringLeadership />
          <EngineeringDelivery />
          <DevOpsReliability />
          <AssistedEngineering />
          <Experience />
          <EngineeringPrinciples />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
