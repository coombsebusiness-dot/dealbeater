import Link from "next/link";

import type {
  Product,
} from "@/types/product";

interface ComparisonProductLinksProps {
  productA: Product;

  productB: Product;
}

function createUrlSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createCategorySlug(
  category: string,
): string {
  const normalisedCategory =
    createUrlSlug(
      category,
    );

  const categoryRoutes:
    Record<string, string> = {
    camera:
      "cameras",

    cameras:
      "cameras",

    lens:
      "lenses",

    lenses:
      "lenses",

    battery:
      "batteries",

    batteries:
      "batteries",
  };

  return (
    categoryRoutes[
      normalisedCategory
    ] ??
    normalisedCategory
  );
}

function createProductUrl(
  product: Product,
): string {
  const categorySlug =
    createCategorySlug(
      product.category,
    );

  const brandSlug =
    createUrlSlug(
      product.brand,
    );

  const productSlug =
    createUrlSlug(
      product.slug ||
        product.id,
    );

  const brandPrefix =
    `${brandSlug}-`;

  const modelSlug =
    productSlug.startsWith(
      brandPrefix,
    )
      ? productSlug.slice(
          brandPrefix.length,
        )
      : productSlug;

  return (
    `/products/${categorySlug}/` +
    `${brandSlug}/${modelSlug}`
  );
}

function ProductLinkCard({
  product,
  label,
}: {
  product: Product;

  label: string;
}) {
  const productUrl =
    createProductUrl(
      product,
    );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
          {label}
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {product.summary ||
            `Read the full Blinlx product analysis for ${product.name}.`}
        </p>

        <Link
          href={productUrl}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
        >
          View full product page

          <span
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function ComparisonProductLinks({
  productA,
  productB,
}: ComparisonProductLinksProps) {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Full product intelligence
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Explore both products in detail
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
          Read the complete Blinlx verdict, specifications, buying advice, alternatives and offers for each product.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ProductLinkCard
          product={productA}
          label="Product A"
        />

        <ProductLinkCard
          product={productB}
          label="Product B"
        />
      </div>
    </section>
  );
}