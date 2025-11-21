import { motion } from "framer-motion";

const projects = [
  {
    title: "Network Defense Lab",
    desc: "Virtual lab with IDS, VPN and firewall rules to explore detection and hardening.",
    tag: "security-lab",
  },
  {
    title: "Windows Security Playground",
    desc: "Privilege escalation, credential dumping and defense testing in Windows environments.",
    tag: "windows-security",
  },
  {
    title: "Personal Portfolio",
    desc: "This very site: a hacker-flavoured, animated portfolio built with React, Vite and Tailwind.",
    tag: "front-end",
  },
];

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="section-padding min-h-screen flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="font-mono text-primary">luca@portfolio:~$</span>{" "}
          <span>tail ./projects.log</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, index) => (
            <motion.article
              key={p.title}
              className="panel flex flex-col justify-between bg-terminal/90"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <h3 className="font-mono text-sm text-primary mb-2">
                  [{p.tag}]
                </h3>
                <p className="font-semibold text-sm md:text-base">
                  {p.title}
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-300">
                  {p.desc}
                </p>
              </div>
              <p className="mt-4 text-[11px] text-slate-500 font-mono">
                {">"} status: <span className="text-primary">online</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
