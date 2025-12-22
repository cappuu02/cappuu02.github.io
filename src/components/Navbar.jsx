import { useState } from "react";
import useActiveSection, { SECTION_IDS } from "../hooks/useActiveSection";

const sectionCommands = {
  hero: 'cat ./home.jsx',
  about: 'cat ./about.jsx',
  skills: 'cat ./skills.jsx',
  projects: 'cat ./projects.jsx',
  contact: 'cat ./contact.jsx',
};


export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-40 w-full border-b border-slate-800/80 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Terminal dynamic label */}
        <div className="font-mono text-xs md:text-sm text-slate-300">
          <span className="text-primary">luca@portfolio</span>
          <span className="text-slate-500">:~$</span>{" "}
          <span className="ml-1">
            {sectionCommands[active] ?? "cat ./home.txt"}
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden gap-4 font-mono text-[11px] text-slate-400 md:flex">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`hover:text-primary transition ${
                active === id ? "text-primary" : ""
              }`}
            >
              [ {id} ]
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          className="md:hidden px-2 py-1 rounded bg-transparent text-slate-300 hover:text-primary"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Mobile overlay menu */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 md:hidden">
            <div className="flex flex-col items-center gap-6">
              {SECTION_IDS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`text-2xl font-mono text-slate-200 hover:text-primary transition ${
                    active === id ? "text-primary" : ""
                  }`}
                >
                  {id}
                </a>
              ))}

              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-sm text-slate-400 hover:text-slate-200"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
