import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import CursorSignal from "@/components/CursorSignal";
import "./globals.css";

const body = localFont({
  variable: "--font-body",
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  display: "swap",
});

const display = localFont({
  variable: "--font-display",
  src: [{ path: "../fonts/ClashDisplay-Variable.woff2", weight: "200 700", style: "normal" }],
  display: "swap",
});

const code = Space_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080d16",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adithyasnair.vercel.app"),
  title: {
    default: "Adithya S Nair - AI Engineer & Researcher",
    template: "%s | Adithya S Nair",
  },
  description:
    "Adithya S Nair is an AI engineer and researcher in Kerala, India, building production LLM, RAG, agent memory, and medical imaging systems that hold up in the real world.",
  keywords: [
    "Adithya S Nair",
    "Adithya Nair",
    "Adithya",
    "AI Engineer",
    "AI Engineer India",
    "AI Engineer Kerala",
    "AI Researcher",
    "Agentic AI",
    "AI Agent Memory",
    "Medical AI",
    "RAG Engineer",
    "LLM Evaluation",
    "DICOM",
    "FastAPI",
    "Next.js",
    "CodrantLabs",
    "Kerala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Adithya S Nair - AI Engineer & Researcher",
    description: "Measurable AI systems for medical vision, agents, education, and real-world products.",
    url: "/",
    siteName: "Adithya S Nair",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Adithya S Nair - AI Engineer and Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya S Nair - AI Engineer & Researcher",
    description: "Build AI that earns confidence.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  category: "technology",
  authors: [{ name: "Adithya S Nair", url: "https://adithyasnair.vercel.app" }],
  creator: "Adithya S Nair",
  verification: {
    google: "XY2vsY-mUzFjv9oOW52A2wv7BzsKVXxAIZABVJxDqdI",
  },
};

const siteUrl = "https://adithyasnair.vercel.app";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Adithya S Nair",
      alternateName: ["Adithya Nair", "Adithya S. Nair", "Adithya"],
      url: siteUrl,
      image: `${siteUrl}/images/adithya-professional-v3.webp`,
      jobTitle: "Full-stack AI Engineer and Researcher",
      description:
        "AI engineer and researcher building production LLM, RAG, medical imaging, agentic, and full-stack systems.",
      email: "mailto:adithyasnair2021@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kottayam",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      nationality: { "@type": "Country", name: "India" },
      knowsLanguage: ["English", "Malayalam", "Hindi"],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Amrita Vishwa Vidyapeetham",
      },
      worksFor: { "@id": "https://codrantlabs.in/#organization" },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "MTech in Computer Science, AI and Machine Learning",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "BTech in Computer Science, AI and Machine Learning",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" },
        },
      ],
      sameAs: [
        "https://github.com/ADITHYASNAIR2021",
        "https://linkedin.com/in/adithya-s-nair",
        "https://huggingface.co/AdithyaSNair",
      ],
      knowsAbout: [
        "Large language models",
        "Retrieval-augmented generation",
        "Medical artificial intelligence",
        "DICOM medical imaging",
        "AI evaluation",
        "Agentic AI",
        "Agent memory",
        "FastAPI",
        "Next.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Adithya S Nair - AI Engineer & Researcher",
      description:
        "Portfolio, case studies, research, and field notes by Adithya S Nair, AI engineer and researcher in Kerala, India.",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://codrantlabs.in/#organization",
      name: "CodrantLabs",
      url: "https://codrantlabs.in",
      slogan: "We build machines that think.",
      description:
        "Founder-led product and AI engineering studio in Kerala, India — full-stack platforms, AI agents, RAG systems, and search visibility across SEO, AEO, and GEO.",
      founder: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ScholarlyArticle",
      "@id": `${siteUrl}/#spare`,
      headline: "SPARE: Single-view Parameter-efficient Adapter for Radiology Reporting",
      author: { "@id": `${siteUrl}/#person` },
      publisher: { "@type": "Organization", name: "Springer" },
      datePublished: "2026",
      about: [
        "Radiology report generation",
        "Vision-language models",
        "Parameter-efficient fine-tuning",
        "LoRA",
        "Chest X-ray analysis",
      ],
      description:
        "A vision-language framework connecting RAD-DINO to BioGPT through a semantic alignment adapter — 98% fewer trainable parameters, 79.0% BERTScore F1 on MIMIC-CXR using 0.8% of the training corpus. Presented at PCCDA 2026.",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${code.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <CursorSignal />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
