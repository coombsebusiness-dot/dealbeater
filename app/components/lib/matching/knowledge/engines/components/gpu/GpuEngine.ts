import type {
  LaptopGpuSpec,
} from "@/app/components/lib/matching/knowledge/registry/types";

import type {
  GpuIntelligence,
  GpuIntelligenceScores,
} from "./GpuIntelligence";

import {
  clampGpuScore,
  createGpuCapability,
} from "./GpuScoring";

export class GpuEngine {
  analyse(
    gpu:
      | LaptopGpuSpec
      | undefined,
  ): GpuIntelligence {
    if (!gpu) {
      return this.createUnknownResult();
    }

    const scores =
      this.calculateScores(gpu);

    const confidence =
      this.calculateConfidence(gpu);

    return {
      gpuId: gpu.id,
      gpuName: gpu.name,

      confidence,

      scores,

      capabilities: {
        casualGaming:
          createGpuCapability(
            this.calculateCasualGamingScore(
              scores,
            ),
            "Evaluates graphics capability for lighter and less demanding games.",
          ),

        competitiveGaming:
          createGpuCapability(
            this.calculateCompetitiveGamingScore(
              scores,
            ),
            "Evaluates graphics capability for competitive games and higher frame-rate workloads.",
          ),

        aaaGaming:
          createGpuCapability(
            this.calculateAaaGamingScore(
              gpu,
              scores,
            ),
            "Evaluates graphics capability for demanding modern AAA games.",
          ),

        photoEditing:
          createGpuCapability(
            this.calculatePhotoEditingScore(
              scores,
            ),
            "Evaluates graphics acceleration for photo editing and image-processing applications.",
          ),

        videoEditing:
          createGpuCapability(
            scores.videoEditing,
            "Evaluates graphics acceleration and hardware encoding support for video-editing workflows.",
          ),

        graphicDesign:
          createGpuCapability(
            scores.creativeWork,
            "Evaluates graphics performance for design, visual effects and creative applications.",
          ),

        aiWorkloads:
          createGpuCapability(
            scores.aiWorkloads,
            this.createAiExplanation(gpu),
          ),
      },

      strengths:
        this.createStrengths(
          gpu,
          scores,
        ),

      weaknesses:
        this.createWeaknesses(
          gpu,
          scores,
        ),

      warnings:
        this.createWarnings(gpu),
    };
  }

  private calculateScores(
    gpu: LaptopGpuSpec,
  ): GpuIntelligenceScores {
    const gaming =
      this.scoreGaming(gpu);

    const creativeWork =
      this.scoreCreativeWork(gpu);

    const videoEditing =
      this.scoreVideoEditing(gpu);

    const aiWorkloads =
      this.scoreAiWorkloads(gpu);

    const rayTracing =
      this.scoreRayTracing(gpu);

    const efficiency =
      this.scoreEfficiency(gpu);

    const longevity =
      this.scoreLongevity(
        gpu,
        gaming,
        creativeWork,
      );

    const overall =
      clampGpuScore(
        gaming * 0.25 +
          creativeWork * 0.25 +
          videoEditing * 0.15 +
          aiWorkloads * 0.1 +
          rayTracing * 0.1 +
          efficiency * 0.05 +
          longevity * 0.1,
      );

    return {
      overall,
      gaming,
      creativeWork,
      videoEditing,
      aiWorkloads,
      rayTracing,
      efficiency,
      longevity,
    };
  }

  private scoreGaming(
    gpu: LaptopGpuSpec,
  ): number {
    if (
      gpu.benchmarkScore !== undefined
    ) {
      if (gpu.benchmarkScore >= 30000) {
        return 98;
      }

      if (gpu.benchmarkScore >= 22000) {
        return 92;
      }

      if (gpu.benchmarkScore >= 15000) {
        return 84;
      }

      if (gpu.benchmarkScore >= 9000) {
        return 74;
      }

      if (gpu.benchmarkScore >= 5000) {
        return 62;
      }

      return 45;
    }

    switch (
      gpu.gamingCapability
    ) {
      case "EXCELLENT":
        return 95;

      case "STRONG":
        return 85;

      case "GOOD":
        return 72;

      case "LIMITED":
        return 50;

      case "POOR":
        return 30;

      default:
        return gpu.type === "DEDICATED"
          ? 65
          : 50;
    }
  }

  private scoreCreativeWork(
    gpu: LaptopGpuSpec,
  ): number {
    switch (
      gpu.creativeCapability
    ) {
      case "EXCELLENT":
        return 95;

      case "STRONG":
        return 86;

      case "GOOD":
        return 74;

      case "LIMITED":
        return 52;

      case "POOR":
        return 30;

      default:
        return gpu.type === "DEDICATED"
          ? 70
          : 58;
    }
  }

  private scoreVideoEditing(
    gpu: LaptopGpuSpec,
  ): number {
    let score =
      this.scoreCreativeWork(gpu);

    if (
      gpu.supportsHardwareEncoding
    ) {
      score += 10;
    }

    if ((gpu.vramGB ?? 0) >= 8) {
      score += 8;
    } else if ((gpu.vramGB ?? 0) >= 4) {
      score += 4;
    }

    return clampGpuScore(score);
  }

  private scoreAiWorkloads(
    gpu: LaptopGpuSpec,
  ): number {
    let score = 40;

    if (gpu.type === "DEDICATED") {
      score += 20;
    }

    if ((gpu.vramGB ?? 0) >= 12) {
      score += 25;
    } else if ((gpu.vramGB ?? 0) >= 8) {
      score += 18;
    } else if ((gpu.vramGB ?? 0) >= 4) {
      score += 8;
    }

    if (
      gpu.supportsRayTracing
    ) {
      score += 5;
    }

    return clampGpuScore(score);
  }

  private scoreRayTracing(
    gpu: LaptopGpuSpec,
  ): number {
    if (gpu.supportsRayTracing) {
      return gpu.type === "DEDICATED"
        ? 85
        : 65;
    }

    return 25;
  }

  private scoreEfficiency(
    gpu: LaptopGpuSpec,
  ): number {
    if (gpu.type === "INTEGRATED") {
      return 88;
    }

    if (gpu.type === "DEDICATED") {
      return 62;
    }

    return 55;
  }

  private scoreLongevity(
    gpu: LaptopGpuSpec,
    gamingScore: number,
    creativeScore: number,
  ): number {
    let score =
      gamingScore * 0.5 +
      creativeScore * 0.5;

    if ((gpu.vramGB ?? 0) >= 8) {
      score += 8;
    } else if ((gpu.vramGB ?? 0) < 4) {
      score -= 8;
    }

    return clampGpuScore(score);
  }

  private calculateCasualGamingScore(
    scores: GpuIntelligenceScores,
  ): number {
    return clampGpuScore(
      scores.gaming * 0.7 +
        scores.efficiency * 0.3,
    );
  }

  private calculateCompetitiveGamingScore(
    scores: GpuIntelligenceScores,
  ): number {
    return clampGpuScore(
      scores.gaming * 0.85 +
        scores.efficiency * 0.15,
    );
  }

  private calculateAaaGamingScore(
    gpu: LaptopGpuSpec,
    scores: GpuIntelligenceScores,
  ): number {
    let score =
      scores.gaming * 0.8 +
      scores.rayTracing * 0.1 +
      scores.longevity * 0.1;

    if ((gpu.vramGB ?? 0) < 4) {
      score -= 10;
    }

    return clampGpuScore(score);
  }

  private calculatePhotoEditingScore(
    scores: GpuIntelligenceScores,
  ): number {
    return clampGpuScore(
      scores.creativeWork * 0.8 +
        scores.efficiency * 0.2,
    );
  }

  private calculateConfidence(
    gpu: LaptopGpuSpec,
  ): number {
    const fields = [
      gpu.type,
      gpu.vramGB,
      gpu.benchmarkScore,
      gpu.supportsRayTracing,
      gpu.supportsHardwareEncoding,
      gpu.gamingCapability,
      gpu.creativeCapability,
    ];

    const knownFields =
      fields.filter(
        (value) =>
          value !== undefined &&
          value !== null,
      ).length;

    return clampGpuScore(
      45 +
        knownFields * 7,
    );
  }

  private createStrengths(
    gpu: LaptopGpuSpec,
    scores: GpuIntelligenceScores,
  ): string[] {
    const strengths: string[] = [];

    if (scores.gaming >= 80) {
      strengths.push(
        "Strong graphics performance for gaming",
      );
    }

    if (scores.creativeWork >= 80) {
      strengths.push(
        "Strong acceleration for creative applications",
      );
    }

    if (
      gpu.supportsHardwareEncoding
    ) {
      strengths.push(
        "Hardware video encoding support",
      );
    }

    if ((gpu.vramGB ?? 0) >= 8) {
      strengths.push(
        "Generous graphics memory capacity",
      );
    }

    if (
      gpu.supportsRayTracing
    ) {
      strengths.push(
        "Supports hardware-accelerated ray tracing",
      );
    }

    return strengths;
  }

  private createWeaknesses(
    gpu: LaptopGpuSpec,
    scores: GpuIntelligenceScores,
  ): string[] {
    const weaknesses: string[] = [];

    if (scores.gaming < 55) {
      weaknesses.push(
        "Limited performance for demanding modern games",
      );
    }

    if ((gpu.vramGB ?? 0) > 0 &&
        (gpu.vramGB ?? 0) < 4) {
      weaknesses.push(
        "Limited graphics memory may restrict demanding workloads",
      );
    }

    if (
      scores.aiWorkloads < 50
    ) {
      weaknesses.push(
        "Limited suitability for local GPU-accelerated AI workloads",
      );
    }

    return weaknesses;
  }

  private createWarnings(
    gpu: LaptopGpuSpec,
  ): string[] {
    const warnings: string[] = [];

    if (
      gpu.benchmarkScore ===
      undefined
    ) {
      warnings.push(
        "GPU benchmark data is unavailable, so some scores are estimated.",
      );
    }

    if (
      gpu.vramGB === undefined
    ) {
      warnings.push(
        "Graphics memory information is unavailable.",
      );
    }

    return warnings;
  }

  private createAiExplanation(
    gpu: LaptopGpuSpec,
  ): string {
    if (
      gpu.vramGB !== undefined
    ) {
      return `AI workload suitability is estimated partly from the available ${gpu.vramGB}GB of graphics memory.`;
    }

    return "AI workload suitability is estimated from the available graphics information.";
  }

  private createUnknownResult():
    GpuIntelligence {
    return {
      gpuName: "Unknown GPU",

      confidence: 0,

      scores: {
        overall: 0,
        gaming: 0,
        creativeWork: 0,
        videoEditing: 0,
        aiWorkloads: 0,
        rayTracing: 0,
        efficiency: 0,
        longevity: 0,
      },

      capabilities: {
        casualGaming:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        competitiveGaming:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        aaaGaming:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        photoEditing:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        videoEditing:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        graphicDesign:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),

        aiWorkloads:
          createGpuCapability(
            0,
            "GPU information is unavailable.",
          ),
      },

      strengths: [],
      weaknesses: [],

      warnings: [
        "Canonical GPU data is unavailable.",
      ],
    };
  }
}