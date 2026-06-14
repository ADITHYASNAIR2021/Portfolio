import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/cursor";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adithyasnair.vercel.app"),
  title: "Adithya S Nair | Freelance Full-Stack AI Engineer",
  description:
    "Adithya S Nair — freelance AI Engineer from Kerala, India. I build production LLM pipelines, RAG systems, medical AI, AI agents, and full-stack applications. Available for remote projects worldwide.",
  keywords: [
    "AI Engineer",
    "freelance AI developer",
    "LLM developer for hire",
    "RAG engineer",
    "medical AI developer",
    "AI consultant India",
    "hire AI freelancer",
    "Next.js developer India",
    "AI agent developer",
    "Python developer Kerala",
    "freelance AI engineer India",
    "machine learning engineer",
    "full-stack AI developer",
    "DICOM AI",
    "AI freelancer for hire",
    "LLM pipeline development",
    "FastAPI developer",
    "AI automation freelancer",
    "remote AI engineer",
    "AI developer Kerala",
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://adithyasnair.vercel.app",
  },
  openGraph: {
    title: "Adithya S Nair | Freelance Full-Stack AI Engineer",
    description:
      "AI Engineer building production LLM pipelines, RAG systems, and full-stack apps. 2+ years in medical AI production. Available for freelance projects worldwide.",
    url: "https://adithyasnair.vercel.app",
    siteName: "Adithya S Nair — AI Engineer & Freelancer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adithya S Nair — Freelance Full-Stack AI Engineer from Kerala, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya S Nair | Freelance Full-Stack AI Engineer",
    description:
      "AI Engineer building production LLM pipelines, RAG systems, and full-stack apps. Available for freelance projects worldwide.",
    creator: "@adithyasnair",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adithya S Nair — Freelance Full-Stack AI Engineer from Kerala, India",
      },
    ],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        {/* ── JSON-LD Structured Data (AEO & Knowledge Graph) ── */}

        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adithya S Nair",
              alternateName: "Adithya S Nair AI Engineer",
              description:
                "Freelance Full-Stack AI Engineer specializing in production LLM pipelines, RAG systems, medical AI, and full-stack web application development. 2+ years building AI systems that deliver when it matters.",
              url: "https://adithyasnair.vercel.app",
              image: "https://adithyasnair.vercel.app/images/adithya.jpg",
              jobTitle: "Freelance Full-Stack AI Engineer",
              knowsAbout: [
                "Large Language Models",
                "Retrieval-Augmented Generation",
                "Medical Artificial Intelligence",
                "DICOM Medical Imaging",
                "Python Programming",
                "FastAPI",
                "Next.js",
                "React",
                "TypeScript",
                "Supabase",
                "Docker",
                "AI Agents",
                "Multi-Agent Systems",
                "Prompt Engineering",
                "Model Evaluation",
                "Deep Learning",
                "Computer Vision",
                "LLM Pipelines",
                "Full-Stack Web Development",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Freelance AI Engineer",
                description:
                  "Available for freelance AI engineering projects worldwide — LLM pipelines, RAG systems, AI agents, full-stack web applications, and AI consulting.",
                estimatedSalary: {
                  "@type": "MonetaryAmountDistribution",
                  name: "Freelance AI Engineer rate",
                  currency: "USD",
                },
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kerala",
                addressCountry: "IN",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Amrita Vishwa Vidyapeetham, Amritapuri",
              },
              sameAs: [
                "https://github.com/ADITHYASNAIR2021",
                "https://linkedin.com/in/adithya-s-nair",
              ],
            }),
          }}
        />

        {/* FAQ Schema — for AEO featured snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Who is Adithya S Nair and what does he do?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Adithya S Nair is a freelance Full-Stack AI Engineer from Kerala, India, specializing in production LLM pipelines, RAG systems, medical AI, and full-stack web development. He has 2+ years of experience building AI at Doctreen and is available for remote freelance projects worldwide.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Adithya S Nair available for freelance AI projects?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Adithya S Nair is currently available for freelance AI engineering projects — including LLM pipeline development, RAG system architecture, AI agent development, full-stack web applications, and AI consulting. He works remotely with clients worldwide.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What services does Adithya S Nair offer as a freelancer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Adithya offers: AI Agent Development, LLM Pipeline & RAG Architecture, Full-Stack Web Application Development (Next.js, FastAPI, Supabase), Medical AI Solutions, AI Consulting & Strategy, and API Development. He brings 2+ years of production AI experience to every project.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What technologies does Adithya S Nair specialize in?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Adithya specializes in Python, FastAPI, Next.js, TypeScript, React, LLMs, RAG systems, Supabase, Docker, LangChain, CrewAI, and prompt engineering. He has production experience with OpenAI, HuggingFace, Nebius, OVH, Groq, and Gemini.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I hire Adithya S Nair for an AI project?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can hire Adithya by emailing adithyasnair2021@gmail.com. He typically responds within 24 hours and is open to full-time roles, contract projects, and consulting engagements. His portfolio and resume are available at adithyasnair.vercel.app.",
                  },
                },
              ],
            }),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Adithya S Nair — Freelance Full-Stack AI Engineer",
              url: "https://adithyasnair.vercel.app",
              description:
                "Portfolio of Adithya S Nair, a freelance Full-Stack AI Engineer from Kerala, India. Specializing in LLM pipelines, RAG systems, AI agents, and full-stack development.",
              inLanguage: "en-IN",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://adithyasnair.vercel.app/?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://adithyasnair.vercel.app",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
        <Cursor />
      </body>
    </html>
  );
}
