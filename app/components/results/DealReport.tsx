"use client";

import { motion } from "framer-motion";
import { DealExplanation } from "../lib/explanations/explanationEngine";
import DealVerdictCard from "./DealVerdictCard";
import MoneyRecommendationCard from "./MoneyRecommendationCard";
import ReasonList from "./ReasonList";
import type { AlternativeData } from "../lib/ai/alternativeAgent";
import BetterAlternativesCard from "./BetterAlternativesCard";

interface Props {
  explanation: DealExplanation;
  score: number;
  confidence: number;
  alternatives: AlternativeData[];
  ctaUrl?: string;
  ctaLabel?: string;
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function DealReport({
  explanation,
  score,
  confidence,
  alternatives,
  ctaUrl,
  ctaLabel,
}: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8 py-10"
    >
      <motion.div variants={cardVariants}>
  <DealVerdictCard
  explanation={explanation}
  score={score}
  confidence={confidence}
  ctaUrl={ctaUrl}
  ctaLabel={ctaLabel}
/>
      </motion.div>

      <motion.div variants={cardVariants}>
        <MoneyRecommendationCard
          recommendation={explanation.ifItWasOurMoney}
        />
      </motion.div>
      <motion.div variants={cardVariants}>
  <BetterAlternativesCard
    alternatives={alternatives}
  />
</motion.div>

      <motion.div variants={cardVariants}>
        <ReasonList
          title="Why we recommend it"
          items={explanation.positives}
          type="positive"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <ReasonList
          title="Things to check"
          items={explanation.warnings}
          type="warning"
        />
      </motion.div>
    </motion.div>
  );
}