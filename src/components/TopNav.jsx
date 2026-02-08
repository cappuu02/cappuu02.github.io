import { motion } from "framer-motion";

export default function TopNav({ items, active, onChange }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-20 px-6 md:px-12 pt-6"
    >
      <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 backdrop-blur-xl px-3 sm:px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                aria-pressed={isActive}
                className={`relative inline-flex items-center gap-2 rounded-2xl px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.35em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/70 flex-shrink-0 ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-400"
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-2xl transition ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 via-cyan-500 to-green-400 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
                      : "border border-slate-700/70 bg-slate-900/40 group-hover:border-green-400/40"
                  }`}
                ></span>
                <span className="relative text-sm sm:text-base leading-none">{item.icon}</span>
                <span className="relative whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
