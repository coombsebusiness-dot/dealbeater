"use client";
import DealHeroCard from "./DealHeroCard";

import { useRef } from "react";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import BlinlxScoreCard from "@/app/components/BlinlxScoreCard";
import AnalysisTimeline from "@/app/components/AnalysisTimeline";
import VerdictBanner from "@/app/components/VerdictBanner";
import AskBlinlxCard from "@/app/components/AskBlinlxCard";
import PriceIntelligenceCard from "./PriceIntelligenceCard";
import RetailerTrustCard from "./RetailerTrustCard";
import { calculateRetailerTrust } from "@/app/components/lib/retailer/trust";
import ReviewIntelligenceCard from "./ReviewIntelligenceCard";
import { buildReviewIntelligence } from "@/app/components/lib/reviews/intelligence";
import ProductIntelligenceCard from "./ProductIntelligenceCard";
import { buildProductIntelligence } from "@/app/components/lib/products/intelligence";
import { createProductFingerprintV2 } from "@/app/components/lib/products/fingerprint";
import ProductOverviewCard from "./ProductOverviewCard";
import {
  
  buildProductOverview,
} from "@/app/components/lib/products/intelligence";

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

   brand?: string | null;
  category?: string | null;
  family?: string | null;
  model?: string | null;
  
  productImage?: string;
  retailerName: string;
  retailerUrl?: string;
  price: string;
  saving?: string;
  checkedAt?: string;
  ctaLabel?: string;
  currentPrice?: number | null;
fairPrice?: number | null;
lowestPrice?: number | null;

priceStatus?:
  | "EXCELLENT"
  | "GOOD"
  | "FAIR"
  | "HIGH"
  | "UNKNOWN";

priceRecommendation?: string;
priceConfidence?: number;

  topOffers: {
    retailer: string;
    title: string;
    price: number;
    url?: string;
    image?: string;
  }[];

  productOverview?: {
  shortDescription: string;
  bestFor: string[];
  strengths: string[];
  considerations: string[];
  confidence?: number;
};

  marketPosition:
    | "BEST_PRICE"
    | "BELOW_AVERAGE"
    | "AVERAGE"
    | "ABOVE_AVERAGE";

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

export default function ProductAnalyzer() {
 
  const [input, setInput] = useState("");
 
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DealAIReport | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const resultsRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
  if (isAnalysing && resultsRef.current && window.innerWidth < 768) {
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [isAnalysing]);

  const resetChecker = () => {
    setInput("");
    setError("");
    setResult(null);
    setAnimatedScore(0);
  };

  

 const analyseDeal = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError("");
  setResult(null);

 if (!input.trim()) {
  setError("Tell Blinlx what you'd like help buying.");
  return;
}

  try {
    setIsAnalysing(true);

   const trimmedInput = input.trim();

const isProductLink = /^https?:\/\//i.test(trimmedInput);

const response = await fetch("/api/analyse", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: isProductLink ? "link" : "describe",
    userInput: trimmedInput,
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

  
  const trust = result
  ? calculateRetailerTrust(result.retailerName)
  : null;

  const reviewIntelligence = result
  ? buildReviewIntelligence({
      analysis: result.reviewAnalysis,
      reviewQuality: result.scoreBreakdown.reviewQuality,
      positives: result.positives,
      warnings: result.warnings,
      confidence: result.confidence,
    })
  : null;

const productIntelligence = result
  ? buildProductIntelligence({
      productName: result.productName,
      productQuality: result.scoreBreakdown.productQuality,
      summary: result.summary,
      positives: result.positives,
      warnings: result.warnings,
      confidence: result.confidence,
    })
  : null;

  const productOverview = result?.productOverview
  ? buildProductOverview({
      shortDescription: result.productOverview.shortDescription,
      bestFor: result.productOverview.bestFor,
      strengths: result.productOverview.strengths,
      considerations: result.productOverview.considerations,
      confidence: result.productOverview.confidence,
    })
  : null;

  const canBuy =
  result?.verdict === "BUY" ||
  result?.verdict === "GOOD DEAL";

const primaryActionLabel =
  result?.verdict === "AVOID"
    ? "View Better Alternatives"
    : result?.verdict === "WAIT"
      ? "Check Again Later"
      : result?.verdict === "CONSIDER"
        ? "Compare Alternatives"
        : "Buy Now";

const verdictLabel =
  result?.verdict === "BUY"
    ? "BUY NOW"
    : result?.verdict === "GOOD DEAL"
      ? "GOOD DEAL"
      : result?.verdict;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#2f3d4c] p-5 shadow-2xl shadow-black/25 sm:p-8 lg:p-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
          Powered by Blinlx AI
        </p>
        <h2 className="mt-2 text-2xl font-bold">
         What can Blinlx help you buy today?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/65">
          Paste any product link or simply ask a shopping question.
Blinlx AI will analyse it and help you make a smarter buying decision.
        </p>
      </div>

    

      <form onSubmit={analyseDeal} className="mt-5">
       <div>
  <label
    htmlFor="shopping-request"
    className="mb-3 block text-sm font-semibold text-white/80"
  >
    What are you shopping for today?
  </label>

  <textarea
    id="shopping-request"
    value={input}
    onChange={(event) => setInput(event.target.value)}
    rows={5}
    placeholder="Paste any product URL...

or ask...

Is this MacBook worth £849?"
    className="w-full resize-none rounded-3xl border border-white/15 bg-[#1d2a36] px-6 py-6 text-lg text-white outline-none transition placeholder:text-white/35 focus:border-[#2ee866] focus:ring-4 focus:ring-[#2ee866]/10"
  />
</div>

     

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
  {isAnalysing ? "Blinlx is analysing..." : "Ask Blinlx"}
</button>
</form>

<div ref={resultsRef} className="scroll-mt-6">
  {isAnalysing && <AnalysisTimeline />}

  {result && !isAnalysing && (
    <div className="mt-8 space-y-6">
      <DealHeroCard
        productName={result.productName}
        productImage={result.productImage}
        retailerName={result.retailerName}
        retailerUrl={result.retailerUrl}
        ctaLabel={result.ctaLabel}
        price={result.price}
        saving={result.saving}
        checkedAt={result.checkedAt}
        marketPosition={result.marketPosition}
        score={animatedScore}
        confidence={result.confidence}
        verdict={result.verdict}
        headline={result.headline}
        summary={result.summary}
        recommendation={result.recommendation}
        topOffers={result.topOffers ?? []}
      />

     {productOverview && (
  <ProductOverviewCard
    productName={result.productName}
    description={productOverview.shortDescription}
    bestFor={productOverview.bestFor}
    strengths={productOverview.strengths}
    considerations={productOverview.considerations}
    confidence={productOverview.confidence}
  />
)}

      {trust && (
        <RetailerTrustCard
          retailer={result.retailerName}
          trustScore={trust.trustScore}
          officialRetailer={trust.officialRetailer}
          buyerProtection={trust.buyerProtection}
          secureCheckout={trust.secureCheckout}
          returnDays={trust.returnDays}
          deliveryEstimate={trust.deliveryEstimate}
          recommendation={trust.recommendation}
        />
      )}

      {/* {reviewIntelligence && (
        <ReviewIntelligenceCard
          score={reviewIntelligence.score}
          sentiment={reviewIntelligence.sentiment}
          headline={reviewIntelligence.headline}
          summary={reviewIntelligence.summary}
          strengths={reviewIntelligence.strengths}
          concerns={reviewIntelligence.concerns}
          confidence={reviewIntelligence.confidence}
        />
      )} */}

      {/* {productIntelligence && (
        <ProductIntelligenceCard
          productName={result.productName}
          score={productIntelligence.score}
          confidence={productIntelligence.confidence}
          suitability={productIntelligence.suitability}
          headline={productIntelligence.headline}
          summary={productIntelligence.summary}
         bestFor={productIntelligence.strengths}
          limitations={productIntelligence.limitations}
        />
      )} */}

      <PriceIntelligenceCard
        currentPrice={result.currentPrice}
        fairPrice={result.fairPrice}
        lowestPrice={result.lowestPrice}
        status={result.priceStatus ?? "UNKNOWN"}
        recommendation={
          result.priceRecommendation ??
          "Blinlx is still gathering enough pricing data to make a reliable recommendation."
        }
        confidence={result.priceConfidence ?? 0}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <AnalysisCard
          title="💷 Price Analysis"
          text={result.priceAnalysis}
        />

        <AnalysisCard
          title="⭐ Review Analysis"
          text={result.reviewAnalysis}
        />

        <AnalysisCard
          title="🏪 Retailer Analysis"
          text={result.retailerAnalysis}
        />
      </div>

      <div className="rounded-2xl bg-white/5 p-5">
        <h4 className="font-bold">
          🧠 How Blinlx reached this recommendation
        </h4>

        <ScoreBar
          label="Product quality"
          score={result.scoreBreakdown.productQuality}
        />

        <ScoreBar
          label="Price value"
          score={result.scoreBreakdown.priceValue}
        />

        <ScoreBar
          label="Review quality"
          score={result.scoreBreakdown.reviewQuality}
        />

        <ScoreBar
          label="Retailer trust"
          score={result.scoreBreakdown.retailerTrust}
        />

        <ScoreBar
          label="Warranty & support"
          score={result.scoreBreakdown.warrantySupport}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultList
          title="What looks good"
          items={result.positives}
          positive
        />

        <ResultList
          title="Things to consider"
          items={result.warnings}
        />
      </div>

      {result.betterAlternatives.length > 0 && (
        <div>
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

      <div className="rounded-2xl border border-[#2ee866]/30 bg-[#2ee866]/10 p-5">
        <p className="text-sm font-black text-[#68f18e]">
          💚 If it was our money...
        </p>

        <p className="mt-3 text-sm leading-6 text-white/80">
          {stripMoneyPrefix(result.ifItWasOurMoney)}
        </p>
      </div>

      <AskBlinlxCard productName={result.productName} />

      <button
        type="button"
        onClick={resetChecker}
        className="w-full rounded-xl border border-white/15 px-5 py-3 text-sm font-bold transition hover:border-[#2ee866]/60 hover:text-[#2ee866]"
      >
        Check another deal
      </button>
    </div>
  )}
</div>

      <p className="mt-5 text-center text-xs leading-5 text-white/40">
        Blinlx may earn a commission from selected retailer links at no
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