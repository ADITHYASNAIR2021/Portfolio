"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  caseStudies, communityRoles, education, experience, faq, languages,
  profile, proofPoints, research, skillGroups, smallerBuilds, studio,
  type CaseStudy,
} from "@/content/story";
import { latestPost } from "@/content/blog";

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
  const [activeHref, setActiveHref] = useState("");
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = [
    ["Work", "#work"], ["Research", "#research"], ["About", "#about"],
    ["Community", "#community"], ["Journal", "/blog"],
  ];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const cutoff = (header.current?.offsetHeight ?? 88) + 40;
      const current = sections.reduce((id, section) => section.getBoundingClientRect().top <= cutoff ? section.id : id, "");
      setActiveHref(`#${current === "skills" ? "about" : current}`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggleButton = toggle.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => menu.current?.querySelector("a")?.focus());
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = [toggleButton, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const closeOnDesktop = () => { if (window.innerWidth > 1240) setOpen(false); };
    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", closeOnDesktop);
      toggleButton?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header ref={header} className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="navbar-inner">
      <Link className="brand-mark" href="/" aria-label="Adithya S Nair, home">
        <span>AS/N</span><span className="brand-copy"><strong>Adithya S Nair</strong><small>Engineering · Research · Community</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a href={href} key={href} aria-current={activeHref === href ? "location" : undefined}>{label}</a>)}
      </nav>
      <a className="availability" href="#contact"><i /> Let’s talk <Arrow /></a>
      <button ref={toggle} className="menu-button" type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open} aria-controls={open ? "mobile-menu" : undefined}
        onClick={() => setOpen(!open)}>
        <span>{open ? "Close" : "Menu"}</span><i className={open ? "is-open" : ""} />
      </button>
      </div>
      {open && (
        <nav ref={menu} id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-inner">
            {links.map(([label, href], index) => (
              <a href={href} key={href} aria-current={activeHref === href ? "location" : undefined} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
            <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <Arrow /></a>
            <p>Kottayam, Kerala<br />Engineering · Research · Community</p>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid page-grid">
        <div className="hero-copy">
          <p className="hero-overline"><span lang="ml">നമസ്കാരം</span> / Hello, I’m Adithya</p>
          <h1 id="hero-title">I like figuring<br /><em className="hero-serif">things out.</em></h1>
          <p className="hero-role">Full-stack AI engineer · Researcher · Community volunteer</p>
          <p className="hero-intro">
            I’ve worked on medical AI with a team in France, school software, and a restaurant’s
            ordering platform. I work across models, code, and the people using them.
            Based in Kerala, currently studying AI &amp; ML at Amrita.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Look around <Arrow direction="down" /></a>
            <a className="button button-quiet" href={profile.resume} target="_blank" rel="noreferrer">Read my resume <Arrow /></a>
          </div>
          <div className="hero-now">
            <span className="eyebrow">On my desk lately</span>
            <p>Agentic systems, computational pathology,<br className="desktop-break" /> and the occasional product problem.</p>
          </div>
        </div>
        <div className="hero-portrait">
          <figure className="portrait-paper">
            <span className="portrait-index">01 / a face to the name</span>
            <div className="portrait-image">
              <Image src="/images/adithya-headshot-v4.webp" alt="Adithya S Nair"
                fill sizes="(max-width: 767px) 90vw, 38vw" preload />
            </div>
            <figcaption><strong>Adithya S Nair</strong><span>Kottayam, Kerala ↗</span></figcaption>
          </figure>
          <p className="portrait-note">A bit of research.<br />A lot of building.</p>
        </div>
      </div>
      <nav className="personal-index page-grid" aria-label="A few threads through my work">
        <span>Some threads through my work</span>
        <a href="#work">01 / Things I’ve built <Arrow direction="down" /></a>
        <a href="#research">02 / Questions I’m exploring <Arrow direction="down" /></a>
        <a href="#community">03 / People &amp; community <Arrow direction="down" /></a>
      </nav>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip page-grid" id="proof" aria-label="Selected results">
      <div className="proof-intro">
        <span className="eyebrow">A few specifics</span>
        <p>The work,<br />in numbers.</p>
      </div>
      <div className="proof-list">
        {proofPoints.map((item) => (
          <div className="proof-item" key={item.label}>
            <strong>{item.value}</strong><p>{item.label}</p><small>{item.context}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: CaseStudy }) {
  if (project.image) {
    return (
      <figure className="project-preview">
        <div className="preview-chrome" aria-hidden="true"><span>● ● ●</span><small>{project.title} / web</small><Arrow /></div>
        <div className="preview-image">
          <Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 767px) 92vw, 52vw" />
        </div>
        <figcaption>From the live public website · November 2026</figcaption>
      </figure>
    );
  }
  return (
    <figure className="field-notebook">
      <figcaption>Build notes / Mitti Mitra</figcaption>
      <div className="field-flow" role="group" aria-label="Mitti Mitra analysis pipeline">
        <div><span>01 / input</span><strong>A soil photo</strong><small>Native Android app</small></div>
        <Arrow direction="down" />
        <div><span>02 / analysis</span><strong>Models + context</strong><small>Gemini · Hugging Face · External APIs</small></div>
        <Arrow direction="down" />
        <div><span>03 / output</span><strong>Guidance to keep</strong><small>Groq responses · Locally saved scans</small></div>
      </div>
      <p>Saved scans travel with the farmer.</p>
    </figure>
  );
}

function Work() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <header className="section-heading page-grid">
        <span className="eyebrow">Selected work / 01—03</span>
        <h2 id="work-title">Different problems.<br /><em>Same curiosity.</em></h2>
        <p>A restaurant in Scotland, a school platform, and a soil-guidance app. Here’s what I worked on.</p>
      </header>
      <div className="case-list">
        {caseStudies.map((project) => (
          <article className={`case-study case-${project.accent}`} key={project.title}>
            <div className="case-topline page-grid">
              <span>{project.index} / {project.kind}</span><span>{project.period}</span><span>{project.status}</span>
            </div>
            <div className="case-layout page-grid">
              <div className="case-copy">
                <span className="case-role">{project.role}</span>
                <h3>{project.title}</h3>
                <p className="case-subtitle">{project.subtitle}</p>
                <p className="case-thesis">{project.thesis}</p>
                {project.href && <a className="text-link" href={project.href} target="_blank" rel="noreferrer"
                  aria-label={`Visit ${project.title} website`}>Visit the website <Arrow /></a>}
              </div>
              <div className="case-visual"><ProjectVisual project={project} /></div>
            </div>
            <div className="case-notes page-grid">
              <div><span>My contribution</span><p>{project.response}</p></div>
              <aside className="case-margin"><span>A note from the build</span><p>{project.note}</p></aside>
            </div>
            <div className="case-tools page-grid" role="group" aria-label={`${project.title} technologies`}>
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
    <section className="research-note page-grid" id="research" aria-labelledby="research-title">
      <div className="research-side">
        <span className="eyebrow">One research thread</span>
        <span className="research-stamp">PCCDA<br />2026</span>
        <span className="research-status">{research.status}</span>
      </div>
      <div className="research-copy">
        <h2 id="research-title">{research.title}<span className="research-asterisk" aria-hidden="true">✳</span></h2>
        <h3>{research.fullTitle}</h3>
        <p>{research.description}</p>
        <div className="research-route" role="group" aria-label="SPARE architecture">
          <span>RAD-DINO</span><Arrow direction="right" /><span>Alignment adapter</span><Arrow direction="right" /><span>BioGPT</span>
        </div>
        <dl className="research-results">
          {research.results.map((result) => <div key={result.value}><dt>{result.label}</dt><dd>{result.value}</dd></div>)}
        </dl>
        <p className="research-footnote">{research.note}</p>
      </div>
    </section>
  );
}

function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (next: number) => void) {
  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
  const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (index + direction + count) % count;
  select(next);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}

function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  return (
    <section className="skills-section page-grid" id="skills" aria-labelledby="skills-title">
      <header className="skills-heading">
        <span className="eyebrow">The toolkit</span>
        <h2 id="skills-title">What I <em>work with.</em></h2>
        <p>A mix of research tools, product engineering, and the skills that come from working with people.</p>
      </header>
      <div className="skills-console">
        <div className="skill-tabs" role="tablist" aria-label="Skill groups">
          {skillGroups.map((item, index) => (
            <button key={item.code} type="button" role="tab" aria-selected={active === index}
              aria-controls="skill-panel" id={`skill-tab-${index}`} tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""} onClick={() => setActive(index)}
              onKeyDown={(event) => moveTab(event, index, skillGroups.length, setActive)}>
              <span>{item.code}</span>{item.label}
            </button>
          ))}
        </div>
        <div className="skill-panel" role="tabpanel" id="skill-panel" tabIndex={0} aria-labelledby={`skill-tab-${active}`}>
          <div className="skill-panel-intro"><span>{group.code} / focus</span><h3>{group.label}</h3><p>{group.summary}</p></div>
          <div className="skill-chip-grid">
            {group.skills.map((skill, index) => <span key={skill}><i>{String(index + 1).padStart(2, "0")}</i>{skill}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-profile about-profile-lead page-grid">
        <span className="eyebrow">The person behind the work</span>
        <div>
          <h2 id="about-title">A few chapters<br /><em>so far.</em></h2>
          <p>{profile.summary}</p>
        </div>
      </div>
      <div className="story-grid page-grid">
        <div className="timeline-block">
          <header><span className="eyebrow">Experience</span><h3>Where I’ve contributed.</h3></header>
          {experience.map((item) => (
            <article className="timeline-row" key={`${item.role}-${item.period}`}>
              <span>{item.period}</span>
              <div><h4>{item.role} <span>/ {item.company}</span></h4><small>{item.location}</small><p>{item.note}</p>
                <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="education-block">
          <header><span className="eyebrow">Education</span><h3>Still learning.</h3></header>
          {education.map((item, index) => (
            <article className="education-row" key={item.degree}>
              <div className="education-index">0{index + 1}</div><span>{item.period}</span><h4>{item.degree}</h4>
              <strong>{item.focus}</strong><small>{item.school}</small><p>{item.note}</p>
            </article>
          ))}
          <div className="learning-note">
            <span className="eyebrow">Also along the way</span>
            <h4>McKinsey.org Forward Program</h4>
            <p>Professional development</p>
          </div>
          <p className="language-note"><span>In conversation</span>{languages}</p>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="community-section" id="community" aria-labelledby="community-title">
      <header className="community-heading page-grid">
        <span className="eyebrow">Away from the code</span>
        <h2 id="community-title">The people<br /><em>part matters.</em></h2>
        <p>ACM has been a big part of my story: mentoring, organising, speaking, and learning to lead.</p>
      </header>
      <div className="community-grid page-grid">
        {communityRoles.map((item, index) => (
          <article className={`community-card community-${item.accent}`} key={item.title}>
            <div><span>{item.period}</span><strong>0{index + 1}</strong></div>
            <h3>{item.title}</h3><h4>{item.role}</h4><p>{item.note}</p>
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
        <header className="side-projects-head page-grid">
          <span className="eyebrow">From the archive</span>
          <h2 id="side-projects-title">Other things<br /><em>I’ve tried.</em></h2>
          <p>Travel agents, job applications, and a reinforcement learning experiment.</p>
        </header>
        <div className="side-project-rail page-grid">
          <div className="side-project-track">
            {smallerBuilds.map((project, index) => (
              <article className="side-project-card" key={project.title}>
                <div className="card-top"><span>{project.year}</span><strong>0{index + 1}</strong></div>
                <h3>{project.title}</h3><p>{project.description}</p>
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
      <div className="journal-image">
        <Image src={latestPost.image} alt={latestPost.imageAlt} fill sizes="(max-width: 767px) 92vw, 50vw" />
        <span>From my journal / 002</span>
      </div>
      <div className="journal-copy">
        <span className="eyebrow">Thinking out loud</span>
        <h2 id="journal-title">Agents need a <em>runtime.</em></h2>
        <p>{latestPost.description}</p>
        <div><span>{latestPost.readingTime}</span><span>{latestPost.publishedLabel}</span></div>
        <Link className="button button-primary" href={`/blog/${latestPost.slug}`}>Read the note <Arrow /></Link>
        <Link className="text-link" href="/blog">All writing <Arrow /></Link>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq-section page-grid" id="faq" aria-labelledby="faq-title">
      <header className="faq-heading">
        <span className="eyebrow">A little more context</span>
        <h2 id="faq-title">If you’re <em>wondering.</em></h2>
      </header>
      <div className="faq-list">
        {faq.map((item, index) => (
          <details className="faq-item" id={item.id} key={item.id}>
            <summary><span aria-hidden="true">0{index + 1}</span>{item.question}<i aria-hidden="true" /></summary>
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
        <div className="contact-copy">
          <span className="eyebrow">Keep in touch</span>
          <h2 id="contact-title">Have something<br /><em>on your mind?</em></h2>
          <p>A role, a research question, a product to build, or a conversation about any of the above. I’d like to hear it.</p>
        </div>
        <a className="contact-orbit" href={`mailto:${profile.email}`}><span>A good place to start</span><strong>Say hello</strong><Arrow /></a>
        <div className="contact-links">
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
        <div className="footer-id"><strong>Adithya S Nair</strong><span>{profile.role}</span></div>
        <p>From Kottayam, Kerala.<br />Thanks for spending a little time here.</p>
        <div className="footer-links"><Link href="/blog">Journal</Link><a href="#top">Back to top <Arrow /></a></div>
        <div className="footer-credit">
          <span>© 2026 Adithya S Nair</span>
          <a href={studio.url} target="_blank" rel="noreferrer">AI Consultant at <strong>{studio.name}</strong><Arrow /></a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioExperience() {
  return (
    <div className="portfolio-shell">
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <ProofStrip />
        <Work />
        <Research />
        <About />
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
