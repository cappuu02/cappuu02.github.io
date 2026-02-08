import { motion } from "framer-motion";
import SplitText from "../components/SplitText";

const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-green-400 mb-4">
          <span className="glitch" data-text="Welcome">Welcome</span>
        </h2>
        
        <p className="text-base text-slate-300 leading-relaxed mb-6 max-w-3xl">
          I'm a <span className="text-green-400 font-mono">Cybersecurity Specialist</span> with a Bachelor's in Computer Science (Perugia, 104/110) and pursuing a Master's in Cybersecurity at Sapienza University, Rome. Passionate about offensive security, reverse engineering, and building clean, hacker-oriented interfaces.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href="#projects"
            className="rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 px-6 py-2 text-sm font-mono font-semibold text-black hover:brightness-110 transition shadow-lg"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-green-500/60 bg-slate-800/40 px-6 py-2 text-sm font-mono text-green-400 hover:bg-green-500/10 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
