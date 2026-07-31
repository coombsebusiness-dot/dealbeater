import type {
  LaptopProcessorSpec,
} from "../../../registry/types";

import type {
  CpuIntelligence,
  CpuIntelligenceScores,
} from "./CpuIntelligence";

import {
  clampCpuScore,
  createCpuCapability,
} from "./CpuScoring";

export class CpuEngine {
  analyse(
    processor:
      | LaptopProcessorSpec
      | undefined,
  ): CpuIntelligence {
    if (!processor) {
      return this.createUnknownResult();
    }

    const scores =
      this.calculateScores(processor);

    const confidence =
      this.calculateConfidence(processor);

    const strengths =
      this.createStrengths(
        processor,
        scores,
      );

    const weaknesses =
      this.createWeaknesses(
        processor,
        scores,
      );

    const warnings =
      this.createWarnings(processor);

    return {
      processorId: processor.id,
      processorName: processor.name,

      confidence,

      scores,

      capabilities: {
        everydayUse:
          createCpuCapability(
            this.calculateEverydayScore(
              scores,
            ),
            this.createEverydayExplanation(
              scores,
            ),
          ),

        officeWork:
          createCpuCapability(
            this.calculateOfficeScore(
              scores,
            ),
            "Evaluates responsiveness, efficiency and multitasking for office productivity.",
          ),

        photoEditing:
          createCpuCapability(
            scores.creativeWork,
            "Evaluates processor performance for photo editing, image processing and creative applications.",
          ),

        videoEditing:
          createCpuCapability(
            this.calculateVideoEditingScore(
              processor,
              scores,
            ),
            "Evaluates multi-core performance and hardware media capabilities for video workflows.",
          ),

        softwareDevelopment:
          createCpuCapability(
            scores.softwareDevelopment,
            "Evaluates compilation, development tools, virtualisation and multitasking performance.",
          ),

        multitasking:
          createCpuCapability(
            this.calculateMultitaskingScore(
              processor,
              scores,
            ),
            "Evaluates available cores, threads and multi-core performance for running several workloads.",
          ),

        aiWorkloads:
          createCpuCapability(
            scores.aiWorkloads,
            this.createAiExplanation(
              processor,
            ),
          ),
      },

      strengths,
      weaknesses,
      warnings,
    };
  }

  private calculateScores(
    processor: LaptopProcessorSpec,
  ): CpuIntelligenceScores {
    const singleCore =
      this.scoreSingleCore(processor);

    const multiCore =
      this.scoreMultiCore(processor);

    const efficiency =
      this.scoreEfficiency(processor);

    const creativeWork =
      clampCpuScore(
        singleCore * 0.35 +
          multiCore * 0.5 +
          efficiency * 0.15,
      );

    const softwareDevelopment =
      clampCpuScore(
        singleCore * 0.4 +
          multiCore * 0.5 +
          efficiency * 0.1,
      );

    const aiWorkloads =
      this.scoreAiWorkloads(processor);

    const longevity =
      this.scoreLongevity(
        processor,
        singleCore,
        multiCore,
      );

    const overall =
      clampCpuScore(
        singleCore * 0.25 +
          multiCore * 0.3 +
          efficiency * 0.15 +
          creativeWork * 0.1 +
          softwareDevelopment * 0.1 +
          longevity * 0.1,
      );

    return {
      overall,
      singleCore,
      multiCore,
      efficiency,
      creativeWork,
      softwareDevelopment,
      aiWorkloads,
      longevity,
    };
  }

  private scoreSingleCore(
    processor: LaptopProcessorSpec,
  ): number {
    const benchmark =
      processor.benchmarkScore;

    if (benchmark !== undefined) {
      if (benchmark >= 25000) return 98;
      if (benchmark >= 18000) return 92;
      if (benchmark >= 12000) return 85;
      if (benchmark >= 8000) return 75;
      if (benchmark >= 5000) return 65;

      return 50;
    }

    const boostClock =
      processor.boostClockGHz ??
      processor.baseClockGHz;

    if (boostClock !== undefined) {
      if (boostClock >= 5) return 95;
      if (boostClock >= 4.5) return 88;
      if (boostClock >= 4) return 82;
      if (boostClock >= 3.5) return 74;
      if (boostClock >= 3) return 66;
    }

    return this.scoreFromGeneration(
      processor,
    );
  }

  private scoreMultiCore(
    processor: LaptopProcessorSpec,
  ): number {
    const cores =
      processor.cores ??
      this.calculateKnownCores(
        processor,
      );

    const threads =
      processor.threads ??
      cores ??
      0;

    if (cores === undefined) {
      return this.scoreFromGeneration(
        processor,
      );
    }

    let score = 35;

    score += Math.min(
      cores * 5,
      45,
    );

    score += Math.min(
      Math.max(threads - cores, 0) * 1.5,
      12,
    );

    if (
      processor.performanceCores !==
      undefined
    ) {
      score += Math.min(
        processor.performanceCores * 1.5,
        10,
      );
    }

    return clampCpuScore(score);
  }

  private scoreEfficiency(
    processor: LaptopProcessorSpec,
  ): number {
    const architecture =
      processor.architecture
        ?.toLowerCase() ?? "";

    let score = 60;

    if (
      architecture.includes(
        "apple silicon",
      )
    ) {
      score += 28;
    }

    if (
      processor.efficiencyCores !==
        undefined &&
      processor.efficiencyCores > 0
    ) {
      score += Math.min(
        processor.efficiencyCores * 3,
        12,
      );
    }

    return clampCpuScore(score);
  }

  private scoreAiWorkloads(
    processor: LaptopProcessorSpec,
  ): number {
    const tops =
      processor.neuralEngineTops;

    if (tops !== undefined) {
      if (tops >= 50) return 98;
      if (tops >= 40) return 92;
      if (tops >= 25) return 84;
      if (tops >= 15) return 75;
      if (tops >= 10) return 65;

      return 50;
    }

    switch (
      processor.aiCapability
    ) {
      case "EXCELLENT":
        return 95;

      case "STRONG":
        return 85;

      case "GOOD":
        return 72;

      case "BASIC":
        return 50;

      case "NONE":
        return 25;

      default:
        return 40;
    }
  }

  private scoreLongevity(
    processor: LaptopProcessorSpec,
    singleCore: number,
    multiCore: number,
  ): number {
    const performanceScore =
      singleCore * 0.45 +
      multiCore * 0.55;

    let ageAdjustment = 0;

    if (
      processor.releaseYear !==
      undefined
    ) {
      const currentYear =
        new Date().getFullYear();

      const age =
        currentYear -
        processor.releaseYear;

      ageAdjustment =
        Math.max(0, age - 2) * -3;
    }

    return clampCpuScore(
      performanceScore +
        ageAdjustment,
    );
  }

  private calculateEverydayScore(
    scores: CpuIntelligenceScores,
  ): number {
    return clampCpuScore(
      scores.singleCore * 0.55 +
        scores.efficiency * 0.3 +
        scores.multiCore * 0.15,
    );
  }

  private calculateOfficeScore(
    scores: CpuIntelligenceScores,
  ): number {
    return clampCpuScore(
      scores.singleCore * 0.45 +
        scores.efficiency * 0.25 +
        scores.multiCore * 0.3,
    );
  }

  private calculateVideoEditingScore(
    processor: LaptopProcessorSpec,
    scores: CpuIntelligenceScores,
  ): number {
    let score =
      scores.multiCore * 0.55 +
      scores.singleCore * 0.2 +
      scores.efficiency * 0.15;

    if (
      processor.architecture
        ?.toLowerCase()
        .includes("apple silicon")
    ) {
      score += 8;
    }

    return clampCpuScore(score);
  }

  private calculateMultitaskingScore(
    processor: LaptopProcessorSpec,
    scores: CpuIntelligenceScores,
  ): number {
    const cores =
      processor.cores ??
      this.calculateKnownCores(
        processor,
      ) ??
      0;

    return clampCpuScore(
      scores.multiCore * 0.75 +
        Math.min(cores * 2, 20),
    );
  }

  private calculateKnownCores(
    processor: LaptopProcessorSpec,
  ): number | undefined {
    const performanceCores =
      processor.performanceCores;

    const efficiencyCores =
      processor.efficiencyCores;

    if (
      performanceCores ===
        undefined &&
      efficiencyCores === undefined
    ) {
      return undefined;
    }

    return (
      (performanceCores ?? 0) +
      (efficiencyCores ?? 0)
    );
  }

  private scoreFromGeneration(
    processor: LaptopProcessorSpec,
  ): number {
    if (
      processor.releaseYear ===
      undefined
    ) {
      return 60;
    }

    const currentYear =
      new Date().getFullYear();

    const age =
      currentYear -
      processor.releaseYear;

    if (age <= 1) return 90;
    if (age <= 3) return 82;
    if (age <= 5) return 72;
    if (age <= 7) return 62;

    return 50;
  }

  private calculateConfidence(
    processor: LaptopProcessorSpec,
  ): number {
    const fields = [
      processor.cores,
      processor.threads,
      processor.baseClockGHz,
      processor.boostClockGHz,
      processor.benchmarkScore,
      processor.neuralEngineTops,
      processor.releaseYear,
      processor.architecture,
    ];

    const knownFields =
      fields.filter(
        (value) =>
          value !== undefined &&
          value !== null,
      ).length;

    return clampCpuScore(
      45 +
        knownFields * 7,
    );
  }

  private createStrengths(
    processor: LaptopProcessorSpec,
    scores: CpuIntelligenceScores,
  ): string[] {
    const strengths: string[] = [];

    if (scores.singleCore >= 80) {
      strengths.push(
        "Strong single-core responsiveness",
      );
    }

    if (scores.multiCore >= 80) {
      strengths.push(
        "Strong multi-core performance",
      );
    }

    if (scores.efficiency >= 80) {
      strengths.push(
        "Excellent performance efficiency",
      );
    }

    if (scores.creativeWork >= 80) {
      strengths.push(
        "Well suited to creative workloads",
      );
    }

    if (scores.aiWorkloads >= 75) {
      strengths.push(
        "Dedicated AI acceleration capability",
      );
    }

    if (
      processor.performanceCores !==
        undefined &&
      processor.efficiencyCores !==
        undefined
    ) {
      strengths.push(
        "Hybrid core design balances performance and efficiency",
      );
    }

    return strengths;
  }

  private createWeaknesses(
    processor: LaptopProcessorSpec,
    scores: CpuIntelligenceScores,
  ): string[] {
    const weaknesses: string[] = [];

    if (scores.multiCore < 55) {
      weaknesses.push(
        "Limited performance for demanding multi-core workloads",
      );
    }

    if (scores.aiWorkloads < 50) {
      weaknesses.push(
        "Limited dedicated AI acceleration",
      );
    }

    if (
      processor.releaseYear !==
      undefined &&
      new Date().getFullYear() -
        processor.releaseYear >=
        6
    ) {
      weaknesses.push(
        "Older processor generation may reduce long-term suitability",
      );
    }

    return weaknesses;
  }

  private createWarnings(
    processor: LaptopProcessorSpec,
  ): string[] {
    const warnings: string[] = [];

    if (
      processor.benchmarkScore ===
      undefined
    ) {
      warnings.push(
        "Benchmark data is unavailable, so some performance scores are estimated.",
      );
    }

    if (
      processor.cores === undefined &&
      this.calculateKnownCores(
        processor,
      ) === undefined
    ) {
      warnings.push(
        "Core-count data is unavailable.",
      );
    }

    return warnings;
  }

  private createEverydayExplanation(
    scores: CpuIntelligenceScores,
  ): string {
    if (
      scores.singleCore >= 80 &&
      scores.efficiency >= 80
    ) {
      return "Strong responsiveness and efficiency make this processor excellent for everyday computing.";
    }

    return "Evaluates responsiveness and efficiency for browsing, applications and everyday tasks.";
  }

  private createAiExplanation(
    processor: LaptopProcessorSpec,
  ): string {
    if (
      processor.neuralEngineTops !==
      undefined
    ) {
      return `Includes AI acceleration rated at approximately ${processor.neuralEngineTops} TOPS.`;
    }

    return "AI capability is estimated from the available processor information.";
  }

  private createUnknownResult():
    CpuIntelligence {
    return {
      processorName:
        "Unknown processor",

      confidence: 0,

      scores: {
        overall: 0,
        singleCore: 0,
        multiCore: 0,
        efficiency: 0,
        creativeWork: 0,
        softwareDevelopment: 0,
        aiWorkloads: 0,
        longevity: 0,
      },

      capabilities: {
        everydayUse:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        officeWork:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        photoEditing:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        videoEditing:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        softwareDevelopment:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        multitasking:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),

        aiWorkloads:
          createCpuCapability(
            0,
            "Processor information is unavailable.",
          ),
      },

      strengths: [],
      weaknesses: [],
      warnings: [
        "Canonical processor data is unavailable.",
      ],
    };
  }
}