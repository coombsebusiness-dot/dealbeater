type RetailerTrustCardProps = {
  retailer: string;
  trustScore: number;
  rating?: number;
  reviewCount?: number;
  officialRetailer?: boolean;
  buyerProtection?: boolean;
  secureCheckout?: boolean;
  returnDays?: number;
  deliveryEstimate?: string;
  recommendation:
    | "Highly Recommended"
    | "Recommended"
    | "Acceptable"
    | "Use Caution";
};

function getTrustLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";

  return "Caution";
}

function getRecommendationStyles(
  recommendation: RetailerTrustCardProps["recommendation"]
) {
  switch (recommendation) {
    case "Highly Recommended":
      return "border-[#2ee866]/30 bg-[#2ee866]/10 text-[#68f18e]";

    case "Recommended":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";

    case "Acceptable":
      return "border-amber-400/25 bg-amber-400/10 text-amber-300";

    case "Use Caution":
      return "border-red-400/25 bg-red-400/10 text-red-300";
  }
}

function formatReviewCount(reviewCount?: number) {
  if (reviewCount === undefined) {
    return null;
  }

  return new Intl.NumberFormat("en-GB", {
    notation: reviewCount >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(reviewCount);
}

export default function RetailerTrustCard({
  retailer,
  trustScore,
  rating,
  reviewCount,
  officialRetailer = false,
  buyerProtection = false,
  secureCheckout = false,
  returnDays,
  deliveryEstimate,
  recommendation,
}: RetailerTrustCardProps) {
  const safeTrustScore = Math.max(
    0,
    Math.min(100, Math.round(trustScore))
  );

  const trustLabel = getTrustLabel(safeTrustScore);
  const formattedReviewCount = formatReviewCount(reviewCount);

  const trustSignals = [
    officialRetailer ? "Official or established retailer" : null,
    buyerProtection ? "Buyer protection available" : null,
    secureCheckout ? "Secure checkout" : null,
    returnDays ? `${returnDays}-day returns` : null,
    deliveryEstimate ? `Delivery: ${deliveryEstimate}` : null,
  ].filter((signal): signal is string => Boolean(signal));

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#52ee7e]">
              Retailer Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Retailer Trust
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Blinlx checks more than price before recommending where to buy.
            </p>
          </div>

          <div
            className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-black ${getRecommendationStyles(
              recommendation
            )}`}
          >
            {recommendation}
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.055] p-6">
          <p className="text-sm font-semibold text-white/55">
            {retailer}
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-6xl font-black tracking-[-0.06em] text-white">
              {safeTrustScore}
            </span>

            <span className="pb-2 text-lg font-bold text-white/45">
              / 100
            </span>
          </div>

          <p className="mt-2 text-lg font-black text-[#68f18e]">
            {trustLabel}
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#2ee866] transition-all duration-700"
              style={{
                width: `${safeTrustScore}%`,
              }}
            />
          </div>

          {rating !== undefined && (
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <span
                  aria-label={`${rating} out of 5 stars`}
                  className="text-lg tracking-[0.12em] text-[#2ee866]"
                >
                  ★★★★★
                </span>

                <span className="font-black text-white">
                  {rating.toFixed(1)}
                </span>
              </div>

              {formattedReviewCount && (
                <p className="mt-1 text-sm text-white/45">
                  Based on {formattedReviewCount} reviews
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-black text-white">
            Why Blinlx trusts this retailer
          </h3>

          {trustSignals.length > 0 ? (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/10 p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2ee866]/12 text-sm font-black text-[#2ee866]"
                  >
                    ✓
                  </span>

                  <span className="text-sm font-semibold leading-6 text-white/72">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100/75">
              Blinlx found limited trust information for this retailer. Review
              the seller details, payment protection and returns policy before
              buying.
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5">
            <p className="text-sm font-black text-white">
              Blinlx recommendation
            </p>

            <p className="mt-2 text-sm leading-6 text-white/62">
              {recommendation === "Highly Recommended" &&
                "This retailer appears to offer a strong combination of reliability, protection and customer support."}

              {recommendation === "Recommended" &&
                "This retailer appears to be a sensible buying option, although you should still confirm delivery and returns details."}

              {recommendation === "Acceptable" &&
                "This retailer may be suitable, but stronger buyer protection or a clearer returns policy would improve confidence."}

              {recommendation === "Use Caution" &&
                "The price may be attractive, but Blinlx found reasons to be cautious. Confirm seller identity, payment protection and returns before buying."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}