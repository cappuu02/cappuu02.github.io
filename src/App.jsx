import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SideNav from "./components/SideNav";
import Loader from "./components/Loader";

import NoiseOverlay from "./components/NoiseOverlay";
import DebugConsole from "./components/DebugConsole";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";


function App() {
  return (
    <div className="bg-bg text-slate-100 min-h-screen overflow-hidden">
      {/* Loader hacker all'avvio */}
      <Loader />

      {/* Overlay effetti */}
      <NoiseOverlay />
      <DebugConsole />

      <Navbar />
      <ScrollProgress />
      <SideNav />

      {/* MAIN SCROLL AREA */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        
        {/* Ogni sezione **DEVE** avere un ID */}
        <section id="hero" className="snap-start">
          <Hero />
        </section>

        <section id="about" className="snap-start">
          <About />
        </section>

        <section id="skills" className="snap-start">
          <Skills />
        </section>

        <section id="projects" className="snap-start">
          <Projects />
        </section>

        <section id="contact" className="snap-start">
          <Contact />
        </section>
        
      </main>
    </div>
  );
}

export default App;
