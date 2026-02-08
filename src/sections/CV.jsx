import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2024 - Present",
    title: "Master's in Cybersecurity",
    company: "Sapienza University of Rome",
    description: "Specialized studies in offensive security, network penetration testing, and exploit development",
    type: "education",
    skills: ["Offensive Security", "Network Analysis", "Exploit Dev"]
  },
  {
    year: "2023",
    title: "Bachelor's in Computer Science",
    company: "University of Perugia",
    description: "Comprehensive CS education with focus on system programming and security fundamentals. Final Grade: 104/110",
    type: "education",
    skills: ["Algorithms", "Systems", "Networking"]
  },
  {
    year: "2024",
    title: "VulnScan Toolkit",
    company: "Personal Project",
    description: "Developed custom automation tool for vulnerability discovery and scanning. Integrated Nmap, regex parsing, and automated reporting engine for security assessments.",
    type: "project",
    skills: ["Python", "Nmap", "Security Automation"]
  },
  {
    year: "2023 - 2024",
    title: "CyberRange Lab",
    company: "Personal Project",
    description: "Built isolated penetration testing environment using VMs with Active Directory, Kali Linux, and vulnerable applications for learning and testing purposes.",
    type: "project",
    skills: ["VMware", "Active Directory", "Kali Linux", "Networking"]
  },
  {
    year: "2024",
    title: "WebSec Playground",
    company: "Personal Project",
    description: "Created interactive web security training platform simulating real-world vulnerabilities including XSS, SQL Injection, and CSRF attacks with Burp Suite integration.",
    type: "project",
    skills: ["Node.js", "Express", "Web Security", "Burp Suite"]
  },
  {
    year: "2023 - Present",
    title: "CTF Competitor",
    company: "HackTheBox & TryHackMe",
    description: "Active participant in Capture The Flag competitions, consistently ranking in top percentiles. Specializing in web security and binary exploitation challenges.",
    type: "achievement",
    skills: ["CTF", "Reverse Engineering", "Exploit Development"]
  },
];

const CERTIFICATIONS = [
  {
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    year: "2024",
    credentialId: "ECC1234567890",
    status: "Active",
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing"]
  },
  {
    title: "OSCP (Offensive Security Certified Professional)",
    issuer: "Offensive Security",
    year: "2024",
    credentialId: "OSCP-12345",
    status: "Active",
    skills: ["Penetration Testing", "Exploit Development", "System Hacking"]
  },
  {
    title: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2023",
    credentialId: "SEC-001-2023",
    status: "Active",
    skills: ["Network Security", "Cryptography", "Access Control"]
  },
  {
    title: "HackTheBox Pro Badge",
    issuer: "HackTheBox",
    year: "2023",
    credentialId: "HTB-PRO-2023",
    status: "Active",
    skills: ["CTF", "Penetration Testing", "Security Research"]
  },
];

const PROJECTS = [
  {
    title: "VulnScan Toolkit",
    description: "Automated vulnerability discovery and scanning tool with comprehensive reporting capabilities.",
    technologies: ["Python", "Nmap", "Regex", "Security"],
    year: "2024",
    status: "Completed",
    certified: false
  },
  {
    title: "CyberRange Lab",
    description: "Isolated penetration testing environment with Active Directory, vulnerable services, and attack simulation.",
    technologies: ["VMware", "Kali Linux", "AD", "Networking"],
    year: "2023-2024",
    status: "Active",
    certified: true
  },
  {
    title: "WebSec Playground",
    description: "Interactive web security training platform simulating XSS, SQLi, CSRF, and other OWASP vulnerabilities.",
    technologies: ["Node.js", "Express", "JavaScript", "Burp Suite"],
    year: "2024",
    status: "Completed",
    certified: false
  },
  {
    title: "Portfolio Website",
    description: "Modern, interactive CV website with hacker aesthetics. Responsive design with dark theme and real-time animations.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    year: "2024-2025",
    status: "In Progress",
    certified: false
  },
];

const TimelineItem = ({ item, index, isLast }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'education': return {
        border: 'border-cyan-500/60',
        bg: 'bg-cyan-500/10',
        hover: 'hover:bg-cyan-500/15',
        shadow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]',
        dot: 'bg-cyan-400',
        glow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]',
        badge: 'border border-cyan-500/40 bg-cyan-500/15 text-cyan-100'
      };
      case 'project': return {
        border: 'border-green-500/60',
        bg: 'bg-green-500/10',
        hover: 'hover:bg-green-500/15',
        shadow: 'hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]',
        dot: 'bg-green-400',
        glow: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]',
        badge: 'border border-green-500/40 bg-green-500/15 text-green-100'
      };
      case 'achievement': return {
        border: 'border-yellow-500/60',
        bg: 'bg-yellow-500/10',
        hover: 'hover:bg-yellow-500/15',
        shadow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]',
        dot: 'bg-yellow-400',
        glow: 'shadow-[0_0_15px_rgba(234,179,8,0.6)]',
        badge: 'border border-yellow-500/40 bg-yellow-500/15 text-yellow-100'
      };
      default: return {
        border: 'border-slate-500/60',
        bg: 'bg-slate-500/10',
        hover: 'hover:bg-slate-500/20',
        shadow: 'hover:shadow-[0_0_20px_rgba(100,116,139,0.3)]',
        dot: 'bg-slate-400',
        glow: 'shadow-[0_0_10px_rgba(100,116,139,0.5)]',
        badge: 'border border-slate-500/40 bg-slate-500/20 text-slate-200'
      };
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'education': return '🎓';
      case 'project': return '💻';
      case 'achievement': return '🏆';
      default: return '▪';
    }
  };

  const typeLabel = {
    education: 'Percorso Accademico',
    project: 'Project Highlight',
    achievement: 'Achievement'
  }[item.type] || 'Experience';

  const colors = getTypeColor(item.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative pl-14 sm:pl-20 lg:pl-32"
    >
      <div className="absolute left-6 sm:left-10 lg:left-12 top-0 bottom-0 flex items-start pointer-events-none">
        <div className="flex flex-col items-center w-px min-h-full">
          <div className={`w-4 h-4 rounded-full ${colors.dot} ${colors.glow} border-4 border-slate-900 mt-4`}></div>
          {!isLast && (
            <div className="flex-1 w-px bg-gradient-to-b from-slate-700/70 via-slate-700/40 to-transparent mt-2"></div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <div className="md:w-56">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">
            {item.year}
          </p>
          <p className="text-sm text-green-300 font-mono mt-1">
            {item.company}
          </p>
        </div>

        <div className={`flex-1 border-2 ${colors.border} ${colors.bg} rounded-xl p-5 backdrop-blur-sm transition-all duration-300 ${colors.hover} ${colors.shadow}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="text-xl">{getTypeIcon(item.type)}</span>
              {item.title}
            </h3>
            <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full ${colors.badge}`}>
              {typeLabel}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mt-3">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="text-xs px-2.5 py-1 bg-slate-800/60 border border-slate-700/60 rounded-full text-slate-200 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const getProjectColor = (status, certified) => {
    if (certified) {
      return { border: 'border-blue-500/40', bg: 'from-blue-900/20 to-blue-800/10', hover: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]', accent: 'text-blue-400', accentBg: 'bg-blue-500/10 border-blue-500/30', icon: '🏅' };
    }
    if (status === 'Completed') {
      return { border: 'border-green-500/40', bg: 'from-green-900/20 to-green-800/10', hover: 'hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]', accent: 'text-green-400', accentBg: 'bg-green-500/10 border-green-500/30', icon: '✅' };
    }
    if (status === 'Active' || status === 'In Progress') {
      return { border: 'border-yellow-500/40', bg: 'from-yellow-900/20 to-yellow-800/10', hover: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]', accent: 'text-yellow-400', accentBg: 'bg-yellow-500/10 border-yellow-500/30', icon: '🚀' };
    }
    return { border: 'border-slate-500/40', bg: 'from-slate-900/20 to-slate-800/10', hover: 'hover:shadow-[0_0_25px_rgba(100,116,139,0.2)]', accent: 'text-slate-400', accentBg: 'bg-slate-500/10 border-slate-500/30', icon: '📦' };
  };

  const colors = getProjectColor(project.status, project.certified);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg overflow-hidden transition-all duration-300 ${colors.hover} hover:border-opacity-100`}
    >
      {/* Accent gradient corner */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none`}>
        <div className={`w-full h-full rounded-full blur-3xl ${colors.accent.replace('text', 'bg')}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 space-y-3">
        {/* Icon + Status Row */}
        <div className="flex items-start justify-between">
          <span className="text-3xl">{colors.icon}</span>
          <span className={`text-xs font-mono px-3 py-1.5 rounded-full font-semibold ${
            project.status === 'Completed' ? 'bg-green-500/30 text-green-300 border border-green-500/50' :
            project.status === 'Active' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' :
            'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-slate-50 transition">
            {project.title}
          </h3>
          <div className={`h-1 w-12 rounded-full ${colors.accent.replace('text', 'bg')} opacity-60`}></div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Year Badge */}
        <div className="flex items-center gap-2 pt-1">
          <span className={`text-xs font-mono px-2.5 py-1 rounded ${colors.accentBg} border ${colors.accent}`}>
            {project.year}
          </span>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className={`text-xs px-2.5 py-1 rounded-full font-mono ${colors.accentBg} ${colors.accent} hover:bg-opacity-30 transition`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${colors.accentBg} ${colors.accent}`}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ cert, index }) => {
  const getCertColor = (issuer) => {
    if (issuer.includes('EC-Council')) return { border: 'border-blue-500/40', bg: 'from-blue-900/20 to-blue-800/10', hover: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]', accent: 'text-blue-400', accentBg: 'bg-blue-500/10 border-blue-500/30', icon: '🛡️', ribbon: 'bg-blue-500/30' };
    if (issuer.includes('Offensive')) return { border: 'border-red-500/40', bg: 'from-red-900/20 to-red-800/10', hover: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]', accent: 'text-red-400', accentBg: 'bg-red-500/10 border-red-500/30', icon: '⚔️', ribbon: 'bg-red-500/30' };
    if (issuer.includes('CompTIA')) return { border: 'border-amber-500/40', bg: 'from-amber-900/20 to-amber-800/10', hover: 'hover:shadow-[0_0_20px_rgba(217,119,6,0.2)]', accent: 'text-amber-400', accentBg: 'bg-amber-500/10 border-amber-500/30', icon: '📜', ribbon: 'bg-amber-500/30' };
    return { border: 'border-purple-500/40', bg: 'from-purple-900/20 to-purple-800/10', hover: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]', accent: 'text-purple-400', accentBg: 'bg-purple-500/10 border-purple-500/30', icon: '🏆', ribbon: 'bg-purple-500/30' };
  };

  const colors = getCertColor(cert.issuer);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg overflow-hidden transition-all duration-300 ${colors.hover} hover:border-opacity-100`}
    >
      {/* Ribbon - Top right */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.ribbon} opacity-30 rounded-bl-3xl transform rotate-0`}></div>

      {/* Content */}
      <div className="relative z-10 p-5 space-y-3">
        {/* Icon + Status Row */}
        <div className="flex items-start justify-between">
          <span className="text-4xl drop-shadow-lg">{colors.icon}</span>
          <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-semibold ${colors.accentBg} ${colors.accent}`}>
            {cert.status}
          </span>
        </div>

        {/* Title with underline */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-slate-50 transition">
            {cert.title}
          </h3>
          <div className={`h-1.5 w-10 rounded-full ${colors.accent.replace('text', 'bg')} opacity-70 mt-1`}></div>
        </div>

        {/* Issuer as badge */}
        <div className={`inline-block px-3 py-1.5 rounded-full text-xs font-mono ${colors.accentBg} ${colors.accent}`}>
          {cert.issuer}
        </div>

        {/* Credential ID - highlighted */}
        {cert.credentialId && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-2.5 backdrop-blur-sm">
            <p className="text-xs text-slate-400 font-mono mb-1">Credential ID</p>
            <p className={`text-xs font-mono font-semibold ${colors.accent} break-all`}>
              {cert.credentialId}
            </p>
          </div>
        )}

        {/* Year badge */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-slate-400">Issued</span>
          <span className="text-xs font-mono font-semibold text-slate-300">{cert.year}</span>
        </div>

        {/* Skills/Competencies */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
          {cert.skills.map((skill, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-full font-mono ${colors.accentBg} ${colors.accent} hover:bg-opacity-40 transition`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${colors.accent.replace('text', 'via')} to-transparent opacity-50`}></div>
    </motion.div>
  );
};

export default function CV() {
  return (
    <section id="journey" className="w-full pb-8">
      {/* HEADER - INTRO */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 pb-8 border-b border-green-500/30 mb-8"
      >
        <h1 className="font-display text-5xl font-bold text-green-400 glitch" data-text="Luca Cappu">
          Luca Cappu
        </h1>
        <p className="text-green-300 font-mono text-base">Cybersecurity Specialist</p>
        <p className="text-slate-300 leading-relaxed text-sm max-w-3xl">
          Master's student in Cybersecurity at Sapienza University with a Bachelor's degree in Computer Science (104/110). Specialized in offensive security, reverse engineering, and modern interface design. Passionate about building secure systems and hacker-oriented aesthetics.
        </p>
      </motion.section>

      {/* HORIZONTAL ALTERNATING TIMELINE SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="font-mono text-base font-bold text-green-400 mb-6 flex items-center gap-2">
          <span className="text-cyan-400">▶</span> PROFESSIONAL JOURNEY
        </h2>
        
        {/* Horizontal scrolling container */}
        <div className="relative overflow-x-auto pb-4 -mx-6 px-6">
          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-green-500/20 via-cyan-500/30 to-yellow-500/20 -translate-y-1/2 pointer-events-none"></div>
          
          {/* Timeline items - horizontal flex */}
          <div className="flex gap-8 items-center min-w-max py-4">
            {TIMELINE.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
        
        <p className="text-xs text-slate-400 font-mono mt-2">← Scorri orizzontalmente per esplorare il percorso →</p>
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="border-t border-slate-700/30 pt-8"
      >
        <h2 className="font-mono text-base font-bold text-green-400 mb-4 flex items-center gap-2">
          <span className="text-cyan-400">▶</span> PROJECT PORTFOLIO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.section>

      {/* CERTIFICATIONS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="border-t border-slate-700/30 pt-8 mt-8"
      >
        <h2 className="font-mono text-base font-bold text-purple-400 mb-4 flex items-center gap-2">
          <span className="text-purple-400">▶</span> CERTIFICATIONS & CREDENTIALS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </motion.section>

      {/* FOOTER - MINIMAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center pt-8 mt-8 border-t border-slate-700/50"
      >
        <p className="text-xs text-slate-500 font-mono">
          {`root@portfolio ~ $ cv --version 3.3 | Horizontal Timeline + Projects + Certifications | Crafted with ❤️ and hacker aesthetics`}
        </p>
      </motion.div>
    </section>
  );
}
