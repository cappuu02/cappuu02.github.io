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

        {/* MAIN SCROLL AREA
          - Scroll snap & smooth only enabled on md+ (desktop/tablet).
          - On mobile we use normal, fluid scrolling to avoid "mechanical" snapping.
        */}
        <main className="md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll md:scroll-smooth overflow-y-auto">
        
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
