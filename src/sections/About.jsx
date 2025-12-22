import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="section-padding md:min-h-screen flex flex-col justify-center py-12 md:py-24 overflow-x-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ⬛ HACKER TERMINAL HEADER */}
        <div className="panel mb-10">
          <div className="terminal-header">
            <div className="dot-red"></div>
            <div className="dot-yellow"></div>
            <div className="dot-green"></div>
            <span className="ml-3">/usr/bin/about_me — v2.3.1</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="text-primary">root@portfolio</span>:~$ whoami  
            </p>
            <p className="text-secondary pl-4">luca — cybersecurity enthusiast</p>

            <br />

            <p>
              <span className="text-primary">root@portfolio</span>:~$ cat profile.txt  
            </p>

            <pre className="pl-4 text-xs leading-relaxed text-slate-300 whitespace-pre-wrap rounded-md bg-[#061014]/30 p-3">
{String.raw`{
  "name": "Luca Cappu",
  "role": "Cybersecurity Student",
  "location": "Italy",
  "interests": ["hacking", "CTFs", "reverse engineering", "front-end magic"],
  "status": "always_learning"
}`}
            </pre>
          </div>
        </div>

        {/* 🟩 TWO-COLUMN LAYOUT FUN + HACKER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="panel"
          >
            <h2 className="font-mono text-lg text-primary mb-3">
              ▶ system_overview()
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              I am a <span className="text-secondary">Cybersecurity</span> student at Sapienza,
              with a Bachelor's background in Computer Science (Perugia).
              I love clean systems, animated UIs, and anything that
              looks like it came from a secret NSA lab.
              <br /><br />
              In my free time I break things (ethically),
              build dark interfaces, and drink more coffee than
              a university student probably should.
            </p>
          </motion.div>

          {/* RIGHT — HACKER CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="panel relative overflow-hidden"
          >
            <h2 className="font-mono text-lg text-secondary mb-3">
              ▶ bio_dump.txt
            </h2>

            <div className="relative z-10 text-sm sm:text-sm md:text-base text-slate-300 space-y-2">
              <p>• 🚀 Cybersecurity student</p>
              <p>• 👨‍💻 Lover of animated dark / neon UIs</p>
              <p>• 🔐 Interests: offensive security, exploit development</p>
              <p>• 🧠 Full-time learner & problem solver</p>
              <p>• ☕ Coffee &gt; installed RAM</p>
            </div>

            {/* animated scanlines */}
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_4px] animate-[noiseShift_6s_linear_infinite]"></div>
          </motion.div>
        </div>

        {/* 🟦 FUN FACTS HACKER CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {[
            { label: "CTF SCORE", value: "UPDATING…" },
            { label: "COFFEINE LEVEL", value: "95%" },
            { label: "BRAIN UPTIME", value: "24/7" }
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="panel text-center"
            >
              <p className="font-mono text-xs text-slate-400">
                {card.label}
              </p>
              <p className="text-xl font-bold text-primary">
                {card.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
