interface BreadcrumbItem {
  name: string;

  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];

  siteUrl: string;
}

export function BreadcrumbSchema({
  items,
  siteUrl,
}: BreadcrumbSchemaProps) {
  if (items.length === 0) {
    return null;
  }

  const schema = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement:
      items.map(
        (item, index) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            item.name,

          item:
            new URL(
              item.path,
              siteUrl,
            ).toString(),
        }),
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