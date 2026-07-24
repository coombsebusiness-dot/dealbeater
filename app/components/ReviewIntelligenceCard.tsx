type ReviewIntelligenceCardProps = {
  score: number;
  sentiment:
    | "EXCELLENT"
    | "POSITIVE"
    | "MIXED"
    | "POOR"
    | "UNKNOWN";
  headline: string;
  summary: string;
  strengths: string[];
  concerns: string[];
  confidence: number;
};

function getSentimentLabel(
  sentiment: ReviewIntelligenceCardProps["sentiment"]
) {
  switch (sentiment) {
    case "EXCELLENT":
      return "Excellent";

    case "POSITIVE":
      return "Positive";

    case "MIXED":
      return "Mixed";

    case "POOR":
      return "Poor";

    case "UNKNOWN":
      return "Limited data";
  }
}

function getSentimentStyles(
  sentiment: ReviewIntelligenceCardProps["sentiment"]
) {
  switch (sentiment) {
    case "EXCELLENT":
      return "border-[#2ee866]/30 bg-[#2ee866]/10 text-[#68f18e]";

    case "POSITIVE":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";

    case "MIXED":
      return "border-amber-400/25 bg-amber-400/10 text-amber-300";

    case "POOR":
      return "border-red-400/25 bg-red-400/10 text-red-300";

    case "UNKNOWN":
      return "border-white/10 bg-white/5 text-white/60";
  }
}

export default function ReviewIntelligenceCard({
  score,
  sentiment,
  headline,
  summary,
  strengths,
  concerns,
  confidence,
}: ReviewIntelligenceCardProps) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const safeConfidence = Math.max(
    0,
    Math.min(100, Math.round(confidence))
  );

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#52ee7e]">
              Review Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              What customers are saying
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Blinlx turns customer feedback into clear buying insights.
            </p>
          </div>

          <div
            className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-black ${getSentimentStyles(
              sentiment
            )}`}
          >
            {getSentimentLabel(sentiment)}
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.055] p-6">
          <p className="text-sm font-semibold text-white/55">
            Review score
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-6xl font-black tracking-[-0.06em] text-white">
              {safeScore}
            </span>

            <span className="pb-2 text-lg font-bold text-white/45">
              / 100
            </span>
          </div>

          <p className="mt-3 text-lg font-black text-[#68f18e]">
            {headline}
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#2ee866] transition-all duration-700"
              style={{
                width: `${safeScore}%`,
              }}
            />
          </div>

          <p className="mt-5 text-sm text-white/45">
            Analysis confidence: {safeConfidence}%
          </p>
        </div>

        <div>
          <p className="text-sm leading-7 text-white/72">
            {summary}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#2ee866]/15 bg-[#2ee866]/[0.04] p-5">
              <h3 className="font-black text-white">
                What owners like
              </h3>

              {strengths.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex gap-3 text-sm leading-6 text-white/70"
                    >
                      <span className="font-black text-[#2ee866]">
                        ✓
                      </span>

                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-white/45">
                  No clear strengths were identified from the available
                  review information.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5">
              <h3 className="font-black text-white">
                Common concerns
              </h3>

              {concerns.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {concerns.map((concern) => (
                    <li
                      key={concern}
                      className="flex gap-3 text-sm leading-6 text-white/70"
                    >
                      <span className="font-black text-amber-300">
                        !
                      </span>

                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-white/45">
                  Blinlx did not identify any significant recurring concerns.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}