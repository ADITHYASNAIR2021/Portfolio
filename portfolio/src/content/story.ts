export const profile = {
  name: "Adithya S Nair",
  role: "Full-stack AI engineer & researcher",
  summary:
    "I’m a full-stack AI engineer from Kottayam, Kerala. At Doctreen, I spent a year and a half working on medical AI: LLM pipelines, DICOM imaging, evaluation, and the services around them. I also consult on AI and product engineering at CodrantLabs. These days, I’m pursuing an MTech in AI & ML at Amrita, with a growing interest in computational pathology and agentic systems.",
  location: "Kottayam, Kerala, India",
  email: "adithyasnair2021@gmail.com",
  phone: "+91 81368 59455",
  github: "https://github.com/ADITHYASNAIR2021",
  linkedin: "https://linkedin.com/in/adithya-s-nair",
  huggingface: "https://huggingface.co/AdithyaSNair",
  resume: "/Adithya_S_Nair_Resume.pdf",
};

export const studio = {
  name: "CodrantLabs",
  url: "https://codrantlabs.in",
  domain: "codrantlabs.in",
  description: "Product and AI engineering studio. Adithya contributes as an AI Consultant, working on technical scoping, architecture, and delivery workflows.",
};

export const proofPoints = [
  { value: "~40%", label: "less LLM token usage", context: "Internal serialisation tooling · Doctreen" },
  { value: "10+", label: "imaging modalities", context: "DICOM vision pipelines · Doctreen" },
  { value: "98%", label: "fewer trainable parameters", context: "LoRA adaptation · SPARE" },
  { value: "200+", label: "ACM community members", context: "Chapter leadership · Amritapuri" },
];

export type CaseStudy = {
  index: string;
  kind: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  status: string;
  thesis: string;
  response: string;
  note: string;
  tech: string[];
  href?: string;
  image?: string;
  imageAlt?: string;
  accent: "tomato" | "cobalt" | "lime";
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    kind: "Restaurant operations",
    title: "Malabar Coast",
    subtitle: "From the menu to the kitchen.",
    period: "Via CodrantLabs",
    role: "Full-stack development",
    status: "Live website",
    thesis: "An ordering and operations platform for a UK restaurant, bringing the customer-facing website and the restaurant’s daily workflows together.",
    response: "Worked on online ordering with Stripe, table reservations, a role-based admin portal with real-time order updates, Sanity CMS, and technical SEO.",
    note: "The work extends past the order button: payments, reservations, and the team handling the orders all need their own place in the system.",
    tech: ["TypeScript", "PostgreSQL", "Stripe", "Sanity CMS", "Technical SEO"],
    href: "https://www.malabarcoast.co.uk/",
    image: "/images/malabar-coast-preview.png",
    imageAlt: "Malabar Coast’s live restaurant website, with its coastal cuisine introduction and menu and booking links",
    accent: "lime",
  },
  {
    index: "02",
    kind: "Education platform",
    title: "Vidyapath",
    subtitle: "A school day has more than one point of view.",
    period: "Apr 2026 — present",
    role: "Full-stack development · AI integration",
    status: "In development · public study tools live",
    thesis: "A multi-school LMS for CBSE Classes 10 and 12, with separate workflows for teachers, students, parents, and administrators.",
    response: "Built assignments, grading, attendance, gradebooks, and timetables; added Groq/Gemini routing for assignment generation and question banking, plus role-based authentication and school provisioning on Supabase.",
    note: "Four portals, one shared school context. Permissions and structured learning material are as much a part of the work as the AI integration.",
    tech: ["Next.js", "Supabase", "Groq + Gemini", "RAG", "Zustand"],
    href: "https://sreyas-vidyapath.vercel.app/",
    image: "/images/vidyapath-preview.png",
    imageAlt: "Vidyapath’s public CBSE study toolkit, with Class 10 and Class 12 resources and board exam practice",
    accent: "cobalt",
  },
  {
    index: "03",
    kind: "Agriculture · Android",
    title: "Mitti Mitra",
    subtitle: "A soil photo. A more useful next step.",
    period: "Dec 2025 — Mar 2026",
    role: "Android development · Multi-model AI pipeline",
    status: "Prototype",
    thesis: "A native Android app that uses a soil photo, vision models, and external data to suggest soil types and crop guidance for Indian farmers.",
    response: "Combined Gemini vision, Hugging Face image models, Groq responses, and external APIs. Added local storage so past scans and results remain accessible without a steady internet connection.",
    note: "The offline part is deliberately practical: saved results stay available. New AI analysis still depends on the connected services.",
    tech: ["Android Studio", "Gemini Vision", "Hugging Face", "Groq", "API integration"],
    accent: "tomato",
  },
];

export const research = {
  title: "SPARE",
  fullTitle: "Single-view Parameter-efficient Adapter for Radiology Reporting",
  status: "Accepted · PCCDA 2026 · Springer",
  description: "Can a chest X-ray reporting model fit a smaller compute budget? SPARE connects RAD-DINO to BioGPT through a semantic alignment adapter, using a single frontal view and LoRA fine-tuning.",
  results: [
    { value: "98%", label: "fewer trainable parameters with LoRA" },
    { value: "79.0", label: "BERTScore F1 on MIMIC-CXR" },
    { value: "0.8%", label: "of the training data used" },
  ],
  note: "In this evaluation, the model reached 93.6% of MAIRA-2’s BERTScore. Results are from the MIMIC-CXR report-generation benchmark.",
};

export const smallerBuilds = [
  {
    year: "2025",
    title: "Namude Yatra",
    description: "A travel planner where coordinated agents build day-by-day itineraries, with maps and a chat interface for changing the plan.",
    tags: ["LangChain", "Pydeck", "Streamlit"],
  },
  {
    year: "2024",
    title: "OptiHire",
    description: "Resume gap analysis, tailored cover letters, and application tracking in one place.",
    tags: ["NLP", "LLMs", "Streamlit"],
  },
  {
    year: "2024",
    title: "Inventory Optimisation",
    description: "A DQN agent learning when and how much to reorder. Compared against an (s,S) policy on simulated demand, with lower costs and fewer stockouts across test scenarios.",
    tags: ["Python", "DQN", "Reinforcement learning"],
  },
];

export const experience = [
  {
    period: "Jun 2026",
    role: "AI Consultant",
    company: "CodrantLabs",
    location: "Technical consulting · Self-initiated project",
    note: "Helped shape the technical and delivery side of a product and AI engineering studio.",
    highlights: [
      "Contributed to fixed-scope project scoping and pricing, the initial tech stack, and delivery workflows.",
      "Worked on Malabar Coast’s ordering, reservations, admin operations, CMS, and technical SEO.",
    ],
  },
  {
    period: "Jun 2025 — May 2026",
    role: "AI Engineer",
    company: "Doctreen",
    location: "Montpellier, France · Remote",
    note: "Built and maintained AI features for a medical report-generation platform.",
    highlights: [
      "Integrated OpenAI, Nebius, and OVH APIs with RAG and prompt-engineering workflows.",
      "Designed DICOM vision pipelines across 10+ imaging modalities and evaluated them against radiologist-derived ground truth.",
      "Implemented a serialisation format that reduced LLM token usage by nearly 40%.",
      "Acted as Product Manager for proof-of-concept work: market research, user feedback, and PRDs.",
    ],
  },
  {
    period: "Jan — Jun 2025",
    role: "AI Research Intern",
    company: "Doctreen",
    location: "Montpellier, France · Remote",
    note: "Contributed to the early development of the medical AI platform.",
    highlights: [
      "Implemented input validation and guardrails against prompt injection and adversarial inputs.",
      "Built parallel multi-model benchmarks to evaluate LLM performance across pipeline stages.",
    ],
  },
];

export const education = [
  {
    period: "Jul 2026 — present",
    degree: "MTech · Computer Science",
    focus: "Artificial Intelligence & Machine Learning",
    school: "Amrita Vishwa Vidyapeetham · Amritapuri",
    note: "Research interests: agentic AI, multi-agent systems, LLM architecture, computational pathology, and medical image analysis.",
  },
  {
    period: "Sep 2021 — Aug 2025",
    degree: "BTech · Computer Science",
    focus: "Artificial Intelligence & Machine Learning · CGPA 8.48",
    school: "Amrita Vishwa Vidyapeetham · Amritapuri",
    note: "A computer science foundation in algorithms, databases, and operating systems, alongside machine learning, NLP, and computer vision.",
  },
];

export const skillGroups = [
  {
    code: "01",
    label: "AI & research",
    summary: "From medical imaging experiments to the evaluation of LLM workflows.",
    skills: ["LLM integration & RAG", "LangGraph & multi-agent systems", "MCP & tool integration", "Evals & guardrails", "Vision-language models", "LoRA & PEFT", "PyTorch & Transformers", "FAISS & Chroma"],
  },
  {
    code: "02",
    label: "Engineering",
    summary: "The APIs, interfaces, and data layers around a model or a product.",
    skills: ["Python & FastAPI", "TypeScript & Node.js", "React & Next.js", "PostgreSQL & Supabase", "REST APIs", "Android Studio", "Tailwind CSS", "Stripe integration"],
  },
  {
    code: "03",
    label: "Tools & delivery",
    summary: "Tools I use to test, ship, and keep track of the work.",
    skills: ["Docker", "Git & GitHub Actions", "Vercel & AWS", "PyTest", "MLflow", "MongoDB & Firebase", "n8n automation", "Claude Code & Codex"],
  },
  {
    code: "04",
    label: "Product & people",
    summary: "Experience from product work, consulting, and leading a student community.",
    skills: ["Technical consulting", "Solution architecture", "Discovery & PRDs", "Project scoping & estimation", "Delivery management", "Technical SEO & GEO", "Mentoring", "Community leadership"],
  },
];

export const communityRoles = [
  {
    period: "2022 — present",
    title: "ACM, Amritapuri",
    role: "Mentor → Chairperson → Advisory Council",
    note: "Led a 200+ member chapter as Chairperson for 1.5 years. Organised hackathons and workshops, mentored students in ML, and now serve on the Advisory Council.",
    accent: "lime",
  },
  {
    period: "Aug 2026",
    title: "Beyond the Classroom",
    role: "Resource person · LBSITW ACM-W launch",
    note: "Spoke at the ACM-W chapter launch in Trivandrum with fellow ACM-Amrita members, covering applied AI/ML, product development, and career and learning roadmaps.",
    accent: "cobalt",
  },
  {
    period: "2022 — 2023",
    title: "ICPC Regional Finals",
    role: "Overall Coordinator",
    note: "Coordinated participant management, logistics, and on-ground operations for the Asia West Regional Finals hosted on campus.",
    accent: "coral",
  },
  {
    period: "2023 — 2024",
    title: "Vidyut & Decoding AI",
    role: "Event operations · School outreach",
    note: "Worked on accommodation and logistics for Vidyut. Through Decoding AI, introduced school students at Sreyas Public School, Kottayam, to AI fundamentals.",
    accent: "lime",
  },
];

export const languages = "Malayalam · native / English · professional / Hindi · working proficiency";

export type FaqItem = { id: string; question: string; answer: string };

export const faq: FaqItem[] = [
  {
    id: "faq-who-is-adithya",
    question: "Who is Adithya S Nair?",
    answer: "I’m a full-stack AI engineer and researcher from Kottayam, Kerala. My work spans medical AI at Doctreen, AI consulting at CodrantLabs, education software, and community leadership. I’m currently pursuing an MTech in AI & ML at Amrita.",
  },
  {
    id: "faq-specialisation",
    question: "What do you work on?",
    answer: "LLM integration, RAG, evaluation, medical image analysis, and full-stack applications. I’m also exploring agentic systems and computational pathology through my MTech research. Python, FastAPI, PyTorch, and Next.js appear in a lot of my work.",
  },
  {
    id: "faq-production-systems",
    question: "Which projects can I look at?",
    answer: "Malabar Coast is a live UK restaurant website and operations platform I worked on through CodrantLabs. Vidyapath’s public study tools are live, with its school-management platform in development. Mitti Mitra is an Android soil-guidance prototype.",
  },
  {
    id: "faq-research",
    question: "What is the status of SPARE?",
    answer: "SPARE, Single-view Parameter-efficient Adapter for Radiology Reporting, is accepted at PCCDA 2026 (Springer). It connects RAD-DINO to BioGPT using an alignment adapter and LoRA, exploring chest X-ray report generation with limited compute and training data.",
  },
  {
    id: "faq-availability",
    question: "What kinds of opportunities are you open to?",
    answer: "AI engineering, research collaborations, technical consulting, and product builds. If you have a project, a research question, or a role that connects with my work, email adithyasnair2021@gmail.com.",
  },
  {
    id: "faq-location",
    question: "Where are you based?",
    answer: "I’m from Kottayam, Kerala, and study at Amrita’s Amritapuri campus. I’ve worked remotely with the team at Doctreen in Montpellier, France, and am open to remote collaborations.",
  },
];
