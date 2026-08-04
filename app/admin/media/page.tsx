import Image from "next/image";

import {
  loadAdminMediaLibrary,
} from "@/knowledge/media/loadAdminMediaLibrary";

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

function createProductPageUrl(
  category: string,
  brand: string,
  slug: string,
): string {
  const normalisedCategory =
    category
      .trim()
      .toLowerCase();

  const normalisedBrand =
    brand
      .trim()
      .toLowerCase();

  const prefix =
    `${normalisedBrand}-`;

  const model =
    slug.startsWith(
      prefix,
    )
      ? slug.slice(
          prefix.length,
        )
      : slug;

  return `/products/${normalisedCategory}/${normalisedBrand}/${model}`;
}

export default async function AdminMediaPage() {
  const products =
    await loadAdminMediaLibrary();

  const totalProducts =
    products.length;

  const productsWithHero =
    products.filter(
      (product) =>
        !product.missingHero,
    ).length;

  const missingHeroCount =
    totalProducts -
    productsWithHero;

  const totalImages =
    products.reduce(
      (
        total,
        product,
      ) =>
        total +
        product.images.length,
      0,
    );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            Blinlx Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Product Media Library
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Review canonical product images, identify missing hero images and open the related public product pages.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Canonical products
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalProducts}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Products with hero
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {productsWithHero}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Missing hero images
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-300">
              {missingHeroCount}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Media records
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalImages}
            </p>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="text-lg font-semibold">
              Canonical products
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Search and filtering controls come next. This first version verifies the complete media library visually.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map(
              (product) => {
                const productPageUrl =
                  createProductPageUrl(
                    product.category,
                    product.brand,
                    product.slug,
                  );

                return (
                  <article
                    key={
                      product.id
                    }
                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
                  >
                    <div className="relative aspect-[4/3] bg-slate-900">
                      {product.heroImage ? (
                        <Image
                          src={
                            product
                              .heroImage
                              .publicUrl
                          }
                          alt={
                            product
                              .heroImage
                              .alt
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain p-6"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">
                          Hero image missing
                        </div>
                      )}

                      <div className="absolute left-3 top-3">
                        <span
                          className={
                            product.missingHero
                              ? "rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300"
                              : "rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                          }
                        >
                          {product.missingHero
                            ? "Missing hero"
                            : "Hero ready"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                            {
                              product.category
                            }
                          </p>

                          <h3 className="mt-2 text-lg font-semibold">
                            {
                              product.name
                            }
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            {
                              product.brand
                            }
                          </p>
                        </div>

                        <span className="rounded-lg bg-slate-900 px-2 py-1 text-xs text-slate-400">
                          {
                            product.images
                              .length
                          }{" "}
                          image
                          {product.images
                            .length === 1
                            ? ""
                            : "s"}
                        </span>
                      </div>

                      <dl className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-slate-500">
                            Product ID
                          </dt>

                          <dd className="truncate text-right text-slate-300">
                            {
                              product.id
                            }
                          </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                          <dt className="text-slate-500">
                            Hero type
                          </dt>

                          <dd className="text-right text-slate-300">
                            {product.heroImage
                              ?.type ??
                              "None"}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <a
                          href={
                            productPageUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-emerald-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                        >
                          View page
                        </a>

                        {product.heroImage ? (
                          <a
                            href={
                              product
                                .heroImage
                                .publicUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
                          >
                            Open image
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-xl border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-600"
                          >
                            No image
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </section>
      </div>
    </main>
  );
}