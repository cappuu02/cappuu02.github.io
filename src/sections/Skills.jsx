import { motion } from "framer-motion";

const skills = [
  "Cybersecurity basics",
  "Network defense & IDS",
  "Penetration testing (intro)",
  "Linux & Bash",
  "Python",
  "JavaScript / React",
  "Vite / SPA",
  "TailwindCSS",
  "Framer Motion",
  "Git & GitHub",
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="section-padding min-h-screen flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="font-mono text-primary">luca@portfolio:~$</span>{" "}
          <span>ls ./skills</span>
        </h2>

        <div className="panel">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-full border border-primary/40 bg-bg px-3 py-1 text-xs md:text-[13px] font-mono text-slate-200 hover:bg-primary/15 transition"
                whileHover={{ scale: 1.06 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
