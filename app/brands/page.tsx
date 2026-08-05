import type {
  Metadata,
} from "next";

import Image from "next/image";
import Link from "next/link";

import {
  getAllBrands,
} from "@/knowledge/brands/BrandRegistry";

import {
  loadBrandPage,
} from "@/knowledge/brands/loadBrandPage";

export const metadata:
  Metadata = {
  title:
    "Camera Brands, Lenses and Buying Guides | Blinlx",

  description:
    "Explore Sony, Canon and Nikon cameras, lenses, batteries, product pages and buying advice from Blinlx.",

  alternates: {
    canonical:
      "https://blinlx.com/brands",
  },

  openGraph: {
    type:
      "website",

    url:
      "https://blinlx.com/brands",

    title:
      "Camera Brands, Lenses and Buying Guides | Blinlx",

    description:
      "Explore Sony, Canon and Nikon cameras, lenses, batteries, product pages and buying advice from Blinlx.",

    siteName:
      "Blinlx",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Camera Brands, Lenses and Buying Guides | Blinlx",

    description:
      "Explore Sony, Canon and Nikon cameras, lenses, batteries, product pages and buying advice from Blinlx.",
  },
};

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

export default async function BrandsPage() {
  const brands =
    getAllBrands();

  const brandPages =
    await Promise.all(
      brands.map(
        (brand) =>
          loadBrandPage(
            brand.slug,
          ),
      ),
    );

  const availableBrands =
    brandPages.filter(
      (
        brandPage,
      ): brandPage is NonNullable<
        typeof brandPage
      > =>
        brandPage !== null,
    );

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "CollectionPage",

    name:
      "Blinlx Brand Directory",

    description:
      "Browse camera brands, products and buying guides from the Blinlx Product Brain.",

    url:
      "https://blinlx.com/brands",

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
        availableBrands.length,

      itemListElement:
        availableBrands.map(
          (
            brandPage,
            index,
          ) => ({
            "@type":
              "ListItem",

            position:
              index + 1,

            name:
              brandPage.brand.name,

            url:
              `https://blinlx.com${brandPage.brand.seo.canonicalPath}`,
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
          <ol className="flex items-center gap-2">
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

            <li className="text-slate-200">
              Brands
            </li>
          </ol>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-6 sm:p-10 lg:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            Blinlx Brand Directory
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore camera brands, products and buying advice
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Browse the brands currently researched by the Blinlx Product Brain, including cameras, lenses, batteries and expert buying guidance.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              {availableBrands.length}{" "}
              {availableBrands.length ===
              1
                ? "brand"
                : "brands"}
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200">
              Product Brain powered
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200">
              Independently researched
            </span>
          </div>
        </header>

        <section className="mt-16">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Current brand hubs
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Browse by brand
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
              Each brand hub grows automatically as new canonical products, guides and comparisons are added to Blinlx.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {availableBrands.map(
              (brandPage) => {
                const previewProduct =
                  brandPage.featuredProducts[0] ??
                  brandPage.products[0] ??
                  null;

                return (
                  <article
                    key={
                      brandPage.brand.id
                    }
                    className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-emerald-400/50"
                  >
                    <Link
                      href={
                        brandPage.brand
                          .seo
                          .canonicalPath
                      }
                      className="block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        {previewProduct
                          ?.image ? (
                          <Image
                            src={
                              previewProduct
                                .image
                                .publicUrl
                            }
                            alt={
                              previewProduct
                                .image
                                .alt
                            }
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-contain p-8 transition duration-300 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-500">
                            Product image unavailable
                          </div>
                        )}

                        <span className="absolute left-4 top-4 rounded-full border border-emerald-400/40 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
                          {
                            brandPage
                              .totalProducts
                          }{" "}
                          products
                        </span>
                      </div>

                      <div className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                          Brand hub
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                          {
                            brandPage
                              .brand
                              .name
                          }
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {
                            brandPage
                              .brand
                              .overview
                              .summary
                          }
                        </p>

                        <dl className="mt-6 grid grid-cols-3 gap-3">
                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
                            <dt className="text-xs text-slate-500">
                              Cameras
                            </dt>

                            <dd className="mt-1 text-lg font-bold">
                              {
                                brandPage
                                  .cameras
                                  .length
                              }
                            </dd>
                          </div>

                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
                            <dt className="text-xs text-slate-500">
                              Lenses
                            </dt>

                            <dd className="mt-1 text-lg font-bold">
                              {
                                brandPage
                                  .lenses
                                  .length
                              }
                            </dd>
                          </div>

                          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
                            <dt className="text-xs text-slate-500">
                              Batteries
                            </dt>

                            <dd className="mt-1 text-lg font-bold">
                              {
                                brandPage
                                  .batteries
                                  .length
                              }
                            </dd>
                          </div>
                        </dl>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                          Explore {
                            brandPage
                              .brand
                              .name
                          }

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
              },
            )}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Before you spend a penny
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Ask Blinlx which camera system suits you
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Brand loyalty can be expensive. Blinlx can help you compare systems, lenses, prices and upgrade paths before choosing Sony, Canon, Nikon or another brand.
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