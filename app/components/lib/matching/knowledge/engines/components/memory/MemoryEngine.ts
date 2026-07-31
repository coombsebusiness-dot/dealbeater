import type {
  LaptopMemorySpec,
} from "../../../registry/types";

import type {
  MemoryIntelligence,
} from "./MemoryIntelligence";

import {
  createMemoryCapability,
} from "./MemoryScoring";

export class MemoryEngine {

analyse(
  memory?: LaptopMemorySpec,
): MemoryIntelligence {

  if (!memory) {
    return this.createUnknownResult();
  }

  const capacity =
    this.scoreCapacity(memory);

  const bandwidth =
    this.scoreBandwidth(memory);

  const efficiency =
    this.scoreEfficiency(memory);

  const multitasking =
    this.scoreMultitasking(memory);

  const creative =
    this.scoreCreative(memory);

  const software =
    this.scoreSoftware(memory);

  const ai =
    this.scoreAI(memory);

  const longevity =
    this.scoreLongevity(memory);

  const upgradeability =
    this.scoreUpgradeability(memory);

  const overall =
    Math.round(
      (
        capacity +
        bandwidth +
        efficiency +
        multitasking +
        creative +
        software +
        ai +
        longevity +
        upgradeability
      ) / 9,
    );

  return {
  memoryName:
    this.createMemoryName(memory),

  confidence: 95,

  scores: {
    overall,
    capacity,
    bandwidth,
    efficiency,
    multitasking,
    creativeWork: creative,
    softwareDevelopment: software,
    aiWorkloads: ai,
    longevity,
    upgradeability,
  },

  capabilities: {
    everydayUse:
      createMemoryCapability(
        capacity,
        "General everyday computing and common applications.",
      ),

    officeWork:
      createMemoryCapability(
        multitasking,
        "Office productivity and running several applications together.",
      ),

    multitasking:
      createMemoryCapability(
        multitasking,
        "Running multiple applications and browser tabs simultaneously.",
      ),

    photoEditing:
      createMemoryCapability(
        creative,
        "Photo editing and creative image workflows.",
      ),

    videoEditing:
      createMemoryCapability(
        creative,
        "Video editing and memory-intensive creative workloads.",
      ),

    softwareDevelopment:
      createMemoryCapability(
        software,
        "Software development, local tools and development environments.",
      ),

    aiWorkloads:
      createMemoryCapability(
        ai,
        "AI and machine-learning workloads.",
      ),
  },

  strengths:
    this.getStrengths(memory),

  weaknesses:
    this.getWeaknesses(memory),

  warnings:
    this.getWarnings(memory),
};
}
private scoreBandwidth(
  memory: LaptopMemorySpec,
): number {
    

  const bandwidth =
    memory.bandwidthGBs ?? 0;

  if (bandwidth >= 300) return 100;

  if (bandwidth >= 200) return 95;

  if (bandwidth >= 120) return 85;

  if (bandwidth >= 80) return 70;

  if (bandwidth > 0) return 55;

  return 40;
}
private scoreEfficiency(
  memory: LaptopMemorySpec,
): number {

  switch (
    memory.type?.toUpperCase()
  ) {

    case "UNIFIED":
      return 100;

    case "LPDDR5X":
      return 95;

    case "LPDDR5":
      return 92;

    case "DDR5":
      return 88;

    case "LPDDR4X":
      return 82;

    case "DDR4":
      return 72;

    case "DDR3":
      return 55;

    default:
      return 65;

  }
  
}
private scoreMultitasking(
  memory: LaptopMemorySpec,
): number {

  const maxMemory =
    Math.max(...memory.optionsGB);

  if (maxMemory >= 128) return 100;

  if (maxMemory >= 64) return 98;

  if (maxMemory >= 32) return 94;

  if (maxMemory >= 24) return 88;

  if (maxMemory >= 16) return 80;

  if (maxMemory >= 8) return 60;

  return 35;
}
private scoreCreative(
  memory: LaptopMemorySpec,
): number {

  let score =
    this.scoreCapacity(memory);

  score =
    Math.round(
      (
        score +
        this.scoreBandwidth(memory) +
        this.scoreEfficiency(memory)
      ) / 3,
    );

  return score;
}
private scoreSoftware(
  memory: LaptopMemorySpec,
): number {

  return Math.round(
    (
      this.scoreCapacity(memory) +
      this.scoreMultitasking(memory) +
      this.scoreEfficiency(memory)
    ) / 3,
  );
}
private scoreAI(
  memory: LaptopMemorySpec,
): number {

  const capacity =
    this.scoreCapacity(memory);

  const bandwidth =
    this.scoreBandwidth(memory);

  const efficiency =
    this.scoreEfficiency(memory);

  let architectureBonus = 0;

  if (
    memory.type?.toUpperCase() ===
    "UNIFIED"
  ) {
    architectureBonus = 8;
  }

  if (memory.sharedWithGpu) {
    architectureBonus += 4;
  }

  return Math.min(
    100,
    Math.round(
      (
        capacity +
        bandwidth +
        efficiency
      ) / 3 +
      architectureBonus,
    ),
  );
}
private scoreLongevity(
  memory: LaptopMemorySpec,
): number {

  const maxMemory =
    Math.max(...memory.optionsGB);

  let score = 0;

  if (maxMemory >= 64) {
    score = 100;
  } else if (maxMemory >= 32) {
    score = 92;
  } else if (maxMemory >= 24) {
    score = 85;
  } else if (maxMemory >= 16) {
    score = 75;
  } else if (maxMemory >= 8) {
    score = 50;
  } else {
    score = 25;
  }

  if (
    memory.type?.toUpperCase() ===
      "DDR5" ||
    memory.type?.toUpperCase() ===
      "LPDDR5" ||
    memory.type?.toUpperCase() ===
      "LPDDR5X" ||
    memory.type?.toUpperCase() ===
      "UNIFIED"
  ) {
    score += 5;
  }

  if (
    memory.soldered &&
    !memory.upgradeable &&
    maxMemory <= 8
  ) {
    score -= 15;
  }

  return Math.max(
    0,
    Math.min(100, score),
  );
}private scoreUpgradeability(
  memory: LaptopMemorySpec,
): number {

  if (memory.upgradeable) {

    if (
      memory.maximumSupportedGB &&
      memory.maximumSupportedGB >= 64
    ) {
      return 100;
    }

    if (
      memory.maximumSupportedGB &&
      memory.maximumSupportedGB >= 32
    ) {
      return 90;
    }

    return 80;
  }

  if (memory.soldered) {
    return 20;
  }

  return 50;
}
private scoreCapacity(
  memory: LaptopMemorySpec,
): number {

  const maxMemory =
    Math.max(...memory.optionsGB);

  if (maxMemory >= 64) return 100;

  if (maxMemory >= 32) return 90;

  if (maxMemory >= 16) return 75;

  if (maxMemory >= 8) return 55;

  return 30;
}
private getStrengths(
  memory: LaptopMemorySpec,
): string[] {

  const strengths: string[] = [];

  const maxMemory =
    Math.max(...memory.optionsGB);

  if (maxMemory >= 32) {
    strengths.push(
      "High memory capacity supports demanding multitasking and professional workloads.",
    );
  }

  if (
    memory.bandwidthGBs &&
    memory.bandwidthGBs >= 120
  ) {
    strengths.push(
      "High memory bandwidth benefits creative and data-intensive workloads.",
    );
  }

  if (
    memory.type?.toUpperCase() ===
    "UNIFIED"
  ) {
    strengths.push(
      "Unified memory allows the processor and graphics hardware to access the same memory pool efficiently.",
    );
  }

  if (memory.sharedWithGpu) {
    strengths.push(
      "Shared graphics memory can improve efficiency in compatible creative and AI workloads.",
    );
  }

  if (memory.upgradeable) {
    strengths.push(
      "Memory can be upgraded after purchase.",
    );
  }

  return strengths;
}
private getWeaknesses(
  memory: LaptopMemorySpec,
): string[] {

  const weaknesses: string[] = [];

  const maxMemory =
    Math.max(...memory.optionsGB);

  if (maxMemory <= 8) {
    weaknesses.push(
      "Limited memory capacity may restrict demanding multitasking and professional workloads.",
    );
  }

  if (
    memory.bandwidthGBs !== undefined &&
    memory.bandwidthGBs < 80
  ) {
    weaknesses.push(
      "Lower memory bandwidth may limit performance in demanding creative and data-heavy workloads.",
    );
  }

  if (
    memory.soldered &&
    !memory.upgradeable
  ) {
    weaknesses.push(
      "The memory is soldered and cannot be upgraded after purchase.",
    );
  }

  if (
    memory.maximumSupportedGB !== undefined &&
    memory.maximumSupportedGB <= 16
  ) {
    weaknesses.push(
      "The maximum supported memory may limit long-term suitability for heavier workloads.",
    );
  }

  return weaknesses;
}
private getWarnings(
  memory: LaptopMemorySpec,
): string[] {

  const warnings: string[] = [];

  const minimumMemory =
    Math.min(...memory.optionsGB);

  if (
    memory.soldered &&
    !memory.upgradeable
  ) {
    warnings.push(
      "Choose the required memory capacity at purchase because it cannot be upgraded later.",
    );
  }

  if (minimumMemory <= 8) {
    warnings.push(
      "The lowest memory configuration may become restrictive for demanding workloads and long-term use.",
    );
  }

  if (
    memory.sharedWithGpu &&
    minimumMemory <= 8
  ) {
    warnings.push(
      "Graphics workloads also use the shared memory pool, reducing the amount available to applications.",
    );
  }

  if (
    memory.maximumSupportedGB !== undefined &&
    minimumMemory <
      memory.maximumSupportedGB
  ) {
    warnings.push(
      "Different configurations may offer significantly different long-term performance.",
    );
  }

  return warnings;
}
private createMemoryName(
  memory: LaptopMemorySpec,
): string {

  const options =
    memory.optionsGB.length > 0
      ? memory.optionsGB.join("/")
      : "Unknown capacity";

  const type =
    memory.type ?? "Memory";

  return `${options}GB ${type}`;
}
  private createUnknownResult(): MemoryIntelligence {

    return {

      memoryName: "Unknown",

      confidence: 0,

      scores: {

        overall: 0,

        capacity: 0,

        bandwidth: 0,

        efficiency: 0,

        multitasking: 0,

        creativeWork: 0,

        softwareDevelopment: 0,

        aiWorkloads: 0,

        longevity: 0,

        upgradeability: 0,

      },

      capabilities: {

        everydayUse:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        officeWork:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        multitasking:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        photoEditing:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        videoEditing:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        softwareDevelopment:
          createMemoryCapability(
            0,
            "Unknown",
          ),

        aiWorkloads:
          createMemoryCapability(
            0,
            "Unknown",
          ),

      },

      strengths: [],

      weaknesses: [],

      warnings: [],

    };
  }
}