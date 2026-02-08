import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-green-400 mb-6 font-mono">
        $ About Me
      </h2>

      <div className="space-y-4">
        {/* Bio Terminal */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-header">
            <div className="dot-red"></div>
            <div className="dot-yellow"></div>
            <div className="dot-green"></div>
            <span className="ml-3 text-xs text-slate-500">profile.txt</span>
          </div>

          <div className="terminal-body text-sm space-y-2">
            <p><span className="text-green-400">root@portfolio</span>:~$ cat profile.txt</p>
            <pre className="text-xs text-slate-300 whitespace-pre-wrap">
{`Cybersecurity student @ Sapienza, Rome
BS Computer Science @ Perugia (104/110)

Interests: Offensive security, reverse engineering,
CTF competitions, dark UIs, terminal aesthetics

Passions: Breaking things (ethically), building secure
systems, crafting clean & modern hacker interfaces

Traits: punctual, respectful, transparent, collaborative
Mindset: calm under pressure, serious about deadlines,
yet playful enough to keep the lab energy positive`}
            </pre>
          </div>
        </motion.div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-slate-400 font-mono mb-2">📚 EDUCATION</p>
            <p className="text-sm text-slate-200">MS Cybersecurity (Sapienza)</p>
            <p className="text-xs text-slate-400">BS CS (Perugia) 104/110</p>
          </motion.div>

          <motion.div
            className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs text-slate-400 font-mono mb-2">🎯 FOCUS AREAS</p>
            <p className="text-sm text-slate-200">Offensive Security</p>
            <p className="text-xs text-slate-400">Reverse Engineering</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
