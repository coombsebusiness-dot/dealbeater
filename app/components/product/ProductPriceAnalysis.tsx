import type { Product } from "@/types/product";

type ProductPriceAnalysisProps = {
  product: Product;
};

function formatPrice(price?: number) {
  if (typeof price !== "number") {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

function getPriceDifference(product: Product) {
  if (
    typeof product.currentPrice !== "number" ||
    typeof product.fairPrice !== "number"
  ) {
    return undefined;
  }

  return product.fairPrice - product.currentPrice;
}

function getPriceAnalysis(product: Product) {
  const difference = getPriceDifference(product);

  if (
    typeof product.currentPrice !== "number" ||
    typeof product.fairPrice !== "number"
  ) {
    return {
      verdict: "PRICE DATA LIMITED",
      shouldWait: "UNCLEAR",
      summary:
        "We do not yet have enough pricing data to judge whether today is the right time to buy.",
      reasons: [
        "Current pricing information is incomplete.",
        "A reliable fair-price comparison is not yet available.",
        "Compare several trusted retailers before buying.",
      ],
    };
  }

  const percentageDifference =
    (Math.abs(difference ?? 0) / product.fairPrice) * 100;

  if ((difference ?? 0) >= product.fairPrice * 0.08) {
    return {
      verdict: "EXCELLENT PRICE",
      shouldWait: "NO",
      summary: `Today's price is ${formatPrice(
        difference
      )} below our estimated fair value, making this a strong buying opportunity.`,
      reasons: [
        `The current price is ${percentageDifference.toFixed(
          0
        )}% below our fair-price estimate.`,
        "The saving is large enough to justify buying now.",
        "Waiting may not produce a meaningfully better deal.",
      ],
    };
  }

  if ((difference ?? 0) > 0) {
    return {
      verdict: "GOOD PRICE",
      shouldWait: "PROBABLY NOT",
      summary: `Today's price is ${formatPrice(
        difference
      )} below our estimated fair value.`,
      reasons: [
        "The product is currently priced below fair value.",
        "The deal is competitive against the wider market.",
        "Buying today would be reasonable if the product suits your needs.",
      ],
    };
  }

  if (difference === 0) {
    return {
      verdict: "FAIR PRICE",
      shouldWait: "OPTIONAL",
      summary:
        "Today's price is in line with what we believe this product is currently worth.",
      reasons: [
        "The product is priced at our estimated fair value.",
        "There is no obvious overpricing.",
        "Waiting may help, but a major saving is not guaranteed.",
      ],
    };
  }

  return {
    verdict: "HIGH PRICE",
    shouldWait: "YES",
    summary: `Today's price is ${formatPrice(
      Math.abs(difference ?? 0)
    )} above our estimated fair value.`,
    reasons: [
      "The current price is above our fair-price estimate.",
      "A better offer may be available from another retailer.",
      "Waiting or comparing alternatives would be the safer move.",
    ],
  };
}

export default function ProductPriceAnalysis({
  product,
}: ProductPriceAnalysisProps) {
  const analysis = getPriceAnalysis(product);
  const difference = getPriceDifference(product);

  const savingFromFairPrice =
    typeof difference === "number" && difference > 0 ? difference : 0;

  const lowestPriceGap =
    typeof product.currentPrice === "number" &&
    typeof product.lowestPrice === "number"
      ? product.currentPrice - product.lowestPrice
      : undefined;

  return (
    <section
      aria-labelledby="price-analysis-title"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-[32px] border border-white/10 bg-[#111c27] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2ee866]">
              Price Intelligence
            </span>

            <h2
              id="price-analysis-title"
              className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Is today&apos;s price actually good?
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {analysis.summary}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 px-5 py-4 lg:min-w-56">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Price verdict
            </p>

            <p className="mt-2 text-2xl font-black text-[#2ee866]">
              {analysis.verdict}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PriceCard
            label="Today's Price"
            value={formatPrice(product.currentPrice)}
            description="The best current tracked price"
          />

          <PriceCard
            label="Fair Price"
            value={formatPrice(product.fairPrice)}
            description="Our estimated current market value"
          />

          <PriceCard
            label="Lowest Seen"
            value={formatPrice(product.lowestPrice)}
            description="The lowest price in our tracked data"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h3 className="text-xl font-black text-white">
              Why we reached this price verdict
            </h3>

            <ul className="mt-6 space-y-4">
              {analysis.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300 sm:text-base"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2ee866]/10 text-sm font-black text-[#2ee866]">
                    ✓
                  </span>

                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            {savingFromFairPrice > 0 ? (
              <div className="mt-8 rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2ee866]">
                  Saving against fair value
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {formatPrice(savingFromFairPrice)}
                </p>
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/10 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Should you wait?
            </p>

            <p className="mt-3 text-4xl font-black text-white">
              {analysis.shouldWait}
            </p>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <AnalysisRow
                label="Price status"
                value={product.priceStatus ?? "Unknown"}
              />

              <AnalysisRow
                label="Against fair value"
                value={
                  typeof difference !== "number"
                    ? "Unavailable"
                    : difference > 0
                      ? `${formatPrice(difference)} cheaper`
                      : difference === 0
                        ? "At fair value"
                        : `${formatPrice(Math.abs(difference))} higher`
                }
              />

              <AnalysisRow
                label="Above lowest seen"
                value={
                  typeof lowestPriceGap !== "number"
                    ? "Unavailable"
                    : lowestPriceGap <= 0
                      ? "At the lowest tracked price"
                      : formatPrice(lowestPriceGap)
                }
              />
            </div>

            {product.priceHistoryUrl ? (
              <a
                href={product.priceHistoryUrl}
                className="mt-8 flex min-h-14 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-6 text-center text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#2ee866]/40 hover:bg-[#2ee866]/5 focus:outline-none focus:ring-2 focus:ring-[#2ee866]"
              >
                View Price History
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

type PriceCardProps = {
  label: string;
  value: string;
  description: string;
};

function PriceCard({ label, value, description }: PriceCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-white">{value}</p>

      <p className="mt-2 text-sm leading-5 text-slate-400">{description}</p>
    </div>
  );
}

type AnalysisRowProps = {
  label: string;
  value: string;
};

function AnalysisRow({ label, value }: AnalysisRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  );
}