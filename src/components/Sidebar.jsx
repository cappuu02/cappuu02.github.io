import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Send,
  MapPin,
  Server,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import profileImg from '../assets/profile.jpg';

// API URL - cambia in produzione
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Custom icons for HTB and THM
const HackTheBoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.18 3.43L12 11.04 5.82 7.61 12 4.18zM5 8.81l6 3.33v6.05l-6-3.33V8.81zm14 6.05l-6 3.33v-6.05l6-3.33v6.05z"/>
  </svg>
);

const TryHackMeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 00-4.107 4.5 4.525 4.525 0 004.52 4.52h6.761a.625.625 0 100-1.25H4.762a3.27 3.27 0 01-3.27-3.27 3.27 3.27 0 012.97-3.257.625.625 0 00.553-.504C5.347 3.18 7.772 1.25 10.705 1.25c3.356 0 6.088 2.732 6.088 6.088a.625.625 0 001.25 0c0-4.048-3.29-7.338-7.338-7.338zm8.347 8.672a3.27 3.27 0 00-3.082 2.192.625.625 0 00.383.796c.329.109.687-.063.796-.383a2.02 2.02 0 011.903-1.355 2.02 2.02 0 012.018 2.018 2.02 2.02 0 01-2.018 2.018h-1.688a.625.625 0 100 1.25h1.688a3.27 3.27 0 003.27-3.27 3.27 3.27 0 00-3.27-3.266zM9.896 11.6a.625.625 0 00-.625.625v9.344l-2.138-1.706a.625.625 0 00-.78.976l3.125 2.5a.625.625 0 00.797-.002l3.125-2.5a.625.625 0 10-.782-.976l-2.097 1.677v-9.313a.625.625 0 00-.625-.625z"/>
  </svg>
);

const Sidebar = () => {
  const allLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: '#22d3ee' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#22d3ee' },
    { icon: Mail, href: 'mailto:luca@example.com', label: 'Email', color: '#22d3ee' },
    { icon: HackTheBoxIcon, href: 'https://hackthebox.com', label: 'Hack The Box', color: '#9fef00' },
    { icon: TryHackMeIcon, href: 'https://tryhackme.com', label: 'TryHackMe', color: '#ff4b4b' },
  ];

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' }); // 'loading', 'success', 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' }); // Reset form
        // Reset status after 5 seconds
        setTimeout(() => setStatus({ type: null, message: '' }), 5000);
      } else {
        setStatus({ type: 'error', message: data.message || 'Errore durante l\'invio' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Impossibile connettersi al server' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.aside
      className="w-full lg:w-[22%] lg:min-w-[280px] lg:fixed lg:left-0 lg:top-0 lg:h-screen glass border-r border-[rgba(51,65,85,0.4)] px-6 py-8 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Section - Profile */}
      <motion.div className="flex flex-col items-center flex-shrink-0 order-1" variants={itemVariants}>
        {/* Profile Image */}
        <div className="relative mb-5 animate-float-slow">
          <div className="w-36 h-36 rounded-full border-2 border-[#22d3ee]/50 overflow-hidden glow-cyan bg-gradient-to-br from-[#22d3ee]/10 to-transparent p-[3px]">
            <img 
              src={profileImg} 
              alt="Luca Cappu" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#34d399] rounded-full border-[3px] border-[#0f172a] animate-pulse-glow">
            <span className="absolute inset-0 rounded-full bg-[#34d399] animate-radar-ping" />
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-2xl font-bold text-[#f8fafc] mb-1">Luca Cappu</h1>
        <p className="text-[#22d3ee] font-mono text-sm mb-3 flex items-center gap-1">
          Cybersecurity Student<span className="animate-cursor text-[#a855f7]">_</span>
        </p>
        
        {/* Location Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.2)] shadow-[0_0_10px_rgba(34,211,238,0.15)] hover:animate-shimmer">
          <MapPin className="w-3.5 h-3.5 text-[#22d3ee] animate-bounce-gentle" />
          <span className="text-[#94a3b8] text-sm">Rome, Italy</span>
        </div>
      </motion.div>

      {/* Divider 1 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent my-6 flex-shrink-0 animate-shimmer order-2" />

      {/* Social Links */}
      <motion.div className="flex-shrink-0 order-3" variants={itemVariants}>
        <h3 className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-3 text-center">
          Connect & Platforms
        </h3>
        <div className="flex justify-center gap-2">
          {allLinks.map(({ icon: Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[rgba(51,65,85,0.5)] bg-[rgba(15,23,42,0.5)] text-[#64748b] transition-all duration-200 shadow-[0_0_6px_rgba(34,211,238,0.15)]"
              aria-label={label}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = `${color}60`;
                e.currentTarget.style.backgroundColor = `${color}10`;
                e.currentTarget.style.boxShadow = `0 0 12px ${color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.borderColor = 'rgba(51,65,85,0.5)';
                e.currentTarget.style.backgroundColor = 'rgba(15,23,42,0.5)';
                e.currentTarget.style.boxShadow = '0 0 6px rgba(34,211,238,0.15)';
              }}
            >
              {typeof Icon === 'function' && Icon.name ? <Icon className="w-4 h-4" /> : <Icon />}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Divider 2 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent my-6 flex-shrink-0 animate-shimmer order-4 lg:order-4" />

      {/* Footer - Download & Info - Before Quick Message on mobile */}
      <motion.div className="flex-shrink-0 pt-5 mt-5 border-t border-[rgba(51,65,85,0.3)] order-5 lg:order-6" variants={itemVariants}>
        <motion.button
          className="w-full py-3 bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#a855f7] text-[#030712] text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#22d3ee]/20 hover:shadow-[#a855f7]/30 transition-shadow animate-gradient"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4 group-hover:animate-bounce-gentle" />
          Download CV
        </motion.button>
        
        {/* Raspberry Pi Badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-mono text-[#475569]">
          <Server className="w-3 h-3 text-[#22d3ee]/70 animate-spin-slow" />
          <span>Hosted on</span>
          <span className="text-[#a78bfa]">🥧 Raspberry Pi</span>
        </div>

        <p className="text-center text-[#3f4a5a] text-[9px] mt-3 font-mono">
          © 2026 Luca Cappu
        </p>
      </motion.div>

      {/* Contact Form - Last on mobile, middle on desktop */}
      <motion.div className="flex-1 flex flex-col min-h-0 order-6 lg:order-5 mt-6 lg:mt-0" variants={itemVariants}>
        <h3 className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-3 text-center flex-shrink-0">
          Quick Message
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            required
            disabled={status.type === 'loading'}
            className="w-full bg-[rgba(15,23,42,0.7)] border border-[rgba(51,65,85,0.4)] rounded-lg py-2.5 px-4 text-sm text-[#f8fafc] placeholder-[#475569] focus:outline-none focus:border-[#22d3ee]/50 transition-colors disabled:opacity-50"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            disabled={status.type === 'loading'}
            className="w-full bg-[rgba(15,23,42,0.7)] border border-[rgba(51,65,85,0.4)] rounded-lg py-2.5 px-4 text-sm text-[#f8fafc] placeholder-[#475569] focus:outline-none focus:border-[#22d3ee]/50 transition-colors disabled:opacity-50"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message..."
            required
            disabled={status.type === 'loading'}
            className="w-full flex-1 min-h-[60px] bg-[rgba(15,23,42,0.7)] border border-[rgba(51,65,85,0.4)] rounded-lg py-2.5 px-4 text-sm text-[#f8fafc] placeholder-[#475569] focus:outline-none focus:border-[#22d3ee]/50 transition-colors resize-none disabled:opacity-50"
          />
          
          {/* Status feedback */}
          {status.type && (
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
              status.type === 'success' ? 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30' :
              status.type === 'error' ? 'bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/30' :
              'bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/30'
            }`}>
              {status.type === 'success' && <CheckCircle className="w-3.5 h-3.5" />}
              {status.type === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
              {status.type === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{status.type === 'loading' ? 'Invio in corso...' : status.message}</span>
            </div>
          )}
          
          <motion.button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full py-2.5 bg-[rgba(34,211,238,0.1)] border border-[#22d3ee]/30 rounded-lg text-sm text-[#22d3ee] font-medium flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:bg-[rgba(34,211,238,0.15)] hover:border-[#22d3ee]/50 hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={status.type !== 'loading' ? { scale: 1.01 } : {}}
            whileTap={status.type !== 'loading' ? { scale: 0.99 } : {}}
          >
            {status.type === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {status.type === 'loading' ? 'Invio...' : 'Send'}
          </motion.button>
        </form>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
