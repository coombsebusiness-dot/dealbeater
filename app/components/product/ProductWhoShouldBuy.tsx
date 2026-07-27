import type { Product } from "@/types/product";

type ProductWhoShouldBuyProps = {
  product: Product;
};

function cleanTextItems(items?: string[]): string[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0
    )
    .map((item) => item.trim())
    .filter(
      (item, index, allItems) =>
        allItems.findIndex(
          (candidate) =>
            candidate.toLowerCase() === item.toLowerCase()
        ) === index
    )
    .slice(0, 5);
}

function formatCategory(category?: string): string {
  if (!category) {
    return "this type of product";
  }

  return category
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductWhoShouldBuy({
  product,
}: ProductWhoShouldBuyProps) {
  const goodFor = cleanTextItems(product.highlights);

  const thinkTwiceIf = cleanTextItems(
    product.scoreContext?.concerns
  );

  const recommendation =
    product.ifItWasOurMoney?.trim() ||
    `Consider whether this ${formatCategory(
      product.category
    ).toLowerCase()} matches your priorities, budget and intended use before buying.`;

  if (
    goodFor.length === 0 &&
    thinkTwiceIf.length === 0 &&
    !recommendation
  ) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Buying guidance
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Who should buy {product.name}?
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          A straightforward look at who this product may suit and
          where you should pause before spending your money.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.055]">
          <div className="border-b border-emerald-400/15 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-lg text-emerald-300">
                ✓
              </span>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                  A good fit
                </p>

                <h3 className="mt-1 text-xl font-black text-white">
                  Consider this product if...
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {goodFor.length > 0 ? (
              <ul className="space-y-3">
                {goodFor.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-slate-950/20 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-xs font-black text-emerald-300"
                    >
                      ✓
                    </span>

                    <span className="font-semibold leading-6 text-slate-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leading-7 text-slate-400">
                Blinlx has not identified enough product-specific
                strengths to make a confident audience recommendation
                yet.
              </p>
            )}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-amber-400/20 bg-amber-400/[0.045]">
          <div className="border-b border-amber-400/15 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-lg text-amber-300">
                !
              </span>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-300">
                  Check before buying
                </p>

                <h3 className="mt-1 text-xl font-black text-white">
                  Think twice if...
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {thinkTwiceIf.length > 0 ? (
              <ul className="space-y-3">
                {thinkTwiceIf.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-slate-950/20 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-black text-amber-300"
                    >
                      !
                    </span>

                    <span className="font-semibold leading-6 text-slate-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leading-7 text-slate-400">
                No major product-specific concerns were identified in
                the available analysis.
              </p>
            )}
          </div>
        </article>
      </div>

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 font-black text-emerald-300">
                B
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                  If it was our money
                </p>

                <blockquote className="mt-3 max-w-4xl text-lg font-bold leading-8 text-white sm:text-xl">
                  “{recommendation}”
                </blockquote>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}