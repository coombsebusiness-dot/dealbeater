type ProductSuitability =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "UNKNOWN";

type ProductIntelligenceCardProps = {
  productName: string;
  score: number;
  confidence: number;
  suitability: ProductSuitability;
  headline: string;
  summary: string;
  bestFor: string[];
  limitations: string[];
};

function getSuitabilityLabel(suitability: ProductSuitability) {
  switch (suitability) {
    case "EXCELLENT":
      return "Excellent";

    case "GOOD":
      return "Strong choice";

    case "MIXED":
      return "Mixed";

    case "LIMITED":
      return "Limited";

    case "UNKNOWN":
      return "Limited data";
  }
}

function getSuitabilityStyles(suitability: ProductSuitability) {
  switch (suitability) {
    case "EXCELLENT":
      return "border-[#2ee866]/30 bg-[#2ee866]/10 text-[#68f18e]";

    case "GOOD":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";

    case "MIXED":
      return "border-amber-400/25 bg-amber-400/10 text-amber-300";

    case "LIMITED":
      return "border-red-400/25 bg-red-400/10 text-red-300";

    case "UNKNOWN":
      return "border-white/10 bg-white/5 text-white/60";
  }
}

export default function ProductIntelligenceCard({
  productName,
  score,
  confidence,
  suitability,
  headline,
  summary,
  bestFor,
  limitations,
}: ProductIntelligenceCardProps) {
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
              Product Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Is this the right product?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Blinlx evaluates the product itself, not only its price.
            </p>
          </div>

          <div
            className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-black ${getSuitabilityStyles(
              suitability
            )}`}
          >
            {getSuitabilityLabel(suitability)}
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.055] p-6">
          <p className="text-sm font-semibold text-white/55">
            Product quality
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-6xl font-black tracking-[-0.06em] text-white">
              {safeScore}
            </span>

            <span className="pb-2 text-lg font-bold text-white/45">
              / 100
            </span>
          </div>

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
          <p className="text-sm font-semibold text-[#68f18e]">
            {productName}
          </p>

          <h3 className="mt-2 text-xl font-black leading-8 text-white">
            {headline}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/70">
            {summary}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#2ee866]/15 bg-[#2ee866]/[0.04] p-5">
              <h4 className="font-black text-white">
                Product strengths
              </h4>

              {bestFor.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {bestFor.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-white/70"
                    >
                      <span className="font-black text-[#2ee866]">
                        ✓
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-white/45">
                  No clear product strengths were identified from the
                  available information.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5">
              <h4 className="font-black text-white">
                Limitations
              </h4>

              {limitations.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {limitations.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-white/70"
                    >
                      <span className="font-black text-amber-300">
                        !
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-white/45">
                  Blinlx did not identify any major product limitations.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}