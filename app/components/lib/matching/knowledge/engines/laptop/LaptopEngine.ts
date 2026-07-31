import type { ProductEngine } from "../base/ProductEngine";
import { DisplayEngine } from "../components/display/DisplayEngine";
import type { LaptopKnowledge } from "@/app/components/lib/matching/knowledge/registry/types";
import type { LaptopIntelligence } from "./LaptopCapabilities";
import { GpuEngine } from "../components/gpu/GpuEngine";
import { CpuEngine } from "../components/cpu/CpuEngine";
import { BatteryEngine } from "../components/battery/BatteryEngine";
import { StorageEngine } from "../components/storage/StorageEngine";
import { MemoryEngine } from "../components/memory/MemoryEngine";
import {
  calculateLaptopOverallScore,
  createLaptopCapability,
} from "./LaptopScoring";

export class LaptopEngine
  implements ProductEngine<LaptopKnowledge, LaptopIntelligence>
{
  private readonly cpuEngine = new CpuEngine();
  private readonly gpuEngine = new GpuEngine();
  private readonly displayEngine = new DisplayEngine();
  private readonly batteryEngine =
    new BatteryEngine();
    private readonly memoryEngine =
  new MemoryEngine();
  private readonly storageEngine =
  new StorageEngine();

  analyse(
  laptop: LaptopKnowledge,
): LaptopIntelligence {
  const cpuIntelligence =
    this.cpuEngine.analyse(
      laptop.canonical?.processor,
    );

  const gpuIntelligence =
    this.gpuEngine.analyse(
      laptop.canonical?.gpu,
    );

    const displayIntelligence =
  this.displayEngine.analyse(
    laptop.canonical?.display,
  );

  const batteryIntelligence =
    this.batteryEngine.analyse(
        laptop.canonical?.battery,
    );

    const memoryIntelligence =
  this.memoryEngine.analyse(
    laptop.canonical?.memory,
  );

  const storageIntelligence =
  this.storageEngine.analyse(
    laptop.canonical?.storage,
  );

    /*
     * Older registry products may not have canonical processor data yet.
     * These fallbacks prevent those products receiving a score of zero.
     */
    const performanceScore =
      cpuIntelligence.confidence > 0
        ? cpuIntelligence.scores.overall
        : 70;

    const longevityScore =
  cpuIntelligence.confidence > 0 &&
  memoryIntelligence.confidence > 0
    ? Math.round(
        (
          cpuIntelligence.scores
            .longevity +
          memoryIntelligence.scores
            .longevity
        ) / 2,
      )
    : cpuIntelligence.confidence > 0
      ? cpuIntelligence.scores
          .longevity
      : memoryIntelligence.confidence > 0
        ? memoryIntelligence.scores
            .longevity
        : 70;

    const repairabilityScore =
      laptop.canonical?.repairability
        ?.repairabilityScore ?? 50;

    const upgradeabilityScore =
  memoryIntelligence.confidence > 0
    ? Math.round(
        (
          memoryIntelligence.scores
            .upgradeability +
          (laptop.canonical
            ?.repairability
            ?.upgradeabilityScore ?? 40)
        ) / 2,
      )
    : laptop.canonical
        ?.repairability
        ?.upgradeabilityScore ?? 40;

    const scores = {
      performance: performanceScore,

      battery:
    batteryIntelligence.confidence > 0
        ? batteryIntelligence.scores.overall
        : this.scoreBattery(laptop),

      display:
  displayIntelligence.confidence > 0
    ? displayIntelligence.scores.overall
    : this.scoreDisplay(laptop),

      portability:
        this.scorePortability(laptop),

      buildQuality: 90,

      connectivity:
        this.scoreConnectivity(laptop),

      repairability:
        repairabilityScore,

      upgradeability:
        upgradeabilityScore,

      longevity:
        longevityScore,

      value: 80,
    };

 const strengths = [
  ...(laptop.strengths ?? []),
  ...cpuIntelligence.strengths,
  ...gpuIntelligence.strengths,
  ...displayIntelligence.strengths,
  ...batteryIntelligence.strengths,
  ...memoryIntelligence.strengths,
  ...storageIntelligence.strengths,
];

const weaknesses = [
  ...(laptop.limitations ?? []),
  ...cpuIntelligence.weaknesses,
  ...gpuIntelligence.weaknesses,
  ...displayIntelligence.weaknesses,
  ...batteryIntelligence.weaknesses,
  ...memoryIntelligence.weaknesses,
  ...storageIntelligence.weaknesses,
];

const warnings = [
  ...cpuIntelligence.warnings,
  ...gpuIntelligence.warnings,
  ...displayIntelligence.warnings,
  ...batteryIntelligence.warnings,
  ...memoryIntelligence.warnings,
  ...storageIntelligence.warnings,
];

    return {
      productId: laptop.id,
      productName: laptop.name,
 cpu: cpuIntelligence,
gpu: gpuIntelligence,
display: displayIntelligence,
battery: batteryIntelligence,
memory: memoryIntelligence,
storage: storageIntelligence,

      overallScore:
        calculateLaptopOverallScore(
          scores,
        ),

      confidence:
  this.combineConfidence(
    cpuIntelligence.confidence,
    memoryIntelligence.confidence,
  ),

      scores,

      

      capabilities: {
       everydayUse:
  createLaptopCapability(
    this.combineScores(
      cpuIntelligence.capabilities
        .everydayUse.score,
      memoryIntelligence.capabilities
        .everydayUse.score,
      0.65,
      0.35,
      90,
    ),
    this.combineConfidence(
      cpuIntelligence.confidence,
      memoryIntelligence.confidence,
    ),
    "Everyday-use capability combines processor responsiveness with sufficient memory for common applications and browser use.",
  ),

        officeWork:
  createLaptopCapability(
    this.combineScores(
      cpuIntelligence.capabilities
        .officeWork.score,
      memoryIntelligence.capabilities
        .officeWork.score,
      0.55,
      0.45,
      88,
    ),
    this.combineConfidence(
      cpuIntelligence.confidence,
      memoryIntelligence.confidence,
    ),
    "Office-work capability combines processor responsiveness with memory capacity for documents, spreadsheets, calls and multitasking.",
  ),

        webBrowsing:
  createLaptopCapability(
    this.combineScores(
      cpuIntelligence.capabilities
        .everydayUse.score,
      memoryIntelligence.capabilities
        .everydayUse.score,
      0.7,
      0.3,
      90,
    ),
    this.combineConfidence(
      cpuIntelligence.confidence,
      memoryIntelligence.confidence,
    ),
    "Web-browsing capability combines processor responsiveness with sufficient memory for multiple tabs, web apps and background tasks.",
  ),

       multitasking:
  createLaptopCapability(
    this.combineScores(
      cpuIntelligence.capabilities
        .multitasking.score,
      memoryIntelligence.capabilities
        .multitasking.score,
      0.45,
      0.55,
      75,
    ),
    this.combineConfidence(
      cpuIntelligence.confidence,
      memoryIntelligence.confidence,
    ),
    "Multitasking capability combines processor performance with available memory capacity, bandwidth and efficiency.",
  ),

       photoEditing:
  createLaptopCapability(
    this.combineFiveScores(
      cpuIntelligence.capabilities
        .photoEditing.score,
      gpuIntelligence.capabilities
        .photoEditing.score,
      displayIntelligence.capabilities
        .photoEditing.score,
      memoryIntelligence.capabilities
        .photoEditing.score,
      storageIntelligence.capabilities
        .photoEditing.score,
      0.3,
      0.15,
      0.25,
      0.15,
      0.15,
      75,
    ),
    this.combineFiveConfidences(
      cpuIntelligence.confidence,
      gpuIntelligence.confidence,
      displayIntelligence.confidence,
      memoryIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "Photo-editing capability combines processor performance, graphics acceleration, display colour accuracy, available memory and storage performance.",
  ),

     videoEditing:
  createLaptopCapability(
    this.combineFiveScores(
      cpuIntelligence.capabilities
        .videoEditing.score,
      gpuIntelligence.capabilities
        .videoEditing.score,
      displayIntelligence.capabilities
        .videoEditing.score,
      memoryIntelligence.capabilities
        .videoEditing.score,
      storageIntelligence.capabilities
        .videoEditing.score,
      0.25,
      0.3,
      0.15,
      0.15,
      0.15,
      70,
    ),
    this.combineFiveConfidences(
      cpuIntelligence.confidence,
      gpuIntelligence.confidence,
      displayIntelligence.confidence,
      memoryIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "Video-editing capability combines processor performance, graphics acceleration, display quality, available memory and storage speed.",
  ),
     graphicDesign:
  createLaptopCapability(
    this.combineFourScores(
      cpuIntelligence.scores
        .creativeWork,
      gpuIntelligence.capabilities
        .graphicDesign.score,
      displayIntelligence.capabilities
        .graphicDesign.score,
      memoryIntelligence.capabilities
        .photoEditing.score,
      0.2,
      0.2,
      0.4,
      0.2,
      75,
    ),
    this.combineFourConfidences(
      cpuIntelligence.confidence,
      gpuIntelligence.confidence,
      displayIntelligence.confidence,
      memoryIntelligence.confidence,
    ),
    "Graphic-design capability combines processor performance, graphics acceleration, display colour accuracy and available memory.",
  ),

        musicProduction:
          createLaptopCapability(
            this.getCpuScore(
              cpuIntelligence.scores
                .creativeWork,
              75,
            ),
            this.getCpuCapabilityConfidence(
              cpuIntelligence.confidence,
            ),
            "Evaluates processor performance for audio production, effects and virtual instruments.",
          ),

      softwareDevelopment:
  createLaptopCapability(
    this.combineThreeScores(
      cpuIntelligence.capabilities
        .softwareDevelopment.score,
      memoryIntelligence.capabilities
        .softwareDevelopment.score,
      storageIntelligence.capabilities
        .softwareDevelopment.score,
      0.45,
      0.35,
      0.2,
      75,
    ),
    this.combineThreeConfidences(
      cpuIntelligence.confidence,
      memoryIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "Software-development capability combines processor performance, available memory and storage responsiveness for IDEs, builds, local services and development tools.",
  ),

 aiWorkloads:
  createLaptopCapability(
    this.combineFourScores(
      cpuIntelligence.capabilities
        .aiWorkloads.score,
      gpuIntelligence.capabilities
        .aiWorkloads.score,
      memoryIntelligence.capabilities
        .aiWorkloads.score,
      storageIntelligence.capabilities
        .aiWorkloads.score,
      0.25,
      0.4,
      0.2,
      0.15,
      40,
    ),
    this.combineFourConfidences(
      cpuIntelligence.confidence,
      gpuIntelligence.confidence,
      memoryIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "AI workload capability combines processor acceleration, graphics compute, available memory and storage performance for models and datasets.",
  ),

        /*
         * These remain estimates until the GPU Engine is connected.
         */
       casualGaming:
  createLaptopCapability(
    this.combineThreeScores(
      gpuIntelligence.capabilities
        .casualGaming.score,
      displayIntelligence.capabilities
        .casualGaming.score,
      storageIntelligence.capabilities
        .gaming.score,
      0.65,
      0.2,
      0.15,
      40,
    ),
    this.combineThreeConfidences(
      gpuIntelligence.confidence,
      displayIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "Casual gaming capability combines graphics performance, display quality and storage speed for loading and asset streaming.",
  ),
    competitiveGaming:
  createLaptopCapability(
    this.combineThreeScores(
      gpuIntelligence.capabilities
        .competitiveGaming.score,
      displayIntelligence.capabilities
        .competitiveGaming.score,
      storageIntelligence.capabilities
        .gaming.score,
      0.65,
      0.25,
      0.10,
      35,
    ),
    this.combineThreeConfidences(
      gpuIntelligence.confidence,
      displayIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "Competitive gaming capability combines graphics performance, display responsiveness and storage performance.",
  ),
    aaaGaming:
  createLaptopCapability(
    this.combineScores(
      gpuIntelligence.capabilities
        .aaaGaming.score,
      storageIntelligence.capabilities
        .gaming.score,
      0.85,
      0.15,
      25,
    ),
    this.combineConfidence(
      gpuIntelligence.confidence,
      storageIntelligence.confidence,
    ),
    "AAA gaming capability combines graphics performance with storage speed for large modern games.",
  ),
        portability:
          createLaptopCapability(
            scores.portability,
            laptop.canonical?.physical
              ?.weightKg !== undefined
              ? 90
              : 65,
            "Portability is evaluated from known weight, screen size and form factor information.",
          ),

        batteryLife:
    createLaptopCapability(
        batteryIntelligence.capabilities
            .everydayUse.score,
        batteryIntelligence.confidence,
        "Battery capability is evaluated using capacity, web endurance, video endurance and charging performance.",
    ),

       displayQuality:
  createLaptopCapability(
    this.getDisplayCapabilityScore(
      displayIntelligence.scores.overall,
      scores.display,
    ),
    this.getDisplayCapabilityConfidence(
      displayIntelligence.confidence,
    ),
    "Display quality is evaluated from resolution, panel type, brightness, colour, HDR and refresh rate.",
  ),

        connectivity:
          createLaptopCapability(
            scores.connectivity,
            laptop.canonical
              ?.connectivity
              ? 90
              : 65,
            "Connectivity is evaluated from available ports and supported connection standards.",
          ),

        upgradeability:
          createLaptopCapability(
            scores.upgradeability,
            laptop.canonical
              ?.repairability
              ?.upgradeabilityScore !==
            undefined
              ? 90
              : 55,
            "Upgradeability is evaluated from memory, storage and component replacement options.",
          ),

        repairability:
          createLaptopCapability(
            scores.repairability,
            laptop.canonical
              ?.repairability
              ?.repairabilityScore !==
            undefined
              ? 90
              : 55,
            "Repairability is evaluated from component replacement and parts-availability information.",
          ),

        longevity:
          createLaptopCapability(
            scores.longevity,
            this.getCpuCapabilityConfidence(
              cpuIntelligence.confidence,
            ),
            "Expected longevity is evaluated from processor performance, age and available hardware information.",
          ),
      },

      strengths:
        this.removeDuplicates(
          strengths,
        ),

      weaknesses:
        this.removeDuplicates(
          weaknesses,
        ),

      warnings:
        this.removeDuplicates(
          warnings,
        ),

      bestFor:
        laptop.bestFor ?? [],

      avoidIf:
        laptop.limitations ?? [],
    };
  }

  private getCpuScore(
    score: number,
    fallback: number,
  ): number {
    return score > 0
      ? score
      : fallback;
  }

  private getCpuCapabilityScore(
    score: number,
    fallback: number,
  ): number {
    return this.getCpuScore(
      score,
      fallback,
    );
  }

  private getCpuCapabilityConfidence(
    confidence: number,
  ): number {
    return confidence > 0
      ? confidence
      : 50;
  }

  private estimateCasualGamingScore(
    performanceScore: number,
  ): number {
    return Math.min(
      85,
      Math.round(
        performanceScore * 0.85,
      ),
    );
  }

  private estimateCompetitiveGamingScore(
    performanceScore: number,
  ): number {
    return Math.min(
      70,
      Math.round(
        performanceScore * 0.7,
      ),
    );
  }

  private estimateAaaGamingScore(
    performanceScore: number,
  ): number {
    return Math.min(
      55,
      Math.round(
        performanceScore * 0.55,
      ),
    );
  }

  private removeDuplicates(
    values: string[],
  ): string[] {
    return [...new Set(values)];
  }

  private scoreBattery(
    laptop: LaptopKnowledge,
  ): number {
    const hours =
      laptop.canonical?.battery
        ?.webBrowsingHours ??
      laptop.batteryWebHours ??
      8;

    if (hours >= 18) return 98;
    if (hours >= 15) return 90;
    if (hours >= 12) return 80;
    if (hours >= 8) return 70;

    return 60;
  }

  private scoreDisplay(
    laptop: LaptopKnowledge,
  ): number {
    const canonicalDisplay =
      laptop.canonical?.display;

    if (canonicalDisplay) {
      let score = 50;

      if (
        canonicalDisplay.panelType ===
        "MINI_LED"
      ) {
        score += 25;
      } else if (
        canonicalDisplay.panelType ===
        "OLED"
      ) {
        score += 23;
      } else if (
        canonicalDisplay.panelType ===
        "IPS"
      ) {
        score += 15;
      }

      if (
        (canonicalDisplay
          .brightnessNits ?? 0) >= 1000
      ) {
        score += 10;
      } else if (
        (canonicalDisplay
          .brightnessNits ?? 0) >= 500
      ) {
        score += 7;
      }

      if (
        (canonicalDisplay
          .refreshRateHz ?? 0) >= 120
      ) {
        score += 8;
      } else if (
        (canonicalDisplay
          .refreshRateHz ?? 0) >= 90
      ) {
        score += 5;
      }

      if (canonicalDisplay.hdr) {
        score += 5;
      }

      return Math.min(
        score,
        100,
      );
    }

    const display =
      laptop.display?.toLowerCase() ??
      "";

    if (
      display.includes("mini led")
    ) {
      return 98;
    }

    if (display.includes("oled")) {
      return 96;
    }

    if (
      display.includes("retina")
    ) {
      return 90;
    }

    if (display.includes("ips")) {
      return 82;
    }

    return 70;
  }

  private scorePortability(
    laptop: LaptopKnowledge,
  ): number {
    const weight =
      laptop.canonical?.physical
        ?.weightKg;

    if (weight !== undefined) {
      if (weight <= 1.2) return 98;
      if (weight <= 1.5) return 90;
      if (weight <= 1.8) return 80;
      if (weight <= 2.2) return 68;

      return 55;
    }

    if (
      laptop.formFactor === "Air"
    ) {
      return 98;
    }

    if (
      laptop.screenSizeInches &&
      laptop.screenSizeInches <= 14
    ) {
      return 90;
    }

    if (
      laptop.screenSizeInches &&
      laptop.screenSizeInches <= 16
    ) {
      return 75;
    }

    return 65;
  }

  private scoreConnectivity(
    laptop: LaptopKnowledge,
  ): number {
    const connectivity =
      laptop.canonical?.connectivity;

    if (connectivity) {
      let score = 35;

      score += Math.min(
        connectivity.ports.length *
          6,
        30,
      );

      if (
        connectivity.hasThunderbolt
      ) {
        score += 12;
      }

      if (connectivity.hasHdmi) {
        score += 8;
      }

      if (
        connectivity.hasSdCardReader
      ) {
        score += 8;
      }

      if (
        connectivity.hasEthernet
      ) {
        score += 5;
      }

      return Math.min(
        score,
        100,
      );
    }

    return Math.min(
      100,
      (laptop.ports?.length ?? 0) *
        15 +
        40,
    );
  }
  private getGpuCapabilityScore(
  score: number,
  fallback: number,
): number {
  return score > 0
    ? score
    : fallback;
}

private getGpuCapabilityConfidence(
  confidence: number,
): number {
  return confidence > 0
    ? confidence
    : 45;
}
private combineFourConfidences(
  firstConfidence: number,
  secondConfidence: number,
  thirdConfidence: number,
  fourthConfidence: number,
): number {
  const knownConfidences = [
    firstConfidence,
    secondConfidence,
    thirdConfidence,
    fourthConfidence,
  ].filter(
    (confidence) =>
      confidence > 0,
  );

  if (
    knownConfidences.length === 0
  ) {
    return 45;
  }

  return Math.round(
    knownConfidences.reduce(
      (sum, confidence) =>
        sum + confidence,
      0,
    ) /
      knownConfidences.length,
  );
}

private combineScores(
  firstScore: number,
  secondScore: number,
  firstWeight: number,
  secondWeight: number,
  fallback: number,
): number {
  const hasFirst =
    firstScore > 0;

  const hasSecond =
    secondScore > 0;

  if (!hasFirst && !hasSecond) {
    return fallback;
  }

  if (!hasFirst) {
    return secondScore;
  }

  if (!hasSecond) {
    return firstScore;
  }

  return Math.round(
    firstScore * firstWeight +
      secondScore * secondWeight,
  );
}

private combineConfidence(
  firstConfidence: number,
  secondConfidence: number,
): number {
  if (
    firstConfidence <= 0 &&
    secondConfidence <= 0
  ) {
    return 45;
  }

  if (firstConfidence <= 0) {
    return secondConfidence;
  }

  if (secondConfidence <= 0) {
    return firstConfidence;
  }

  return Math.round(
    (firstConfidence +
      secondConfidence) /
      2,
  );
}
private getDisplayCapabilityScore(
  score: number,
  fallback: number,
): number {
  return score > 0
    ? score
    : fallback;
}

private getDisplayCapabilityConfidence(
  confidence: number,
): number {
  return confidence > 0
    ? confidence
    : 50;
}

private combineThreeScores(
  firstScore: number,
  secondScore: number,
  thirdScore: number,
  firstWeight: number,
  secondWeight: number,
  thirdWeight: number,
  fallback: number,
): number {
  const values = [
    {
      score: firstScore,
      weight: firstWeight,
    },
    {
      score: secondScore,
      weight: secondWeight,
    },
    {
      score: thirdScore,
      weight: thirdWeight,
    },
  ].filter(
    ({ score }) => score > 0,
  );

  if (values.length === 0) {
    return fallback;
  }

  const totalWeight =
    values.reduce(
      (sum, value) =>
        sum + value.weight,
      0,
    );

  return Math.round(
    values.reduce(
      (sum, value) =>
        sum +
        value.score *
          value.weight,
      0,
    ) / totalWeight,
  );
}
private combineFiveConfidences(
  firstConfidence: number,
  secondConfidence: number,
  thirdConfidence: number,
  fourthConfidence: number,
  fifthConfidence: number,
): number {
  const knownConfidences = [
    firstConfidence,
    secondConfidence,
    thirdConfidence,
    fourthConfidence,
    fifthConfidence,
  ].filter(
    (confidence) =>
      confidence > 0,
  );

  if (
    knownConfidences.length === 0
  ) {
    return 45;
  }

  return Math.round(
    knownConfidences.reduce(
      (sum, confidence) =>
        sum + confidence,
      0,
    ) /
      knownConfidences.length,
  );
}
private combineFourScores(
  firstScore: number,
  secondScore: number,
  thirdScore: number,
  fourthScore: number,
  firstWeight: number,
  secondWeight: number,
  thirdWeight: number,
  fourthWeight: number,
  fallback: number,
): number {
  const values = [
    {
      score: firstScore,
      weight: firstWeight,
    },
    {
      score: secondScore,
      weight: secondWeight,
    },
    {
      score: thirdScore,
      weight: thirdWeight,
    },
    {
      score: fourthScore,
      weight: fourthWeight,
    },
  ].filter(
    ({ score }) => score > 0,
  );

  if (values.length === 0) {
    return fallback;
  }

  const totalWeight =
    values.reduce(
      (sum, value) =>
        sum + value.weight,
      0,
    );

  return Math.round(
    values.reduce(
      (sum, value) =>
        sum +
        value.score *
          value.weight,
      0,
    ) / totalWeight,
  );
}
private combineFiveScores(
  firstScore: number,
  secondScore: number,
  thirdScore: number,
  fourthScore: number,
  fifthScore: number,
  firstWeight: number,
  secondWeight: number,
  thirdWeight: number,
  fourthWeight: number,
  fifthWeight: number,
  fallback: number,
): number {
  const values = [
    {
      score: firstScore,
      weight: firstWeight,
    },
    {
      score: secondScore,
      weight: secondWeight,
    },
    {
      score: thirdScore,
      weight: thirdWeight,
    },
    {
      score: fourthScore,
      weight: fourthWeight,
    },
    {
      score: fifthScore,
      weight: fifthWeight,
    },
  ].filter(
    ({ score }) => score > 0,
  );

  if (values.length === 0) {
    return fallback;
  }

  const totalWeight =
    values.reduce(
      (sum, value) =>
        sum + value.weight,
      0,
    );

  return Math.round(
    values.reduce(
      (sum, value) =>
        sum +
        value.score *
          value.weight,
      0,
    ) / totalWeight,
  );
}

private combineThreeConfidences(
  firstConfidence: number,
  secondConfidence: number,
  thirdConfidence: number,
): number {
  const knownConfidences = [
    firstConfidence,
    secondConfidence,
    thirdConfidence,
  ].filter(
    (confidence) =>
      confidence > 0,
  );

  if (
    knownConfidences.length === 0
  ) {
    return 45;
  }

  return Math.round(
    knownConfidences.reduce(
      (sum, confidence) =>
        sum + confidence,
      0,
    ) /
      knownConfidences.length,
  );
}
}