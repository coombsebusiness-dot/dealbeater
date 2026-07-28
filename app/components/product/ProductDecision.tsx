import type { Product } from "@/types/product";

type ProductDecisionProps = {
  product: Product;
};

function formatPrice(price?: number) {
  if (typeof price !== "number") {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

function getDecision(score?: number) {
  const safeScore = score ?? 0;

  if (safeScore >= 85) {
    return {
      answer: "YES",
      action: "BUY TODAY",
      label: "Strong recommendation",
    };
  }

  if (safeScore >= 70) {
    return {
      answer: "YES",
      action: "COMPARE PRICES",
      label: "Recommended",
    };
  }

  if (safeScore >= 50) {
    return {
      answer: "MAYBE",
      action: "WAIT OR NEGOTIATE",
      label: "Consider carefully",
    };
  }

  return {
    answer: "NO",
    action: "AVOID FOR NOW",
    label: "Not recommended",
  };
}

function getConfidence(score?: number) {
  if (typeof score !== "number") {
    return 70;
  }

  return Math.min(99, Math.max(70, Math.round(score + 5)));
}

function getScoreLabel(score?: number) {
  const safeScore = score ?? 0;

  if (safeScore >= 85) {
    return "★★★★★ Excellent Buy";
  }

  if (safeScore >= 70) {
    return "★★★★☆ Recommended";
  }

  if (safeScore >= 50) {
    return "★★★☆☆ Consider Carefully";
  }

  return "★★☆☆☆ Not Recommended";
}

function getRetailerName(retailer?: string) {
  if (!retailer) {
    return undefined;
  }

  const cleanedRetailer = retailer.trim();

  if (
    cleanedRetailer.toLowerCase() === "view best price" ||
    cleanedRetailer.toLowerCase() === "buy now" ||
    cleanedRetailer.toLowerCase() === "view price"
  ) {
    return undefined;
  }

  return cleanedRetailer;
}

export default function ProductDecision({
  product,
}: ProductDecisionProps) {
  const score = product.blinlxScore ?? 0;
  const decision = getDecision(product.blinlxScore);
  const confidence = getConfidence(product.blinlxScore);
  const scoreLabel = getScoreLabel(product.blinlxScore);
  const retailerName = getRetailerName(product.primaryOfferRetailer);

  const reasons =
    product.highlights && product.highlights.length > 0
      ? product.highlights.slice(0, 5)
      : [
          "The product performs strongly across its main buying criteria.",
          "Its current position in the market remains competitive.",
          "The overall product proposition is worth considering.",
        ];

  const fairPriceDifference =
    typeof product.currentPrice === "number" &&
    typeof product.fairPrice === "number"
      ? product.fairPrice - product.currentPrice
      : undefined;

  const fairPriceSupportingText =
    typeof fairPriceDifference !== "number"
      ? "Estimated fair market price"
      : fairPriceDifference > 0
        ? `${formatPrice(fairPriceDifference)} below fair value`
        : fairPriceDifference === 0
          ? "Currently at fair value"
          : `${formatPrice(Math.abs(fairPriceDifference))} above fair value`;

  const ctaText =
    typeof product.currentPrice === "number"
      ? retailerName
        ? `Buy for ${formatPrice(product.currentPrice)} at ${retailerName}`
        : `View Best UK Price — ${formatPrice(product.currentPrice)}`
      : retailerName
        ? `View Best UK Price at ${retailerName}`
        : "View Best UK Price";

  return (
    <section
      aria-labelledby="product-decision-title"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111c27] shadow-2xl shadow-black/20">
       <div>
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mb-6 flex flex-col items-center text-center gap-3">
              <span className="rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2ee866]">
                Blinlx Buying Decision
              </span>

              <span className="text-sm font-medium text-slate-400">
                {decision.label}
              </span>
            </div>

            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
  Should you buy it?
</p>

       <div className="mt-6 flex w-full flex-col items-center justify-center text-center">
  <h2
    id="product-decision-title"
    className="text-[clamp(6rem,16vw,13rem)] font-black leading-[0.82] tracking-[-0.07em] text-white"
  >
    {decision.answer}
  </h2>

 <span
  aria-hidden="true"
  className="mt-4 h-5 w-5 rounded-full bg-[#2ee866] shadow-[0_0_30px_rgba(46,232,102,0.85)]"
/>
</div>

            <div className="mt-8 rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/5 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2ee866]">
                💚 If it was our money...
              </p>

              <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {product.ifItWasOurMoney ??
                  "We would compare the current price against the strongest alternatives before making the final decision."}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/5 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2ee866]">
                Recommended action
              </p>

              <p className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {decision.action}
              </p>
            </div>

            {product.primaryOfferUrl ? (
              <a
                href={product.primaryOfferUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="mt-6 flex min-h-20 w-full items-center justify-center rounded-3xl bg-[#2ee866] px-8 text-center text-base font-black uppercase tracking-[0.08em] text-[#07110b] shadow-[0_10px_35px_rgba(46,232,102,0.35)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2ee866] focus:ring-offset-2 focus:ring-offset-[#111c27] sm:text-lg"
              >
                🛒 {ctaText}
              </a>
            ) : null}

            <div className="mt-8">
              <h3 className="text-lg font-bold text-white">
                Why we recommend it
              </h3>

              <ul className="mt-5 space-y-4">
                {reasons.map((reason) => (
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
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/10 p-6 sm:p-8 lg:p-10">
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DecisionStat
                label="★ Blinlx Score"
                value={
                  product.blinlxScore !== undefined
                    ? `${score}/100`
                    : "Not scored"
                }
               detailText={
  product.scoreContext
    ? `AI confidence ${product.scoreContext.confidence}%`
    : "Blinlx product intelligence score"
}
              />

              <DecisionStat
                label="£ Today's Price"
                value={formatPrice(product.currentPrice)}
                supportingText="Current tracked price"
              />

              <DecisionStat
                label="↗ Fair Price"
                value={formatPrice(product.fairPrice)}
                supportingText={fairPriceSupportingText}
              />

              <DecisionStat
                label="● Current Deal"
                value={product.verdictLabel ?? product.verdict ?? "Under review"}
                supportingText={product.priceStatus ?? "Price status unavailable"}
              />

              <DecisionStat
                label="✓ Confidence"
                value={`${confidence}%`}
                supportingText="Based on available product and pricing data"
                progress={confidence}
                highlightValue
              />

              <DecisionStat
                label="↘ Lowest Seen"
                value={formatPrice(product.lowestPrice)}
                supportingText="Lowest tracked price"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type DecisionStatProps = {
  label: string;
  value: string;
  supportingText?: string;
  detailText?: string;
  progress?: number;
  highlightValue?: boolean;
};

function DecisionStat({
  label,
  value,
  supportingText,
  detailText,
  progress,
  highlightValue = false,
}: DecisionStatProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black tracking-tight ${
          highlightValue ? "text-[#2ee866]" : "text-white"
        }`}
      >
        {value}
      </p>

      {supportingText ? (
        <p className="mt-2 text-sm font-semibold leading-5 text-[#2ee866]">
          {supportingText}
        </p>
      ) : null}

      {typeof progress === "number" ? (
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Recommendation confidence"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-[#2ee866]"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      {detailText ? (
        <p className="mt-2 text-sm leading-5 text-slate-400">
          {detailText}
        </p>
      ) : null}
    </div>
  );
}