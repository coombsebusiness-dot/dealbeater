import Link from "next/link";

import type {
  Product,
  ProductAlternative,
} from "@/types/product";

type ProductAlternativesProps = {
  product: Product;
};

function formatPrice(price?: number): string | null {
  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return null;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatScore(score?: number): string | null {
  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    return null;
  }

  return `${Math.round(score)}/100`;
}

function buildAlternativeHref(
  alternative: ProductAlternative
): string | null {
  if (alternative.url) {
    return alternative.url;
  }

  if (
    alternative.category &&
    alternative.brand &&
    alternative.slug
  ) {
    return `/products/${alternative.category}/${alternative.brand}/${alternative.slug}`;
  }

  return null;
}

function cleanAlternatives(
  alternatives?: ProductAlternative[]
): ProductAlternative[] {
  if (!Array.isArray(alternatives)) {
    return [];
  }

  return alternatives
    .filter(
      (alternative) =>
        alternative &&
        typeof alternative.name === "string" &&
        alternative.name.trim().length > 0
    )
    .map((alternative) => ({
      ...alternative,
      name: alternative.name.trim(),
      reason:
        typeof alternative.reason === "string"
          ? alternative.reason.trim()
          : undefined,
    }))
    .filter(
      (alternative, index, allAlternatives) =>
        allAlternatives.findIndex(
          (candidate) =>
            candidate.name.toLowerCase() ===
            alternative.name.toLowerCase()
        ) === index
    )
    .slice(0, 4);
}

function getAlternativeInitial(
  alternative: ProductAlternative
) {
  const brandInitial = alternative.brand
    ?.trim()
    .charAt(0);

  return (
    brandInitial ||
    alternative.name.trim().charAt(0) ||
    "B"
  ).toUpperCase();
}

function AlternativePlaceholder({
  alternative,
}: {
  alternative: ProductAlternative;
}) {
  const initial = getAlternativeInitial(alternative);

  return (
    <div className="relative flex h-full min-h-44 w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-emerald-400/[0.06] blur-3xl"
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.07] shadow-[0_0_35px_rgba(52,211,153,0.08)]">
          <div className="absolute inset-2 rounded-[17px] border border-dashed border-emerald-400/15" />

          <span className="relative text-3xl font-black text-emerald-300">
            {initial}
          </span>
        </div>

        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Product alternative
        </p>
      </div>
    </div>
  );
}

function AlternativeAction({
  alternative,
}: {
  alternative: ProductAlternative;
}) {
  const href = buildAlternativeHref(alternative);

  if (!href) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-4 py-2 text-center text-xs font-black uppercase tracking-[0.08em] text-emerald-300/70">
        Blinlx report coming soon
      </span>
    );
  }

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://");

  const className =
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-black text-emerald-300 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/45 hover:bg-emerald-400/15 focus:outline-none focus:ring-2 focus:ring-emerald-400";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        View alternative
        <span className="ml-2" aria-hidden="true">
          →
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      View Blinlx report
      <span className="ml-2" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function ProductAlternatives({
  product,
}: ProductAlternativesProps) {
  const alternatives = cleanAlternatives(
    product.alternatives
  );

  if (alternatives.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Other options
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Alternatives to {product.name}
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          These products may be worth considering if you
          want a different price, feature set or overall
          balance.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
        {alternatives.map((alternative, index) => {
          const price = formatPrice(alternative.price);
          const score = formatScore(alternative.score);

          return (
            <article
              key={`${alternative.name}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="grid min-h-full sm:grid-cols-[150px_minmax(0,1fr)]">
                <div className="relative flex min-h-44 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#101d27] via-[#0d1720] to-[#091118] sm:border-b-0 sm:border-r">
                  {alternative.image ? (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-b from-emerald-400/[0.04] to-transparent"
                      />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={alternative.image}
                        alt={alternative.name}
                        loading="lazy"
                        className="relative h-full max-h-44 w-full object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
                      />
                    </>
                  ) : (
                    <AlternativePlaceholder
                      alternative={alternative}
                    />
                  )}
                </div>

                <div className="flex min-w-0 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      {alternative.brand ? (
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                          {alternative.brand}
                        </p>
                      ) : null}

                      <h3 className="mt-2 text-xl font-black leading-7 text-white">
                        {alternative.name}
                      </h3>
                    </div>

                    {score ? (
                      <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black text-emerald-300">
                        {score}
                      </span>
                    ) : null}
                  </div>

                  {alternative.reason ? (
                    <p className="mt-4 flex-1 leading-7 text-slate-400">
                      {alternative.reason}
                    </p>
                  ) : (
                    <p className="mt-4 flex-1 leading-7 text-slate-400">
                      A possible alternative worth comparing
                      before making your final decision.
                    </p>
                  )}

                  <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                        Typical price
                      </p>

                      <p className="mt-1 text-lg font-black text-white">
                        {price ?? "Check current price"}
                      </p>
                    </div>

                    <AlternativeAction
                      alternative={alternative}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-white/10 bg-slate-950/20 px-6 py-5 sm:px-8">
        <p className="text-sm leading-6 text-slate-500">
          Alternative recommendations are based on the
          product information available when this report was
          generated. Compare the exact specifications and
          condition before buying.
        </p>
      </div>
    </section>
  );
}