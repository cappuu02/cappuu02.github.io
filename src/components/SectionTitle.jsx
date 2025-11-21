import { motion } from "framer-motion";

const SectionTitle = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-10 text-center">
      <motion.p
        className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
