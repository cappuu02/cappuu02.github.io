import { motion } from "framer-motion";

export default function SplitText({ text, delay = 0 }) {
  const letters = text.split("");

  return (
    <span className="inline-block">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{
            opacity: 0,
            y: 20,
            rotateX: -90,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: delay + i * 0.035,
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
