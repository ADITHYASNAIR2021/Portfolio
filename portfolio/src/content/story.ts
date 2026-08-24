export const profile = {
  name: "Adithya S Nair",
  role: "Full-stack AI engineer & researcher",
  location: "Kottayam, Kerala, India",
  email: "adithyasnair2021@gmail.com",
  phone: "+91 81368 59455",
  github: "https://github.com/ADITHYASNAIR2021",
  linkedin: "https://linkedin.com/in/adithya-s-nair",
  huggingface: "https://huggingface.co/AdithyaSNair",
  resume: "/Adithya_S_Nair_Resume.pdf",
};

/* Studio credit shown in the footer and referenced in structured data. */
export const studio = {
  name: "CodrantLabs",
  url: "https://codrantlabs.in",
  domain: "codrantlabs.in",
  tagline: "We build machines that think.",
  description:
    "Founder-led product and AI engineering studio in Kerala, India, building full-stack platforms, AI agents, RAG systems, and search visibility across SEO, AEO, and GEO.",
};

export const proofPoints = [
  { value: "2 yrs", label: "shipping production AI" },
  { value: "3", label: "selected systems with real users" },
  { value: "1", label: "peer-reviewed research paper" },
  { value: "200+", label: "people led in tech community" },
];

export type CaseStudy = {
  index: string;
  kind: string;
  title: string;
  subtitle: string;
  thesis: string;
  challenge: string;
  response: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  tech: string[];
  href: string;
  accent: "tomato" | "cobalt" | "lime";
  visual: "product" | "school" | "studio";
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    kind: "Context-aware developer tool",
    title: "LensAI",
    subtitle: "Understanding without breaking flow.",
    thesis:
      "A browser extension that turns any selected region of a webpage into a clear, structured explanation without forcing the user into another tab.",
    challenge:
      "Developers and researchers lose momentum when a difficult diagram, interface, or code fragment sends them into a separate search workflow.",
    response:
      "Designed the capture-to-explanation flow, context packaging, model interaction, and browser extension interface as one focused experience.",
    outcome:
      "A fast path from visual selection to useful explanation that keeps attention on the original work instead of the tooling around it.",
    metric: "1",
    metricLabel: "capture-to-answer flow",
    tech: ["JavaScript", "Browser APIs", "LLM integration", "Claude", "Interaction design"],
    href: "https://github.com/ADITHYASNAIR2021",
    accent: "tomato",
    visual: "product",
  },
  {
    index: "02",
    kind: "Education infrastructure",
    title: "Vidyapath",
    subtitle: "One school system. Four very different realities.",
    thesis:
      "A multi-school LMS for CBSE Classes 10 and 12, shaped around the daily workflows of students, teachers, parents, and administrators.",
    challenge:
      "School software often becomes a collection of disconnected forms. The real challenge is making roles, data, permissions, and AI assistance feel like one dependable system.",
    response:
      "Architected role-based authentication, multi-school provisioning, assignments, grading, attendance, timetables, audit trails, and a multi-model AI routing layer.",
    outcome:
      "A single platform that reduces teacher busywork while keeping generated learning material structured, reviewable, and grounded in the school context.",
    metric: "4",
    metricLabel: "role-specific portals",
    tech: ["Next.js", "Supabase", "RAG", "Groq + Gemini", "Zustand", "Framer Motion"],
    href: "https://github.com/ADITHYASNAIR2021",
    accent: "cobalt",
    visual: "school",
  },
  {
    index: "03",
    kind: "Founder-led product studio",
    title: "CodrantLabs",
    subtitle: "Software shipped, not strategy left in slides.",
    thesis:
      "A product and AI engineering studio for teams that need senior thinking, fixed scope, and a direct path from an ambiguous problem to working software.",
    challenge:
      "Small teams do not need more ceremony. They need someone who can connect product intent, engineering choices, AI capabilities, and the realities of delivery.",
    response:
      "Co-founded a practice spanning full-stack platforms, AI agents, RAG systems, search visibility, and technical product strategy for global clients.",
    outcome:
      "A deliberately small studio model: clear ownership, fewer hand-offs, and work that is designed and engineered as one continuous decision process.",
    metric: "0",
    metricLabel: "layers of account management",
    tech: ["Product strategy", "AI agents", "Full-stack", "RAG", "AEO", "Delivery"],
    href: "https://codrantlabs.in/",
    accent: "lime",
    visual: "studio",
  },
];

export const smallerBuilds = [
  {
    year: "2026",
    title: "Mitti Mitra",
    description: "Field-ready soil diagnostics that turn vision and multi-source signals into useful crop guidance.",
    tags: ["Computer vision", "Flutter", "Firebase"],
  },
  {
    year: "2025",
    title: "Namude Yatra",
    description: "A multi-agent travel planner with maps and conversational replanning.",
    tags: ["LangChain", "Pydeck", "Streamlit"],
  },
  {
    year: "2024",
    title: "OptiHire",
    description: "Tailored job outreach, resume gap analysis, and application tracking.",
    tags: ["NLP", "LLMs", "Data"],
  },
  {
    year: "2024",
    title: "Inventory Optimisation",
    description: "A reinforcement learning agent for balancing stockouts, holding cost, and reorder timing.",
    tags: ["Python", "DQN", "Reinforcement learning"],
  },
];

export const experience = [
  {
    period: "Jun 2025 to May 2026",
    role: "AI Engineer",
    company: "Doctreen",
    location: "Montpellier · Remote",
    note: "Owned production AI features and the systems around them, from model integration to product delivery.",
    highlights: [
      "Integrated multiple model providers with prompt, RAG, and evaluation workflows.",
      "Designed vision pipelines across 10+ modalities with expert-reviewed ground truth.",
      "Worked as acting product manager, turning research and user feedback into clear product requirements.",
      "Built internal data tooling, including token-efficient serialization for production workloads.",
    ],
  },
  {
    period: "Jan 2025 to Jun 2025",
    role: "AI Research Intern",
    company: "Doctreen",
    location: "Montpellier · Remote",
    note: "Helped establish the medical reporting architecture during the platform’s foundational stage.",
    highlights: [
      "Created benchmarks that compared models across multiple pipeline stages.",
      "Added input validation and guardrails for prompt injection, adversarial inputs, and compliance risks.",
      "Supported the first production-ready reporting workflows and evaluation processes.",
    ],
  },
];

export const education = [
  {
    period: "2026 to present",
    degree: "MTech · Computer Science",
    focus: "AI & Machine Learning",
    school: "Amrita Vishwa Vidyapeetham",
    note: "Researching agentic AI, memory, multi-agent systems, and dependable LLM architecture.",
    highlights: ["Advanced study in AI and machine learning", "Current focus on agent evaluation and long-running system memory"],
  },
  {
    period: "2021 to 2025",
    degree: "BTech · Computer Science",
    focus: "AI & Machine Learning · CGPA 8.48",
    school: "Amrita Vishwa Vidyapeetham",
    note: "Built a broad engineering base while specialising in applied AI and machine learning.",
    highlights: ["Coursework in ML, deep learning, NLP, computer vision, DSA, DBMS, and operating systems", "Peer-reviewed Springer conference publication, 2026"],
  },
];

export const capabilities = [
  {
    number: "I",
    title: "Frame the system",
    detail: "Translate an ambiguous product problem into boundaries, risks, data flows, and a buildable first version.",
    tools: "Architecture · Product thinking · Evaluation design",
  },
  {
    number: "II",
    title: "Build the intelligence",
    detail: "Design LLM, RAG, vision, and agentic workflows around the job, not around whichever model is fashionable this week.",
    tools: "Python · PyTorch · FastAPI · LangChain · Model APIs",
  },
  {
    number: "III",
    title: "Make it hold up",
    detail: "Add guardrails, benchmarks, observability, tests, and infrastructure so a promising demo becomes dependable software.",
    tools: "Docker · CI/CD · Supabase · Git · Monitoring",
  },
  {
    number: "IV",
    title: "Lead the delivery",
    detail: "Connect research, user feedback, and engineering decisions so the team can move from an uncertain opportunity to a clear, shipped product.",
    tools: "Product research · PRDs · Agile delivery · Team leadership",
  },
];

export const skillGroups = [
  {
    code: "01",
    label: "AI systems",
    summary: "Designing reliable intelligence around a real product workflow.",
    skills: ["LLM integration", "RAG", "Prompt engineering", "Agent memory", "Model evaluation", "Multi-agent systems"],
  },
  {
    code: "02",
    label: "Engineering",
    summary: "Building the service, interface, and infrastructure around the model.",
    skills: ["Python", "FastAPI", "TypeScript", "Next.js", "REST APIs", "Testing"],
  },
  {
    code: "03",
    label: "Platforms",
    summary: "Shipping with practical tools that keep systems observable and maintainable.",
    skills: ["Docker", "Supabase", "MongoDB", "Git", "CI/CD", "Hugging Face"],
  },
  {
    code: "04",
    label: "Product craft",
    summary: "Connecting technical choices to user needs, scope, and measurable outcomes.",
    skills: ["Product discovery", "PRDs", "Architecture", "Agile delivery", "Jira", "Technical leadership"],
  },
];

export const communityRoles = [
  {
    period: "2022 to present",
    title: "ACM Student Chapter, Amritapuri",
    role: "Member, AI Club Mentor, Chairperson, Advisory Council",
    note: "Led a 200+ member technical community for 1.5 years, organised national-level hackathons and workshops, mentored students, and now advise the next leadership team.",
    accent: "lime",
  },
  {
    period: "2022 to 2023",
    title: "ICPC Asia West Regional Finals",
    role: "Overall Coordinator",
    note: "Coordinated participant management, event logistics, and on-ground operations for the regional finals hosted on campus.",
    accent: "cobalt",
  },
  {
    period: "2023 to 2024",
    title: "Vidyut Multi-Fest",
    role: "Core Committee and Executive Member",
    note: "Managed participant accommodation and logistics for one of Kerala's largest student-run multi-fests.",
    accent: "coral",
  },
  {
    period: "2024",
    title: "Decoding AI",
    role: "Student Social Responsibility Project",
    note: "Ran an introductory AI awareness programme for school students, making core ideas approachable through examples and discussion.",
    accent: "lime",
  },
];

export type FaqItem = {
  /** Stable anchor id, e.g. #faq-research, kept persistent for AI citations. */
  id: string;
  question: string;
  answer: string;
};

/* Answer-engine ready: natural questions, 30–50 word self-contained answers. */
export const faq: FaqItem[] = [
  {
    id: "faq-who-is-adithya",
    question: "Who is Adithya S Nair?",
    answer:
      "Adithya S Nair is an AI engineer and researcher from Kottayam, Kerala, India. He builds production LLM, RAG, agentic, and full-stack systems, and has published peer-reviewed research with Springer.",
  },
  {
    id: "faq-specialisation",
    question: "What does Adithya specialise in as an AI engineer?",
    answer:
      "He specialises in LLM integration, retrieval-augmented generation, agent memory, AI evaluation, and full-stack product engineering. He ships products with Python, FastAPI, PyTorch, and Next.js, from first prototype to monitored production.",
  },
  {
    id: "faq-production-systems",
    question: "Which production AI systems has Adithya built?",
    answer:
      "Adithya built LensAI, a context-aware browser extension, architected Vidyapath, a multi-school LMS with four role-specific portals, and co-founded CodrantLabs, a product and AI engineering studio.",
  },
  {
    id: "faq-research",
    question: "Has Adithya S Nair published research?",
    answer:
      "Yes. Adithya has peer-reviewed research accepted at PCCDA 2026 and published with Springer. The work explores parameter-efficient multimodal systems designed to achieve strong results within limited compute budgets.",
  },
  {
    id: "faq-availability",
    question: "Is Adithya available for AI engineering roles?",
    answer:
      "Yes. Adithya is open to AI engineering roles, research collaborations, and focused product builds with real users. Email adithyasnair2021@gmail.com to start a conversation.",
  },
  {
    id: "faq-location",
    question: "Where is Adithya based, and does he work remotely?",
    answer:
      "He is based in Kottayam, Kerala, India, and works remotely worldwide. His experience includes collaborating with international teams and shipping production systems across research, product, and engineering work.",
  },
];
