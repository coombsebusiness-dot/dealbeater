import type { Product } from "@/types/product";
import type { ComparisonResult } from "@/lib/comparison/types";

type ComparisonHeroProps = {
  productA: Product;
  productB: Product;
  comparison: ComparisonResult;
};

function formatPrice(price: number | null | undefined) {
  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

function getWinnerName(
  productA: Product,
  productB: Product,
  winner: ComparisonResult["winner"]
) {
  if (winner === "A") {
    return productA.name;
  }

  if (winner === "B") {
    return productB.name;
  }

  return "Too close to call";
}

function getWinnerLabel(
  side: "A" | "B",
  winner: ComparisonResult["winner"]
) {
  if (winner === "DRAW") {
    return "Evenly matched";
  }

  return winner === side
    ? "Overall winner"
    : "Strong alternative";
}

function getScorePercentage(score: number) {
  return Math.max(
    0,
    Math.min(100, Math.round((score / 5) * 100))
  );
}

function ProductPanel({
  product,
  side,
  winner,
  score,
  reasons,
}: {
  product: Product;
  side: "A" | "B";
  winner: ComparisonResult["winner"];
  score: number;
  reasons: string[];
}) {
  const isWinner = winner === side;
  const scorePercentage = getScorePercentage(score);

  return (
    <article
      className={`relative overflow-hidden rounded-[28px] border p-6 sm:p-8 ${
        isWinner
          ? "border-emerald-400/30 bg-emerald-400/[0.07]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      {isWinner ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/[0.09] blur-3xl"
        />
      ) : null}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.18em] ${
                isWinner
                  ? "text-emerald-300"
                  : "text-slate-500"
              }`}
            >
              Product {side}
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {product.name}
            </h2>
          </div>

          <span
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] ${
              isWinner
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/[0.04] text-slate-400"
            }`}
          >
            {getWinnerLabel(side, winner)}
          </span>
        </div>

        {product.image ? (
          <div className="mt-6 flex min-h-56 items-center justify-center rounded-2xl border border-white/10 bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-52 w-full object-contain"
            />
          </div>
        ) : (
          <div className="mt-6 flex min-h-56 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 px-5 text-center text-sm font-bold text-slate-500">
            Product image unavailable
          </div>
        )}

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Current price
            </p>

            <p className="mt-1 text-3xl font-black text-white">
              {formatPrice(product.currentPrice)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Categories won
            </p>

            <p
              className={`mt-1 text-3xl font-black ${
                isWinner
                  ? "text-emerald-300"
                  : "text-white"
              }`}
            >
              {score}/5
            </p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
            style={{
              width: `${scorePercentage}%`,
            }}
          />
        </div>

        <div className="mt-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Why it stands out
          </p>

          {reasons.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-black text-emerald-300">
                    ✓
                  </span>

                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-500">
              No clear category advantages were found with
              the current comparison data.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ComparisonHero({
  productA,
  productB,
  comparison,
}: ComparisonHeroProps) {
  const winnerName = getWinnerName(
    productA,
    productB,
    comparison.winner
  );

  return (
    <section
      aria-labelledby="comparison-title"
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101b24] p-5 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-400/[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-400/[0.04] blur-3xl"
      />

      <div className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
            Blinlx product comparison
          </p>

          <h1
            id="comparison-title"
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl"
          >
            {productA.name}
            <span className="mx-3 text-emerald-300">
              vs
            </span>
            {productB.name}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            We compared price, value, performance,
            features and retailer confidence to help you
            choose the better product.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.07] px-5 py-5 text-center sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Blinlx verdict
          </p>

          <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
            {winnerName}
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            {comparison.summary}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ProductPanel
            product={productA}
            side="A"
            winner={comparison.winner}
            score={comparison.overallScoreA}
            reasons={comparison.reasonsA}
          />

          <ProductPanel
            product={productB}
            side="B"
            winner={comparison.winner}
            score={comparison.overallScoreB}
            reasons={comparison.reasonsB}
          />
        </div>
      </div>
    </section>
  );
}