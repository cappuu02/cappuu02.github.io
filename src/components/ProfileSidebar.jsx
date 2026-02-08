import { useState } from "react";
import { motion } from "framer-motion";
import FotoLaurea from '../img/Foto Laurea.jpg';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheck, FaDownload, FaMapMarkerAlt } from "react-icons/fa";

export default function ProfileSidebar() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate interaction
    setTimeout(() => {
      window.location.href = `mailto:luca.cappu@example.com?subject=Contact from ${formData.name}&body=${formData.message} (Email: ${formData.email})`;
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  };

  return (
    <aside className="w-full h-full bg-[#0b1121] border-b lg:border-b-0 lg:border-r border-white/5 px-6 py-10 flex flex-col relative z-20">
      
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            <img 
              src={FotoLaurea} 
              alt="Luca Cappu" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0b1121] animate-pulse" title="Available for work" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Luca Cappu</h1>
          <p className="text-blue-400 font-medium">Cybersecurity Analyst</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          <FaMapMarkerAlt className="text-blue-500" size={12} />
          <span>Rome · Remote EU</span>
        </div>
      </div>

      {/* Social Actions */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { icon: FaGithub, href: "https://github.com/cappuu02", label: "GitHub" },
          { icon: FaLinkedin, href: "https://linkedin.com/in/luca-cappu", label: "LinkedIn" },
          { icon: FaEnvelope, href: "mailto:luca.cappu@example.com", label: "Email" }
        ].map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 border border-white/5 hover:border-blue-500 transition-all duration-300"
            title={social.label}
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

      {/* Quick Contact Form */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="glass-card rounded-xl p-5 border border-white/5 bg-[#141b2d]/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quick Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <textarea 
              placeholder="Project details..." 
              required
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <button 
              type="submit" 
              disabled={status === "sending" || status === "success"}
              className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "success" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
              }`}
            >
              {status === "success" ? <FaCheck /> : <FaPaperPlane className={status === "sending" ? "animate-pulse" : ""} />}
              {status === "success" ? "Sent!" : status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Download CV */}
      <div className="mt-6">
        <a 
          href="/resume.pdf"
          className="group flex items-center justify-center gap-2 w-full py-3 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-sm font-medium"
        >
          <FaDownload className="text-slate-500 group-hover:text-blue-400 transition-colors" />
          Download Full CV
        </a>
        <p className="text-center text-xs text-slate-600 mt-4">© 2026 Luca Cappu</p>
      </div>
    </aside>
  );
}
