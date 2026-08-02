import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const code = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adithyasnair.vercel.app"),
  title: "Adithya S Nair — AI Engineer & Researcher",
  description:
    "Adithya S Nair designs AI systems that survive contact with the real world—from medical vision and evaluation to RAG, agents, and full-stack products.",
  keywords: [
    "Adithya S Nair",
    "AI Engineer",
    "AI Researcher",
    "Full-stack AI Engineer",
    "Medical AI",
    "RAG Engineer",
    "LLM Evaluation",
    "DICOM",
    "FastAPI",
    "Next.js",
    "Kerala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Adithya S Nair — AI Engineer & Researcher",
    description: "AI should survive contact with the real world. Explore production medical AI, research, agents, and full-stack systems by Adithya S Nair.",
    url: "/",
    siteName: "Adithya S Nair",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Adithya S Nair — AI Engineer and Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya S Nair — AI Engineer & Researcher",
    description: "AI should survive contact with the real world.",
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
  verification: {
    google: "XY2vsY-mUzFjv9oOW52A2wv7BzsKVXxAIZABVJxDqdI",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adithya S Nair",
  url: "https://adithyasnair.vercel.app",
  image: "https://adithyasnair.vercel.app/images/adithya-wide.jpeg",
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
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Amrita Vishwa Vidyapeetham",
  },
  sameAs: [
    "https://github.com/ADITHYASNAIR2021",
    "https://linkedin.com/in/adithya-s-nair",
  ],
  knowsAbout: [
    "Large language models",
    "Retrieval-augmented generation",
    "Medical artificial intelligence",
    "DICOM medical imaging",
    "AI evaluation",
    "Agentic AI",
    "FastAPI",
    "Next.js",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${code.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
