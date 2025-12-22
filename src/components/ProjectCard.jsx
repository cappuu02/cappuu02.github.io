import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      className="glass group flex flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-1 w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div>
        <h3 className="font-display text-base sm:text-lg font-semibold text-slate-50">
          {project.title}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-900/60 px-3 py-1 text-[11px] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-between rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          View project
          <span className="ml-2 text-primary">↗</span>
        </a>
      )}
    </motion.article>
  );
};

export default ProjectCard;
