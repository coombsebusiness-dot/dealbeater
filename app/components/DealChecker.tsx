"use client";

import AnalysisExperience from "./AnalysisExperience";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

type InputMode = "link" | "describe" | "upload";
type DealVerdict = "BUY" | "GOOD DEAL" | "CONSIDER" | "WAIT" | "AVOID";

type BetterAlternative = {
  name: string;
  reason: string;
  price: string;
  rating: number;
  saving: string;
  verdict: string;
};

type DealAIReport = {
  productName: string;
  retailerName: string;
  price: string;
  score: number;
  confidence: number;
  verdict: DealVerdict;
  headline: string;
  recommendation: string;
  summary: string;
  priceAnalysis: string;
  reviewAnalysis: string;
  retailerAnalysis: string;
  positives: string[];
  warnings: string[];
  scoreBreakdown: {
    productQuality: number;
    priceValue: number;
    reviewQuality: number;
    retailerTrust: number;
    warrantySupport: number;
  };
  betterAlternatives: BetterAlternative[];
  ifItWasOurMoney: string;
};

export default function DealChecker() {
  const [mode, setMode] = useState<InputMode>("link");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DealAIReport | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!result) {
      setAnimatedScore(0);
      return;
    }

    let current = 0;
    const target = Math.max(0, Math.min(100, Math.round(result.score)));

    const timer = window.setInterval(() => {
      current += 1;
      setAnimatedScore(current);

      if (current >= target) {
        window.clearInterval(timer);
      }
    }, 12);

    return () => window.clearInterval(timer);
  }, [result]);

  const resetChecker = () => {
    setInput("");
    setFile(null);
    setError("");
    setResult(null);
    setAnimatedScore(0);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
    setError("");
    setResult(null);
  };

  const analyseDeal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (mode !== "upload" && !input.trim()) {
      setError(
        mode === "link"
          ? "Please paste a product or service link."
          : "Please describe what you are thinking of buying."
      );
      return;
    }

    if (mode === "upload" && !file) {
      setError("Please choose a screenshot, image or PDF.");
      return;
    }

    try {
      setIsAnalysing(true);

      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          userInput:
            mode === "upload"
              ? file?.name || "Uploaded product image"
              : input.trim(),
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        report?: DealAIReport;
        error?: string;
      };

      if (!response.ok || !data.success || !data.report) {
        throw new Error(data.error || "Deal analysis failed.");
      }

      setResult(data.report);
    } catch (caughtError) {
      console.error("Deal analysis failed:", caughtError);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while checking the deal."
      );
    } finally {
      setIsAnalysing(false);
    }
  };

  const styles = result ? getVerdictStyles(result.verdict) : null;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#2f3d4c] p-5 shadow-2xl shadow-black/25 sm:p-8 lg:p-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
          AI buying assistant
        </p>
        <h2 className="mt-2 text-2xl font-bold">
          What are you thinking of buying?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/65">
          Paste a link, describe what you need or upload a quote. We&apos;ll
          research the options and help you make the smartest decision.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#1f2c39] p-2">
        <ModeButton active={mode === "link"} label="Paste link" onClick={() => { setMode("link"); resetChecker(); }} />
        <ModeButton active={mode === "describe"} label="Describe it" onClick={() => { setMode("describe"); resetChecker(); }} />
        <ModeButton active={mode === "upload"} label="Upload" onClick={() => { setMode("upload"); resetChecker(); }} />
      </div>

      <form onSubmit={analyseDeal} className="mt-5">
        {mode === "link" && (
          <div>
            <label htmlFor="deal-link" className="mb-2 block text-sm font-semibold text-white/80">
              Product or service link
            </label>
            <input
              id="deal-link"
              type="url"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="https://www.currys.co.uk/..."
              className="w-full rounded-2xl border border-white/15 bg-[#1d2a36] px-6 py-5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-[#2ee866] focus:ring-4 focus:ring-[#2ee866]/10"
            />
          </div>
        )}

        {mode === "describe" && (
          <div>
            <label htmlFor="deal-description" className="mb-2 block text-sm font-semibold text-white/80">
              Tell us what you need
            </label>
            <textarea
              id="deal-description"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="I need a 55-inch TV for under £800, mainly for films and gaming..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/15 bg-[#1d2a36] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#2ee866]"
            />
          </div>
        )}

        {mode === "upload" && (
          <div>
            <label
              htmlFor="deal-file"
              className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/25 bg-[#1d2a36] px-6 py-8 text-center transition hover:border-[#2ee866]/70 hover:bg-[#23323f]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2ee866]/35 text-3xl text-[#2ee866]">↑</span>
              <span className="mt-4 font-bold">{file ? file.name : "Upload a screenshot or quote"}</span>
              <span className="mt-2 text-sm text-white/55">JPG, PNG or PDF</span>
            </label>
            <input
              id="deal-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isAnalysing}
          className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#20c95a] px-6 py-4 text-base font-black text-white shadow-lg shadow-black/20 transition hover:bg-[#2ee866] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAnalysing ? "Checking your deal..." : "Analyse My Deal"}
        </button>
      </form>

      {isAnalysing && <AnalysisExperience onComplete={() => undefined} />}

      {result && !isAnalysing && (
        <div className={`mt-6 rounded-2xl border bg-[#17252f] p-5 sm:p-6 ${styles?.border ?? "border-white/10"}`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
                💚 Deal Beater Verdict
              </p>
              <h3 className="mt-2 text-2xl font-black sm:text-3xl">{result.productName}</h3>
              <p className="mt-2 text-sm text-white/60">{result.retailerName} · {result.price}</p>
            </div>

            <div className="flex shrink-0 flex-col items-center">
              <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 bg-[#101b26] shadow-lg ${styles?.scoreBorder ?? "border-white/40"} ${styles?.shadow ?? ""}`}>
                <span className="text-4xl font-black">{animatedScore}</span>
              </div>
              <p className={`mt-3 text-sm font-black ${styles?.text ?? "text-white"}`}>{result.verdict}</p>
              <p className="text-xs text-white/50">Confidence {result.confidence}%</p>
            </div>
          </div>

          <div className={`mt-5 rounded-2xl border p-5 ${styles?.border ?? "border-white/10"} ${styles?.background ?? "bg-white/5"}`}>
            <p className={`text-lg font-black ${styles?.text ?? "text-white"}`}>{result.headline}</p>
            <p className="mt-3 text-sm leading-6 text-white/80">{result.summary}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-white/90">
              {result.recommendation}
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <AnalysisCard title="💷 Price Intelligence" text={result.priceAnalysis} />
            <AnalysisCard title="⭐ Review Analysis" text={result.reviewAnalysis} />
            <AnalysisCard title="🏪 Retailer Check" text={result.retailerAnalysis} />
          </div>

          <div className="mt-5 rounded-2xl bg-white/5 p-5">
            <h4 className="font-bold">🧠 How DBI reached this decision</h4>
            <ScoreBar label="Product quality" score={result.scoreBreakdown.productQuality} />
            <ScoreBar label="Price value" score={result.scoreBreakdown.priceValue} />
            <ScoreBar label="Review quality" score={result.scoreBreakdown.reviewQuality} />
            <ScoreBar label="Retailer trust" score={result.scoreBreakdown.retailerTrust} />
            <ScoreBar label="Warranty & support" score={result.scoreBreakdown.warrantySupport} />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ResultList title="What looks good" items={result.positives} positive />
            <ResultList title="Things to consider" items={result.warnings} />
          </div>

          {result.betterAlternatives.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
                Better alternatives
              </p>
              <div className="grid gap-4 lg:grid-cols-3">
                {result.betterAlternatives.map((alternative) => (
                  <AlternativeCard
                    key={`${alternative.name}-${alternative.price}`}
                    alternative={alternative}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-[#2ee866]/30 bg-[#2ee866]/10 p-5">
            <p className="text-sm font-black text-[#68f18e]">💚 If it was our money...</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {stripMoneyPrefix(result.ifItWasOurMoney)}
            </p>
          </div>

          <button
            type="button"
            onClick={resetChecker}
            className="mt-5 w-full rounded-xl border border-white/15 px-5 py-3 text-sm font-bold transition hover:border-[#2ee866]/60 hover:text-[#2ee866]"
          >
            Check another deal
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-xs leading-5 text-white/40">
        Deal Beater may earn a commission from selected retailer links at no
        extra cost to you. Recommendations are based on value, suitability and
        available information.
      </p>
    </div>
  );
}

function ModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
        active
          ? "bg-[#20c95a] text-white"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function AnalysisCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#52ee7e]">{title}</p>
      <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
    </div>
  );
}

function ResultList({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <h4 className="font-bold">{title}</h4>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-5 text-white/70">
              <span className={positive ? "text-[#2ee866]" : "text-amber-300"}>
                {positive ? "✓" : "!"}
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-white/50">Nothing significant found.</p>
      )}
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const [width, setWidth] = useState(0);
  const safeScore = Math.max(0, Math.min(100, score));

  useEffect(() => {
    const timer = window.setTimeout(() => setWidth(safeScore), 150);
    return () => window.clearTimeout(timer);
  }, [safeScore]);

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-white/60">{Math.round(safeScore)}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-[#2ee866] transition-all duration-700"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function AlternativeCard({ alternative }: { alternative: BetterAlternative }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-black">{alternative.name}</h4>
        <span className="shrink-0 rounded-full bg-[#2ee866]/10 px-3 py-1 text-xs font-bold text-[#68f18e]">
          {alternative.verdict}
        </span>
      </div>
      <p className="mt-2 text-lg font-black">{alternative.price}</p>
      <p className="mt-1 text-sm text-amber-200">★ {alternative.rating.toFixed(1)}</p>
      <p className="mt-3 text-sm leading-6 text-white/70">{alternative.reason}</p>
      {alternative.saving && (
        <p className="mt-3 text-sm font-bold text-[#68f18e]">{alternative.saving}</p>
      )}
    </div>
  );
}

function getVerdictStyles(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return {
        text: "text-[#68f18e]",
        border: "border-[#2ee866]/40",
        background: "bg-[#2ee866]/10",
        scoreBorder: "border-[#2ee866]",
        shadow: "shadow-[#2ee866]/20",
      };
    case "GOOD DEAL":
      return {
        text: "text-lime-300",
        border: "border-lime-300/40",
        background: "bg-lime-300/10",
        scoreBorder: "border-lime-300",
        shadow: "shadow-lime-300/20",
      };
    case "CONSIDER":
      return {
        text: "text-amber-300",
        border: "border-amber-300/40",
        background: "bg-amber-300/10",
        scoreBorder: "border-amber-300",
        shadow: "shadow-amber-300/20",
      };
    case "WAIT":
      return {
        text: "text-orange-300",
        border: "border-orange-300/40",
        background: "bg-orange-300/10",
        scoreBorder: "border-orange-300",
        shadow: "shadow-orange-300/20",
      };
    case "AVOID":
      return {
        text: "text-red-300",
        border: "border-red-300/40",
        background: "bg-red-300/10",
        scoreBorder: "border-red-300",
        shadow: "shadow-red-300/20",
      };
  }
}

function stripMoneyPrefix(text: string) {
  return text.replace(/^💚\s*If it was our money\.\.\.\s*/i, "").trim();
}