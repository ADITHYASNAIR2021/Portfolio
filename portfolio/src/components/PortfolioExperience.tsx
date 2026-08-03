"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  capabilities,
  caseStudies,
  education,
  experience,
  faq,
  leadership,
  profile,
  proofPoints,
  publication,
  smallerBuilds,
  studio,
  type CaseStudy,
} from "@/content/story";

const ease = [0.22, 1, 0.36, 1] as const;

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
    ["Lab", "#lab"],
    ["Story", "#about"],
    ["Q&A", "#faq"],
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

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid page-grid">
        <div className="hero-kicker" data-reveal>
          <span>AI systems / research / product</span>
          <span>Kerala, India / working worldwide</span>
        </div>
        <div className="hero-copy">
          <p className="hero-overline" data-reveal>Adithya S Nair / AI engineer</p>
          <h1 id="hero-title">
            <span className="hero-line"><span className="hero-word">Build AI</span></span>
            <span className="hero-line"><span className="hero-word hero-serif">that earns</span></span>
            <span className="hero-line"><span className="hero-word">confidence.</span></span>
          </h1>
          <p className="hero-intro" data-reveal>
            I turn difficult AI ideas into measurable systems. My work spans medical vision, agent memory, evaluation, and products people can trust.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#work">See selected work <Arrow direction="down" /></a>
            <a className="button button-quiet" href={profile.resume} target="_blank" rel="noreferrer">Read resume <Arrow /></a>
          </div>
        </div>
        <div className="portrait-wrap" data-parallax>
          <div className="portrait-index">HUMAN / SIGNAL</div>
          <div className="portrait-frame">
            <Image
              src="/images/adithya-professional-v3.webp"
              alt="Professional portrait of Adithya S Nair, AI engineer and researcher"
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1200px) 40vw, 520px"
              fetchPriority="high"
              className="portrait-image"
            />
            <div className="portrait-tone" />
          </div>
          <motion.div
            className="portrait-note"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            whileDrag={{ rotate: -3, scale: 1.03 }}
            whileHover={{ rotate: 1 }}
            aria-hidden="true"
          >
            Current research:<br />memory x agents x evaluation.
            <small>move the signal</small>
          </motion.div>
          <div className="portrait-caption"><span>Frame</span><span>Build</span><span>Prove</span></div>
        </div>
        <a className="scroll-cue" href="#proof" aria-label="Scroll to quick facts"><span>Explore</span><Arrow direction="down" /></a>
      </div>
      <div className="thought-loop" aria-label="Working principles">
        <div className="thought-track">
          {Array.from({ length: 12 }).map((_, set) => (
            <span className="thought-set" key={set} aria-hidden={set > 0 ? "true" : undefined}>
              <span>question assumptions</span><i aria-hidden="true">+</i>
              <span>prototype the hard part</span><i aria-hidden="true">+</i>
              <span>measure what matters</span><i aria-hidden="true">+</i>
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

const labModes = [
  {
    label: "Remember",
    code: "M-01",
    title: "Keep only useful state.",
    detail: "Memory should preserve decisions, evidence, and unresolved risk. More context is not the same as better context.",
    signal: [24, 44, 38, 72, 56, 88],
    measure: "Retrieval precision",
  },
  {
    label: "Route",
    code: "R-02",
    title: "Give each step a reason.",
    detail: "Agents need explicit tools, boundaries, and hand-off rules. Good routing makes a complex system easier to inspect.",
    signal: [18, 34, 66, 48, 78, 92],
    measure: "Decision trace",
  },
  {
    label: "Evaluate",
    code: "E-03",
    title: "Test the whole journey.",
    detail: "A correct final answer can hide a fragile process. I evaluate outcomes, tool choices, recovery, cost, and latency together.",
    signal: [30, 52, 46, 82, 68, 96],
    measure: "Task reliability",
  },
];

function SignalWorkbench() {
  const [active, setActive] = useState(0);
  const mode = labModes[active];

  return (
    <section className="lab-section page-grid" id="lab" aria-labelledby="lab-title">
      <header className="lab-heading" data-reveal>
        <span className="eyebrow">Interactive field lab / 01</span>
        <h2 id="lab-title">Test the <em>system.</em></h2>
        <p>Choose a layer. See what I optimise before an AI product reaches real users.</p>
      </header>
      <div className="lab-console" data-reveal>
        <div className="lab-tabs" role="tablist" aria-label="AI system layers">
          {labModes.map((item, index) => (
            <button
              key={item.code}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`lab-panel-${index}`}
              id={`lab-tab-${index}`}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              <span>{item.code}</span>{item.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="lab-panel"
            key={mode.code}
            role="tabpanel"
            id={`lab-panel-${active}`}
            aria-labelledby={`lab-tab-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="lab-copy">
              <span>Active layer / {mode.code}</span>
              <h3>{mode.title}</h3>
              <p>{mode.detail}</p>
              <small>Primary measure: {mode.measure}</small>
            </div>
            <div className="lab-viz" aria-hidden="true">
              <div className="lab-bars">
                {mode.signal.map((height, index) => (
                  <motion.i key={`${mode.code}-${index}`} initial={{ height: 12 }} animate={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="lab-orbit"><i /><i /><i /><strong>{active + 1}</strong></div>
            </div>
          </motion.div>
        </AnimatePresence>
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
        <p>Healthcare, education, and product delivery. Three places where reliability matters more than a polished demo.</p>
      </header>
      <div className="case-list">
        {caseStudies.map((project) => (
          <article className={`case-study case-${project.accent}`} key={project.title}>
            <div className="case-topline page-grid">
              <span>{project.index} / 03</span><span>{project.kind}</span><span>Selected case</span>
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

function Research() {
  return (
    <section className="research-section" id="research" aria-labelledby="research-title">
      <div className="research-grid page-grid">
        <div className="research-label" data-reveal><span className="eyebrow">Published research</span><span>{publication.venue}</span></div>
        <div className="research-title" data-reveal>
          <span className="research-acronym">{publication.title}</span>
          <h2 id="research-title">Smaller model.<br /><em>Serious signal.</em></h2>
          <strong className="research-full-title">{publication.expanded}</strong>
          <p>{publication.summary}</p>
        </div>
        <div className="research-diagram" aria-hidden="true" data-parallax>
          <div><span>RAD-DINO</span><small>vision</small></div><i>to</i>
          <div className="research-adapter"><span>SA adapter</span><small>align</small></div><i>to</i>
          <div><span>BioGPT</span><small>language</small></div>
        </div>
        <div className="research-facts">
          {publication.facts.map((fact) => <div key={fact.label} data-reveal><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function CapabilityIndex() {
  const [active, setActive] = useState(0);
  const item = capabilities[active];

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
      <div className="about-intro page-grid">
        <span className="eyebrow" data-reveal>Method / background</span>
        <h2 id="about-title" data-reveal>How I get to <em>useful.</em></h2>
        <p data-reveal>I connect product thinking, research, and engineering. I ask the difficult question early, prove the hard part quickly, and stay accountable after launch.</p>
      </div>
      <div className="page-grid" data-reveal><CapabilityIndex /></div>
      <div className="story-grid page-grid">
        <div className="timeline-block">
          <header data-reveal><span className="eyebrow">Experience</span><h3>Work in the real world.</h3></header>
          {experience.map((item) => (
            <article className="timeline-row" key={`${item.role}-${item.period}`} data-reveal>
              <span>{item.period}</span><div><h4>{item.role} / {item.company}</h4><small>{item.location}</small><p>{item.note}</p></div>
            </article>
          ))}
        </div>
        <div className="education-block">
          <header data-reveal><span className="eyebrow">Education</span><h3>Built on research.</h3></header>
          {education.map((item, index) => (
            <article className="education-row" key={item.degree} data-reveal>
              <div className="education-index">0{index + 1}</div><span>{item.period}</span><h4>{item.degree}</h4>
              <strong>{item.focus}</strong><small>{item.school}</small><p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="leadership-note page-grid" data-reveal>
        <div className="leadership-stamp">200+<small>people led</small></div>
        <div><span className="eyebrow">Leadership / community</span><h3>{leadership.title}</h3><strong>{leadership.path}</strong><p>{leadership.body}</p></div>
      </div>
    </section>
  );
}

function SideProjects() {
  return (
    <section className="side-projects" aria-labelledby="side-projects-title">
      <div className="side-projects-pin">
        <header className="side-projects-head page-grid" data-reveal>
          <span className="eyebrow">Selected experiments / 05</span>
          <h2 id="side-projects-title">Built to <em>learn.</em></h2>
          <span className="side-projects-hint" aria-hidden="true">Keep scrolling <Arrow direction="right" /></span>
        </header>
        <div className="side-project-rail" tabIndex={0} role="group" aria-label="Experiment gallery, scrolls horizontally">
          <div className="side-project-track">
            {smallerBuilds.map((project, index) => (
              <article className="side-project-card" key={project.title}>
                <div className="card-top"><span>{project.year}</span><strong>0{index + 1}</strong></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-tags">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              </article>
            ))}
            <article className="side-project-card card-cta">
              <div className="card-top"><span>Next</span><strong>0{smallerBuilds.length + 1}</strong></div>
              <h3>Your hard problem</h3>
              <p>The list grows wherever a difficult idea needs a working, measurable system.</p>
              <a className="text-link" href="#contact">Start one <Arrow /></a>
            </article>
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
          src="/images/agent-memory-lab-v1.webp"
          alt="Editorial illustration of an AI memory system moving through evaluation checkpoints"
          fill
          sizes="(max-width: 767px) 92vw, 54vw"
        />
        <span>Field note / 001</span>
      </div>
      <div className="journal-copy" data-reveal>
        <span className="eyebrow">New from the journal</span>
        <h2 id="journal-title">Memory is not a <em>feature.</em></h2>
        <p>Why capable agents need selective memory, observable retrieval, and evaluation across the full task journey.</p>
        <div><span>12 min read</span><span>August 3, 2026</span></div>
        <Link className="button button-primary" href="/blog/agent-memory-needs-evaluation">Read the field note <Arrow /></Link>
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
        <p>The short version — for people in a hurry and the engines answering for them.</p>
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
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set("[data-reveal], .hero-word", { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.fromTo(".hero-word", { yPercent: 115 }, { yPercent: 0, duration: 0.95, stagger: 0.08, ease: "power4.out", delay: 0.16 });
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

      // Marquee: GSAP-driven so scroll velocity can push it.
      const marqueeTrack = root.current?.querySelector<HTMLElement>(".thought-track");
      if (marqueeTrack) {
        marqueeTrack.style.animation = "none";
        const marquee = gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 800, 3.2);
            gsap.to(marquee, { timeScale: 1 + boost, duration: 0.45, overwrite: true });
          },
        });
      }

      // Experiments rail: pin the section and pan it horizontally with scroll.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const rail = root.current?.querySelector<HTMLElement>(".side-project-rail");
        if (!rail || rail.scrollWidth <= rail.clientWidth) return;
        gsap.to(rail, {
          scrollLeft: () => rail.scrollWidth - rail.clientWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ".side-projects",
            start: "top top",
            end: () => `+=${rail.scrollWidth - rail.clientWidth}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Masked line reveals on section headings, after fonts settle.
      document.fonts.ready.then(() => {
        gsap.utils.toArray<HTMLElement>(
          ".section-heading h2, .lab-heading h2, .about-intro h2, .side-projects h2, .journal-copy h2, .contact-copy h2, .faq-heading h2, .research-title h2",
        ).forEach((heading) => {
          const split = SplitText.create(heading, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 112,
            duration: 0.85,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        });
        ScrollTrigger.refresh();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="portfolio-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation />
      <main id="main">
        <Hero />
        <ProofStrip />
        <SignalWorkbench />
        <Work />
        <Research />
        <About />
        <SideProjects />
        <BlogPreview />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
