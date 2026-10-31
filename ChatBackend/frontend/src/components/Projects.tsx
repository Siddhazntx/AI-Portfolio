import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white/90 tracking-tight">
            Projects
          </h2>
          <p className="text-sm sm:text-base text-white/35 max-w-xl mx-auto">
            A selection of projects that showcase my technical skills and problem-solving approach.
          </p>
          <div className="w-12 h-px bg-cyan-400/20 mx-auto mt-4" />
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

