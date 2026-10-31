import { FileText, Download } from 'lucide-react';

const RESUME_URL = 'https://drive.google.com/file/d/1ottt-e2O7-Mx__ZRe2ztV46hmDbo3_q2/view?usp=sharing';

export function Resume() {
  return (
    <section id="resume" className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/[0.06] border border-cyan-400/10 mx-auto">
          <FileText className="w-7 h-7 text-cyan-400/60" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
            Resume
          </h2>
          <p className="text-sm text-white/35 max-w-md mx-auto">
            View my complete resume for a detailed overview of my experience, education, skills, and
            certifications.
          </p>
        </div>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 rounded-xl text-sm font-medium hover:bg-cyan-500/15 hover:border-cyan-400/30 transition-all"
        >
          <Download className="w-4 h-4" />
          View Resume
        </a>
      </div>
    </section>
  );
}

