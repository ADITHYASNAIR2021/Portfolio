"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  capabilities,
  caseStudies,
  education,
  experience,
  leadership,
  profile,
  proofPoints,
  publication,
  smallerBuilds,
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

function SignalTrace({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 82" fill="none" aria-hidden="true">
      <path
        d="M2 43h48l17-31 27 58 28-51 21 24h48l13-19 19 37 21-18h74"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="67" cy="12" r="4" fill="currentColor" />
      <circle cx="223" cy="61" r="4" fill="currentColor" />
    </svg>
  );
}

function CaseVisual({ kind }: { kind: CaseStudy["visual"] }) {
  if (kind === "medical") {
    return (
      <svg className="case-glyph" viewBox="0 0 600 420" fill="none" aria-hidden="true">
        <rect x="58" y="44" width="484" height="330" rx="2" className="glyph-frame" />
        <path className="glyph-faint" d="M58 112h484M154 44v330" />
        <circle cx="349" cy="209" r="104" className="glyph-orbit" />
        <circle cx="349" cy="209" r="61" className="glyph-orbit dash" />
        <path className="glyph-solid" d="M174 225h52l18-52 33 111 28-79 25 20h58l25-74 25 74h80" />
        <path className="glyph-faint" d="M183 86h98M183 310h76M183 332h118" />
        <circle cx="349" cy="209" r="8" className="glyph-dot" />
        <text x="78" y="87" className="glyph-label">EVAL / 10+ MODALITIES</text>
        <text x="459" y="352" className="glyph-label">SIGNAL</text>
      </svg>
    );
  }

  if (kind === "school") {
    return (
      <svg className="case-glyph" viewBox="0 0 600 420" fill="none" aria-hidden="true">
        <path className="glyph-frame" d="M62 62h476v296H62z" />
        <path className="glyph-faint" d="M62 135h476M181 62v296M419 62v296" />
        <circle cx="300" cy="210" r="78" className="glyph-orbit dash" />
        <path className="glyph-solid" d="M181 103h64c31 0 55 25 55 55v104c0 31 25 55 55 55h64" />
        <path className="glyph-solid reverse" d="M419 103h-64c-31 0-55 25-55 55v104c0 31-25 55-55 55h-64" />
        <circle cx="181" cy="103" r="11" className="glyph-dot" />
        <circle cx="419" cy="103" r="11" className="glyph-dot" />
        <circle cx="181" cy="317" r="11" className="glyph-dot" />
        <circle cx="419" cy="317" r="11" className="glyph-dot" />
        <text x="84" y="104" className="glyph-label">STUDENT</text>
        <text x="436" y="104" className="glyph-label">TEACHER</text>
        <text x="84" y="322" className="glyph-label">PARENT</text>
        <text x="436" y="322" className="glyph-label">ADMIN</text>
      </svg>
    );
  }

  return (
    <svg className="case-glyph" viewBox="0 0 600 420" fill="none" aria-hidden="true">
      <rect x="60" y="48" width="480" height="324" className="glyph-frame" />
      <path className="glyph-faint" d="M60 102h480M124 48v324M476 48v324" />
      <path className="glyph-solid" d="m124 118 128 92-128 92M476 118 348 210l128 92" />
      <circle cx="300" cy="210" r="69" className="glyph-orbit" />
      <path className="glyph-solid reverse" d="M258 210h84M300 168v84" />
      <circle cx="300" cy="210" r="14" className="glyph-dot" />
      <text x="81" y="82" className="glyph-label">PROBLEM → PRODUCT</text>
      <text x="397" y="348" className="glyph-label">DIRECT SIGNAL</text>
    </svg>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["Research", "#research"],
    ["About", "#about"],
    ["Contact", "#contact"],
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
      <a className="brand-mark" href="#top" aria-label="Adithya S Nair, back to top">
        <span>AS/N</span>
        <small>Build log / 26.08</small>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href], index) => (
          <a href={href} key={href}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </nav>

      <a className="availability" href={`mailto:${profile.email}`}>
        <i /> Open to difficult problems
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i className={open ? "is-open" : ""} />
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
            transition={{ duration: 0.38, ease }}
          >
            <div className="mobile-nav-inner">
              {links.map(([label, href], index) => (
                <motion.a
                  href={href}
                  key={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, ease }}
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
          <span>AI engineering / research / product</span>
          <span>Based in Kerala · working anywhere</span>
        </div>

        <div className="hero-copy">
          <div className="hero-title-wrap">
            <h1 id="hero-title">
              <span className="hero-line"><span className="hero-word">AI should survive</span></span>
              <span className="hero-line"><span className="hero-word hero-serif">contact with</span></span>
              <span className="hero-line"><span className="hero-word">the real world.</span></span>
            </h1>
            <SignalTrace className="hero-scribble" />
          </div>
          <p className="hero-intro" data-reveal>
            I design the pipelines, products, and evaluation loops that make that happen—from medical vision systems to multi-school platforms.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#work">
              See selected work <Arrow direction="down" />
            </a>
            <a className="button button-quiet" href={profile.resume} target="_blank" rel="noreferrer">
              Read résumé <Arrow />
            </a>
          </div>
        </div>

        <div className="portrait-wrap" data-parallax>
          <div className="portrait-index">HUMAN / SIGNAL</div>
          <div className="portrait-frame">
            <Image
              src="/images/adithya-wide.jpeg"
              alt="Adithya S Nair standing outdoors in Kerala"
              fill
              sizes="(max-width: 767px) 88vw, (max-width: 1200px) 38vw, 520px"
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
            whileDrag={{ rotate: -4, scale: 1.04 }}
            whileHover={{ rotate: 1 }}
            aria-hidden="true"
          >
            Current obsession:<br />memory × agents × reliable evaluation.
            <small>← move the signal</small>
          </motion.div>
          <div className="portrait-caption">
            <span>Build</span><span>Measure</span><span>Make useful</span>
          </div>
        </div>

        <a className="scroll-cue" href="#proof" aria-label="Scroll to quick facts">
          <span>Keep going</span><Arrow direction="down" />
        </a>
      </div>

      <div className="thought-loop" aria-label="Working principles">
        <div>
          <span>question assumptions</span><i>↗</i><span>prototype the hard part</span><i>↗</i><span>measure what matters</span><i>↗</i>
          <span>question assumptions</span><i>↗</i><span>prototype the hard part</span><i>↗</i><span>measure what matters</span><i>↗</i>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip page-grid" id="proof" aria-label="Selected facts">
      <div className="proof-intro" data-reveal>
        <span className="eyebrow">My operating thesis</span>
        <p>The model is a component. The system is the product.</p>
      </div>
      <div className="proof-list">
        {proofPoints.map((item, index) => (
          <div className="proof-item" key={item.label} data-reveal>
            <span>0{index + 1}</span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <header className="section-heading page-grid" data-reveal>
        <span className="eyebrow">Selected systems / 03</span>
        <h2 id="work-title">Built where failure<br /><em>is not abstract.</em></h2>
        <p>Healthcare, education, and product delivery—three environments where reliability matters more than a polished demo.</p>
      </header>

      <div className="case-list">
        {caseStudies.map((project) => (
          <article className={`case-study case-${project.accent}`} key={project.title}>
            <div className="case-topline page-grid">
              <span>{project.index} / 03</span>
              <span>{project.kind}</span>
              <span>Selected case</span>
            </div>
            <div className="case-layout page-grid">
              <div className="case-copy" data-reveal>
                <h3>{project.title}</h3>
                <p className="case-subtitle">{project.subtitle}</p>
                <p className="case-thesis">{project.thesis}</p>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                  Visit the work <Arrow />
                </a>
              </div>
              <div className="case-visual" data-parallax>
                <CaseVisual kind={project.visual} />
                <div className="case-metric">
                  <strong>{project.metric}</strong><span>{project.metricLabel}</span>
                </div>
              </div>
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
        <div className="research-label" data-reveal>
          <span className="eyebrow">Published research</span>
          <span>{publication.venue}</span>
        </div>
        <div className="research-title" data-reveal>
          <span className="research-acronym">{publication.title}</span>
          <h2 id="research-title">{publication.expanded}</h2>
          <p>{publication.summary}</p>
        </div>
        <div className="research-diagram" aria-hidden="true" data-parallax>
          <div><span>RAD-DINO</span><small>vision</small></div>
          <i>→</i>
          <div className="research-adapter"><span>SA adapter</span><small>align</small></div>
          <i>→</i>
          <div><span>BioGPT</span><small>language</small></div>
        </div>
        <div className="research-facts">
          {publication.facts.map((fact) => (
            <div key={fact.label} data-reveal>
              <strong>{fact.value}</strong><span>{fact.label}</span>
            </div>
          ))}
        </div>
        <p className="research-margin-note">98% less to train.<br />93.6% performance kept.</p>
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease }}
          >
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <span>{item.tools}</span>
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
        <span className="eyebrow" data-reveal>How I work</span>
        <h2 id="about-title" data-reveal>
          Broad by curiosity.<br /><em>Precise by habit.</em>
        </h2>
        <p data-reveal>
          I work best where product thinking, research, and engineering collide: asking the inconvenient question early, proving the hard part quickly, and staying accountable after launch.
        </p>
      </div>
      <div className="page-grid" data-reveal>
        <CapabilityIndex />
      </div>

      <div className="story-grid page-grid">
        <div className="timeline-block">
          <header data-reveal><span className="eyebrow">Experience</span><h3>The work behind the work.</h3></header>
          {experience.map((item) => (
            <article className="timeline-row" key={`${item.role}-${item.period}`} data-reveal>
              <span>{item.period}</span>
              <div><h4>{item.role} · {item.company}</h4><small>{item.location}</small><p>{item.note}</p></div>
            </article>
          ))}
        </div>
        <div className="education-block">
          <header data-reveal><span className="eyebrow">Education</span><h3>Still studying the edges.</h3></header>
          {education.map((item) => (
            <article className="education-row" key={item.degree} data-reveal>
              <span>{item.period}</span>
              <h4>{item.degree}</h4>
              <strong>{item.focus}</strong>
              <small>{item.school}</small>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="leadership-note page-grid" data-reveal>
        <div className="leadership-stamp">200+<small>people, not users</small></div>
        <div>
          <span className="eyebrow">Leadership / community</span>
          <h3>{leadership.title}</h3>
          <strong>{leadership.path}</strong>
          <p>{leadership.body}</p>
        </div>
      </div>
    </section>
  );
}

function SideProjects() {
  return (
    <section className="side-projects page-grid" aria-labelledby="side-projects-title">
      <header data-reveal>
        <span className="eyebrow">Selected experiments</span>
        <h2 id="side-projects-title">Experiments with<br /><em>useful consequences.</em></h2>
      </header>
      <div className="side-project-list">
        {smallerBuilds.map((project, index) => (
          <article key={project.title} data-reveal>
            <span>{project.year}</span>
            <strong>0{index + 1}</strong>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
          </article>
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
          <span className="eyebrow">The next hard thing</span>
          <h2 id="contact-title">Bring me the problem<br /><em>that resists shortcuts.</em></h2>
          <p>
            I’m open to AI engineering roles, research collaborations, and focused product builds with real users, real constraints, and standards worth defending.
          </p>
        </div>
        <a className="contact-orbit" href={`mailto:${profile.email}`} data-reveal>
          <span>Start a conversation</span>
          <strong>Say hello</strong>
          <Arrow />
        </a>
        <div className="contact-links" data-reveal>
          <a href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Résumé<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer page-grid">
      <div><strong>Adithya S Nair</strong><span>Full-stack AI engineer & researcher</span></div>
      <p>Designed as a living system, not a template.<br />Built in Kerala for problems without borders.</p>
      <a href="#top">Back to top <Arrow direction="up-right" /></a>
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
        gsap.set("[data-reveal], .hero-word", { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        ".hero-word",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power4.out", delay: 0.18 },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: 3 },
          {
            yPercent: -3,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      gsap.to(".scroll-progress", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
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
        <Work />
        <Research />
        <About />
        <SideProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
