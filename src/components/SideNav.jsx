import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sections = ["hero", "about", "skills", "projects", "contact"];

export default function SideNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      for (let s of sections) {
        const el = document.getElementById(s);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          setActive(s);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-30 -translate-y-1/2 space-y-3 md:right-6">
      {sections.map((s) => (
        <motion.a
          key={s}
          href={`#${s}`}
          className="block"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full border border-primary/40 transition-all duration-300 ${
              active === s
                ? "bg-primary shadow-[0_0_12px_rgba(34,197,94,0.9)] scale-125"
                : "bg-bg"
            }`}
          ></div>
        </motion.a>
      ))}
    </div>
  );
}
