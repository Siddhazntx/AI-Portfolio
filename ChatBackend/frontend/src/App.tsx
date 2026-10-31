import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { OpenSource } from './components/OpenSource';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b]">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cityscape-bg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Sections with subtle separators */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0b]/80 to-[#0a0a0b]" />
          <div className="relative z-10">
            <Projects />
            <OpenSource />
            <About />
            <Resume />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
