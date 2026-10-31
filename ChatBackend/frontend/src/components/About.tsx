import { Code2, Server, TestTube, Cpu } from 'lucide-react';

const FOCUS_AREAS = [
  {
    icon: Server,
    title: 'Backend Engineering',
    description:
      'Building robust server-side applications with Python, Django, and FastAPI. Focused on clean API design and efficient data handling.',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    description:
      'Integrating AI capabilities into applications and building automation tools that reduce manual effort in engineering workflows.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Working across the stack with React, Node.js, and PostgreSQL. Building end-to-end solutions from frontend interfaces to database design.',
  },
  {
    icon: TestTube,
    title: 'Test Automation',
    description:
      'Developing testing frameworks and automation pipelines. Creating tools like the Complexity Analyzer to improve code quality.',
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white/90 tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-px bg-cyan-400/20 mx-auto mt-4" />
        </div>

        {/* Bio */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-sm sm:text-base text-white/45 leading-relaxed">
            I'm a software developer with a strong interest in backend systems, AI integration, and
            test automation. I enjoy building tools that solve real problems — from multimodal Chrome
            extensions that analyze YouTube technical tutorials in real time, to full-stack e-commerce
            price trackers and ML-driven fintech platforms.
          </p>
          <p className="text-sm sm:text-base text-white/35 leading-relaxed">
            My approach is pragmatic: I focus on writing maintainable code, designing clean APIs, and
            choosing the right tool for each problem. I'm currently exploring deeper areas of AI
            engineering and contributing to open-source projects in the SRE space.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.title}
              className="group p-5 rounded-2xl border border-white/[0.06] bg-black/20 backdrop-blur-sm hover:border-white/[0.1] hover:bg-black/30 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/[0.06] border border-cyan-400/10">
                <area.icon className="w-5 h-5 text-cyan-400/60 group-hover:text-cyan-400/80 transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-white/80">{area.title}</h3>
              <p className="text-xs text-white/30 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

