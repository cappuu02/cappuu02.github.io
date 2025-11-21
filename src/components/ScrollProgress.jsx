import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[35] h-[3px] bg-gradient-to-r from-primary via-secondary to-accent origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
