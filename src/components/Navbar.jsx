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

        {/* Navigation links */}
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
      </div>
    </nav>
  );
}
