import Link from "next/link";
import Image from "next/image";

import type { Product } from "@/types/product";

type ProductHeroProps = {
  product: Product;
};

function formatPrice(price?: number): string {
  if (typeof price !== "number") {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductHero({
  product,
}: ProductHeroProps) {
  const score = product.blinlxScore ?? 0;

  const saving =
    typeof product.currentPrice === "number" &&
    typeof product.fairPrice === "number"
      ? product.fairPrice - product.currentPrice
      : null;

  return (
    <header className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,232,102,0.12),transparent_65%)]" />

          <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-slate-300 backdrop-blur-md">
            {product.category}
          </div>

          {product.image ? (
            <div className="relative z-10 h-[320px] w-full max-w-[420px]">
              <img
  src={product.image}
  alt={product.imageAlt ?? product.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }}
/>
            </div>
          ) : (
            <div className="relative z-10 flex h-[320px] w-full items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-center text-sm font-bold text-slate-500">
              Product image unavailable
            </div>
          )}

          <div className="absolute bottom-5 right-5 z-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 backdrop-blur-md">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
              Blinlx Score
            </p>

            <p className="mt-1 text-3xl font-black text-white">
              {score}
              <span className="text-sm text-slate-400">/100</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-black text-emerald-300">
              {product.verdictLabel ?? "Blinlx analysed"}
            </span>

            <span className="text-slate-400">
              {product.brand}
              {product.family ? ` · ${product.family}` : ""}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {product.summary}
          </p>

          {product.highlights?.length ? (
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.highlights.slice(0, 4).map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300"
                  >
                    ✓
                  </span>

                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">
                Current price
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                {formatPrice(product.currentPrice)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">
                Fair price
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                {formatPrice(product.fairPrice)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">
                Lowest seen
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                {formatPrice(product.lowestPrice)}
              </p>
            </div>
          </div>

          {saving !== null && saving > 0 ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4">
              <p className="text-sm leading-6 text-slate-200">
                Today&apos;s price is{" "}
                <strong className="text-emerald-300">
                  {formatPrice(saving)}
                </strong>{" "}
                below our estimated fair price.
              </p>
            </div>
          ) : null}

          {product.ifItWasOurMoney ? (
            <section className="mt-6 rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.09] to-emerald-400/[0.03] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
                If it was our money
              </p>

              <p className="mt-3 leading-7 text-slate-100">
                {product.ifItWasOurMoney}
              </p>
            </section>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {product.primaryOfferUrl ? (
              <Link
                href={product.primaryOfferUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
               className="inline-flex min-h-14 items-center justify-center rounded-xl bg-emerald-400 px-7 py-4 text-base font-black text-slate-950 shadow-lg shadow-emerald-400/15 transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-400/25"
              >
               <span className="flex items-center gap-2">
  <span>View best price</span>

  {typeof product.currentPrice === "number" ? (
    <span className="rounded-md bg-slate-950/15 px-2 py-0.5">
      {formatPrice(product.currentPrice)}
    </span>
  ) : null}

  <span aria-hidden="true">→</span>
</span>
{product.primaryOfferRetailer ? (
  <p className="mt-2 text-center text-xs text-slate-400 sm:text-left">
    Best available offer from {product.primaryOfferRetailer}
  </p>
) : null}
              </Link>
            ) : null}

            <a
              href="#best-prices"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 font-bold text-white transition hover:bg-white/[0.08]"
            >
              Compare prices
            </a>

            {product.priceHistoryUrl ? (
              <a
                href={product.priceHistoryUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 font-bold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                View price history
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}