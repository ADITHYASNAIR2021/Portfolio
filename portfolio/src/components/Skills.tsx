"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const skillGroups = [
  {
    label: "Languages",
    color: "#00d4ff",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    label: "AI / ML",
    color: "#8b5cf6",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "RAG Systems",
      "Deep Learning",
      "Model Evaluation",
      "Multi-Agent Systems",
      "Computer Vision",
    ],
  },
  {
    label: "Frameworks",
    color: "#22c55e",
    skills: ["FastAPI", "PyTorch", "LangChain", "React / Next.js", "Streamlit", "Django"],
  },
  {
    label: "Infrastructure",
    color: "#f59e0b",
    skills: ["Docker", "Git / CI/CD", "REST APIs", "MongoDB", "Hugging Face", "Linux"],
  },
];

const additionalTools = [
  "TensorFlow", "Scikit-learn", "CrewAI", "Gradio", "Pandas",
  "NumPy", "MariaDB", "Postman", "Jira", "Confluence",
  "Claude Skills Dev", "DICOM", "Jupyter", "Weights & Biases",
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Tools" index="04" alternate>

      {/* Clean typographic skill table */}
      <div className="divide-y divide-border/40">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="py-6 grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr] gap-4 items-start group"
          >
            {/* Category label */}
            <span
              className="text-[10px] font-mono uppercase tracking-widest pt-0.5 transition-opacity"
              style={{ color: group.color }}
            >
              {group.label}
            </span>

            {/* Skills — plain text, space-separated on mobile, wrapping */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-secondary text-sm font-mono hover:text-foreground transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Also experienced with — marquee */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-10"
      >
        <p className="font-mono text-muted text-[10px] mb-4 tracking-widest uppercase">
          Also experienced with
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex marquee">
            {[...additionalTools, ...additionalTools].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="px-3.5 py-1.5 text-xs font-mono text-muted border border-border/60 rounded-full whitespace-nowrap mx-1.5 hover:border-accent/30 hover:text-secondary transition-colors cursor-default flex-shrink-0"
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
