"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const skillCategories = [
  {
    title: "Languages",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
    accent: "#00d4ff",
  },
  {
    title: "AI / ML",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "RAG Systems",
      "Deep Learning",
      "Model Evaluation",
      "Multi-Agent Systems",
      "Computer Vision",
    ],
    accent: "#8b5cf6",
  },
  {
    title: "Frameworks",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    skills: [
      "FastAPI",
      "PyTorch",
      "LangChain",
      "React / Next.js",
      "Streamlit",
      "Django",
    ],
    accent: "#22c55e",
  },
  {
    title: "Infrastructure",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: [
      "Docker",
      "Git / CI/CD",
      "REST APIs",
      "MongoDB",
      "Hugging Face",
      "Linux",
    ],
    accent: "#f59e0b",
  },
];

const additionalTools = [
  "TensorFlow",
  "Scikit-learn",
  "CrewAI",
  "Gradio",
  "Pandas",
  "NumPy",
  "MariaDB",
  "Postman",
  "Jira",
  "Confluence",
  "Claude Skills Dev",
  "DICOM",
  "Jupyter",
  "Weights & Biases",
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Tools" index="04" alternate>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="glass border border-white/5 rounded-xl p-6 card-hover hover:border-accent/15 group"
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="p-2 rounded-lg border transition-colors"
                style={{
                  color: category.accent,
                  borderColor: `${category.accent}20`,
                  background: `${category.accent}08`,
                }}
              >
                {category.icon}
              </span>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: catIdx * 0.08 + skillIdx * 0.04,
                  }}
                  className="px-3.5 py-1.5 text-sm font-mono rounded-lg border transition-all duration-200 cursor-default hover:scale-105"
                  style={{
                    color: category.accent,
                    borderColor: `${category.accent}20`,
                    background: `${category.accent}06`,
                  }}
                  whileHover={{
                    borderColor: `${category.accent}60`,
                    backgroundColor: `${category.accent}15`,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional tools — scrolling marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <p className="font-mono text-muted text-xs mb-5 tracking-wider uppercase text-center">
          Also experienced with
        </p>
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex marquee">
            {/* Double the items for infinite scroll */}
            {[...additionalTools, ...additionalTools].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="px-4 py-2 text-xs font-mono text-secondary glass border border-white/5 rounded-full whitespace-nowrap mx-1.5 hover:border-accent/30 hover:text-accent transition-colors cursor-default flex-shrink-0"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
