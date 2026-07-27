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

function AlternativeAction({
  alternative,
}: {
  alternative: ProductAlternative;
}) {
  const href = buildAlternativeHref(alternative);

  if (!href) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-slate-500">
        Report coming soon
      </span>
    );
  }

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://");

  const className =
    "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200";

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
          These products may be worth considering if you want a
          different price, feature set or overall balance.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
        {alternatives.map((alternative, index) => {
          const price = formatPrice(alternative.price);
          const score = formatScore(alternative.score);

          return (
            <article
              key={`${alternative.name}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 transition hover:border-white/20 hover:bg-white/[0.045]"
            >
              <div className="grid min-h-full sm:grid-cols-[140px_minmax(0,1fr)]">
                <div className="flex min-h-40 items-center justify-center border-b border-white/10 bg-white sm:border-b-0 sm:border-r">
                  {alternative.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={alternative.image}
                      alt={alternative.name}
                      loading="lazy"
                      className="h-full max-h-44 w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-black text-slate-400">
                      {alternative.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>
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
                      A possible alternative worth comparing before
                      making your final decision.
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
          Alternative recommendations are based on the product
          information available when this report was generated.
          Compare the exact specifications and condition before
          buying.
        </p>
      </div>
    </section>
  );
}