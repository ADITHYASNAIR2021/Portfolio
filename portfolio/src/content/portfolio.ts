export type IllustrationKey =
  | "vidyapath"
  | "lensai"
  | "mittiMitra"
  | "namudeYatra"
  | "swcMri"
  | "medReport"
  | "optiHire"
  | "dqn";

export interface Project {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tech: string[];
  github: string;
  illustration: IllustrationKey;
  /** Accent hex used for borders, chips, glows. */
  color: string;
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tech: string[];
  current: boolean;
}

export interface Education {
  degree: string;
  specialisation: string;
  school: string;
  period: string;
  cgpa: string;
}

export interface SkillGroup {
  label: string;
  color: string;
  skills: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  href: string;
  color: string;
}

export interface Language {
  name: string;
  level: string;
  /** 0–100, drives the proficiency bar. */
  pct: number;
}

export type LeadershipIconKey = "users" | "trophy" | "calendar" | "book";

export interface LeadershipRole {
  title: string;
  role: string;
  period: string;
  description: string;
  highlight: boolean;
  icon: LeadershipIconKey;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

/* ─────────────────────────────  Projects  ───────────────────────────────── */

export const projects: Project[] = [
  {
    title: "Vidyapath",
    subtitle: "LMS & School Management Platform for CBSE Schools",
    period: "Apr 2026 — Present",
    description:
      "Full-stack multi-school LMS for CBSE Classes 10 & 12 with dedicated portals for admins, teachers, students, and parents — assignments, grading, attendance, gradebooks, and timetables in one platform. A multi-model AI routing layer (Groq, Gemini) powers AI-assisted assignment generation and question banking while keeping output pedagogically structured. Role-based auth via HMAC-signed JWTs over Supabase Postgres, with multi-school provisioning through a developer admin portal.",
    tech: ["Next.js 14", "Supabase", "Multi-model AI", "RAG", "Vectorising", "Zustand"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "vidyapath",
    color: "#8b5cf6",
    featured: true,
  },
  {
    title: "LensAI",
    subtitle: "AI-Powered Screen Region Explainer",
    period: "Feb — Mar 2026",
    description:
      "Browser extension that lets users highlight any screen region — code, diagrams, articles, UI — and get instant, context-aware explanations powered by LLM integration. No more context-switching friction for developers and researchers.",
    tech: ["JavaScript", "Browser Extension APIs", "Claude", "Claude Code"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "lensai",
    color: "#00d4ff",
    featured: true,
  },
  {
    title: "Mitti Mitra",
    subtitle: "AI Soil Health Diagnostics for Farmers",
    period: "Dec 2025 — Mar 2026",
    description:
      "Mobile app using computer vision and multi-source data fusion to help Indian farmers assess soil health and receive actionable crop recommendations. Designed the ML pipeline and integrated with a Flutter/Firebase frontend for field-ready deployment.",
    tech: ["Python", "Computer Vision", "Flutter", "Firebase"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "mittiMitra",
    color: "#22c55e",
    featured: true,
  },
  {
    title: "Namude Yatra",
    subtitle: "Multi-Agent Travel Planner",
    period: "Feb — Mar 2025",
    description:
      "Multi-agent travel planner that generates full day-by-day itineraries through coordinated LLM agents using LangChain, with interactive map visualisations (Pydeck) and a chatbot interface for real-time trip adjustments.",
    tech: ["LangChain", "Streamlit", "Pydeck", "Multi-Agent", "Geopy"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "namudeYatra",
    color: "#8b5cf6",
    featured: true,
  },
  {
    title: "SWC from MRI",
    subtitle: "MRI Refining & Graph Generation",
    period: "Aug 2023 — Feb 2024",
    description:
      "AI software that generates SWC files from MRIs to analyse human brain vascular flow — refining MRI data and building detailed graph representations of branch topology for enhanced medical insight.",
    tech: ["Python", "Medical Imaging", "Graph Generation", "MRI"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "swcMri",
    color: "#00d4ff",
    featured: false,
  },
  {
    title: "MedReportGen AI",
    subtitle: "AI Engine & Architecture",
    period: "Aug 2024 — Feb 2025",
    description:
      "Advanced medical report generation system integrating Microsoft's Radino VLM for feature extraction and an LLM for detailed analysis, transforming unstructured clinical data into precise, structured reports.",
    tech: ["Python", "VLM", "LLM", "Medical AI"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "medReport",
    color: "#00d4ff",
    featured: false,
  },
  {
    title: "OptiHire",
    subtitle: "AI Job Application Assistant",
    period: "Oct — Nov 2024",
    description:
      "Web app generating tailored cover letters from job descriptions, analysing resumes for keyword gaps, and tracking applications in one place with real-time feedback and visual analytics.",
    tech: ["Streamlit", "Web Scraping", "LLM", "NLP"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "optiHire",
    color: "#f59e0b",
    featured: false,
  },
  {
    title: "Inventory Optimisation",
    subtitle: "Deep Q-Network Agent",
    period: "Apr — Jun 2024",
    description:
      "Modelled inventory control as a Markov Decision Process. The DQN agent outperformed classic (s,S) reorder policies with lower total costs and fewer stockouts across test scenarios.",
    tech: ["Reinforcement Learning", "DQN", "Python"],
    github: "https://github.com/ADITHYASNAIR2021",
    illustration: "dqn",
    color: "#8b5cf6",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

/* ────────────────────────────  Experience  ──────────────────────────────── */

export const experiences: ExperienceItem[] = [
  {
    role: "AI Engineer",
    company: "Doctreen",
    location: "Montpellier, France (Remote)",
    period: "Jun 2025 — May 2026",
    description: [
      "Built and maintained the AI features of a live medical report generation platform — integrating LLMs across multiple providers (OpenAI, HuggingFace, Nebius, OVH) with RAG pipelines and prompt engineering. Most of the hard problems turned out to be evaluation, not modelling.",
      "Designed vision analysis pipelines for DICOM medical imaging across 10+ modalities, validated against radiologist ground-truth data to measure and close the accuracy gap.",
      "Built internal tooling including a token-efficient serialisation format that meaningfully reduced API costs on high-volume inference runs.",
      "Set up CI/CD pipelines and model monitoring so performance regressions surface before they reach production.",
    ],
    tech: ["Python", "FastAPI", "LLM APIs", "RAG", "Docker", "CI/CD"],
    current: false,
  },
  {
    role: "AI Research Intern",
    company: "Doctreen",
    location: "Montpellier, France (Remote)",
    period: "Jan 2025 — Jun 2025",
    description: [
      "Joined at the foundational stage of the AI-assisted medical report system — the phase where you make architectural decisions you'll live with for years.",
      "Built security guardrails and input validation against prompt injection and adversarial inputs; an underrated part of production LLM work.",
      "Developed a multi-model benchmarking system to compare LLM performance across all pipeline stages, running evaluations in parallel to cut iteration time.",
    ],
    tech: ["Python", "LLM Evaluation", "Security", "Benchmarking"],
    current: false,
  },
];

export const education: Education = {
  degree: "B.Tech, Computer Science",
  specialisation: "AI & ML",
  school: "Amrita Vishwa Vidyapeetham, Amritapuri",
  period: "Sep 2021 — Aug 2025",
  cgpa: "8.48",
};

/* ──────────────────────────────  Skills  ────────────────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    color: "#00d4ff",
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    label: "AI / ML",
    color: "#8b5cf6",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "RAG Systems",
      "Embeddings",
      "Deep Learning",
      "Multi-Agent Systems",
      "Model Evaluation & Monitoring",
      "Claude Skills",
      "Computer Vision",
    ],
  },
  {
    label: "Frameworks",
    color: "#22c55e",
    skills: ["FastAPI", "PyTorch", "TensorFlow", "LangChain", "CrewAI", "React / Next.js", "Streamlit", "Django", "Gradio", "Scikit-learn"],
  },
  {
    label: "Infrastructure",
    color: "#f59e0b",
    skills: ["Docker", "Git / CI/CD", "REST APIs", "MongoDB", "MariaDB", "Hugging Face", "Postman"],
  },
];

export const additionalTools = [
  "Pandas", "NumPy", "Supabase", "Firebase", "Flutter",
  "Pydeck", "Groq", "Gemini", "DICOM", "Jira",
  "Confluence", "Jupyter", "Weights & Biases", "Linux",
];

/* About — quick "stack" chips shown in the bento grid. */
export const aboutStack = [
  "Python", "FastAPI", "LLMs", "RAG", "DICOM",
  "HuggingFace", "OpenAI API", "Docker", "CI/CD", "MongoDB",
];

/* ──────────────────────────  Certificates  ──────────────────────────────── */

export const certificates: Certificate[] = [
  {
    title: "Computer Vision",
    issuer: "Certification",
    href: "https://bit.ly/certificate-repo",
    color: "#00d4ff",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Badge",
    href: "https://bit.ly/certificate-repo",
    color: "#22c55e",
  },
  {
    title: "Data Visualisation",
    issuer: "Empowering Business with Effective Insights",
    href: "https://bit.ly/certificate-repo",
    color: "#f59e0b",
  },
  {
    title: "Deep Learning for Images & Text",
    issuer: "with PyTorch",
    href: "https://bit.ly/certificate-repo",
    color: "#8b5cf6",
  },
];

export const certificateRepoUrl = "https://bit.ly/certificate-repo";

export const languages: Language[] = [
  { name: "English", level: "Professional", pct: 90 },
  { name: "Malayalam", level: "Native", pct: 100 },
  { name: "Hindi", level: "Working", pct: 65 },
];

/* ────────────────────────  Leadership & Stats  ──────────────────────────── */

export const leadershipRoles: LeadershipRole[] = [
  {
    title: "ACM Student Chapter, Amritapuri",
    role: "Member → AI Club Mentor → Chairperson → Advisory Council",
    period: "2022 — Present",
    description:
      "Led the chapter as Chairperson for 1.5 years — organised national-level hackathons, coding competitions, workshops, and the annual tech fest. Mentored students in the AI Club on ML fundamentals. Now serve on the Advisory Council.",
    highlight: true,
    icon: "users",
  },
  {
    title: "ICPC Asia West Regional Finals",
    role: "Overall Coordinator",
    period: "2022 — 2023",
    description:
      "Coordinated event logistics, participant management, and on-ground operations for the ICPC regional finals hosted at campus.",
    highlight: false,
    icon: "trophy",
  },
  {
    title: "Vidyut Multi-Fest",
    role: "Core Committee '24, Executive Member '23",
    period: "2023 — 2024",
    description:
      "Managed participant accommodations and logistics for one of Kerala's largest student-run multi-fests.",
    highlight: false,
    icon: "calendar",
  },
  {
    title: "Decoding AI",
    role: "Student Social Responsibility Project",
    period: "2024",
    description:
      "Conducted an introductory AI awareness program at Sreyas Public School, Kottayam — addressing the AI knowledge gap and fostering equitable access to technology education.",
    highlight: false,
    icon: "book",
  },
];

export const leadershipStats: Stat[] = [
  { value: 200, suffix: "+", label: "Members Led" },
  { value: 1.5, suffix: "yr", label: "As Chairperson", decimals: 1 },
  { value: 10, suffix: "+", label: "Events Organized" },
  { value: 3, suffix: "", label: "Languages Spoken" },
];
