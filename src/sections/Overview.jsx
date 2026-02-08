import Hero from "./Hero";
import About from "./About";

export default function Overview() {
  return (
    <div className="space-y-12">
      <Hero />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <About />
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 space-y-4">
          <p className="text-xs font-mono text-green-400/80">~/persona/log</p>
          <h3 className="text-2xl font-semibold text-slate-100">Human Side</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Precision and empathy live in the same shell. I&#39;m relentlessly punctual, structured in my planning,
            and transparent with stakeholders. Outside of terminals, I&#39;m the calm teammate who keeps morale high,
            documents every finding, and brings curiosity-driven conversations to the lab.
          </p>
          <div className="space-y-3 text-sm text-slate-300 font-mono">
            <div className="flex items-start gap-3">
              <span className="text-green-400">▹</span>
              <p><span className="text-slate-400 uppercase tracking-[0.3em] text-[10px] block">Attitude</span> Reliable, focused, and respectful of deadlines.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">▹</span>
              <p><span className="text-slate-400 uppercase tracking-[0.3em] text-[10px] block">Collaboration</span> Empathetic communicator, clear documentation, no ego.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">▹</span>
              <p><span className="text-slate-400 uppercase tracking-[0.3em] text-[10px] block">Lifestyle</span> Balanced between study, sport, improv jam sessions, and mindful rest.</p>
            </div>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
            <p className="text-xs font-mono text-green-400 mb-1">Promise</p>
            <p className="text-sm text-slate-100">Bring hacker curiosity, deliverables on time, and keep trust intact.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
