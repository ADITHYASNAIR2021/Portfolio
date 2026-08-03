export const featuredPost = {
  slug: "agent-memory-needs-evaluation",
  title: "Agent Memory Needs Evaluation, Not More Context",
  shortTitle: "Memory is not a feature.",
  description:
    "Why capable AI agents need selective memory, observable retrieval, and evaluation across the full task journey.",
  published: "2026-08-03",
  publishedLabel: "August 3, 2026",
  readingTime: "12 min read",
  category: "Agentic AI",
  image: "/images/agent-memory-lab-v1.webp",
  imageAlt: "Editorial illustration of an AI memory system moving through evaluation checkpoints",
};

export const articleSections = [
  { id: "memory-problem", label: "The memory problem" },
  { id: "context-is-not-memory", label: "Context is not memory" },
  { id: "memory-architecture", label: "A practical architecture" },
  { id: "evaluation", label: "What to evaluate" },
  { id: "failure-modes", label: "Failure modes" },
  { id: "build-sequence", label: "A better build sequence" },
  { id: "future", label: "Where this is going" },
];

export const articleFaq = [
  {
    question: "What is agent memory?",
    answer:
      "Agent memory is persistent, selectively retrieved state that helps an AI system continue work across steps or sessions. It can include verified facts, decisions, user preferences, plans, evidence, and unresolved risks.",
  },
  {
    question: "Is a long context window the same as memory?",
    answer:
      "No. A context window is the model's current working surface. Memory is a managed system that decides what should persist, how it is represented, when it should be retrieved, and when it should expire.",
  },
  {
    question: "How should teams evaluate agent memory?",
    answer:
      "Test whether the right information is written, retrieved at the right moment, used correctly, updated when facts change, and ignored when it is irrelevant. Measure task outcomes, recovery, cost, latency, and privacy together.",
  },
];
