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

/* Studio credit — shown in the footer and referenced in structured data. */
export const studio = {
  name: "CodrantLabs",
  url: "https://codrantlabs.in",
  domain: "codrantlabs.in",
  tagline: "We build machines that think.",
  description:
    "Founder-led product and AI engineering studio in Kerala, India — full-stack platforms, AI agents, RAG systems, and search visibility across SEO, AEO, and GEO.",
};

export const proofPoints = [
  { value: "2 yrs", label: "shipping production AI" },
  { value: "3", label: "selected systems with real stakes" },
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
  visual: "medical" | "school" | "studio";
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    kind: "Production medical AI",
    title: "Doctreen",
    subtitle: "Clinical signal, engineered for real use.",
    thesis:
      "Built and maintained the AI core of a medical reporting platform across providers, clinical workflows, and the less glamorous realities of production.",
    challenge:
      "Reliable medical AI is an evaluation problem as much as a modelling problem: outputs need guardrails, measurable quality, and predictable operating costs.",
    response:
      "Designed multi-provider LLM and RAG pipelines, DICOM vision workflows, adversarial-input guardrails, parallel benchmarks, CI/CD, and internal data tooling.",
    outcome:
      "A production system that could be tested against radiologist ground truth, monitored for regressions, and improved without treating every model change as guesswork.",
    metric: "Live",
    metricLabel: "medical AI system",
    tech: ["Python", "FastAPI", "RAG", "LLM evaluation", "Docker", "CI/CD"],
    href: "https://www.doctreen.com/",
    accent: "tomato",
    visual: "medical",
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

export const publication = {
  venue: "PCCDA 2026 · Springer",
  title: "SPARE",
  expanded: "Single-view Parameter-efficient Adapter for Radiology Reporting",
  summary:
    "A vision-language framework connecting RAD-DINO to BioGPT through a custom semantic alignment adapter, built for single frontal chest X-rays and constrained hardware.",
  facts: [
    { value: "98%", label: "reduction in trainable parameters with LoRA" },
    { value: "79.0%", label: "BERTScore F1 on MIMIC-CXR" },
    { value: "0.8%", label: "of the training corpus used" },
    { value: "93.6%", label: "of state-of-the-art performance retained" },
  ],
};

export const smallerBuilds = [
  {
    year: "2026",
    title: "Mitti Mitra",
    description: "Field-ready soil diagnostics that turn vision and multi-source signals into useful crop guidance.",
    tags: ["Computer vision", "Flutter", "Firebase"],
  },
  {
    year: "2026",
    title: "LensAI",
    description: "Explain any selected region of a webpage without breaking focus.",
    tags: ["Browser APIs", "LLMs", "JavaScript"],
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
    year: "2023",
    title: "SWC from MRI",
    description: "Graph representations of brain vascular flow generated from MRI data.",
    tags: ["Medical imaging", "Python", "Graphs"],
  },
];

export const experience = [
  {
    period: "Jun 2025 — May 2026",
    role: "AI Engineer",
    company: "Doctreen",
    location: "Montpellier · Remote",
    note: "Owned production AI features, medical vision evaluation, internal tooling, and the infrastructure needed to make model changes observable.",
  },
  {
    period: "Jan 2025 — Jun 2025",
    role: "AI Research Intern",
    company: "Doctreen",
    location: "Montpellier · Remote",
    note: "Helped establish the medical reporting architecture, model benchmarks, and security guardrails during the platform’s foundational stage.",
  },
];

export const education = [
  {
    period: "2026 — Present",
    degree: "MTech · Computer Science",
    focus: "AI & Machine Learning",
    school: "Amrita Vishwa Vidyapeetham",
    note: "Researching agentic AI, memory, multi-agent systems, and LLM architecture.",
  },
  {
    period: "2021 — 2025",
    degree: "BTech · Computer Science",
    focus: "AI & Machine Learning · CGPA 8.48",
    school: "Amrita Vishwa Vidyapeetham",
    note: "Machine learning, deep learning, NLP, computer vision, systems, and the SPARE research work.",
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
    detail: "Design LLM, RAG, vision, and agentic workflows around the job—not around whichever model is fashionable this week.",
    tools: "Python · PyTorch · FastAPI · LangChain · Model APIs",
  },
  {
    number: "III",
    title: "Make it hold up",
    detail: "Add guardrails, benchmarks, observability, tests, and infrastructure so a promising demo becomes dependable software.",
    tools: "Docker · CI/CD · Supabase · Git · Monitoring",
  },
];

export type FaqItem = {
  /** Stable anchor id, e.g. #faq-research — keep persistent for AI citations. */
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
      "Adithya S Nair is an AI engineer and researcher from Kottayam, Kerala, India. He builds production LLM, RAG, agentic, and medical imaging systems, and published the SPARE radiology reporting research at PCCDA 2026 (Springer).",
  },
  {
    id: "faq-specialisation",
    question: "What does Adithya specialise in as an AI engineer?",
    answer:
      "He specialises in LLM integration, retrieval-augmented generation, agent memory, AI evaluation, and DICOM medical vision. He ships full-stack AI products with Python, FastAPI, PyTorch, and Next.js — from first prototype to monitored production.",
  },
  {
    id: "faq-production-systems",
    question: "Which production AI systems has Adithya built?",
    answer:
      "At Doctreen he built the AI core of a live medical reporting platform. He architected Vidyapath, a multi-school LMS with four role-specific portals, and co-founded CodrantLabs, a product and AI engineering studio.",
  },
  {
    id: "faq-research",
    question: "What research has Adithya S Nair published?",
    answer:
      "SPARE — Single-view Parameter-efficient Adapter for Radiology Reporting — accepted at PCCDA 2026 (Springer). It cuts trainable parameters by 98% with LoRA and reaches 79.0% BERTScore F1 on MIMIC-CXR using 0.8% of the training corpus.",
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
      "He is based in Kottayam, Kerala, India, and works remotely worldwide. He previously worked remotely as an AI Engineer with Doctreen in Montpellier, France, on production medical AI.",
  },
];

export const leadership = {
  title: "ACM Student Chapter, Amritapuri",
  path: "Member → AI Club Mentor → Chairperson → Advisory Council",
  body:
    "Led a 200+ member technical community for 1.5 years, organised national-level hackathons and workshops, mentored students in machine learning, and now advise the next leadership team.",
};
