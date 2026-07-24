"use client";

type DealVerdict =
  | "BUY"
  | "GOOD DEAL"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

type BlinlxScoreCardProps = {
  score: number;
  confidence: number;
  verdict: DealVerdict;
  headline: string;
  summary: string;
};

export default function BlinlxScoreCard({
  score,
  confidence,
  verdict,
  headline,
  summary,
}: BlinlxScoreCardProps) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const safeConfidence = Math.max(
    0,
    Math.min(100, Math.round(confidence))
  );

  const styles = getVerdictStyles(verdict);
  const scoreLabel = getScoreLabel(safeScore);
  const stars = Math.max(1, Math.min(5, Math.round(safeScore / 20)));

  return (
    <section
      className={`overflow-hidden rounded-3xl border ${styles.border} ${styles.background} shadow-xl ${styles.shadow}`}
    >
      <div className="p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
            Blinlx Score
          </p>

          <div
            className={`mx-auto mt-5 flex h-36 w-36 items-center justify-center rounded-full border-8 ${styles.scoreBorder} bg-[#16212b] shadow-2xl sm:h-40 sm:w-40`}
          >
            <div>
              <p className={`text-5xl font-black ${styles.text}`}>
                {safeScore}
              </p>
              <p className="mt-1 text-sm font-bold text-white/45">
                out of 100
              </p>
            </div>
          </div>

          <div
            className="mt-5 text-xl tracking-[0.2em] text-amber-300"
            aria-label={`${stars} out of 5 stars`}
          >
            {"★".repeat(stars)}
            <span className="text-white/15">
              {"★".repeat(5 - stars)}
            </span>
          </div>

          <p className={`mt-4 text-2xl font-black ${styles.text}`}>
            {scoreLabel}
          </p>

          <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
            {formatVerdict(verdict)}
          </p>
        </div>

        <div className="mt-7 rounded-2xl border border-white/10 bg-black/10 p-5 text-center">
          <h3 className="text-xl font-black text-white">
            {headline}
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70">
            {summary}
          </p>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-white/70">
              Confidence
            </span>
            <span className={`font-black ${styles.text}`}>
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

function formatVerdict(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return "Buy Now";
    case "GOOD DEAL":
      return "Good Deal";
    case "CONSIDER":
      return "Consider Carefully";
    case "WAIT":
      return "Wait";
    case "AVOID":
      return "Avoid";
  }
}

function getScoreLabel(score: number) {
  if (score >= 90) return "Excellent Buy";
  if (score >= 80) return "Very Good Value";
  if (score >= 70) return "Good Option";
  if (score >= 60) return "Worth Considering";
  if (score >= 45) return "Mixed Value";
  return "Poor Value";
}

function getVerdictStyles(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return {
        text: "text-[#68f18e]",
        border: "border-[#2ee866]/40",
        background: "bg-[#2ee866]/10",
        scoreBorder: "border-[#2ee866]",
        shadow: "shadow-[#2ee866]/10",
        progress: "bg-[#2ee866]",
      };

    case "GOOD DEAL":
      return {
        text: "text-lime-300",
        border: "border-lime-300/40",
        background: "bg-lime-300/10",
        scoreBorder: "border-lime-300",
        shadow: "shadow-lime-300/10",
        progress: "bg-lime-300",
      };

    case "CONSIDER":
      return {
        text: "text-amber-300",
        border: "border-amber-300/40",
        background: "bg-amber-300/10",
        scoreBorder: "border-amber-300",
        shadow: "shadow-amber-300/10",
        progress: "bg-amber-300",
      };

    case "WAIT":
      return {
        text: "text-orange-300",
        border: "border-orange-300/40",
        background: "bg-orange-300/10",
        scoreBorder: "border-orange-300",
        shadow: "shadow-orange-300/10",
        progress: "bg-orange-300",
      };

    case "AVOID":
      return {
        text: "text-red-300",
        border: "border-red-300/40",
        background: "bg-red-300/10",
        scoreBorder: "border-red-300",
        shadow: "shadow-red-300/10",
        progress: "bg-red-300",
      };
  }
}