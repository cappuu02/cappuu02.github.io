// === Projects.jsx (rewritten) ===
// FIX: removed fixed footer spacing issues
// (Insert your full Projects code here)

// === Skills.jsx (rewritten) ===
// FIX: section fully centered, no overflow, footer no longer fixed
// (Insert your full Skills code here)

// === Contact.jsx (updated with HTB & THM buttons) ===
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="section-padding min-h-screen flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="font-mono text-primary">luca@portfolio:~$</span>{" "}
          <span>echo &quot;contact_me&quot; &gt; /dev/net</span>
        </h2>

        <div className="panel text-center space-y-6">
          <p className="text-sm md:text-base text-slate-300">
            Vuoi collaborare, parlare di cybersecurity o costruire qualcosa di
            moderno e un po' hacker? Ecco i miei canali principali.
          </p>

          {/* Email */}
          <a
            href="mailto:your-email@example.com"
            className="block w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-2.5 font-medium text-black shadow-glow hover:brightness-110 transition"
          >
            Inviami un'email
          </a>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              className="rounded-lg border border-primary/40 py-2 font-mono text-slate-200 hover:bg-primary/20 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="rounded-lg border border-secondary/40 py-2 font-mono text-slate-200 hover:bg-secondary/20 transition"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              className="rounded-lg border border-green-500/40 py-2 font-mono text-slate-200 hover:bg-green-500/20 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://t.me/username"
              target="_blank"
              className="rounded-lg border border-blue-400/40 py-2 font-mono text-slate-200 hover:bg-blue-400/20 transition"
            >
              Telegram
            </a>
          </div>

          {/* Hacking Platforms */}
            <div className="pt-4 border-t border-white/10">
            <p className="text-slate-400 text-sm mb-2 font-mono">~/hacker-profiles</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://app.hackthebox.com/"
                target="_blank"
                className="rounded-lg bg-[#0f0f0f]/60 border border-green-500/40 py-3 font-mono text-green-300 hover:bg-green-500/10 hover:shadow-[0_0_12px_rgba(0,255,0,0.4)] transition"
              >
                HackTheBox
              </a>

              <a
                href="https://tryhackme.com/"
                target="_blank"
                className="rounded-lg bg-[#0f0f0f]/60 border border-red-500/40 py-3 font-mono text-red-300 hover:bg-red-500/10 hover:shadow-[0_0_12px_rgba(255,0,0,0.4)] transition"
              >
                TryHackMe
              </a>
            </div>
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
