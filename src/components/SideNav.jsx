import { motion } from "framer-motion";
import useActiveSection, { SECTION_IDS } from "../hooks/useActiveSection";

export default function SideNav() {
  const active = useActiveSection();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5">
      {SECTION_IDS.map((id) => {
        const isActive = active === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            className="relative flex items-center justify-center"
          >
            <div
              className={`
                h-4 w-4 rounded-full border transition-all duration-300
                ${
                  isActive
                    ? "border-primary bg-primary shadow-[0_0_18px_rgba(34,197,94,0.9)] scale-125"
                    : "border-primary/40 bg-transparent hover:bg-primary/40 hover:scale-110"
                }
              `}
            />
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
