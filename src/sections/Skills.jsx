import { motion } from "framer-motion";

const SKILLS = [
  { name: "Linux", level: "Strong" },
  { name: "Networking", level: "Advanced" },
  { name: "Web Security", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "Burp Suite", level: "Advanced" },
  { name: "Nmap", level: "Advanced" },
  { name: "Metasploit", level: "Intermediate" },
  { name: "Active Directory", level: "Intermediate" }
];

const SKILL_STATS = [
  { label: "Security Focus", value: "Offensive Ops", detail: "Red-teaming, web & AD exploitation" },
  { label: "CTF Ranking", value: "Top 3%", detail: "HackTheBox • TryHackMe" },
  { label: "Lab Hours", value: "1200+", detail: "Hands-on in custom CyberRange" }
];

const TOOLBOX = [
  "Burp Suite",
  "Kali Linux",
  "Wireshark",
  "Docker",
  "Splunk",
  "Metasploit",
  "Nessus",
  "Azure",
  "Git"
];

const SKILL_PROGRESS = [
  { name: "Reverse Engineering", percent: 40 },
  { name: "Exploit Development", percent: 55 },
  { name: "CTF Skills", percent: 75 },
  { name: "Automation & Tooling", percent: 65 }
];

export default function Skills() {
  return (
    <section id="skills" className="w-full space-y-10">
      <div>
        <p className="text-xs font-mono text-green-400/80">~/stack/skilling</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-green-400 mb-2 font-mono">
          $ Skills & Expertise
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          Offensive-first mindset blending exploit research, secure architecture, and automation. Everything here is battle-tested across labs, CTFs, and real-world audits.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
            <p className="text-xs font-mono text-slate-400 mb-3">Impact Metrics</p>
            <div className="space-y-4">
              {SKILL_STATS.map((stat) => (
                <div key={stat.label} className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-green-300 mt-1">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
            <p className="text-xs font-mono text-slate-400 mb-3">Offensive Toolkit</p>
            <div className="flex flex-wrap gap-2">
              {TOOLBOX.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] font-mono uppercase tracking-wide px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-2xl border border-green-500/20 bg-slate-900/40 p-4 hover:border-green-400/50 transition"
              >
                <p className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <span className="text-green-400">▣</span> {skill.name}
                </p>
                <p className="text-xs text-slate-400 mt-1">{skill.level}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg text-green-400">Advanced Progress</h3>
              <p className="text-xs text-slate-500">live from /labs</p>
            </div>
            <div className="space-y-4">
              {SKILL_PROGRESS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>{skill.name}</span>
                    <span className="text-green-400">{skill.percent}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-green-400 shadow-[0_0_12px_rgba(34,197,94,0.7)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
