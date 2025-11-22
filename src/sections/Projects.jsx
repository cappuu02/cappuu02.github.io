import { motion } from "framer-motion";
import MatrixRain from "../components/MatrixRain";

const PROJECTS = [
  {
    title: "VulnScan Toolkit",
    desc: "Toolkit personalizzato per vulnerability discovery automatico.",
    tech: ["Python", "Nmap", "Regex", "Reporting Engine"],
  },
  {
    title: "CyberRange Lab",
    desc: "Ambiente locale per test di attacchi/analisi basato su VMs.",
    tech: ["VMware", "Kali", "Windows AD", "Networking"],
  },
  {
    title: "WebSec Playground",
    desc: "Mini-piattaforma per simulare attacchi XSS, SQLi, CSRF.",
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

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display text-green-300 drop-shadow-lg mb-6"
        >
          Cyber Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-green-200/80 max-w-xl mb-12"
        >
          Una raccolta di progetti sperimentali creati durante il mio percorso da Cybersecurity Specialist.
        </motion.p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                bg-[#001b11]/60 border border-green-500/30 
                backdrop-blur-sm rounded-xl p-6 font-mono text-green-300
                hover:shadow-[0_0_18px_rgba(34,197,94,0.5)]
                hover:scale-[1.02] transition
                animate-[crtVibration_0.18s_ease-in-out_infinite_alternate]
              "
            >
              <p className="text-xl font-bold mb-2">{p.title}</p>
              <p className="text-green-400 text-sm mb-3">{p.desc}</p>

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
