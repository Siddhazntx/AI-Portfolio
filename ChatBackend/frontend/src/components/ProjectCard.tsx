import { useState } from 'react';
import { ExternalLink, Play, Video } from 'lucide-react';
import type { Project } from '../types';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="group relative flex flex-col h-full rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md overflow-hidden hover:border-cyan-400/25 hover:bg-black/50 transition-all duration-300">
      {/* Video Embed Header (if available and toggled) */}
      {project.videoEmbedUrl && showVideo ? (
        <div className="relative aspect-video w-full bg-black border-b border-white/[0.06]">
          <iframe
            src={`${project.videoEmbedUrl}?autoplay=1`}
            title={`${project.name} Video Demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
          <button
            type="button"
            onClick={() => setShowVideo(false)}
            className="absolute top-2 right-2 px-2 py-1 text-[11px] bg-black/80 text-white/70 hover:text-white rounded border border-white/20 transition-colors"
          >
            Close Video
          </button>
        </div>
      ) : project.videoEmbedUrl ? (
        <div className="relative aspect-video w-full bg-black/60 border-b border-white/[0.06] flex items-center justify-center group/video">
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 hover:scale-105 transition-all"
          >
            <Play className="w-4 h-4 fill-cyan-400" />
            <span className="text-xs font-medium">Watch Demo Video</span>
          </button>
        </div>
      ) : null}

      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Title & Tagline */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white/95 group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 rounded-md">
                Live
              </span>
            )}
          </div>
          {project.tagline && (
            <p className="text-xs font-medium text-cyan-400/70">
              {project.tagline}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium text-cyan-300/80 bg-cyan-500/[0.08] border border-cyan-400/15 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key Features Bullet List */}
        <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
            Key Architecture & Features
          </p>
          <ul className="space-y-1.5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="text-xs text-white/40 flex items-start gap-2 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 mt-1.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub Repo
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-400/25 hover:bg-cyan-500/25 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}

          {project.videoUrl && !project.videoEmbedUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400/80 bg-white/[0.04] border border-white/[0.08] hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/30 transition-all"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              Demo Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
