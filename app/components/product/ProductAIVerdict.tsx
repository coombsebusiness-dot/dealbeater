import type { Product } from "@/types/product";

type ProductAIVerdictProps = {
  product: Product;
};

type VerdictStyle = {
  label: string;
  text: string;
  border: string;
  background: string;
  badge: string;
  bar: string;
};

function getVerdictStyle(verdict?: string): VerdictStyle {
  const normalisedVerdict = verdict?.toUpperCase().replaceAll(" ", "_");

  switch (normalisedVerdict) {
    case "BUY":
      return {
        label: "Buy",
        text: "text-emerald-300",
        border: "border-emerald-400/25",
        background: "bg-emerald-400/[0.07]",
        badge: "bg-emerald-400 text-slate-950",
        bar: "bg-emerald-400",
      };

    case "WAIT":
      return {
        label: "Wait",
        text: "text-amber-300",
        border: "border-amber-400/25",
        background: "bg-amber-400/[0.07]",
        badge: "bg-amber-400 text-slate-950",
        bar: "bg-amber-400",
      };

    case "NEGOTIATE":
      return {
        label: "Negotiate",
        text: "text-sky-300",
        border: "border-sky-400/25",
        background: "bg-sky-400/[0.07]",
        badge: "bg-sky-400 text-slate-950",
        bar: "bg-sky-400",
      };

    case "WALK_AWAY":
    case "WALK AWAY":
      return {
        label: "Walk away",
        text: "text-rose-300",
        border: "border-rose-400/25",
        background: "bg-rose-400/[0.07]",
        badge: "bg-rose-400 text-white",
        bar: "bg-rose-400",
      };

    default:
      return {
        label: productVerdictFallback(verdict),
        text: "text-slate-200",
        border: "border-white/10",
        background: "bg-white/[0.04]",
        badge: "bg-white text-slate-950",
        bar: "bg-slate-300",
      };
  }
}

function productVerdictFallback(verdict?: string): string {
  if (!verdict) {
    return "Analysed";
  }

  return verdict
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function clampConfidence(score?: number): number {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

export default function ProductAIVerdict({
  product,
}: ProductAIVerdictProps) {
  const verdictStyle = getVerdictStyle(product.verdict);
  const confidence = clampConfidence(product.scoreContext?.confidence);
  const strengths = product.highlights?.slice(0, 4) ?? [];
  const concerns = product.scoreContext?.concerns?.slice(0, 4) ?? [];

  return (
    <section
      id="ai-verdict"
      className={`overflow-hidden rounded-[28px] border ${verdictStyle.border} ${verdictStyle.background}`}
    >
      <div className="border-b border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`text-sm font-black uppercase tracking-[0.18em] ${verdictStyle.text}`}>
              Blinlx AI verdict
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Should you buy the {product.name}?
            </h2>
          </div>

          <div
            className={`inline-flex min-w-40 items-center justify-center rounded-2xl px-6 py-4 text-2xl font-black uppercase tracking-[0.08em] shadow-lg ${verdictStyle.badge}`}
          >
            {product.verdictLabel ?? verdictStyle.label}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                  AI confidence
                </p>

                <p className="mt-2 text-5xl font-black tracking-tight text-white">
                  {confidence}
                  <span className="text-2xl text-slate-500">%</span>
                </p>
              </div>

              <p className="max-w-48 text-right text-sm leading-6 text-slate-400">
                Confidence in the recommendation for this exact product variant.
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-700 ${verdictStyle.bar}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-slate-400">
              Blinlx conclusion
            </p>

            <p className="mt-3 text-lg font-bold leading-8 text-white">
              {product.summary}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 font-black text-emerald-300">
                  ✓
                </span>

                <h3 className="text-lg font-black text-white">
                  Why Blinlx likes it
                </h3>
              </div>

              <div className="mt-5 space-y-3">
                {strengths.length > 0 ? (
                  strengths.map((strength, index) => (
                    <div
                      key={`${strength}-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-4"
                    >
                      <span className="mt-0.5 text-emerald-300">✓</span>

                      <p className="text-sm font-semibold leading-6 text-slate-200">
                        {strength}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-6 text-slate-400">
                    Detailed strengths are still being gathered for this
                    product.
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10 font-black text-amber-300">
                  !
                </span>

                <h3 className="text-lg font-black text-white">
                  Things to consider
                </h3>
              </div>

              <div className="mt-5 space-y-3">
                {concerns.length > 0 ? (
                  concerns.map((concern, index) => (
                    <div
                      key={`${concern}-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-4"
                    >
                      <span className="mt-0.5 text-amber-300">•</span>

                      <p className="text-sm font-semibold leading-6 text-slate-200">
                        {concern}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-6 text-slate-400">
                    No major concerns were identified during this analysis.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] p-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
              If it was our money...
            </p>

            <p className="mt-3 text-xl font-black leading-8 text-white">
              {product.ifItWasOurMoney ??
                "We would base the decision on the current price, the exact variant and how urgently the product is needed."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}