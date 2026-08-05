import type {
  Metadata,
} from "next";

import Image from "next/image";
import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  getAllBrands,
  getBrandBySlug,
} from "@/knowledge/brands/BrandRegistry";

import {
  loadBrandPage,
} from "@/knowledge/brands/loadBrandPage";

import type {
  BrandPageProduct,
} from "@/knowledge/brands/loadBrandPage";

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

function createUrlSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function createCategorySlug(
  category: string,
): string {
  const normalisedCategory =
    category
      .trim()
      .toLowerCase();

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
    createUrlSlug(
      category,
    )
  );
}

function createProductUrl(
  product: BrandPageProduct,
): string {
  const categorySlug =
    createCategorySlug(
      product.category,
    );

  /*
   * NIKKOR products are displayed inside the Nikon
   * brand hub, but their canonical route may still
   * use NIKKOR as the brand segment.
   */
  const brandSlug =
    createUrlSlug(
      product.brand,
    );

  const productSlug =
    createUrlSlug(
      product.slug,
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

function createGuideUrl(
  canonicalPath: string,
): string {
  if (
    canonicalPath.startsWith(
      "/",
    )
  ) {
    return canonicalPath;
  }

  return `/${canonicalPath}`;
}

function ProductCard({
  product,
}: {
  product: BrandPageProduct;
}) {
  const productUrl =
    createProductUrl(
      product,
    );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 transition hover:-translate-y-1 hover:border-emerald-400/50">
      <Link
        href={productUrl}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          {product.image ? (
            <Image
              src={
                product.image
                  .publicUrl
              }
              alt={
                product.image.alt
              }
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-6 transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">
              Product image unavailable
            </div>
          )}

          {product.isFeatured ? (
            <span className="absolute left-3 top-3 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
              Featured
            </span>
          ) : null}
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            {
              product.category
            }
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            {product.name}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
            {
              product.description
            }
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
            View product

            <span
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function ProductSection({
  id,
  title,
  description,
  products,
}: {
  id: string;

  title: string;

  description: string;

  products:
    BrandPageProduct[];
}) {
  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <section
      id={id}
      className="mt-16"
    >
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Product collection
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
            {description}
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
          {products.length}{" "}
          {products.length === 1
            ? "product"
            : "products"}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map(
          (product) => (
            <ProductCard
              key={
                product.id
              }
              product={
                product
              }
            />
          ),
        )}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return getAllBrands().map(
    (brand) => ({
      brand:
        brand.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const {
    brand: brandSlug,
  } = await params;

  const brand =
    getBrandBySlug(
      brandSlug,
    );

  if (!brand) {
    return {
      title:
        "Brand Not Found | Blinlx",

      description:
        "The requested Blinlx brand page could not be found.",
    };
  }

  const canonicalUrl =
    `https://blinlx.com${brand.seo.canonicalPath}`;

  return {
    title:
      brand.seo.title,

    description:
      brand.seo.description,

    alternates: {
      canonical:
        canonicalUrl,
    },

    openGraph: {
      type:
        "website",

      url:
        canonicalUrl,

      title:
        brand.seo.title,

      description:
        brand.seo.description,

      siteName:
        "Blinlx",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        brand.seo.title,

      description:
        brand.seo.description,
    },
  };
}

export default async function BrandPage({
  params,
}: BrandPageProps) {
  const {
    brand: brandSlug,
  } = await params;

  const pageData =
    await loadBrandPage(
      brandSlug,
    );

  if (!pageData) {
    notFound();
  }

  const {
    brand,
    products,
    cameras,
    lenses,
    batteries,
    featuredProducts,
    guides,
    totalProducts,
    comparisons,
  } = pageData;

  const brandPageUrl =
    `https://blinlx.com${brand.seo.canonicalPath}`;

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "CollectionPage",

    name:
      brand.seo.title,

    description:
      brand.seo.description,

    url:
      brandPageUrl,

    isPartOf: {
      "@type":
        "WebSite",

      name:
        "Blinlx",

      url:
        "https://blinlx.com",
    },

    mainEntity: {
      "@type":
        "ItemList",

      numberOfItems:
        products.length,

      itemListElement:
        products.map(
          (
            product,
            index,
          ) => ({
            "@type":
              "ListItem",

            position:
              index + 1,

            name:
              product.name,

            url:
              `https://blinlx.com${createProductUrl(
                product,
              )}`,
          }),
        ),
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-400"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition hover:text-emerald-300"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
            >
              /
            </li>

            <li>
              <Link
                href="/brands"
                className="transition hover:text-emerald-300"
              >
                Brands
              </Link>
            </li>

            <li
              aria-hidden="true"
            >
              /
            </li>

            <li
              className="text-slate-200"
            >
              {brand.name}
            </li>
          </ol>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.5fr_0.8fr] lg:items-center lg:p-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
                Blinlx Brand Hub
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {brand.name}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {
                  brand.description
                }
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                  {totalProducts} canonical{" "}
                  {totalProducts === 1
                    ? "product"
                    : "products"}
                </span>

                {cameras.length >
                0 ? (
                  <a
                    href="#cameras"
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/50"
                  >
                    {cameras.length} cameras
                  </a>
                ) : null}

                {lenses.length >
                0 ? (
                  <a
                    href="#lenses"
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/50"
                  >
                    {lenses.length} lenses
                  </a>
                ) : null}

                {batteries.length >
                0 ? (
                  <a
                    href="#batteries"
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/50"
                  >
                    {batteries.length} batteries
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="rounded-2xl border border-emerald-400/20 bg-slate-950/70 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Blinlx overview
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {
                  brand.overview
                    .heading
                }
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {
                  brand.overview
                    .summary
                }
              </p>

              {brand.overview
                .buyingAdvice ? (
                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                    Buying advice
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {
                      brand
                        .overview
                        .buyingAdvice
                    }
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </header>

        {featuredProducts.length >
        0 ? (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Blinlx highlights
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Featured {brand.name} products
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                A selection of important products from the current Blinlx Product Brain.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map(
                (product) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                  />
                ),
              )}
            </div>
          </section>
        ) : null}

        <ProductSection
          id="cameras"
          title={`${brand.name} cameras`}
          description={`Explore the ${brand.name} camera bodies currently researched and registered in the Blinlx Product Brain.`}
          products={cameras}
        />

        <ProductSection
          id="lenses"
          title={`${brand.name} lenses`}
          description={`Browse native and related lenses currently included in the Blinlx ${brand.name} product ecosystem.`}
          products={lenses}
        />

        <ProductSection
          id="batteries"
          title={`${brand.name} batteries`}
          description={`Find batteries and power accessories linked to compatible ${brand.name} products.`}
          products={batteries}
        />

        {guides.length >
        0 ? (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Buying advice
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Related buying guides
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                Explore Blinlx guides that discuss {brand.name} products or relevant buying decisions.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {guides.map(
                (guide) => (
                  <Link
                    key={
                      guide.slug
                    }
                    href={createGuideUrl(
                      guide.seo
                        .canonicalPath,
                    )}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                      {
                        guide.category
                      }
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                      {
                        guide.title
                      }
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {
                        guide.subtitle
                      }
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                      Read guide

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ),
              )}
            </div>
          </section>
        ) : null}

        {comparisons.length > 0 ? (
  <section className="mt-16">
    <div className="mb-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Product comparisons
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight">
        Compare {brand.name} products
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
        See how selected {brand.name} products compare with closely related alternatives.
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      {comparisons.map(
        (comparison) => (
          <Link
            key={
              comparison.slug
            }
            href={`/comparisons/${comparison.slug}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Blinlx comparison
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              {
                comparison.title
              }
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {
                comparison.description
              }
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
              View comparison

              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ),
      )}
    </div>
  </section>
) : null}

        <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Before you spend a penny
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Ask Blinlx before buying your next {brand.name} product
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Blinlx can analyse prices, product suitability, alternatives and retailer offers before you commit to a purchase.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Ask Blinlx
          </Link>
        </section>
      </div>
    </main>
  );
}