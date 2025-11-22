import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MatrixRain from "../components/MatrixRain";

// =============================
// SKILLS (card section)
// =============================
const SKILLS = [
  { name: "Linux", level: "Strong" },
  { name: "Networking", level: "Advanced" },
  { name: "Web Security", level: "Intermediate" },
  { name: "Python", level: "Intermediate" },
  { name: "Javascript", level: "Intermediate" },
  { name: "Burp Suite", level: "Advanced" },
];

// =============================
// SKILL PROGRESS BARS (new)
// =============================
const SKILL_PROGRESS = [
  { name: "Reverse Engineering", percent: 40 },
  { name: "Exploit Development", percent: 55 },
  { name: "CTF Skills", percent: 75 },
];

<MatrixRain opacity={0.35} />

// =============================
// MAIN COMPONENT
// =============================
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
    >
      {/* MATRIX RAIN BACKGROUND */}
      <MatrixRain />

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-display text-green-300 mb-4 drop-shadow-[0_0_10px_rgba(0,255,0,0.4)] text-center"
        >
          System Skills
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl text-green-200/80 mb-12"
        >
          Competenze stile <span className="text-green-400">Hacker CRT</span>,
          tra glow neon, Matrix rain e animazioni terminal-like.
        </motion.p>

        {/* SKILL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 justify-items-center">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="
                w-52 h-24 flex flex-col items-center justify-center
                bg-[#001204]/70 border border-green-500/40 rounded-xl
                backdrop-blur-sm font-mono text-green-300
                hover:brightness-125 hover:shadow-[0_0_15px_rgba(0,255,0,0.6)]
                transition cursor-default
                animate-[crtVibration_0.18s_ease-in-out_infinite_alternate]
              "
            >
              <p className="text-xl mb-1">{skill.name}</p>
              <p className="text-xs text-green-400">Level: {skill.level}</p>
            </motion.div>
          ))}
        </div>

        {/* NEW SECTION — PROGRESS BARS */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono text-green-300 mb-6"
        >
          Hacker Progress Status
        </motion.h3>

        <div className="w-full max-w-3xl space-y-6">
          {SKILL_PROGRESS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="w-full"
            >
              <p className="font-mono text-green-300 mb-1 flex items-center gap-2">
                <span className="text-green-400">▣</span> {skill.name}
              </p>

              {/* progress bar */}
              <div className="w-full h-4 bg-[#001204] border border-green-700/50 rounded-md overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-green-500/40 border-r-2 border-green-300 shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                />

                {/* "loading..." terminal text */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center text-[10px] text-green-400 font-mono"
                >
                  loading…
                </motion.span>
              </div>

              <p className="text-right text-green-400/70 text-xs font-mono mt-1">
                {skill.percent}% complete
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CRT EFFECT KEYFRAMES */}
      <style>{`
        @keyframes crtVibration {
          0% { transform: translate(0px, 0px); }
          100% { transform: translate(0.7px, -0.4px); }
        }
      `}</style>
    </section>
  );
}
