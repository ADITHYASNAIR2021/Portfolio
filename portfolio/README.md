# Adithya S Nair — Portfolio

A personal portfolio covering AI engineering, research, consulting, and community work. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Local development

From this directory:

```sh
npm ci
npm run dev
```

Production checks:

```sh
npm run lint
npm run build
npm run start
```

The workspace root also forwards `dev`, `build`, `start`, and `lint` to this app.

## Content

- `src/content/story.ts`: profile, projects, research, experience, skills, community, and FAQ.
- `src/content/blog.ts`: journal metadata.
- `src/app/blog/`: article pages.
- `public/Adithya_S_Nair_Resume.pdf`: downloadable current resume.
- `public/images/adithya-headshot-v4.webp`: selected portrait; master in `../output/adithya-headshot-preview-v4.png`.
- `docs/portfolio-refresh.md`: design decisions, validation, and cleanup notes.

## Deployment

Production site: [adithyasnair.vercel.app](https://adithyasnair.vercel.app/).

The repository is connected to Vercel. Releases on the production branch are built and deployed through that integration. Keep the app root configured as `portfolio`.
