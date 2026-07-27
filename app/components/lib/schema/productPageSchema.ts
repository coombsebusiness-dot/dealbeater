import type {
  Product,
  ProductFAQItem,
  ProductOffer,
} from "@/types/product";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdValue[];

type JsonLdObject = {
  [key: string]: JsonLdValue | undefined;
};

type ProductPageSchemaOptions = {
  product: Product;
  slug: string;
  baseUrl?: string;
};

function cleanText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const cleaned = value.trim();

  return cleaned.length > 0
    ? cleaned
    : undefined;
}

function cleanNumber(value: unknown): number | undefined {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return undefined;
  }

  return number;
}

function cleanUrl(value: unknown): string | undefined {
  const url = cleanText(value);

  if (!url) {
    return undefined;
  }

  try {
    return new URL(url).toString();
  } catch {
    return undefined;
  }
}

function removeEmptyValues(
  value: JsonLdValue
): JsonLdValue {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptyValues)
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          item !== ""
      );
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(
          ([, item]) =>
            item !== undefined &&
            item !== null &&
            item !== ""
        )
        .map(([key, item]) => [
          key,
          removeEmptyValues(item as JsonLdValue),
        ])
    );
  }

  return value;
}

function createDescription(
  product: Product
): string {
  const overview =
  cleanText(product.summary);

  if (overview) {
    return overview;
  }

  const verdict =
    cleanText(product.verdictLabel) ??
    cleanText(product.verdict);

  if (verdict) {
    return `${product.name} buying analysis, price intelligence, retailer offers and Blinlx verdict: ${verdict}.`;
  }

  return `${product.name} buying analysis, specifications, price intelligence and verified retailer offers from Blinlx.`;
}

function createOfferSchema(
  offer: ProductOffer
): JsonLdObject | null {
  const price = cleanNumber(offer.price);
  const url = cleanUrl(offer.url);
  const retailer = cleanText(offer.retailer);

  if (
    price === undefined ||
    !url ||
    !retailer
  ) {
    return null;
  }

  return {
    "@type": "Offer",
    price: price.toFixed(2),
    priceCurrency: "GBP",
    url,
    seller: {
      "@type": "Organization",
      name: retailer,
    },
  };
}

function createOffers(
  product: Product
): JsonLdObject[] {
  if (!Array.isArray(product.topOffers)) {
    return [];
  }

  return product.topOffers
    .map(createOfferSchema)
    .filter(
      (offer): offer is JsonLdObject =>
        offer !== null
    );
}

function createFAQSchema(
  faqs: ProductFAQItem[] | undefined,
  pageUrl: string
): JsonLdObject | null {
  if (!Array.isArray(faqs)) {
    return null;
  }

  const mainEntity = faqs
    .filter(
      (faq) =>
        cleanText(faq.question) &&
        cleanText(faq.answer)
    )
    .map((faq) => ({
      "@type": "Question",
      name: faq.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.trim(),
      },
    }));

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: `${pageUrl}#frequently-asked-questions`,
    mainEntity,
  };
}

export function buildProductPageSchema({
  product,
  slug,
  baseUrl = "https://blinlx.com",
}: ProductPageSchemaOptions): JsonLdObject {
  const normalisedBaseUrl =
    baseUrl.replace(/\/+$/, "");

  const pageUrl =
  `${normalisedBaseUrl}/products/${slug
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

  const productId = `${pageUrl}#product`;
  const webpageId = `${pageUrl}#webpage`;

  const offers = createOffers(product);

  const brand =
    cleanText(product.brand);

 const modelParts = [
  cleanText(product.model.base),
  cleanText(product.model.revision),
  cleanText(product.model.variant),
].filter(
  (value): value is string =>
    Boolean(value)
);

const model =
  modelParts.length > 0
    ? modelParts.join(" ")
    : undefined;

  const image =
    cleanUrl(product.image);

  const category =
    cleanText(product.category);

  const productSchema: JsonLdObject = {
    "@type": "Product",
    "@id": productId,

    name: product.name,
    description: createDescription(product),

    url: pageUrl,
    image,

    brand: brand
      ? {
          "@type": "Brand",
          name: brand,
        }
      : undefined,

    model,
    category,

    offers:
      offers.length > 0
        ? offers
        : undefined,

    mainEntityOfPage: {
      "@id": webpageId,
    },
  };

  const breadcrumbSchema: JsonLdObject = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: normalisedBaseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${normalisedBaseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: pageUrl,
      },
    ],
  };

  const webpageSchema: JsonLdObject = {
    "@type": "WebPage",
    "@id": webpageId,

    url: pageUrl,
    name: `${product.name} Review, Price and Buying Verdict | Blinlx`,
    description: createDescription(product),

    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },

    mainEntity: {
      "@id": productId,
    },

    isPartOf: {
      "@type": "WebSite",
      "@id": `${normalisedBaseUrl}/#website`,
      name: "Blinlx",
      url: normalisedBaseUrl,
    },

    publisher: {
      "@type": "Organization",
      "@id": `${normalisedBaseUrl}/#organization`,
      name: "Blinlx",
      url: normalisedBaseUrl,
    },
  };

  const faqSchema = createFAQSchema(
    product.faqs,
    pageUrl
  );

  const graph: JsonLdObject[] = [
    webpageSchema,
    breadcrumbSchema,
    productSchema,
  ];

  if (faqSchema) {
    graph.push(faqSchema);
  }

  return removeEmptyValues({
    "@context": "https://schema.org",
    "@graph": graph,
  }) as JsonLdObject;
}

/**
 * Safely serialises JSON-LD for use inside a script tag.
 *
 * Replacing "<" prevents user-controlled product text from
 * accidentally closing the script element.
 */
export function stringifyJsonLd(
  schema: JsonLdObject
): string {
  return JSON.stringify(schema).replace(
    /</g,
    "\\u003c"
  );
}