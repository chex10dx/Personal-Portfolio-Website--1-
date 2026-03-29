import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingProfile } from './components/FloatingProfile';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#050816] text-white">
      <Navbar />
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
