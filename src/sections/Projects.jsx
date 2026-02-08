import { motion } from "framer-motion";

const PROJECT_STATS = [
  { label: "Security Tools", value: "12", detail: "Automation & exploitation utilities" },
  { label: "Lab Builds", value: "5", detail: "Isolated AD + cloud ranges" },
  { label: "CTF Writeups", value: "30+", detail: "Shared with the community" }
];

const PROJECTS = [
  {
    title: "VulnScan Toolkit",
    desc: "Automation suite that chains Nmap, regex parsing, and report templates to accelerate recon by 60%.",
    tech: ["Python", "Nmap", "Regex", "Report Engine"],
    status: "Active",
    year: "2024",
    impact: "Used on every pentest; exports markdown-ready findings.",
    type: "Automation"
  },
  {
    title: "CyberRange Lab",
    desc: "Modular VM lab with AD forest, misconfigured services, and purple-team playbooks for daily drills.",
    tech: ["VMware", "Kali", "Windows AD", "Terraform"],
    status: "Iterating",
    year: "2023-2024",
    impact: "Replicates enterprise environments for exploit rehearsal.",
    type: "Infrastructure"
  },
  {
    title: "WebSec Playground",
    desc: "Hands-on platform simulating OWASP Top 10 with guided exploitation steps and Burp macros.",
    tech: ["Node.js", "Express", "Mongo", "Burp Suite"],
    status: "Released",
    year: "2024",
    impact: "Train teammates on XSS/SQLi/CSRF defenses.",
    type: "Education"
  },
  {
    title: "Portfolio Console",
    desc: "This interactive CV with hacker aesthetics, Lenis smooth scroll, and framer-motion micro-interactions.",
    tech: ["React", "Framer Motion", "Tailwind", "Lenis"],
    status: "Live",
    year: "2025",
    impact: "Showcases personal brand & UI engineering chops.",
    type: "UI"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full space-y-10">
      <div>
        <p className="text-xs font-mono text-green-400/80">~/build-log</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-green-400 mb-2 font-mono">
          $ Projects
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          A blend of offensive tooling, training platforms, and UI experiments. Each build focuses on solving a practical security pain point.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PROJECT_STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
            <p className="text-3xl font-semibold text-green-300 mt-2">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-3xl border border-green-500/20 bg-slate-900/40 p-6 flex flex-col gap-4 hover:border-green-400/40 hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.35em]">{project.type}</p>
                <h3 className="text-xl font-semibold text-slate-100 mt-1">{project.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">{project.year}</span>
                <span className={`text-xs font-semibold font-mono px-2 py-1 rounded-full border ${
                  project.status === "Live"
                    ? "border-green-400/60 text-green-300"
                    : project.status === "Active"
                    ? "border-cyan-400/60 text-cyan-200"
                    : "border-yellow-400/60 text-yellow-200"
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{project.desc}</p>

            <div className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-3">
              <p className="text-xs font-mono text-slate-400 mb-1">Impact</p>
              <p className="text-sm text-slate-200">{project.impact}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono uppercase tracking-wide px-3 py-1 rounded-full border border-green-500/30 text-green-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
