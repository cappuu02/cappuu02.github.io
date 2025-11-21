import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Compiling brain.exe...",
  "Checking firewall rules...",
  "Spawning UI process...",
  "Hardening surface...",
  "Almost ready...",
];

export default function Loader() {
  const [done, setDone] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setIdx((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 450);

    const finish = setTimeout(() => setDone(true), 2600);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="panel max-w-md w-[90%]">
            <div className="terminal-header">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
              <span className="ml-2 text-[11px] text-slate-500">
                luca@portfolio:~$ boot sequence
              </span>
            </div>
            <div className="terminal-body space-y-1">
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {">"} {messages[idx]}
              </motion.p>
              <motion.p
                className="text-primary"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {">"} loading interface<span className="ml-1">▊</span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
