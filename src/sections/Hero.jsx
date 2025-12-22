import { motion } from "framer-motion";
import SplitText from "../components/SplitText";

const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="section-padding min-h-screen flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 sm:gap-12 md:flex-row md:gap-16">
        {/* LEFT */}
        <div className="flex-1">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              <span
                className="glitch text-primary"
                data-text="Hi, I'm Luca"
              >
                Hi, I'm Luca
              </span>

            <br />
              <SplitText
                text="Student and aspiring cybersecurity specialist."
                delay={0.6}
              />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-sm sm:text-base md:text-base text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            I earned a Bachelor's degree in Computer Science (L-31) at the University of Perugia with a grade of 104, and I'm continuing my studies with a specialization in Cybersecurity at Sapienza University of Rome. I have a deep passion for interface design: I prefer a dark, hacker-oriented style while pursuing a clean, modern aesthetic with careful attention to detail.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-medium text-black shadow-glow hover:brightness-110 transition"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-primary/40 bg-terminal/80 px-6 py-2.5 text-sm font-medium text-slate-100 hover:bg-terminal/60 transition"
            >
              Contact me
            </a>
          </motion.div>

          {/* mini terminal info */}
          <motion.div
            className="mt-8 panel max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="terminal-header">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
              <span className="ml-2 text-[11px] text-slate-500">
                luca@portfolio:~$ whoami
              </span>
            </div>
            <div className="terminal-body space-y-1">
              <p>{">"} role: cybersecurity student</p>
              <p>{">"} location: Rome & Perugia, Italy</p>
              <p>{">"} focus: security, front-end, clean UIs</p>
              <p className="text-primary">
                {">"} status: learning · building · breaking · fixing
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT – PROFILE IMAGE */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <motion.div
            className="relative"
            style={{ perspective: 1000 }}
            whileHover={{ rotateY: 8, rotateX: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-gradient-to-br from-primary/25 via-secondary/25 to-accent/25 blur-3xl opacity-80" />

            <motion.img
              src="/profile.jpg"
              alt="Luca"
              className="relative z-10 h-40 w-40 sm:h-56 sm:w-56 md:h-80 md:w-80 rounded-full border border-primary/40 shadow-2xl object-cover max-w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
