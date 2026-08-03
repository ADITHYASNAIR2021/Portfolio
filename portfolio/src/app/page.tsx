import PortfolioExperience from "@/components/PortfolioExperience";
import { faq } from "@/content/story";

export default function Home() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://adithyasnair.vercel.app/#profile",
    url: "https://adithyasnair.vercel.app",
    name: "Adithya S Nair - AI Engineer and Researcher",
    dateModified: "2026-08-03",
    mainEntity: { "@id": "https://adithyasnair.vercel.app/#person" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://adithyasnair.vercel.app/#faq",
    datePublished: "2026-08-03",
    dateModified: "2026-08-03",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      "@id": `https://adithyasnair.vercel.app/#${item.id}`,
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {[profilePageSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <PortfolioExperience />
    </>
  );
}
