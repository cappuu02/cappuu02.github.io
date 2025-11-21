import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SideNav from "./components/SideNav";
import Loader from "./components/Loader";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-bg text-slate-100">
      {/* Loader hacker */}
      <Loader />

      {/* UI */}
      <Navbar />
      <ScrollProgress />
      <SideNav />

      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <section className="snap-start"><Hero /></section>
        <section className="snap-start"><About /></section>
        <section className="snap-start"><Skills /></section>
        <section className="snap-start"><Projects /></section>
        <section className="snap-start"><Contact /></section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
