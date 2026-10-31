import { FileText, ChevronDown } from 'lucide-react';
import { Chatbot } from './Chatbot';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const GITHUB_URL = 'https://github.com/Siddhazntx';
const LINKEDIN_URL = 'https://www.linkedin.com/in/siddhantmahapatra23/';
const RESUME_URL = 'https://drive.google.com/file/d/1ottt-e2O7-Mx__ZRe2ztV46hmDbo3_q2/view?usp=sharing';

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6"
    >
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left — Intro */}
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <p className="text-cyan-400/80 text-sm font-medium tracking-wider uppercase">
              Software Developer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/95 leading-tight tracking-tight">
              Siddhant
              <br />
              <span className="text-white/60">Mahapatra</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/40 font-medium">
            Software Developer{' '}
            <span className="text-white/20">|</span> Backend Engineering{' '}
            <span className="text-white/20">|</span> AI & Test Automation
          </p>

          <p className="text-sm sm:text-base text-white/35 leading-relaxed max-w-lg">
            Explore my work, technical experience, and projects.
            <br />
            Have a question? Ask my AI assistant →
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 rounded-xl text-sm font-medium hover:bg-cyan-500/15 hover:border-cyan-400/30 transition-all"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] text-white/60 rounded-xl text-sm hover:bg-white/[0.06] hover:text-white/80 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] text-white/60 rounded-xl text-sm hover:bg-white/[0.06] hover:text-white/80 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right — Chatbot */}
        <div className="flex justify-center lg:justify-end animate-fade-in-delayed">
          <Chatbot />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/40 transition-colors animate-bounce-slow"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
