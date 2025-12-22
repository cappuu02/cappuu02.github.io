import { motion } from "framer-motion";
import MatrixRain from "../components/MatrixRain";

const PROJECTS = [
  {
    title: "VulnScan Toolkit",
    desc: "Custom toolkit for automated vulnerability discovery.",
    tech: ["Python", "Nmap", "Regex", "Reporting Engine"],
  },
  {
    title: "CyberRange Lab",
    desc: "Local environment for attack/analysis testing based on VMs.",
    tech: ["VMware", "Kali", "Windows AD", "Networking"],
  },
  {
    title: "WebSec Playground",
    desc: "Mini platform to simulate XSS, SQLi, and CSRF attacks.",
    tech: ["Node.js", "Express", "Javascript", "Burp Suite"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* MATRIX BACKGROUND */}
      <MatrixRain opacity={0.35} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-4">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display text-green-300 drop-shadow-lg mb-6"
        >
          Cyber Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-green-200/80 max-w-xl mb-12 text-sm sm:text-base"
        >
          A collection of experimental projects created during my journey as a Cybersecurity Specialist.
        </motion.p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                bg-[#001b11]/60 border border-green-500/30 
                backdrop-blur-sm rounded-xl p-6 font-mono text-green-300 w-full
                hover:shadow-[0_0_18px_rgba(34,197,94,0.5)]
                hover:scale-[1.02] transition
                animate-[crtVibration_0.18s_ease-in-out_infinite_alternate]
              "
            >
              <p className="text-lg sm:text-xl font-bold mb-2">{p.title}</p>
              <p className="text-green-400 text-sm sm:text-base mb-3">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.tech.map((t, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 text-xs bg-green-500/10 border border-green-500/20 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
