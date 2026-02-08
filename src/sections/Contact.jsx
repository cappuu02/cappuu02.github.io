// === Contact.jsx (updated with HTB & THM buttons) ===
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-green-400 mb-6 font-mono">
        $ Get In Touch
      </h2>

      <div className="space-y-4">
        {/* Email */}
        <motion.a
          href="mailto:luca.cappu@example.com"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="block w-full rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 py-3 px-4 font-mono text-center text-sm font-bold text-black hover:brightness-110 transition shadow-lg"
        >
          Send Email
        </motion.a>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <a
            href="https://github.com/cappuu02"
            target="_blank"
            className="rounded-lg border border-green-500/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-green-400 hover:bg-green-500/10 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/luca-cappu"
            target="_blank"
            className="rounded-lg border border-blue-500/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-blue-400 hover:bg-blue-500/10 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://t.me/cappuu02"
            target="_blank"
            className="rounded-lg border border-cyan-500/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-cyan-400 hover:bg-cyan-500/10 transition"
          >
            Telegram
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="rounded-lg border border-pink-500/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-pink-400 hover:bg-pink-500/10 transition"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="rounded-lg border border-cyan-400/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-cyan-300 hover:bg-cyan-400/10 transition"
          >
            Twitter
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            className="rounded-lg border border-green-600/40 bg-slate-800/30 py-2 px-3 text-center font-mono text-xs text-green-500 hover:bg-green-600/10 transition"
          >
            WhatsApp
          </a>
        </div>

        {/* Hacking Platforms */}
        <div className="pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 font-mono mb-3">~/hacker-platforms</p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://app.hackthebox.com/"
              target="_blank"
              className="rounded-lg bg-slate-800/30 border border-green-500/40 py-2 px-3 text-center font-mono text-xs text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_12px_rgba(0,255,0,0.4)] transition"
            >
              HackTheBox
            </a>
            <a
              href="https://tryhackme.com/"
              target="_blank"
              className="rounded-lg bg-slate-800/30 border border-red-500/40 py-2 px-3 text-center font-mono text-xs text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_12px_rgba(255,0,0,0.4)] transition"
            >
              TryHackMe
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// === Hero.jsx (rewritten) ===
// (Insert your full Hero code here)

// === About.jsx (rewritten) ===
// (Insert your full About code here)

// === Footer.jsx (rewritten) ===
// Footer now static, not fixed
// (Insert your full Footer code here)
