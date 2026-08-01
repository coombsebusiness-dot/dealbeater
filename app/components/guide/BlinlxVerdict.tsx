import type {
  Verdict,
} from "@/types/buying-guide/Verdict";

interface BlinlxVerdictProps {
  verdict: Verdict;
}

export function BlinlxVerdict({
  verdict,
}: BlinlxVerdictProps) {
  const confidence =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          verdict.confidence,
        ),
      ),
    );

  return (
    <section
      aria-labelledby="blinlx-verdict-heading"
      className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
            Blinlx verdict
          </p>

          <h2
            id="blinlx-verdict-heading"
            className="mt-2 text-2xl font-bold text-white"
          >
            {verdict.title}
          </h2>
        </div>

        <div className="shrink-0 rounded-xl border border-green-500/30 bg-slate-950/50 px-4 py-3 text-center">
          <div className="text-2xl font-bold text-green-400">
            {confidence}%
          </div>

          <div className="text-xs uppercase tracking-wide text-slate-400">
            Confidence
          </div>
        </div>
      </div>

      <p className="mt-4 leading-7 text-slate-200">
        {verdict.summary}
      </p>

      {verdict.points.length > 0 && (
        <ul className="mt-5 space-y-3">
          {verdict.points.map(
            (point) => (
              <li
                key={point}
                className="flex gap-3 text-slate-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-green-400"
                >
                  ✓
                </span>

                <span>
                  {point}
                </span>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}