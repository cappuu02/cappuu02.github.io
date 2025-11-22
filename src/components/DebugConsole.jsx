import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DebugConsole() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // toggle con Ctrl + Shift + L
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40 max-w-md panel font-mono text-xs md:text-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
    >
      <div className="terminal-header">
        <span className="dot-red" />
        <span className="dot-yellow" />
        <span className="dot-green" />
        <span className="ml-2 text-[11px] text-slate-500">
          debug@console:~$
        </span>
      </div>
      <div className="terminal-body space-y-1">
        <p>{">"} secret console opened</p>
        <p>{">"} shortcut: Ctrl + Shift + L</p>
        <p>{">"} user: luca</p>
        <p>{">"} mood: learning · breaking · fixing</p>
        <p className="text-primary">
          {">"} tip: modificala per loggare i tuoi progetti, TODO o note.
        </p>
      </div>
    </motion.div>
  );
}
