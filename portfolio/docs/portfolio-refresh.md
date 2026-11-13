# Personal portfolio refresh — November 13, 2026

The portfolio is a general introduction to Adithya's engineering, research, consulting, and community work. It is not specialised for one job category.

## Agreed direction

- CodrantLabs: AI Consultant. Use the contributions in the November resume; do not describe Adithya as a founder.
- SPARE: a compact homepage section, with accepted status at PCCDA 2026 (Springer). No separate research page.
- Keep the navy, cream, blue, and lime identity. Use the existing personal photograph, a Malayalam greeting, notebook annotations, and direct first-person copy.
- Show actual public project screenshots where available. Mitti Mitra uses a labelled pipeline diagram instead of an invented app screenshot.
- Lead with work and contextual results. Keep education, research, consulting, and community accessible on the same page.

## Content and maintenance

`src/content/story.ts` is the active homepage content source. The unused legacy content module and animation helpers were removed during release cleanup.

The public resume is a byte-for-byte copy of `../Resume/Adithya_S_Nair_Resume.pdf`. The source PDF is left intact.

Project screenshots were captured from the public Malabar Coast and Vidyapath sites in November 2026. A live public study site does not establish deployment of Vidyapath's full LMS; the copy distinguishes those surfaces.

SPARE metrics retain their dataset and evaluation context. Nearly 40% refers to LLM token usage in the internal Doctreen tooling, not to a measured reduction in total operating costs.

## Design lessons

- Specific roles, artifacts, and decisions convey personality better than a moving strip of engineering slogans.
- Give display type enough spacing for words to remain distinct. Readability takes priority over very large headings.
- Avoid scroll-controlled content visibility. All content is readable without waiting for an animation, and mobile sections do not hide content in horizontal galleries.
- Interactive skill tabs support arrow keys, Home, and End. The mobile menu handles Escape, focus containment, and focus return.
- Keep copy, FAQs, structured data, social previews, and `public/llms.txt` consistent about roles, ongoing education, and research status.

## Validation

- `npm run build`: passed, including TypeScript and static page generation.
- `npm run lint`: passed without warnings.
- Local production HTTP checks: homepage, journal index, both articles, sitemap, robots, LLM summary, both social preview images, the resume, and both project screenshots returned 200. A missing page returned the expected 404.
- The served resume's SHA-256 matched the November source PDF.
- Homepage JSON-LD parsed successfully; no founder claim or published-SPARE claim remains in the rendered homepage.
- Responsive checks at 320, 390, 820, and 1440 CSS pixels found no horizontal page overflow or overflowing headings. Desktop and mobile layouts were visually inspected.
- Verified mobile menu initial focus, Escape, focus return, and section navigation; skill-tab arrow and End navigation; research FAQ expansion; image loading; and desktop research anchor position.
- Research metric values share the same top alignment after the responsive refinement.
- Journal index and runtime article were checked on mobile, including heading overflow and the article contents links.

These are local checks against the production build. Hosted deployment status is monitored separately through the existing GitHub/Vercel production integration.

## Navbar refinement and portrait preview

- Replaced the constrained sticky header background with a full-width navy band. Its inner grid aligns with the 1320px content grid, so light sections no longer leave cream gaps around the navbar.
- Added a name lockup, clearer contact action, and an active-section underline with `aria-current`. Scroll tracking is scheduled once per animation frame and cleaned up on unmount.
- Added a contact link in the mobile menu; confirmed initial focus, forward/backward focus wrapping, Escape, focus return, and body scroll restoration.
- Rechecked the navbar from 320px through 1440px, including both sides of its desktop breakpoint. No navbar or page overflow; the header covers the page width and remains at the top while scrolling.
- Build and lint passed after the navbar changes.
- Generated professional headshot previews from the original personal photograph, with the forehead and neck marks removed. After reviewing revisions, the user selected v4 for the website.

## Selected portrait

The homepage and image sitemap now reference `public/images/adithya-headshot-v4.webp`, encoded from the approved `../output/adithya-headshot-preview-v4.png`. The WebP asset is approximately 118 KB and retains the source dimensions (1108 × 1420). The portrait frame uses a 4:5 ratio on desktop and mobile with proportional image fitting.

Build and lint passed. The rendered portrait loaded successfully and was visually checked on desktop and at 390px, with no horizontal overflow or clipped head.

## Release cleanup

- Kept the v4 master PNG, its prompt record, and the optimised WebP used by the site.
- Removed v1–v3 preview files, older generated public portraits, unused public copies of the source photo, starter SVGs, a redundant journal PNG, and the obsolete upgrade plan.
- Kept original source photos in the workspace's `Image` directory and all assets still referenced by the site.
- Removed dependencies for unused animation, 3D rendering, and helper modules.
- Updated Next.js and its lint configuration from 16.2.2 to 16.4.6 after the release audit reported framework security advisories. Applied compatible dependency security fixes.
- The production dependency audit reports zero vulnerabilities. Seven moderate development-only audit entries remain in the TypeScript ESLint/minimatch dependency chain; npm's non-forced audit fix does not resolve that upstream version constraint.
