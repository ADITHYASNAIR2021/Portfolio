import Link from "next/link";
import { studio } from "@/content/story";

export function JournalHeader() {
  return (
    <header className="journal-nav">
      <Link className="brand-mark" href="/" aria-label="Adithya S Nair, home">
        <span>AS/N</span><small>Applied AI / 26</small>
      </Link>
      <div>
        <Link href="/">Portfolio</Link>
        <Link href="/blog">Journal</Link>
      </div>
    </header>
  );
}

export function JournalFooter() {
  return (
    <footer className="site-footer">
      <div className="page-grid">
        <div className="footer-id"><strong>Adithya S Nair</strong><span>AI systems, research, and field notes</span></div>
        <p>Short claims. Long evidence.<br />Writing from Kerala, India.</p>
        <div className="footer-links"><Link href="/">Portfolio</Link><Link href="/blog">All writing</Link></div>
        <div className="footer-credit">
          <span>© 2026 Adithya S Nair · Kottayam, Kerala</span>
          <a href={studio.url} target="_blank" rel="noreferrer">
            Made with <strong>{studio.name}</strong> · {studio.domain}
          </a>
        </div>
      </div>
    </footer>
  );
}
