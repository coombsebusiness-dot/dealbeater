import Link from "next/link";

import {
  getComparisonsForProduct,
} from "@/knowledge/comparisons/ComparisonRegistry";

interface ProductComparisonsProps {
  productId: string;
}

export default function ProductComparisons({
  productId,
}: ProductComparisonsProps) {
  const comparisons =
    getComparisonsForProduct(
      productId,
    );

  if (
    comparisons.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Product comparisons
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Compare before you buy
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
          See how this product compares with closely related alternatives from the Blinlx Product Brain.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

              <h3 className="mt-3 text-xl font-semibold text-white">
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
  );
}