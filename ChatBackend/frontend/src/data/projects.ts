import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'price-tracker',
    name: 'INE Price Tracker',
    tagline: 'Full-Stack E-Commerce Price Monitoring & Automated Data Collection',
    description:
      'A full-stack data collection and price monitoring system built with Playwright, Express REST APIs, and Supabase PostgreSQL. Designed to reliably scrape and track product prices and stock availability across dynamically rendered JavaScript storefronts with automated scheduled workflows.',
    technologies: ['React', 'Node.js', 'Express', 'Playwright', 'PostgreSQL', 'Supabase', 'Cron'],
    features: [
      'Headless browser automation with Playwright handling dynamic DOM rendering & bot detection',
      'Automated scheduled data collection with authenticated triggers, 3-attempt retries, and error logging',
      'Historical price movements and stock status stored in Supabase PostgreSQL',
      'Interactive React dashboard featuring product search, price-history charts, scrape logs, and CSV export',
    ],
    githubUrl: 'https://github.com/Siddhazntx/INE-Price-Tracker---205',
    liveUrl: 'https://ine-price-tracker-205.onrender.com',
    videoUrl: 'https://drive.google.com/file/d/1sEBLsstkFdfvUPyQboS9_o0a6IxgBull/view?usp=drive_link',
  },
  {
    id: 'yt-vision-explainer',
    name: 'YT Vision Explainer',
    tagline: 'Real-Time Multimodal AI Companion for YouTube Technical Tutorials',
    description:
      'A high-performance Chrome Extension that acts as an intelligent companion while watching technical tutorials on YouTube. Allows users to drag and crop any portion of a playing video (such as a code block or architecture diagram) to immediately receive contextual AI explanations inside an isolated floating interface.',
    technologies: ['JavaScript', 'Chrome Extension API', 'Gemini Vision API', 'Shadow DOM'],
    features: [
      'Precision screen capture with fluid drag-and-drop overlay to crop exact video coordinates',
      'Built with Shadow DOM architecture to guarantee zero styling conflicts with YouTube native CSS',
      'Global keyboard event interceptors preventing chat keystrokes from triggering YouTube shortcuts',
      'Sub-2 second (1.5–2s) frame-to-explanation latency leveraging Gemini Vision API',
    ],
    githubUrl: 'https://github.com/Siddhazntx/YT_VISION_EXPLAINER',
    videoUrl: 'https://youtu.be/FXooe5Jw5J4',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/FXooe5Jw5J4',
  },
  {
    id: 'razorsave',
    name: 'RazorSave (Fintech Savings Platform)',
    tagline: 'Payment Round-Up Micro-Savings & ML-Driven Financial Insights',
    description:
      'A full-stack savings platform that rounds up everyday transactions through the Razorpay API, turning spare change into automated savings, goals, and simulated investments with predictive machine learning insights.',
    technologies: ['React', 'FastAPI', 'Python', 'Razorpay SDK', 'scikit-learn', 'Gemini API'],
    features: [
      'Micro-savings checkout round-ups via Razorpay API with server-side signature verification & idempotent transactions',
      'Random Forest regression trained on 10,000+ transaction records to forecast 30-day savings trajectories',
      'Goal completion probability modeling to help users predict when they will hit financial milestones',
      'Gemini API integration translating raw ML statistical outputs into personalized spending profiles & tips',
    ],
    githubUrl: 'https://github.com/Siddhazntx/RazorSave',
  },
  {
    id: 'autoeit-ii',
    name: 'AutoEIT-II',
    tagline: 'Automated Evaluation & Testing Intelligence Pipeline',
    description:
      'A configuration-driven evaluation and automated testing framework built to systematically benchmark classification models and validation pipelines, specifically addressing extreme dataset class-imbalance.',
    technologies: ['Python', 'Machine Learning', 'scikit-learn', 'QWK Metric', 'Statistical Modeling'],
    features: [
      'Model selection and evaluation optimized for Quadratic Weighted Kappa (QWK) on stratified validation splits',
      'Comparative benchmarking between deterministic thresholding and data-driven ordinal classification',
      'Configuration-driven, modular architecture designed for reproducible experiments and regression suites',
      'Automated metric logging and statistical significance evaluation across skewed distributions',
    ],
    githubUrl: 'https://github.com/Siddhazntx/AutoEIT-II',
  },
];
