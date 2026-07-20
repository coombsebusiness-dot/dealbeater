import { DealExplanation } from "../lib/explanations/explanationEngine";

interface Props {
  explanation: DealExplanation;
  score: number;
  confidence: number;
}

export default function DealVerdictCard({
  explanation,
  score,
  confidence,
}: Props) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl">

      <p className="text-emerald-400 font-semibold">
        💚 Deal Beater Verdict
      </p>

      <h1 className="text-5xl font-black mt-4">
        {explanation.recommendation}
      </h1>

      <p className="text-zinc-300 mt-3">
        {explanation.headline}
      </p>

      <div className="mt-8">

        <div className="flex justify-between">

          <span>Overall Score</span>

          <span>{score}/100</span>

        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3 mt-2">

          <div
            className="bg-emerald-500 h-3 rounded-full transition-all"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between">

          <span>Confidence</span>

          <span>{confidence}%</span>

        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3 mt-2">

          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}