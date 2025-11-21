import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      id="about"
      className="section-padding min-h-screen flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="font-mono text-primary">luca@portfolio:~$</span>{" "}
          <span>cat ./about.txt</span>
        </h2>

        <div className="panel font-mono text-sm md:text-[15px] space-y-3">
          <p>
            {">"} name: Luca
          </p>
          <p>
            {">"} current_studies: Cybersecurity @ Sapienza University of Rome
          </p>
          <p>
            {">"} bachelor: Computer Science (L-31) @ University of Perugia
          </p>
          <p>
            {">"} passion: building secure, modern and playful interfaces
          </p>
          <p>
            {">"} interests: security, front-end, clean design, motion, labs
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
