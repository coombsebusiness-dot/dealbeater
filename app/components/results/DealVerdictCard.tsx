import Link from "next/link";
import { DealExplanation } from "../lib/explanations/explanationEngine";

interface Props {
  explanation: DealExplanation;
  score: number;
  confidence: number;
  ctaUrl?: string;
  ctaLabel?: string;
}

export default function DealVerdictCard({
  explanation,
  score,
  confidence,
  ctaUrl,
  ctaLabel,
}: Props) {
  const safeScore = Math.max(0, Math.min(100, score));
  const safeConfidence = Math.max(0, Math.min(100, confidence));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold text-emerald-400">
          💚 Deal Beater Report
        </p>

        <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
          Verified Analysis
        </span>
      </div>

      <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
        {explanation.recommendation}
      </h1>

      <p className="mt-3 text-lg font-medium text-zinc-300">
        {explanation.headline}
      </p>

     {explanation.summary && (
  <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
    {explanation.summary}
  </p>
)}

{explanation.confidenceStatement && (
  <p className="mt-3 text-sm text-zinc-500">
    {explanation.confidenceStatement}
  </p>
)}

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-zinc-300">Overall Score</span>
          <span className="font-bold text-white">{safeScore}/100</span>
        </div>

        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{
              width: `${safeScore}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-zinc-300">Confidence</span>
          <span className="font-bold text-white">{safeConfidence}%</span>
        </div>

        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-700"
            style={{
              width: `${safeConfidence}%`,
            }}
          />
        </div>
      </div>

      {ctaUrl && (
        <div className="mt-10 border-t border-zinc-800 pt-8">
          <Link
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full rounded-2xl bg-emerald-500 px-6 py-4 text-center text-lg font-black text-black transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {ctaLabel ?? "🛒 Buy Now"}
          </Link>

          <p className="mt-3 text-center text-xs leading-5 text-zinc-500">
            We may earn a commission if you purchase through this link.
          </p>
        </div>
      )}
    </div>
  );
}