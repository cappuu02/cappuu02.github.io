import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin, ChevronRight, Award, FolderGit2, ExternalLink, Shield } from 'lucide-react';

const MainContent = () => {
  // Unified timeline with experiences and education
  const timeline = [
    {
      id: 1,
      type: 'education',
      title: "Master's Degree in Cybersecurity",
      subtitle: 'Sapienza University of Rome',
      location: 'Rome, IT',
      period: '2025 - Present',
      description: 'Specialized program in cybersecurity, focusing on advanced techniques for system and network protection.',
      tags: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
      current: true,
    },
    {
      id: 2,
      type: 'education',
      title: "Bachelor's Degree in Computer Science",
      subtitle: 'University of Perugia',
      location: 'Perugia, IT',
      period: '2021 - 2024',
      description: 'Graduated with a score of 104/110. Thesis on a web application for a public institution in the Marche region as part of an EU project.',
      tags: ['Computer Science', 'Web Development', 'EU Project'],
      current: false,
    },
    {
      id: 3,
      type: 'education',
      title: "High School Diploma - Business Information Systems",
      subtitle: 'ITE Scarpellini',
      location: 'Foligno, IT',
      period: '2016 - 2021',
      description: 'Graduated with a score of 100/100. Training in business information systems, programming, and database management.',
      tags: ['Information Systems', 'Programming', 'Database'],
      current: false,
    },
  ];

  const certifications = [
    { name: 'ECDL', fullName: 'European Computer Driving Licence', year: '2021', status: 'active' },
    { name: 'CLA B2', fullName: 'English Language Certification - Level B2', year: '2024', status: 'active' },
  ];

  const projects = [
    {
      id: 1,
      name: 'ThreatHunter Pro',
      description: 'Automated threat hunting platform that correlates data from multiple SIEM sources using custom detection rules and ML-based anomaly detection.',
      tags: ['Python', 'Elasticsearch', 'Machine Learning'],
      link: '#',
    },
    {
      id: 2,
      name: 'VulnScanner CLI',
      description: 'Command-line vulnerability scanner with custom plugins for web application security testing and automated reporting.',
      tags: ['Go', 'REST API', 'Docker'],
      link: '#',
    },
    {
      id: 3,
      name: 'SOC Automation Toolkit',
      description: 'Collection of scripts and playbooks for automating common SOC tasks including log analysis, incident triage, and threat intelligence.',
      tags: ['Python', 'Ansible', 'SOAR'],
      link: '#',
    },
    {
      id: 4,
      name: 'Phishing Campaign Framework',
      description: 'Internal red team tool for conducting authorized phishing simulations with detailed analytics and awareness training integration.',
      tags: ['Node.js', 'React', 'PostgreSQL'],
      link: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
  };

  return (
    <motion.main
      className="w-full lg:w-[78%] lg:ml-[22%] min-h-screen p-6 lg:py-12 lg:px-12 lg:pr-16 bg-main-content bg-grid-pattern"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About Me Section */}
      <motion.section className="mb-14" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-[#f8fafc] mb-3">
          About Me
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-transparent rounded-full mb-6 animate-shimmer" />
        <p className="text-[#94a3b8] text-lg leading-relaxed">
          Hi, I'm <span className="text-[#f8fafc] font-semibold">Luca</span>. I'm currently pursuing a 
          <span className="text-[#22d3ee] font-medium"> Master's degree in Cybersecurity</span> at 
          <span className="text-[#22d3ee] font-medium">Sapienza University of Rome</span>. My passion for 
          technology and computer science has been with me since childhood, evolving into a dedicated path 
          in digital security. I consider myself a serious and meticulous professional, constantly staying 
          up-to-date with the challenges of the field. Below you can find my education, certifications, 
          and projects I've already completed!
        </p>
      </motion.section>

      {/* Timeline Section - Education */}
      <motion.section className="mb-14" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-[#f8fafc] mb-8">
          Education
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#22d3ee] via-[#a855f7]/60 to-[#22d3ee]/10 rounded-full animate-gradient" />

          {/* Timeline Items */}
          <div className="space-y-10">
            {timeline.map((item) => (
              <motion.div
                key={item.id}
                className="relative pl-10 group"
                variants={itemVariants}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                {/* Timeline Node */}
                <motion.div 
                  className={`absolute -left-[6px] top-1 w-[15px] h-[15px] rounded-full border-[3px] flex items-center justify-center ${
                    item.current 
                      ? 'bg-[#22d3ee] border-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.8),0_0_24px_rgba(34,211,238,0.4)] animate-data-flow' 
                      : 'bg-[#030712] border-[#22d3ee]/50 shadow-[0_0_8px_rgba(34,211,238,0.3)] group-hover:border-[#22d3ee] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.6)]'
                  } transition-all duration-300`}
                />

                {/* Type Icon */}
                <div className="absolute -left-[5px] top-[5px] w-[13px] h-[13px] flex items-center justify-center">
                  {item.type === 'work' ? (
                    <Briefcase className={`w-2 h-2 ${item.current ? 'text-[#030712]' : 'text-[#22d3ee]/70'}`} />
                  ) : (
                    <GraduationCap className={`w-2 h-2 ${item.current ? 'text-[#030712]' : 'text-[#22d3ee]/70'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Period & Type Badge */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Calendar className="w-3.5 h-3.5 text-[#22d3ee] drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                    <span className="font-mono text-xs text-[#22d3ee] tracking-wide">{item.period}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border shadow-[0_0_8px_rgba(34,211,238,0.2)] ${
                      item.type === 'work' 
                        ? 'bg-[#22d3ee]/10 text-[#22d3ee] border-[#22d3ee]/20' 
                        : 'bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                    }`}>
                      {item.type === 'work' ? 'WORK' : 'EDUCATION'}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#34d399]/20 text-[#34d399] rounded-full border border-[#34d399]/30">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#f8fafc] mb-1 flex items-center gap-2 group-hover:text-[#22d3ee] transition-colors">
                    {item.title}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Subtitle & Location */}
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <span className="text-[#94a3b8] font-medium">{item.subtitle}</span>
                    <span className="flex items-center gap-1 text-[#64748b] text-sm">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#64748b] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-3 py-1 rounded-full border transition-all cursor-default ${
                          item.type === 'work'
                            ? 'bg-[rgba(34,211,238,0.08)] text-[#22d3ee] border-[#22d3ee]/20 hover:bg-[rgba(34,211,238,0.15)]'
                            : 'bg-[rgba(168,85,247,0.08)] text-[#a855f7] border-[#a855f7]/20 hover:bg-[rgba(168,85,247,0.15)]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section className="mb-14" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-8 group">
          <Award className="w-6 h-6 text-[#22d3ee] drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] group-hover:animate-bounce-gentle" />
          <h2 className="text-2xl font-bold text-[#f8fafc]">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              className="group relative p-4 rounded-xl border border-[rgba(51,65,85,0.4)] bg-[rgba(15,23,42,0.4)] hover:border-[#22d3ee]/40 hover:bg-[rgba(34,211,238,0.05)] hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#22d3ee] drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                  <span className="font-bold text-[#f8fafc]">{cert.name}</span>
                </div>
                {cert.status === 'in-progress' ? (
                  <span className="text-[9px] px-2 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] rounded-full border border-[#f59e0b]/30 font-medium">
                    IN PROGRESS
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-[#64748b]">{cert.year}</span>
                )}
              </div>
              <p className="text-sm text-[#64748b] group-hover:text-[#94a3b8] transition-colors">
                {cert.fullName}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-3 mb-8 group">
          <FolderGit2 className="w-6 h-6 text-[#22d3ee] drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] group-hover:animate-bounce-gentle" />
          <h2 className="text-2xl font-bold text-[#f8fafc]">Projects</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              className="group block p-5 rounded-xl border border-[rgba(51,65,85,0.4)] bg-[rgba(15,23,42,0.4)] hover:border-[#22d3ee]/40 hover:bg-[rgba(34,211,238,0.05)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#f8fafc] group-hover:text-[#22d3ee] transition-colors flex items-center gap-2">
                  {project.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-[rgba(34,211,238,0.08)] text-[#22d3ee] border border-[#22d3ee]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
};

export default MainContent;
