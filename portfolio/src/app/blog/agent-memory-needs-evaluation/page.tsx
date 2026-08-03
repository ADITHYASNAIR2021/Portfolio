import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalFooter, JournalHeader } from "@/components/JournalChrome";
import { articleFaq, articleSections, featuredPost } from "@/content/blog";

const canonical = `https://adithyasnair.vercel.app/blog/${featuredPost.slug}`;

export const metadata: Metadata = {
  title: featuredPost.title,
  description: featuredPost.description,
  keywords: [
    "AI agent memory",
    "agent memory evaluation",
    "context engineering",
    "agentic AI",
    "long-running agents",
    "LLM evaluation",
  ],
  alternates: { canonical: `/blog/${featuredPost.slug}` },
  authors: [{ name: "Adithya S Nair", url: "https://adithyasnair.vercel.app" }],
  openGraph: {
    title: featuredPost.title,
    description: featuredPost.description,
    url: `/blog/${featuredPost.slug}`,
    type: "article",
    publishedTime: `${featuredPost.published}T09:00:00+05:30`,
    authors: ["Adithya S Nair"],
    tags: ["Agentic AI", "AI memory", "Evaluation", "Context engineering"],
    images: [{ url: featuredPost.image, alt: featuredPost.imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: featuredPost.title,
    description: featuredPost.description,
    images: [featuredPost.image],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${canonical}#article`,
  mainEntityOfPage: canonical,
  headline: featuredPost.title,
  description: featuredPost.description,
  image: `https://adithyasnair.vercel.app${featuredPost.image}`,
  datePublished: `${featuredPost.published}T09:00:00+05:30`,
  dateModified: `${featuredPost.published}T09:00:00+05:30`,
  author: { "@id": "https://adithyasnair.vercel.app/#person" },
  publisher: { "@id": "https://adithyasnair.vercel.app/#person" },
  articleSection: "Agentic AI",
  inLanguage: "en-IN",
  wordCount: 1800,
  about: ["AI agent memory", "Context engineering", "AI agent evaluation"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: articleFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://adithyasnair.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Journal", item: "https://adithyasnair.vercel.app/blog" },
    { "@type": "ListItem", position: 3, name: featuredPost.title, item: canonical },
  ],
};

export default function AgentMemoryArticle() {
  return (
    <div className="editorial-page">
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <JournalHeader />
      <main className="article-main" id="main">
        <header className="article-hero page-grid">
          <span className="article-kicker">Field note / 001</span>
          <h1>{featuredPost.title}</h1>
          <p className="article-deck">{featuredPost.description}</p>
          <div className="article-meta">
            <span>By Adithya S Nair</span><span>{featuredPost.publishedLabel}</span><span>{featuredPost.readingTime}</span><span>{featuredPost.category}</span>
          </div>
        </header>

        <figure className="article-cover">
          <Image src={featuredPost.image} alt={featuredPost.imageAlt} fill priority sizes="(max-width: 767px) 92vw, 1440px" />
          <figcaption>Memory as a managed path, not a larger box.</figcaption>
        </figure>

        <div className="article-layout page-grid">
          <aside className="article-toc" aria-label="Article contents">
            <span>In this note</span>
            <ol>{articleSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>)}</ol>
          </aside>

          <article className="article-body">
            <p>
              Memory is becoming a default promise in agentic AI. A product remembers the user. A coding agent remembers the repository. A research agent remembers what it has read. The promise sounds simple. The engineering is not. Once an agent can write and retrieve persistent state, every old fact can influence a new decision. That makes memory a source of capability. It also makes memory a source of hidden failure.
            </p>
            <p>
              The common response is to give the system more storage, a larger context window, or another vector database. Those moves can increase recall. They do not prove that the recalled information is correct, timely, relevant, or safe to use. A useful memory system needs selection, structure, expiry, and evaluation. Without those controls, the agent does not become more experienced. It becomes more confidently entangled with its own history.
            </p>

            <div className="answer-block">
              <span>The answer in one minute</span>
              <p>
                Agent memory is persistent, selectively retrieved state. It should store decisions, evidence, preferences, plans, and unresolved risks that may improve future work. It should not store every token. Evaluate whether the right state is written, retrieved at the right moment, applied correctly, updated when facts change, and ignored when irrelevant. The goal is reliable task completion, not maximum recall.
              </p>
            </div>

            <h2 id="memory-problem">The memory problem</h2>
            <p>
              Stateless assistants start each turn with what the user provides. Long-running agents face a different problem. They operate across tools, files, people, and sessions. A later step may depend on a decision made hours earlier. A deployment agent may need to remember that a migration was intentionally deferred. A medical workflow may need to preserve the source of a clinical observation. A product agent may need to honour a user preference without treating it as permanent truth.
            </p>
            <p>
              This is why memory cannot be reduced to storage. The system must decide what deserves persistence. It must attach provenance. It must know which state can change. It must retrieve a small, useful subset when the next decision arrives. It must also support correction. A remembered item that cannot be revised is not knowledge. It is technical debt with excellent recall.
            </p>
            <blockquote>More memory increases the surface area of every future decision.</blockquote>
            <p>
              That surface area matters because errors compound. A bad note can alter a plan. The altered plan can create a misleading result. The result can then be written back as fresh memory. This feedback loop is more dangerous than a single hallucinated answer because it creates continuity. The system can appear consistent while moving further from reality.
            </p>

            <h2 id="context-is-not-memory">Context is not memory</h2>
            <p>
              A context window is the model&apos;s current working surface. Memory is the process that decides what enters that surface. The distinction sounds academic until the token budget becomes crowded. Then every irrelevant item competes with the instructions, evidence, and recent observations needed for the task.
            </p>
            <p>
              Good context engineering is an act of curation. Anthropic describes it as selecting from an evolving universe of possible information. That framing is useful because it moves the design question away from “How much can we fit?” and toward “What does this decision need?” The second question produces smaller prompts, clearer traces, and more meaningful evaluations.
            </p>
            <p>
              A long context window can still help. It gives the system room for source material and complex intermediate work. It does not remove the need for policy. Old requirements can conflict with new ones. Similar memories can create false consensus. A summary can erase the exception that matters. The model may attend to a vivid but irrelevant item. Context length changes capacity. It does not create judgment.
            </p>

            <h2 id="memory-architecture">A practical architecture</h2>
            <p>
              I prefer to separate memory into four layers. The first is <strong>working state</strong>: the active plan, recent tool results, and current constraints. It is short-lived and close to the task. The second is <strong>episodic state</strong>: what happened during a run, including failures and recovery. It supports continuation and audit. The third is <strong>semantic state</strong>: durable facts, entities, preferences, and verified knowledge. The fourth is <strong>procedural state</strong>: proven ways of doing recurring work.
            </p>
            <p>
              Each layer needs a different write policy. Working state can be captured often. Semantic state should require stronger evidence. Procedural state should change slowly because one unusual run should not rewrite the method. Episodic records can be verbose in storage while retrieval returns a compact view.
            </p>
            <h3>Every item needs a contract</h3>
            <p>
              A useful memory record carries more than text. It should include the source, timestamp, subject, confidence, scope, and expiry rule. It should also record whether the item is an observation, an inference, or a decision. That distinction prevents the system from presenting a guess as a verified fact six sessions later.
            </p>
            <p>
              Retrieval should be hybrid. Semantic similarity is valuable for fuzzy recall. Exact filters are better for identity, project, date, permission, and status. Recency helps when the world changes. Importance helps when an older decision still governs the work. No single score captures all four. A small reranking step can combine them and make the final selection observable.
            </p>

            <h2 id="evaluation">What to evaluate</h2>
            <p>
              Memory evaluation should follow the full lifecycle. Start with the write. Did the system capture information worth keeping? Did it preserve provenance? Did it avoid secrets and short-lived noise? Next, test retrieval. Was the needed item returned? Were irrelevant items excluded? Then test use. Did the agent apply the memory correctly, or did it force the memory into a situation where it no longer belonged?
            </p>
            <p>
              A final-answer score is not enough. Two agents may reach the same answer through very different paths. One may use the correct evidence. The other may retrieve stale state and get lucky. Agent evaluations therefore need outcome measures and process measures. Anthropic&apos;s work on agent evaluations makes the same practical point: multi-turn systems call tools, change state, and adapt through intermediate results. The trace is part of the product.
            </p>
            <div className="article-checklist">
              <span>A minimum memory scorecard</span>
              <ol>
                <li><strong>Write precision:</strong> how much stored state was genuinely useful later?</li>
                <li><strong>Retrieval recall:</strong> did the right memory appear when it was needed?</li>
                <li><strong>Retrieval precision:</strong> how much distracting or conflicting state entered context?</li>
                <li><strong>Application accuracy:</strong> did the agent use the memory in the correct scope?</li>
                <li><strong>Correction latency:</strong> how quickly did an updated fact replace an old one?</li>
                <li><strong>Task reliability:</strong> did memory improve completion, recovery, cost, and time?</li>
              </ol>
            </div>
            <p>
              Build test sets around real transitions. Change a user preference. Rename a file. Revoke a tool. Introduce a new policy that conflicts with an old one. Resume a task after a long gap. Give two projects similar names. These tests reveal whether the system understands scope or merely retrieves familiar text.
            </p>

            <h2 id="failure-modes">Failure modes</h2>
            <h3>Stale truth</h3>
            <p>
              The agent retrieves a fact that was once correct. The record has no expiry rule or replacement link. The output looks grounded because it cites memory, but the grounding is historical. Temporal tests and explicit invalidation are the cure.
            </p>
            <h3>Identity bleed</h3>
            <p>
              A preference or decision from one user, workspace, or project appears in another. This is a boundary failure, not a retrieval-quality problem. Namespaces, access control, and tenant-aware filters must be enforced before semantic search.
            </p>
            <h3>Summary collapse</h3>
            <p>
              Repeated summarisation keeps the general story while deleting the exception. The agent remembers that a deployment was approved but forgets the condition attached to that approval. Important constraints should remain structured fields, not only prose summaries.
            </p>
            <h3>Self-confirming memory</h3>
            <p>
              The agent writes an inference, retrieves it later as evidence, and strengthens the same inference. Provenance and memory types help break this loop. An agent-generated claim should not silently become an external fact.
            </p>

            <h2 id="build-sequence">A better build sequence</h2>
            <p>
              Start without long-term memory. Make the task work with explicit inputs and a visible state model. Then collect traces from real or representative runs. Identify the moments where missing continuity causes failure. Those moments define the first memory requirements.
            </p>
            <p>
              Add one memory class at a time. A coding agent may begin with verified repository facts and unresolved work. A support agent may begin with user preferences that have clear consent and expiry. Create the write policy, retrieval policy, and tests together. If a memory feature has no evaluation case, it is not ready to influence future actions.
            </p>
            <p>
              Keep a delete path from day one. Users and operators need to inspect, correct, and remove memory. The agent also needs a way to acknowledge uncertainty. “I found an older preference that may no longer apply” is a better behaviour than silently treating every retrieved item as instruction.
            </p>
            <p>
              Finally, measure the system without memory and with memory. If persistent state does not improve task success, recovery, time, or user effort, the architecture may be adding ceremony rather than capability. Memory is justified by better work, not by the presence of a vector store.
            </p>

            <h2 id="future">Where this is going</h2>
            <p>
              Agent platforms are moving toward configurable memory, snapshots, rehydration, and long-running workflows. OpenAI&apos;s 2026 Agents SDK update reflects that direction, while recent engineering work across the industry treats context as infrastructure rather than prompt decoration. The important shift is not that agents will remember more. It is that memory will become an explicit subsystem with policies, traces, and operational ownership.
            </p>
            <p>
              That creates a useful design standard. A serious agent should be able to explain what it remembered, why that memory was retrieved, where it came from, and what would cause it to change. Teams should be able to replay the decision with and without the memory. Users should be able to correct the record.
            </p>
            <p>
              The best memory system may feel almost invisible. It brings forward the small piece of state that makes the next action coherent. It leaves the rest in storage. It knows when history helps and when the present deserves a clean start. That is not maximum context. It is disciplined continuity.
            </p>

            <div className="article-faq">
              <span>Common questions</span>
              {articleFaq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary><p>{item.answer}</p>
                </details>
              ))}
            </div>

            <h2>Further reading</h2>
            <ul>
              <li><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" target="_blank" rel="noreferrer">Anthropic: Effective context engineering for AI agents</a></li>
              <li><a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" target="_blank" rel="noreferrer">Anthropic: Demystifying evals for AI agents</a></li>
              <li><a href="https://openai.com/index/the-next-evolution-of-the-agents-sdk/" target="_blank" rel="noreferrer">OpenAI: The next evolution of the Agents SDK</a></li>
            </ul>
          </article>
          <aside className="article-aside">Adithya S Nair / Agentic systems / August 2026</aside>
        </div>

        <section className="article-next page-grid">
          <span>Continue exploring</span><h2>See the systems behind the ideas.</h2><Link href="/#work">View selected work</Link>
        </section>
      </main>
      <JournalFooter />
    </div>
  );
}
