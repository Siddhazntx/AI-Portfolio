import { GitPullRequest, ExternalLink, CheckCircle2 } from 'lucide-react';
import { contributions, ALL_PRS_URL } from '../data/contributions';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function OpenSource() {
  return (
    <section id="opensource" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium">
            <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Source Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white/95 tracking-tight">
            Open-Source Contributions
          </h2>
          <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto">
            7+ merged pull requests in production open-source codebases, collaborating directly with maintainers across developer tooling, UI animations, and CI reliability.
          </p>
          <div className="w-12 h-px bg-cyan-400/20 mx-auto mt-4" />
        </div>

        {/* Contributions Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="group flex flex-col sm:flex-row sm:items-start gap-5 p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md hover:border-cyan-400/30 hover:bg-black/55 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/[0.08] border border-cyan-400/20 shrink-0">
                <GitPullRequest className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-white/95 group-hover:text-cyan-300 transition-colors">
                      {contribution.repository}
                    </h3>
                    {contribution.prNumber && (
                      <span className="px-2 py-0.5 text-xs font-mono font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 rounded">
                        {contribution.prNumber}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border text-emerald-400 bg-emerald-500/10 border-emerald-400/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Merged Upstream
                  </span>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  {contribution.description}
                </p>

                {contribution.impact && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-white/50 leading-relaxed">
                    <span className="font-semibold text-cyan-400/90">Impact: </span>
                    {contribution.impact}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {contribution.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={contribution.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View PR on GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Merged PRs Callout Button */}
        <div className="text-center pt-4">
          <a
            href={ALL_PRS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/90 bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-cyan-300 transition-all shadow-lg shadow-black/40"
          >
            <GithubIcon className="w-4 h-4" />
            Explore All 7+ Merged Pull Requests on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
