import { notFound } from "next/navigation";

import type {
  Product,
  ProductAlternative,
  ProductOffer,
} from "@/types/product";

import ProductHero from "@/app/components/product/ProductHero";
import ProductDecision from "@/app/components/product/ProductDecision";
import ProductOverview from "@/app/components/product/ProductOverview";
import ProductAIVerdict from "@/app/components/product/ProductAIVerdict";
import ProductPriceIntelligence from "@/app/components/product/ProductPriceIntelligence";
import ProductOffers from "@/app/components/product/ProductOffers";
import ProductSpecifications from "@/app/components/product/ProductSpecifications";
import ProductWhoShouldBuy from "@/app/components/product/ProductWhoShouldBuy";
import ProductAlternatives from "@/app/components/product/ProductAlternatives";
import type {ProductFAQItem,} from "@/types/product";
import { getProductBySlug } from "@/app/components/lib/products/getProductBySlug";
import ProductFAQ from "@/app/components/product/ProductFAQ";
import {
  buildProductPageSchema,
  stringifyJsonLd,
} from "@/app/components/lib/schema/productPageSchema";
import BlinlxIntelligenceScore from "@/app/components/product/BlinlxIntelligenceScore";
import BlinlxGauge from "@/app/components/results/BlinlxGauge";


type ProductPageProps = {
  params: Promise<{
    category: string;
    brand: string;
    model: string;
  }>;
};

type RawOffer = {
  retailer?: unknown;
  title?: unknown;
  price?: unknown;
  url?: unknown;
  image?: unknown;
};

type RawAlternative = {
  name?: unknown;
  title?: unknown;
  slug?: unknown;
  category?: unknown;
  brand?: unknown;
  reason?: unknown;
  summary?: unknown;
  price?: unknown;
  image?: unknown;
  imageUrl?: unknown;
  url?: unknown;
  score?: unknown;
};


function createFAQs(
  value: unknown
): ProductFAQItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<ProductFAQItem[]>(
    (faqs, rawFAQ: unknown) => {
      if (
        !rawFAQ ||
        typeof rawFAQ !== "object"
      ) {
        return faqs;
      }

      const item = rawFAQ as {
        question?: unknown;
        answer?: unknown;
      };

      const question =
        typeof item.question === "string"
          ? item.question.trim()
          : "";

      const answer =
        typeof item.answer === "string"
          ? item.answer.trim()
          : "";

      if (!question || !answer) {
        return faqs;
      }

      faqs.push({
        question,
        answer,
      });

      return faqs;
    },
    []
  );
}



function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const cleanedValue = value.trim();

  return cleanedValue.length > 0
    ? cleanedValue
    : undefined;
}

function toOptionalNumber(value: unknown): number | undefined {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : undefined;
}

function createTopOffers(value: unknown): ProductOffer[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<ProductOffer[]>(
    (offers, rawOffer: unknown) => {
      if (
        !rawOffer ||
        typeof rawOffer !== "object"
      ) {
        return offers;
      }

      const offer = rawOffer as RawOffer;

      const retailer = toOptionalString(offer.retailer);
      const title = toOptionalString(offer.title);
      const price = toOptionalNumber(offer.price);
      const url = toOptionalString(offer.url);
      const image = toOptionalString(offer.image);

      if (
        !retailer ||
        !title ||
        price === undefined ||
        price <= 0 ||
        !url
      ) {
        return offers;
      }

      offers.push({
        retailer,
        title,
        price,
        url,
        image,
      });

      return offers;
    },
    []
  );
}

function createAlternatives(
  value: unknown
): ProductAlternative[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<ProductAlternative[]>(
    (alternatives, rawAlternative: unknown) => {
      if (typeof rawAlternative === "string") {
        const name = rawAlternative.trim();

        if (name.length > 0) {
          alternatives.push({
            name,
          });
        }

        return alternatives;
      }

      if (
        !rawAlternative ||
        typeof rawAlternative !== "object"
      ) {
        return alternatives;
      }

      const item = rawAlternative as RawAlternative;

      const name =
        toOptionalString(item.name) ??
        toOptionalString(item.title);

      if (!name) {
        return alternatives;
      }

      const reason =
        toOptionalString(item.reason) ??
        toOptionalString(item.summary);

      const image =
        toOptionalString(item.image) ??
        toOptionalString(item.imageUrl);

      alternatives.push({
        name,
        slug: toOptionalString(item.slug),
        category: toOptionalString(item.category),
        brand: toOptionalString(item.brand),
        reason,
        price: toOptionalNumber(item.price),
        image,
        url: toOptionalString(item.url),
        score: toOptionalNumber(item.score),
      });

      return alternatives;
    },
    []
  );
}

function createStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0
    )
    .map((item) => item.trim());
}

function createSpecs(
  value: unknown
): Record<string, string | number | undefined> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  return value as Record<
    string,
    string | number | undefined
  >;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {
    category,
    brand,
    model,
  } = await params;

  const fullSlug = `${brand}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const storedProduct =
    (await getProductBySlug(fullSlug)) ??
    (await getProductBySlug(model));

  if (!storedProduct) {
    notFound();
  }

  const product: Product = {
    id: storedProduct.id,
    slug: storedProduct.slug,

    name:
      storedProduct.product_name ??
      model.replace(/[-_]+/g, " "),

    brand:
      storedProduct.brand ??
      brand,

    category:
      storedProduct.category ??
      category,

    model: {
      base:
        storedProduct.model ??
        model,
    },

    specs: createSpecs(
      storedProduct.specs
    ),

    image:
      storedProduct.product_image ??
      undefined,

    imageAlt: storedProduct.product_name
      ? `${storedProduct.product_name} product image`
      : "Product image",

    summary:
      storedProduct.summary ??
      storedProduct.headline ??
      `Blinlx analysis for ${
        storedProduct.product_name ??
        model.replace(/[-_]+/g, " ")
      }.`,

    currentPrice: toOptionalNumber(
      storedProduct.current_price
    ),

    fairPrice: toOptionalNumber(
      storedProduct.fair_price
    ),

    lowestPrice: toOptionalNumber(
      storedProduct.lowest_price
    ),

    primaryOfferUrl:
      storedProduct.affiliate_url ??
      storedProduct.final_url ??
      storedProduct.retailer_url ??
      undefined,

    primaryOfferRetailer:
      storedProduct.retailer_name ??
      storedProduct.retailer ??
      undefined,

    blinlxScore: toOptionalNumber(
      storedProduct.score
    ),

    verdict:
      storedProduct.verdict ??
      undefined,

    verdictLabel:
      storedProduct.verdict ??
      undefined,

    ifItWasOurMoney:
      storedProduct.recommendation ??
      undefined,

    highlights: createStringList(
      storedProduct.positives
    ),

    scoreContext: {
      confidence:
        toOptionalNumber(
          storedProduct.confidence
        ) ??
        toOptionalNumber(
          storedProduct.score
        ) ??
        0,

      concerns: createStringList(
        storedProduct.concerns ??
        storedProduct.negatives
      ),
    },

    topOffers: createTopOffers(
      storedProduct.top_offers
    ),

    alternatives: createAlternatives(
      storedProduct.better_alternatives
    ),

    faqs: createFAQs(
  storedProduct.faqs
),
  };
  const productSchema =
  buildProductPageSchema({
    product,
    slug: `${category}/${brand}/${model}`,
  });

const gaugeScore =
  typeof product.blinlxScore === "number"
    ? product.blinlxScore
    : 0;

const gaugeConfidence =
  typeof product.confidence === "number"
    ? product.confidence
    : product.scoreContext?.confidence ?? 0;
  return (
    <main
    
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #182a3a 0%, #101b26 42%, #0b141d 100%)",
        color: "#ffffff",
        padding: "48px 24px 96px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
          

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: stringifyJsonLd(productSchema),
      }}
    />
        <ProductHero product={product} />

        <ProductOverview product={product} />

        <ProductAIVerdict product={product} />

        
        
<section
  style={{
    display: "grid",
    gap: "18px",
  }}
>
  {gaugeScore > 0 && (
    <BlinlxGauge
      score={gaugeScore}
      confidence={gaugeConfidence}
    />
  )}

  {product.scoreBreakdown && (
    <BlinlxIntelligenceScore
      score={gaugeScore}
      confidence={gaugeConfidence}
      breakdown={product.scoreBreakdown}
      explanation={product.scoreExplanation}
    />
  )}
</section>

<ProductDecision product={product} />

        <ProductPriceIntelligence
          product={product}
        />

        <ProductOffers product={product} />

        <ProductSpecifications
          product={product}
        />

        <ProductWhoShouldBuy
          product={product}
        />

        <ProductAlternatives
          product={product}
        />

        <ProductFAQ product={product} />
      </div>
    </main>
  );
}