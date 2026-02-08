import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Loader from "./components/Loader";
import ProfileSidebar from "./components/ProfileSidebar";
import NoiseOverlay from "./components/NoiseOverlay";

// Professional Summary
const PROFESSIONAL_SUMMARY = "Cybersecurity student at Sapienza University of Rome, building upon a Bachelor's degree in Computer Science from the University of Perugia (104/110). My technical foundation began with a focused diploma in Business Information Systems at ITE Scarpellini. I am a determined professional who consistently sets high standards for personal growth and project execution, bringing a serious, goal-oriented approach to every challenge.";

// Work Experience
const WORK_EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Cybersecurity Analyst",
    company: "Freelance / Red Team",
    description:
      "Conduct incident simulations, purple teaming exercises, and develop actionable playbooks for SOC teams. Deliver executable evidence and remediation strategies.",
    highlights: ["Red Team Ops", "Incident Response", "Purple Team"]
  },
  {
    period: "2022 — 2024",
    role: "Security Researcher",
    company: "Sapienza CyberLab",
    description:
      "Developed proof-of-concepts for web and firmware vulnerabilities. Managed responsible disclosure processes and security analysis workflows.",
    highlights: ["Vulnerability Research", "PoC Development", "Disclosure"]
  },
  {
    period: "2020 — 2022",
    role: "Blue Team Intern",
    company: "Perugia CSIRT",
    description:
      "Infrastructure hardening, log correlation analysis, and SIEM rule tuning on open-source security stack. Incident response support.",
    highlights: ["SIEM Operations", "Log Analysis", "Hardening"]
  }
];

// Certifications
const CERTIFICATIONS = [
  { name: "CEH", issuer: "EC Council", year: "2023" },
  { name: "OSCP", issuer: "Offensive Security", year: "2022" },
  { name: "Security+", issuer: "CompTIA", year: "2021" },
  { name: "CySA+", issuer: "CompTIA", year: "2022" }
];

// Technical Skills by Category
const TECHNICAL_SKILLS = {
  "Languages": ["Python", "Go", "Bash", "Rust", "JavaScript"],
  "Security Tools": ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Ghidra", "Zeek"],
  "Frameworks": ["React", "Node.js", "FastAPI", "Django"],
  "Platforms": ["Linux", "AWS", "Docker", "Kubernetes"],
  "Specializations": ["Red Team Ops", "Threat Intelligence", "Network Security", "OT Security"]
};


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Professional Summary Component
function ProfessionalSummary() {
  return (
    <motion.section
      className="mb-12 pb-12 border-b border-[#1e293b]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-[#f1f5f9] mb-6 font-sans">Professional Summary</h2>
      <p className="text-[#cbd5e1] text-base leading-relaxed font-sans">
        {PROFESSIONAL_SUMMARY}
      </p>
    </motion.section>
  );
}

// Work Experience Timeline Component
function WorkExperience() {
  return (
    <motion.section
      className="mb-12 pb-12 border-b border-[#1e293b]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-[#f1f5f9] mb-8 font-sans">Work Experience</h2>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {WORK_EXPERIENCE.map((job, idx) => (
          <motion.div
            key={idx}
            className="flex gap-6 relative"
            variants={itemVariants}
          >
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6] mt-2 z-10" />
              {idx !== WORK_EXPERIENCE.length - 1 && (
                <div className="w-1 h-24 bg-gradient-to-b from-[#3b82f6] to-[#1e293b] mt-2" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="font-mono text-sm text-[#3b82f6] mb-1">{job.period}</div>
              <div className="mb-1">
                <h3 className="text-lg font-semibold text-[#f1f5f9] font-sans">{job.role}</h3>
                <p className="text-[#94a3b8] font-sans">{job.company}</p>
              </div>
              <p className="text-[#cbd5e1] text-sm mb-3 font-sans">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.highlights.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs bg-[#1e293b] text-[#3b82f6] border border-[#1e293b] rounded font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// Certifications Component
function Certifications() {
  return (
    <motion.section
      className="mb-12 pb-12 border-b border-[#1e293b]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-[#f1f5f9] mb-8 font-sans">Certifications</h2>
      <motion.div className="grid grid-cols-2 md:grid-cols-2 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={idx}
            className="p-4 border border-[#1e293b] rounded-lg bg-[#0f172a]/50 hover:bg-[#1e293b]/30 hover:border-[#3b82f6] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="font-mono text-sm text-[#3b82f6] mb-1">{cert.year}</div>
            <div className="text-lg font-semibold text-[#f1f5f9] font-sans">{cert.name}</div>
            <div className="text-sm text-[#94a3b8] mt-1 font-sans">{cert.issuer}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// Technical Skills Component
function TechnicalSkills() {
  return (
    <motion.section
      className="mb-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-[#f1f5f9] mb-8 font-sans">Technical Skills</h2>
      <motion.div className="space-y-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {Object.entries(TECHNICAL_SKILLS).map(([category, skills]) => (
          <motion.div key={category} variants={itemVariants}>
            <h3 className="text-sm font-semibold text-[#3b82f6] uppercase tracking-wide mb-3 font-mono">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-2 bg-[#1e293b] text-[#cbd5e1] text-sm rounded border border-[#334155] hover:border-[#3b82f6] hover:text-[#f1f5f9] transition-all duration-300 font-sans">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#0b1121] text-[#f1f5f9] font-sans" style={{ fontFamily: '"Inter", sans-serif' }}>
      <Loader />
      <NoiseOverlay />
      
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Left sidebar - Fixed on desktop */}
        <div className="w-full lg:w-96 lg:fixed lg:inset-y-0 lg:left-0 lg:overflow-y-auto z-20 bg-[#0b1121] border-r border-white/5">
          <ProfileSidebar />
        </div>

        {/* Right content - Scrollable */}
        <main className="w-full lg:ml-96 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 relative">
          <ProfessionalSummary />
          <WorkExperience />
          <Certifications />
          <TechnicalSkills />
          
          {/* Footer */}
          <motion.div
            className="mt-12 pt-8 border-t border-[#1e293b] text-center text-sm text-[#64748b]"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-sans">© 2024 Luca Cappu. All rights reserved.</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
