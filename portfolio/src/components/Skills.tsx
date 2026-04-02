"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const skillCategories = [
  {
    title: "Languages",
    icon: "{ }",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 70 },
      { name: "Java", level: 55 },
    ],
  },
  {
    title: "AI / ML",
    icon: "⚡",
    skills: [
      { name: "LLM Integration", level: 95 },
      { name: "Prompt Engineering", level: 92 },
      { name: "RAG Systems", level: 90 },
      { name: "Deep Learning", level: 80 },
      { name: "Model Evaluation", level: 88 },
      { name: "Multi-Agent Systems", level: 78 },
    ],
  },
  {
    title: "Frameworks",
    icon: "◆",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "PyTorch", level: 80 },
      { name: "LangChain", level: 85 },
      { name: "React / Next.js", level: 65 },
      { name: "Streamlit", level: 85 },
      { name: "Django", level: 60 },
    ],
  },
  {
    title: "Infrastructure",
    icon: "⬡",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git / CI/CD", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "MongoDB", level: 70 },
      { name: "Hugging Face", level: 82 },
    ],
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Tools" index="04">
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="bg-surface/50 border border-border rounded-lg p-6 hover:border-accent/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent font-mono text-lg">
                {category.icon}
              </span>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category.title}
              </h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: catIdx * 0.1 + skillIdx * 0.05,
                  }}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-secondary">{skill.name}</span>
                    <span className="text-xs font-mono text-muted">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: catIdx * 0.1 + skillIdx * 0.05,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, var(--accent), var(--violet))`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional tools row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="font-mono text-muted text-xs mb-4 tracking-wider uppercase">
          Also experienced with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
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
          ].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 text-xs font-mono text-secondary bg-surface/50 border border-border rounded-full hover:border-accent/30 hover:text-accent transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
