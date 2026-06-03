import Script from "next/script";
import siteConfig from "../../config/site.json";

interface Breadcrumb {
  name: string;
  url: string;
}

export const WebSiteSchema = () => (
  <Script
    id="website-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "HOK Meta",
        url: "https://hokmeta.com",
      }),
    }}
  />
);

export const BreadcrumbListSchema = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => (
  <Script
    id="breadcrumb-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      }),
    }}
  />
);

export const ItemListSchema = ({ items, name }: { items: { name: string; url: string }[]; name: string }) => (
  <Script
    id="itemlist-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: name,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      }),
    }}
  />
);

export const ArticleSchema = ({ headline, description, dateModified }: { headline: string; description: string; dateModified: string }) => (
  <Script
    id="article-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline,
        description: description,
        publisher: {
          "@type": "Organization",
          name: "HOK Meta",
        },
        datePublished: "2026-06-01",
        dateModified: dateModified,
      }),
    }}
  />
);

export const NewsArticleSchema = ({ headline, description, date }: { headline: string; description: string; date: string }) => (
  <Script
    id="newsarticle-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: headline,
        description: description,
        publisher: {
          "@type": "Organization",
          name: "HOK Meta",
        },
        datePublished: date,
        dateModified: date,
      }),
    }}
  />
);

export const GameSchema = ({ name, description }: { name: string; description: string }) => (
  <Script
    id="game-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Game",
        name: name,
        description: description,
        publisher: {
          "@type": "Organization",
          name: "HOK Meta",
        },
      }),
    }}
  />
);

export const HowToSchema = ({ name, steps }: { name: string; steps: { text: string }[] }) => (
  <Script
    id="howto-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: name,
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          text: step.text,
        })),
      }),
    }}
  />
);

export const FAQPageSchema = ({ faqs }: { faqs: { question: string; answer: string }[] }) => (
  <Script
    id="faq-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }),
    }}
  />
);

export const getLastUpdatedDate = () => {
  return "2026-06-01";
};