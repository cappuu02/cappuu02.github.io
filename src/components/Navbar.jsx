const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full border-b border-slate-800/80 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="font-mono text-xs md:text-sm text-slate-300">
          <span className="text-primary">luca@portfolio</span>
          <span className="text-slate-500">:~$</span>{" "}
          <span className="hidden sm:inline">cat ./about.txt</span>
        </div>
        <div className="hidden gap-4 font-mono text-[11px] text-slate-400 md:flex">
          <a href="#hero" className="hover:text-primary transition">
            [ home ]
          </a>
          <a href="#about" className="hover:text-primary transition">
            [ about ]
          </a>
          <a href="#skills" className="hover:text-primary transition">
            [ skills ]
          </a>
          <a href="#projects" className="hover:text-primary transition">
            [ projects ]
          </a>
          <a href="#contact" className="hover:text-primary transition">
            [ contact ]
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
