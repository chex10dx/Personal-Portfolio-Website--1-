import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingProfile } from './components/FloatingProfile';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useTheme } from './useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar isDark={theme === 'dark'} onToggleTheme={toggleTheme} />
      <FloatingProfile />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
