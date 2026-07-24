"use client";

type DealVerdict =
  | "BUY"
  | "GOOD DEAL"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

type VerdictBannerProps = {
  verdict: DealVerdict;
  headline: string;
  recommendation: string;
  confidence: number;
};

export default function VerdictBanner({
  verdict,
  headline,
  recommendation,
  confidence,
}: VerdictBannerProps) {
  const styles = getVerdictStyles(verdict);
  const safeConfidence = Math.max(
    0,
    Math.min(100, Math.round(confidence))
  );

  return (
    <section
      className={`overflow-hidden rounded-3xl border ${styles.border} ${styles.background}`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
              Blinlx Verdict
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${styles.iconBackground} text-xl`}
              >
                {styles.icon}
              </span>

              <h3 className={`text-3xl font-black ${styles.text}`}>
                {formatVerdict(verdict)}
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-center sm:min-w-32">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/40">
              Confidence
            </p>

            <p className={`mt-1 text-2xl font-black ${styles.text}`}>
              {safeConfidence}%
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5">
          <h4 className="text-xl font-black text-white">
            {headline}
          </h4>

          <p className="mt-3 text-sm leading-6 text-white/70">
            {recommendation}
          </p>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-700 ${styles.progress}`}
            style={{ width: `${safeConfidence}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function formatVerdict(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return "Buy Now";
    case "GOOD DEAL":
      return "Good Deal";
    case "CONSIDER":
      return "Consider";
    case "WAIT":
      return "Wait";
    case "AVOID":
      return "Avoid";
  }
}

function getVerdictStyles(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return {
        text: "text-[#68f18e]",
        border: "border-[#2ee866]/40",
        background: "bg-[#2ee866]/10",
        iconBackground: "bg-[#2ee866]/15",
        progress: "bg-[#2ee866]",
        icon: "✓",
      };

    case "GOOD DEAL":
      return {
        text: "text-lime-300",
        border: "border-lime-300/40",
        background: "bg-lime-300/10",
        iconBackground: "bg-lime-300/15",
        progress: "bg-lime-300",
        icon: "★",
      };

    case "CONSIDER":
      return {
        text: "text-amber-300",
        border: "border-amber-300/40",
        background: "bg-amber-300/10",
        iconBackground: "bg-amber-300/15",
        progress: "bg-amber-300",
        icon: "?",
      };

    case "WAIT":
      return {
        text: "text-orange-300",
        border: "border-orange-300/40",
        background: "bg-orange-300/10",
        iconBackground: "bg-orange-300/15",
        progress: "bg-orange-300",
        icon: "⏳",
      };

    case "AVOID":
      return {
        text: "text-red-300",
        border: "border-red-300/40",
        background: "bg-red-300/10",
        iconBackground: "bg-red-300/15",
        progress: "bg-red-300",
        icon: "!",
      };
  }
}