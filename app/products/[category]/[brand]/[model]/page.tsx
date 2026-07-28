import { notFound } from "next/navigation";

import type { Product } from "@/types/product";
import { extractProductIdentity } from "@/lib/product-intelligence/product-identity";
import BlinlxVerified from "@/app/components/product/BlinlxVerified";
import ProductHero from "@/app/components/product/ProductHero";
import ProductDecision from "@/app/components/product/ProductDecision";
import ProductOverview from "@/app/components/product/ProductOverview";
import ProductAIVerdict from "@/app/components/product/ProductAIVerdict";
import ProductPriceIntelligence from "@/app/components/product/ProductPriceIntelligence";
import ProductOffers from "@/app/components/product/ProductOffers";
import ProductSpecifications from "@/app/components/product/ProductSpecifications";
import ProductWhoShouldBuy from "@/app/components/product/ProductWhoShouldBuy";
import ProductAlternatives from "@/app/components/product/ProductAlternatives";
import ProductFAQ from "@/app/components/product/ProductFAQ";
import BlinlxIntelligenceScore from "@/app/components/product/BlinlxIntelligenceScore";
import BlinlxGauge from "@/app/components/results/BlinlxGauge";
import ShareReport from "@/app/components/product/ShareReport";

import { getProductBySlug } from "@/app/components/lib/products/getProductBySlug";

import {
  buildProductPageSchema,
  stringifyJsonLd,
} from "@/app/components/lib/schema/productPageSchema";

type ProductPageProps = {
  params: Promise<{
    category: string;
    brand: string;
    model: string;
  }>;
};

function normaliseSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function cleanProductName(
  value: string,
  fallback: string
): string {
  const productName =
    value.trim().length > 0
      ? value
      : titleCase(fallback);

  return productName
    .replace(
      /\bsony a1\b/i,
      "Sony Alpha 1"
    )
    .replace(
      /\bcamera body only\b/i,
      "Mirrorless Camera Body"
    )
    .replace(/\s+/g, " ")
    .trim();
}

function createVerdictLabel(
  product: Product
): string | undefined {
  if (
    typeof product.verdictLabel ===
      "string" &&
    product.verdictLabel.trim().length > 0
  ) {
    return product.verdictLabel.trim();
  }

  if (
    typeof product.verdict !== "string" ||
    product.verdict.trim().length === 0
  ) {
    return undefined;
  }

  return product.verdict
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function createPriceStatus(
  product: Product
): Product["priceStatus"] {
  if (product.priceStatus) {
    return product.priceStatus;
  }

  if (
    typeof product.currentPrice !==
      "number" ||
    typeof product.fairPrice !== "number"
  ) {
    return undefined;
  }

  if (
    product.currentPrice <=
    product.fairPrice * 0.9
  ) {
    return "Excellent";
  }

  if (
    product.currentPrice <=
    product.fairPrice
  ) {
    return "Good";
  }

  if (
    product.currentPrice <=
    product.fairPrice * 1.1
  ) {
    return "Fair";
  }

  return "High";
}

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1px",
        width: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
      }}
    />
  );
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {
    category,
    brand,
    model,
  } = await params;

  const normalisedBrand =
    normaliseSlug(brand);

  const normalisedModel =
    normaliseSlug(model);

  const fullSlug = normaliseSlug(
    `${normalisedBrand}-${normalisedModel}`
  );

  /*
   * Some saved products include the brand at the
   * beginning of the slug, while others use only
   * the model.
   */
  const storedProduct =
    (await getProductBySlug(fullSlug)) ??
    (await getProductBySlug(
      normalisedModel
    ));

  if (!storedProduct) {
    notFound();
  }

  const cleanedProductName =
    cleanProductName(
      storedProduct.name,
      model
    );

  /*
   * getProductBySlug() has already converted the
   * raw Supabase record into the shared Product
   * interface. Only page-specific fallbacks and
   * presentation cleanup belong here.
   */

  const identity = extractProductIdentity(cleanedProductName);
  const product: Product = {
    ...storedProduct,

    id:
      storedProduct.id ||
      storedProduct.slug,

    slug:
      storedProduct.slug ||
      fullSlug,

    name: cleanedProductName,

   brand:
  storedProduct.brand ||
  identity.brand ||
  titleCase(brand),

    category:
  storedProduct.category ||
  identity.category ||
  titleCase(category),

    model: {
      ...storedProduct.model,

     base:
  storedProduct.model?.base ||
  identity.model ||
  titleCase(model),
    },

    specs:
      storedProduct.specs ?? {},

    image:
      storedProduct.image ||
      undefined,

    imageAlt:
      storedProduct.imageAlt ||
      `${cleanedProductName} product image`,

    summary:
      storedProduct.summary ||
      `Blinlx analysis for ${cleanedProductName}.`,

    primaryOfferUrl:
      storedProduct.primaryOfferUrl ||
      undefined,

    primaryOfferRetailer:
      storedProduct.primaryOfferRetailer ||
      undefined,

    verdictLabel:
      createVerdictLabel(
        storedProduct
      ),

    priceStatus:
      createPriceStatus(
        storedProduct
      ),

    priceHistoryUrl:
      storedProduct.priceHistoryUrl ??
      "#price-history",

    highlights:
      storedProduct.highlights ?? [],

    topOffers:
      storedProduct.topOffers ?? [],

    alternatives:
      storedProduct.alternatives ?? [],

    faqs:
      storedProduct.faqs ?? [],
  };

  const productSchema =
    buildProductPageSchema({
      product,
      slug: `${category}/${brand}/${model}`,
    });

  const gaugeScore =
    typeof product.blinlxScore ===
    "number"
      ? product.blinlxScore
      : typeof product.dealScore ===
          "number"
        ? product.dealScore
        : 0;

  const gaugeConfidence =
    typeof product.confidence ===
    "number"
      ? product.confidence
      : typeof product.scoreContext
              ?.confidence === "number"
        ? product.scoreContext
            .confidence
        : 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(46,232,102,0.08), transparent 32%), radial-gradient(circle at top right, rgba(75,141,255,0.08), transparent 28%), linear-gradient(180deg, #132230 0%, #101b26 40%, #0b141d 100%)",
        color: "#ffffff",
        padding:
          "32px 20px 120px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            stringifyJsonLd(
              productSchema
            ),
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gap: "32px",
        }}
      >
        <ProductHero
          product={product}
        />

        <BlinlxVerified
          product={product}
        />

        <ShareReport
          product={product}
        />

        <section
          style={{
            display: "grid",
            gap: "32px",
          }}
        >
          <ProductDecision
            product={product}
          />

          {gaugeScore > 0 && (
            <BlinlxGauge
              score={gaugeScore}
              confidence={
                gaugeConfidence
              }
            />
          )}
        </section>

        <ProductPriceIntelligence
          product={product}
        />

        <SectionDivider />

        <ProductOverview
          product={product}
        />

        <ProductAIVerdict
          product={product}
        />

        {product.scoreBreakdown && (
          <BlinlxIntelligenceScore
            score={gaugeScore}
            confidence={
              gaugeConfidence
            }
            breakdown={
              product.scoreBreakdown
            }
            explanation={
              product.scoreExplanation
            }
          />
        )}

        <SectionDivider />

        <ProductSpecifications
          product={product}
        />

        <ProductWhoShouldBuy
          product={product}
        />

        <SectionDivider />

        <ProductOffers
          product={product}
        />

        <ProductAlternatives
          product={product}
        />

        <SectionDivider />

        <ProductFAQ
          product={product}
        />

        <section
          style={{
            padding: "28px 24px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.22)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color:
                "rgba(255,255,255,0.55)",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing:
                "0.12em",
              textTransform:
                "uppercase",
            }}
          >
            Blinlx Intelligence
          </p>

          <h2
            style={{
              margin: "10px 0 0",
              fontSize:
                "clamp(24px, 4vw, 38px)",
              lineHeight: 1.1,
            }}
          >
            Still deciding?
          </h2>

          <p
            style={{
              maxWidth: "680px",
              margin:
                "14px auto 0",
              color:
                "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
            }}
          >
            Search another product,
            compare alternatives or ask
            Blinlx to check a different
            deal before you buy.
          </p>
        </section>
      </div>
    </main>
  );
}