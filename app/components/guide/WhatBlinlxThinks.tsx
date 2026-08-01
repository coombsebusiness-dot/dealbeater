import type {
  BlinlxOpinion,
} from "@/types/buying-guide/BlinlxOpinion";

interface WhatBlinlxThinksProps {
  opinion: BlinlxOpinion;
}

export function WhatBlinlxThinks({
  opinion,
}: WhatBlinlxThinksProps) {
  const confidence =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          opinion.confidence,
        ),
      ),
    );

  return (
    <section
      aria-labelledby="what-blinlx-thinks-heading"
      className="overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/15 via-slate-900 to-slate-950"
    >
      <div className="border-b border-green-500/20 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-400">
              Blinlx buying intelligence
            </p>

            <h2
              id="what-blinlx-thinks-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-white"
            >
              🧠{" "}
              {opinion.title ??
                "What Blinlx Thinks"}
            </h2>
          </div>

          <div className="shrink-0 rounded-2xl border border-green-500/30 bg-slate-950/60 px-4 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">
              {confidence}%
            </div>

            <div className="text-xs uppercase tracking-wide text-slate-400">
              Confidence
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          {opinion.summary}
        </p>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-7">
        <div className="rounded-2xl border border-green-500/25 bg-green-500/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
            If it was our money
          </p>

          <p className="mt-3 text-lg font-medium leading-8 text-white">
            {opinion.ifItWasOurMoney}
          </p>
        </div>

        {opinion.reasons.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white">
              Why
            </h3>

            <ul className="mt-4 space-y-3">
              {opinion.reasons.map(
                (reason) => (
                  <li
                    key={reason}
                    className="flex gap-3 leading-7 text-slate-200"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 text-green-400"
                    >
                      ✓
                    </span>

                    <span>
                      {reason}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {opinion.caveats &&
          opinion.caveats.length > 0 && (
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h3 className="text-lg font-bold text-amber-300">
                Things to keep in mind
              </h3>

              <ul className="mt-3 space-y-3">
                {opinion.caveats.map(
                  (caveat) => (
                    <li
                      key={caveat}
                      className="flex gap-3 leading-7 text-slate-200"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 text-amber-400"
                      >
                        •
                      </span>

                      <span>
                        {caveat}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
      </div>
    </section>
  );
}