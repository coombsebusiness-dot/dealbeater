import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

interface ArticleSchemaProps {
  guide: BuyingGuide;

  siteUrl: string;
}

export function ArticleSchema({
  guide,
  siteUrl,
}: ArticleSchemaProps) {
  const canonicalUrl =
    new URL(
      guide.seo.canonicalPath,
      siteUrl,
    ).toString();

  const imageUrl =
    new URL(
      guide.seo.openGraphImage?.src ??
        guide.heroImage.src,
      siteUrl,
    ).toString();

  const schema = {
    "@context":
      "https://schema.org",

    "@type":
      "Article",

    headline:
      guide.title,

    description:
      guide.seo.description,

    image: [
      imageUrl,
    ],

    datePublished:
      guide.publishedAt,

    dateModified:
      guide.updatedAt,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        canonicalUrl,
    },

    author: {
      "@type":
        "Person",

      name:
        guide.author.name,

      url:
        guide.author.profileUrl
          ? new URL(
              guide.author.profileUrl,
              siteUrl,
            ).toString()
          : undefined,
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "Blinlx",

      url:
        siteUrl,
    },

    articleSection:
      guide.category,

    keywords:
      guide.seo.keywords?.join(
        ", ",
      ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(schema),
      }}
    />
  );
}