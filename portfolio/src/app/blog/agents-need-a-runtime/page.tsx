import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalFooter, JournalHeader } from "@/components/JournalChrome";
import { latestPost, runtimeArticleSections } from "@/content/blog";

const canonical = `https://adithyasnair.vercel.app/blog/${latestPost.slug}`;

export const metadata: Metadata = {
  title: latestPost.title,
  description: latestPost.description,
  keywords: ["durable AI agents", "agent runtime", "agentic workflows", "human in the loop", "AI evaluation", "MCP tasks"],
  alternates: { canonical: `/blog/${latestPost.slug}` },
  authors: [{ name: "Adithya S Nair", url: "https://adithyasnair.vercel.app" }],
  openGraph: {
    title: latestPost.title,
    description: latestPost.description,
    url: `/blog/${latestPost.slug}`,
    type: "article",
    publishedTime: `${latestPost.published}T09:00:00+05:30`,
    authors: ["Adithya S Nair"],
    tags: ["Agent infrastructure", "Durable execution", "Human in the loop", "Evaluation"],
    images: [{ url: latestPost.image, alt: latestPost.imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: latestPost.title,
    description: latestPost.description,
    images: [latestPost.image],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${canonical}#article`,
  mainEntityOfPage: canonical,
  headline: latestPost.title,
  description: latestPost.description,
  image: `https://adithyasnair.vercel.app${latestPost.image}`,
  datePublished: `${latestPost.published}T09:00:00+05:30`,
  dateModified: `${latestPost.published}T09:00:00+05:30`,
  author: { "@id": "https://adithyasnair.vercel.app/#person" },
  publisher: { "@id": "https://adithyasnair.vercel.app/#person" },
  articleSection: "Agent Infrastructure",
  inLanguage: "en-IN",
  wordCount: 1250,
  about: ["Durable AI agents", "Agent runtimes", "Human checkpoints", "AI evaluation"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://adithyasnair.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Journal", item: "https://adithyasnair.vercel.app/blog" },
    { "@type": "ListItem", position: 3, name: latestPost.title, item: canonical },
  ],
};

export default function AgentRuntimeArticle() {
  return (
    <div className="editorial-page">
      {[articleSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
      <JournalHeader />
      <main className="article-main" id="main">
        <header className="article-hero page-grid">
          <span className="article-kicker">Field note / 002</span>
          <h1>{latestPost.title}</h1>
          <p className="article-deck">{latestPost.description}</p>
          <div className="article-meta">
            <span>By Adithya S Nair</span><span>{latestPost.publishedLabel}</span><span>{latestPost.readingTime}</span><span>{latestPost.category}</span>
          </div>
        </header>

        <figure className="article-cover">
          <Image src={latestPost.image} alt={latestPost.imageAlt} fill priority sizes="(max-width: 767px) 92vw, 1440px" />
          <figcaption>A reliable agent can stop, resume, and explain what happened.</figcaption>
        </figure>

        <div className="article-layout page-grid">
          <aside className="article-toc" aria-label="Article contents">
            <span>In this note</span>
            <ol>{runtimeArticleSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>)}</ol>
          </aside>

          <article className="article-body">
            <p>
              Many agent demos begin with the same shape: give a model a goal, let it call a tool, inspect the result, and repeat. That loop can look intelligent within minutes. Production changes the question. What happens when the process crashes after charging a card, waits three days for approval, receives the same callback twice, or resumes after the underlying data has changed? At that point the product is no longer just a model with tools. It is a runtime.
            </p>

            <div className="answer-block">
              <span>The answer in one minute</span>
              <p>
                A dependable agent runtime preserves explicit state, checkpoints progress, makes side effects idempotent, separates tool permissions, pauses for human judgment, and records enough evidence to replay and evaluate the run. The goal is not an agent that never stops. It is an agent that can stop safely and continue correctly.
              </p>
            </div>

            <h2 id="loop-is-easy">The loop is the easy part</h2>
            <p>
              A loop explains how an agent thinks next. It does not explain how the system owns time. Real work stretches across network calls, rate limits, hand-offs, approvals, retries, and partial failure. A research agent may wait for a source. A deployment agent may need an operator to approve a migration. A service workflow may have to recover without repeating an external action.
            </p>
            <p>
              This is why current agent infrastructure is moving toward explicit long-running tasks. The July 2026 Model Context Protocol specification introduced a Tasks extension for work that can be deferred and retrieved later. That direction matters because duration and resumption are becoming protocol concerns, not application-specific tricks.
            </p>
            <blockquote>The agent loop chooses the next action. The runtime makes that action survivable.</blockquote>

            <h2 id="durable-state">State must survive the process</h2>
            <p>
              If a run can resume, its state must be serialisable and inspectable. Store the current plan, completed steps, tool results, approvals, outstanding risks, and the version of the instructions that shaped the decision. Do not rely on a reconstructed conversation as the only record of what happened.
            </p>
            <p>
              Checkpoints create a clean recovery boundary. Frameworks such as LangGraph treat persistence and durable execution as first-class capabilities: a workflow can save progress, pause, and continue from an earlier state. The architectural lesson is broader than any framework. A process should be able to answer three questions after restart: what has definitely happened, what may have happened, and what is safe to do next?
            </p>
            <p>
              State also needs a schema. A typed decision, an external receipt, and an unverified model inference should not all be stored as anonymous text. Their authority and expiry rules are different. Structured state makes those differences visible.
            </p>

            <h2 id="tool-boundaries">Tools need boundaries</h2>
            <p>
              Resumption turns every side effect into a design problem. If the agent crashes after a tool succeeds but before the checkpoint is written, a retry may send the email again or create a second record. Idempotency keys, stable operation IDs, and read-before-write checks turn ambiguous retries into controlled behaviour.
            </p>
            <p>
              Tool permissions should also be narrow. Reading a document, drafting a message, and sending it are three different capabilities. Give the workflow the least authority required for its current step. Record the arguments, result, latency, and error class for each call. A useful trace explains not only what the model said, but what the system changed.
            </p>
            <p>
              Determinism matters during replay. Durable workflow guidance recommends isolating non-deterministic work and making side effects idempotent so a resumed run does not silently choose a different path or duplicate an action.
            </p>

            <h2 id="human-checkpoints">Human judgment should be a checkpoint</h2>
            <p>
              Human in the loop should not mean watching a chat window and hoping someone intervenes in time. It should be an explicit state transition. The workflow pauses with a concise decision packet: proposed action, evidence, uncertainty, expected impact, and the options available to the reviewer.
            </p>
            <p>
              The reviewer can approve, edit, reject, or redirect. Their response becomes durable state, and the agent continues from that decision. Interrupt-based workflows demonstrate this pattern by checkpointing state before the pause and resuming with a structured value afterward.
            </p>
            <p>
              Reserve checkpoints for material choices: destructive actions, external communication, financial changes, policy exceptions, or decisions with weak evidence. Too many approvals turn the operator into a manual router. Too few make the agent powerful without making it accountable.
            </p>

            <h2 id="journey-evaluation">Evaluate the journey</h2>
            <p>
              A correct final answer can hide a broken process. The agent may have selected the wrong tool, ignored an approval condition, retried an unsafe action, or used stale state and still reached a plausible result. Evaluation must cover the trace as well as the outcome.
            </p>
            <p>
              Build datasets from representative tasks and failure cases, then score task completion, tool selection, state accuracy, recovery behaviour, approval compliance, cost, and latency. OpenAI&apos;s evaluation API reflects the same basic discipline: define the data source and the criteria before treating a run as evidence of quality.
            </p>
            <p>
              Include interruption tests. Stop the workflow before and after every external action. Duplicate a callback. Change a permission while the run is paused. Resume with new data. A reliable runtime should fail clearly, preserve evidence, and avoid turning uncertainty into repeated side effects.
            </p>

            <h2 id="production-checklist">A practical production checklist</h2>
            <div className="article-checklist">
              <span>Before the agent owns a long task</span>
              <ol>
                <li><strong>Explicit state:</strong> plans, results, decisions, and risks have a versioned schema.</li>
                <li><strong>Durable checkpoints:</strong> work can resume without replaying the entire conversation.</li>
                <li><strong>Safe effects:</strong> external writes use idempotency keys or equivalent deduplication.</li>
                <li><strong>Narrow tools:</strong> read, draft, approve, and execute permissions are separated.</li>
                <li><strong>Human gates:</strong> high-impact choices pause with enough evidence for a real decision.</li>
                <li><strong>Observable traces:</strong> every tool call and state transition can be inspected.</li>
                <li><strong>Journey evals:</strong> success includes recovery, policy compliance, cost, and latency.</li>
              </ol>
            </div>
            <p>
              The interesting future of agents is not endless autonomy. It is dependable delegation. A strong agent runtime lets software work for longer while remaining interruptible, inspectable, and bounded. That is how a promising loop becomes infrastructure a team can trust.
            </p>

            <h2>Further reading</h2>
            <ul>
              <li><a href="https://blog.modelcontextprotocol.io/posts/2026-07-28/" target="_blank" rel="noreferrer">Model Context Protocol: July 2026 specification update</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/index.html" target="_blank" rel="noreferrer">LangGraph: durable execution and persistence</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/breakpoints/" target="_blank" rel="noreferrer">LangGraph: human-in-the-loop interrupts</a></li>
              <li><a href="https://platform.openai.com/docs/api-reference/evals" target="_blank" rel="noreferrer">OpenAI: evaluation API</a></li>
            </ul>
          </article>
          <aside className="article-aside">Adithya S Nair / Agent infrastructure / August 2026</aside>
        </div>

        <section className="article-next page-grid">
          <span>Next field note</span><h2>Memory needs evaluation.</h2><Link href="/blog/agent-memory-needs-evaluation">Read field note 001</Link>
        </section>
      </main>
      <JournalFooter />
    </div>
  );
}
