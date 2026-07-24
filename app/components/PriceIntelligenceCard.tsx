"use client";

type PriceStatus =
  | "EXCELLENT"
  | "GOOD"
  | "FAIR"
  | "HIGH"
  | "UNKNOWN";

type PriceIntelligenceCardProps = {
  currentPrice?: number | null;
  fairPrice?: number | null;
  lowestPrice?: number | null;
  currency?: string;
  status?: PriceStatus;
  recommendation?: string;
  confidence?: number;
};

export default function PriceIntelligenceCard({
  currentPrice,
  fairPrice,
  lowestPrice,
  currency = "GBP",
  status = "UNKNOWN",
  recommendation = "There is not enough pricing information available yet.",
  confidence = 0,
}: PriceIntelligenceCardProps) {
  const safeConfidence = Math.max(
    0,
    Math.min(100, Math.round(confidence))
  );

  const styles = getStatusStyles(status);

  const priceDifference =
    typeof currentPrice === "number" && typeof fairPrice === "number"
      ? currentPrice - fairPrice
      : null;

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#1d2a36] shadow-xl shadow-black/20">
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#68f18e]">
              Price Intelligence
            </p>

            <h3 className="mt-2 text-2xl font-black text-white">
              Is this a good price?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Blinlx compares the current price with the expected market value.
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${styles.badge}`}
          >
            {formatStatus(status)}
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
        <PriceBox
          label="Today's price"
          value={formatPrice(currentPrice, currency)}
          highlighted
        />

        <PriceBox
          label="Fair price"
          value={formatPrice(fairPrice, currency)}
        />

        <PriceBox
          label="Lowest seen"
          value={formatPrice(lowestPrice, currency)}
        />
      </div>

      {priceDifference !== null && (
        <div className="px-6 pb-6 sm:px-8">
          <div
            className={`rounded-2xl border p-5 ${styles.panel}`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                  Price difference
                </p>

                <p className={`mt-2 text-xl font-black ${styles.text}`}>
                  {getPriceDifferenceText(priceDifference, currency)}
                </p>
              </div>

              <p className="text-sm text-white/55">
                Compared with the estimated fair price
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 px-6 py-6 sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-white/45">
          Blinlx recommendation
        </p>

        <p className="mt-3 text-base font-bold leading-7 text-white">
          {recommendation}
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold text-white/60">
              Price confidence
            </span>

            <span className={`text-sm font-black ${styles.text}`}>
              {safeConfidence}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ${styles.progress}`}
              style={{ width: `${safeConfidence}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type PriceBoxProps = {
  label: string;
  value: string;
  highlighted?: boolean;
};

function PriceBox({
  label,
  value,
  highlighted = false,
}: PriceBoxProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlighted
          ? "border-[#2ee866]/30 bg-[#2ee866]/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${
          highlighted ? "text-[#68f18e]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatPrice(
  value: number | null | undefined,
  currency: string
) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Unavailable";
  }

  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `£${value.toFixed(2)}`;
  }
}

function getPriceDifferenceText(
  difference: number,
  currency: string
) {
  const absoluteDifference = Math.abs(difference);
  const formattedDifference = formatPrice(
    absoluteDifference,
    currency
  );

  if (difference < -1) {
    return `${formattedDifference} below fair price`;
  }

  if (difference > 1) {
    return `${formattedDifference} above fair price`;
  }

  return "Close to the fair market price";
}

function formatStatus(status: PriceStatus) {
  switch (status) {
    case "EXCELLENT":
      return "Excellent price";
    case "GOOD":
      return "Good price";
    case "FAIR":
      return "Fair price";
    case "HIGH":
      return "Price is high";
    case "UNKNOWN":
      return "Limited data";
  }
}

function getStatusStyles(status: PriceStatus) {
  switch (status) {
    case "EXCELLENT":
      return {
        text: "text-[#68f18e]",
        badge:
          "border-[#2ee866]/40 bg-[#2ee866]/10 text-[#68f18e]",
        panel:
          "border-[#2ee866]/30 bg-[#2ee866]/10",
        progress: "bg-[#2ee866]",
      };

    case "GOOD":
      return {
        text: "text-lime-300",
        badge:
          "border-lime-300/40 bg-lime-300/10 text-lime-300",
        panel:
          "border-lime-300/30 bg-lime-300/10",
        progress: "bg-lime-300",
      };

    case "FAIR":
      return {
        text: "text-amber-300",
        badge:
          "border-amber-300/40 bg-amber-300/10 text-amber-300",
        panel:
          "border-amber-300/30 bg-amber-300/10",
        progress: "bg-amber-300",
      };

    case "HIGH":
      return {
        text: "text-orange-300",
        badge:
          "border-orange-300/40 bg-orange-300/10 text-orange-300",
        panel:
          "border-orange-300/30 bg-orange-300/10",
        progress: "bg-orange-300",
      };

    case "UNKNOWN":
      return {
        text: "text-white/60",
        badge:
          "border-white/15 bg-white/5 text-white/60",
        panel:
          "border-white/10 bg-white/[0.03]",
        progress: "bg-white/40",
      };
  }
}