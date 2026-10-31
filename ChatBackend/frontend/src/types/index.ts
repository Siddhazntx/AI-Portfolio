export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  image?: string;
}

export interface Contribution {
  id: string;
  repository: string;
  prNumber?: string;
  description: string;
  impact?: string;
  technologies: string[];
  prUrl: string;
  status: 'merged' | 'open' | 'closed';
}
