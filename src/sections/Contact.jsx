import { motion } from "framer-motion";

const Contact = () => {
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
          <span>echo &quot;hi&quot; &gt; /dev/mail</span>
        </h2>

        <div className="panel text-center space-y-4">
          <p className="text-sm md:text-base text-slate-300">
            Vuoi collaborare, parlare di cybersecurity o costruire qualcosa di
            moderno (e un po&apos; hacker)?  
            Mandami pure un messaggio.
          </p>

          <a
            href="mailto:your-email@example.com"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-2.5 text-sm font-medium text-black shadow-glow hover:brightness-110 transition"
          >
            Inviami un&apos;email
          </a>

          <p className="text-[11px] text-slate-500 font-mono">
            {">"} P.S.: puoi cambiare l&apos;indirizzo email direttamente nel
            codice.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
