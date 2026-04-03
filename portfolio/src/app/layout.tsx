import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "Adithya S Nair | AI Engineer",
  description:
    "AI Engineer building intelligent systems that deliver when it matters. Specializing in LLM pipelines, RAG workflows, and medical AI.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Python",
    "FastAPI",
    "Portfolio",
  ],
  openGraph: {
    title: "Adithya S Nair | AI Engineer",
    description:
      "AI Engineer building intelligent systems that deliver when it matters.",
    type: "website",
  },
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
      <body className="grain min-h-full flex flex-col overflow-x-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
