import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-5 py-8 flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)] overflow-hidden relative">
      <div className="absolute right-[-8rem] top-[15%] h-[26rem] w-[26rem] rounded-full border border-[var(--cobalt)] opacity-40" />
      <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-xs uppercase tracking-wider relative">
        <span className="text-[var(--lime)]">AS/N · a wrong turn</span>
        <span>Error 404</span>
      </div>
      <div className="max-w-6xl mx-auto w-full py-20 relative">
        <p className="font-mono text-xs uppercase tracking-wider mb-6 text-[var(--coral)]">This page isn’t here</p>
        <h1 className="[font-family:var(--font-display)] text-[clamp(3.5rem,12vw,9rem)] leading-[1.05] tracking-[-0.025em] font-semibold">
          A loose<br /><span className="text-[var(--cobalt-bright)]">end.</span>
        </h1>
        <p className="mt-10 max-w-md text-base text-[var(--ink-soft)]">
          I don’t have a page at this address. You can head back to my portfolio or browse the journal.
        </p>
        <Link className="button button-primary mt-8 w-fit" href="/">Return to the work →</Link>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider relative">Adithya S Nair · Kottayam, Kerala</p>
    </main>
  );
}
