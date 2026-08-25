"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  capabilities,
  caseStudies,
  communityRoles,
  education,
  experience,
  faq,
  profile,
  proofPoints,
  skillGroups,
  smallerBuilds,
  studio,
  type CaseStudy,
} from "@/content/story";
import { latestPost } from "@/content/blog";

const ease = [0.22, 1, 0.36, 1] as const;
const SHOW_SYSTEMS_DECK = false;

function Arrow({ direction = "up-right" }: { direction?: "up-right" | "down" | "right" }) {
  const paths = {
    "up-right": "M5 15 15 5M7 5h8v8",
    down: "M12 4v16m-6-6 6 6 6-6",
    right: "M4 12h16m-6-6 6 6-6 6",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[direction]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["Skills", "#skills"],
    ["About", "#about"],
    ["Community", "#community"],
    ["Journal", "/blog"],
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <Link className="brand-mark" href="/" aria-label="Adithya S Nair, home">
        <span>AS/N</span>
        <small>Applied AI / 26</small>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href], index) => (
          <a href={href} key={href}><span>0{index + 1}</span>{label}</a>
        ))}
      </nav>
      <a className="availability" href={`mailto:${profile.email}`}><i /> Available for meaningful work</a>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span><i className={open ? "is-open" : ""} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.36, ease }}
          >
            <div className="mobile-nav-inner">
              {links.map(([label, href], index) => (
                <motion.a
                  href={href}
                  key={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 + index * 0.05, ease }}
                >
                  <span>0{index + 1}</span>{label}
                </motion.a>
              ))}
              <p>Kottayam, Kerala<br />Working worldwide</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const systemsFocusModes = [
  {
    label: "Reliability",
    screen: "Reliability matrix",
    state: "Stable",
    signal: [34, 58, 46, 76, 61, 88, 72, 94],
    researchSignal: [28, 42, 62, 54, 78, 69, 88, 82],
    route: ["Test", "Trace", "Ship"],
    footer: ["Evals", "Guardrails", "Observability"],
  },
  {
    label: "Retrieval",
    screen: "Context quality",
    state: "Grounded",
    signal: [52, 68, 42, 82, 74, 91, 64, 86],
    researchSignal: [36, 57, 48, 72, 65, 84, 76, 92],
    route: ["Query", "Retrieve", "Answer"],
    footer: ["RAG", "Reranking", "Citations"],
  },
  {
    label: "Delivery",
    screen: "Delivery flow",
    state: "Shipping",
    signal: [44, 36, 64, 58, 80, 72, 92, 88],
    researchSignal: [30, 52, 45, 68, 61, 79, 85, 94],
    route: ["Frame", "Build", "Learn"],
    footer: ["PRDs", "CI/CD", "Feedback"],
  },
];

function Hero() {
  const [focus, setFocus] = useState(0);
  const [researchMode, setResearchMode] = useState(true);
  const [diagnosticRun, setDiagnosticRun] = useState(0);
  const mode = systemsFocusModes[focus];
  const baseSignal = researchMode ? mode.researchSignal : mode.signal;
  const signal = baseSignal.map((height, index) => Math.min(98, height + (diagnosticRun % 2 ? (index % 3) * 2 : 0)));

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className={`hero-grid page-grid ${SHOW_SYSTEMS_DECK ? "" : "hero-grid-solo"}`}>
        <div className="hero-copy">
          <p className="hero-overline" data-reveal>Adithya S Nair / AI engineer</p>
          <h1 id="hero-title">
            <span className="hero-line"><span className="hero-word">Engineering AI</span></span>
            <span className="hero-line"><span className="hero-word hero-serif">that earns</span></span>
            <span className="hero-line"><span className="hero-word">confidence.</span></span>
          </h1>
          <p className="hero-intro" data-reveal>
            I build measurable AI systems from prototype to production, combining LLM and RAG pipelines, agent memory, evaluation, full-stack engineering, and thoughtful product decisions.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#work">See selected work <Arrow direction="down" /></a>
            <a className="button button-quiet" href={profile.resume} target="_blank" rel="noreferrer">Read resume <Arrow /></a>
          </div>
        </div>
        {SHOW_SYSTEMS_DECK && <div className="hero-workbench" data-parallax aria-label="Interactive systems console">
          <div className={`workbench-shell ${researchMode ? "research-active" : ""}`}>
            <div className="workbench-topline">
              <span>ASN / SYSTEMS DESK</span>
              <div aria-hidden="true"><i /> <i /> <i /></div>
            </div>
            <div className="workbench-screen" role="status" aria-live="polite">
              <div className="screen-meta">
                <span>{researchMode ? `${mode.label} evidence` : mode.screen}</span>
                <strong>{researchMode ? "Research on" : mode.state}</strong>
              </div>
              <div className="signal-graph" aria-hidden="true">
                {signal.map((height, index) => (
                  <motion.i
                    key={`${focus}-${researchMode}-${diagnosticRun}-${index}`}
                    initial={{ height: "10%", opacity: 0.45 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.025, ease }}
                  />
                ))}
              </div>
              <div className="screen-route" aria-hidden="true">
                <span>{researchMode ? "Hypothesis" : mode.route[0]}</span><i />
                <span>{researchMode ? "Compare" : mode.route[1]}</span><i />
                <span>{researchMode ? "Decide" : mode.route[2]}</span>
              </div>
            </div>
            <div className="workbench-controls">
              <button
                className="control-module health-module"
                type="button"
                onClick={() => setDiagnosticRun((value) => value + 1)}
                aria-label="Run a system diagnostic"
              >
                <span>Model health</span>
                <div className="vu-meter" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
                <small>{diagnosticRun ? `Verified / ${96 + (diagnosticRun % 3)}` : "Run diagnostic"}</small>
              </button>
              <label className="control-module dial-module">
                <span>System focus</span>
                <input
                  type="range"
                  min="0"
                  max={systemsFocusModes.length - 1}
                  step="1"
                  value={focus}
                  onChange={(event) => setFocus(Number(event.target.value))}
                  aria-label="System focus"
                  aria-valuetext={mode.label}
                />
                <div className="rotary-dial" aria-hidden="true"><i style={{ transform: `rotate(${-44 + focus * 44}deg)` }} /></div>
                <small>{mode.label}</small>
              </label>
              <button
                className="control-module switch-module"
                type="button"
                aria-pressed={researchMode}
                onClick={() => setResearchMode((value) => !value)}
              >
                <span>Research mode</span>
                <div className={`toggle-switch ${researchMode ? "is-on" : ""}`} aria-hidden="true"><i /></div>
                <small>Evidence {researchMode ? "on" : "off"}</small>
              </button>
            </div>
            <div className="workbench-footer" aria-label={`${mode.label} focus areas`}>
              {mode.footer.map((item) => <span key={item}><i aria-hidden="true" /> {item}</span>)}
            </div>
          </div>
        </div>}
        <a className="scroll-cue" href="#proof" aria-label="Scroll to quick facts"><span>Explore</span><Arrow direction="down" /></a>
      </div>
      <div className="thought-loop" aria-label="Working principles">
        <div className="thought-track">
          {Array.from({ length: 8 }).map((_, set) => (
            <span className="thought-set" key={set} aria-hidden={set > 0 ? "true" : undefined}>
              <span>agent systems that recover</span><i aria-hidden="true">+</i>
              <span>evaluation before scale</span><i aria-hidden="true">+</i>
              <span>tools with clear boundaries</span><i aria-hidden="true">+</i>
              <span>product thinking to production</span><i aria-hidden="true">+</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip page-grid" id="proof" aria-label="Selected facts">
      <div className="proof-intro" data-reveal>
        <span className="eyebrow">Operating thesis</span>
        <p>A model can impress. A system must hold up.</p>
      </div>
      <div className="proof-list">
        {proofPoints.map((item, index) => (
          <div className="proof-item" key={item.label} data-reveal>
            <span>0{index + 1}</span><strong>{item.value}</strong><p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SystemVisual({ project }: { project: CaseStudy }) {
  return (
    <div className={`system-visual visual-${project.visual}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-node node-one" />
      <div className="visual-node node-two" />
      <div className="visual-node node-three" />
      <div className="visual-line line-one" />
      <div className="visual-line line-two" />
      <span>{project.kind}</span>
      <strong>{project.metric}</strong>
      <small>{project.metricLabel}</small>
    </div>
  );
}

function Work() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <header className="section-heading page-grid" data-reveal>
        <span className="eyebrow">Selected systems / 03</span>
        <h2 id="work-title">Systems with <em>stakes.</em></h2>
        <p>Developer tools, education platforms, and product delivery. Three places where reliable systems matter more than polished demos.</p>
      </header>
      <div className="case-list">
        {caseStudies.map((project) => (
          <article className={`case-study case-${project.accent}`} key={project.title}>
            <div className="case-topline page-grid">
              <span>{project.index} / {String(caseStudies.length).padStart(2, "0")}</span><span>{project.kind}</span><span>Selected case</span>
            </div>
            <div className="case-layout page-grid">
              <div className="case-copy" data-reveal>
                <h3>{project.title}</h3>
                <p className="case-subtitle">{project.subtitle}</p>
                <p className="case-thesis">{project.thesis}</p>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">Visit the work <Arrow /></a>
              </div>
              <div className="case-visual" data-parallax><SystemVisual project={project} /></div>
            </div>
            <div className="case-notes page-grid">
              <div data-reveal><span>The tension</span><p>{project.challenge}</p></div>
              <div data-reveal><span>The response</span><p>{project.response}</p></div>
              <div data-reveal><span>What changed</span><p>{project.outcome}</p></div>
            </div>
            <div className="case-tools page-grid" aria-label={`${project.title} technologies`}>
              {project.tech.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section className="skills-section page-grid" id="skills" aria-labelledby="skills-title">
      <header className="skills-heading" data-reveal>
        <span className="eyebrow">Working toolkit / 04</span>
        <h2 id="skills-title">Useful skills, <em>clearly grouped.</em></h2>
        <p>Select an area to see the tools I use to move from an unclear problem to a dependable product.</p>
      </header>
      <div className="skills-console" data-reveal>
        <div className="skill-tabs" role="tablist" aria-label="Skill groups">
          {skillGroups.map((item, index) => (
            <button
              key={item.code}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`skill-panel-${index}`}
              id={`skill-tab-${index}`}
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              <span>{item.code}</span>{item.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="skill-panel"
            key={group.code}
            role="tabpanel"
            id={`skill-panel-${active}`}
            aria-labelledby={`skill-tab-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
          >
            <div className="skill-panel-intro"><span>{group.code} / focus</span><h3>{group.label}</h3><p>{group.summary}</p></div>
            <div className="skill-chip-grid">
              {group.skills.map((skill, index) => <span key={skill}><i>{String(index + 1).padStart(2, "0")}</i>{skill}</span>)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CapabilityIndex() {
  const [active, setActive] = useState(0);
  const item = capabilities[active];

  const moveTab = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? capabilities.length - 1
        : (index + direction + capabilities.length) % capabilities.length;
    setActive(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]
      ?.focus();
  };

  return (
    <div className="capability-index">
      <div className="capability-tabs" role="tablist" aria-label="How I approach the work">
        {capabilities.map((capability, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`capability-panel-${index}`}
            id={`capability-tab-${index}`}
            tabIndex={active === index ? 0 : -1}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => moveTab(event, index)}
            key={capability.title}
          >
            <span>{capability.number}</span>{capability.title}
          </button>
        ))}
      </div>
      <div className="capability-stage">
        <div className="capability-counter" aria-hidden="true">0{active + 1}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            role="tabpanel"
            id={`capability-panel-${active}`}
            aria-labelledby={`capability-tab-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            <h3>{item.title}</h3><p>{item.detail}</p><span>{item.tools}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-profile about-profile-lead page-grid" data-reveal>
        <span className="eyebrow">About Adithya</span>
        <div>
          <h2 id="about-title">Engineer, product builder, and community leader.</h2>
          <p>{profile.summary}</p>
        </div>
      </div>
      <div className="story-grid story-grid-priority page-grid">
        <div className="timeline-block">
          <header data-reveal><span className="eyebrow">Experience</span><h3>Production work, clearly told.</h3></header>
          {experience.map((item) => (
            <article className="timeline-row" key={`${item.role}-${item.period}`} data-reveal>
              <span>{item.period}</span><div><h4>{item.role} / {item.company}</h4><small>{item.location}</small><p>{item.note}</p>
                <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="education-block">
          <header data-reveal><span className="eyebrow">Education</span><h3>Research with an engineering base.</h3></header>
          {education.map((item, index) => (
            <article className="education-row" key={item.degree} data-reveal>
              <div className="education-index">0{index + 1}</div><span>{item.period}</span><h4>{item.degree}</h4>
              <strong>{item.focus}</strong><small>{item.school}</small><p>{item.note}</p>
              <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
      <div className="about-intro about-method page-grid">
        <span className="eyebrow" data-reveal>How I work</span>
        <h2 data-reveal>From ambiguity to <em>useful.</em></h2>
        <p data-reveal>I connect product thinking, research, and engineering. I ask the difficult question early, prove the hard part quickly, and stay accountable after launch.</p>
      </div>
      <div className="page-grid" data-reveal><CapabilityIndex /></div>
    </section>
  );
}

function Community() {
  return (
    <section className="community-section" id="community" aria-labelledby="community-title">
      <header className="community-heading page-grid" data-reveal>
        <span className="eyebrow">Volunteering and events / 04</span>
        <h2 id="community-title">Work beyond <em>the desk.</em></h2>
        <p>Leadership, mentoring, event operations, and community programmes that strengthened how I communicate and coordinate.</p>
      </header>
      <div className="community-grid page-grid" role="group" aria-label="Volunteering and event roles" tabIndex={0}>
        {communityRoles.map((item, index) => (
          <article className={`community-card community-${item.accent}`} key={item.title} data-reveal>
            <div><span>{item.period}</span><strong>0{index + 1}</strong></div>
            <h3>{item.title}</h3>
            <h4>{item.role}</h4>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SideProjects() {
  return (
    <section className="side-projects" aria-labelledby="side-projects-title">
      <div className="side-projects-pin">
        <header className="side-projects-head page-grid" data-reveal>
          <span className="eyebrow">Selected experiments / 03</span>
          <h2 id="side-projects-title">Built to <em>learn.</em></h2>
          <p>Compact experiments that sharpened a specific technical or product skill.</p>
        </header>
        <div className="side-project-rail page-grid" role="group" aria-label="Experiment gallery" tabIndex={0}>
          <div className="side-project-track">
            {smallerBuilds.map((project, index) => (
              <article className="side-project-card" key={project.title}>
                <div className="card-top"><span>{project.year}</span><strong>0{index + 1}</strong></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-tags">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section className="journal-preview page-grid" aria-labelledby="journal-title">
      <div className="journal-image" data-reveal>
        <Image
          src={latestPost.image}
          alt={latestPost.imageAlt}
          fill
          sizes="(max-width: 767px) 92vw, 54vw"
        />
        <span>Field note / 002</span>
      </div>
      <div className="journal-copy" data-reveal>
        <span className="eyebrow">New from the journal</span>
        <h2 id="journal-title">Agents need a <em>runtime.</em></h2>
        <p>{latestPost.description}</p>
        <div><span>{latestPost.readingTime}</span><span>{latestPost.publishedLabel}</span></div>
        <Link className="button button-primary" href={`/blog/${latestPost.slug}`}>Read the field note <Arrow /></Link>
        <Link className="text-link" href="/blog">Browse all writing <Arrow /></Link>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq-section page-grid" id="faq" aria-labelledby="faq-title">
      <header className="faq-heading" data-reveal>
        <span className="eyebrow">Common questions / 06</span>
        <h2 id="faq-title">Direct <em>answers.</em></h2>
        <p>The short version, for people in a hurry and the engines answering for them.</p>
      </header>
      <div className="faq-list">
        {faq.map((item, index) => (
          <details className="faq-item" key={item.id} id={item.id} data-reveal>
            <summary>
              <span aria-hidden="true">0{index + 1}</span>
              {item.question}
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid page-grid">
        <div className="contact-copy" data-reveal>
          <span className="eyebrow">The next hard thing</span><h2 id="contact-title">Let&apos;s build the <em>hard part.</em></h2>
          <p>I am open to AI engineering roles, research collaborations, and focused product builds with real users and real constraints.</p>
        </div>
        <a className="contact-orbit" href={`mailto:${profile.email}`} data-reveal><span>Start a conversation</span><strong>Say hello</strong><Arrow /></a>
        <div className="contact-links" data-reveal>
          <a href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-grid">
        <div className="footer-id"><strong>Adithya S Nair</strong><span>Full-stack AI engineer & researcher</span></div>
        <p>Designed as a living system.<br />Built in Kerala for problems without borders.</p>
        <div className="footer-links"><Link href="/blog">Journal</Link><a href="#top">Back to top <Arrow /></a></div>
        <div className="footer-credit">
          <span>© 2026 Adithya S Nair · Kottayam, Kerala</span>
          <a href={studio.url} target="_blank" rel="noreferrer">
            Made with <strong>{studio.name}</strong> · {studio.domain} <Arrow />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 26, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(element, { yPercent: 2 }, {
          yPercent: -2,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });
      gsap.to(".scroll-progress", { scaleX: 1, transformOrigin: "left center", ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

      // A deliberately slow continuous loop keeps the principles readable.
      const marqueeTrack = root.current?.querySelector<HTMLElement>(".thought-track");
      if (marqueeTrack) {
        marqueeTrack.style.animation = "none";
        gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 110, repeat: -1 });
      }

    },
    { scope: root },
  );

  return (
    <div ref={root} className="portfolio-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <ProofStrip />
        <Work />
        <Skills />
        <Community />
        <SideProjects />
        <BlogPreview />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
