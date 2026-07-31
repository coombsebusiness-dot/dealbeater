import type {
  LaptopStorageSpec,
} from "@/app/components/lib/matching/knowledge/registry/types";

import type {
  StorageIntelligence,
} from "./StorageIntelligence";

import {
  createStorageCapability,
} from "./StorageScoring";

export class StorageEngine {
  analyse(
  storage?: LaptopStorageSpec,
): StorageIntelligence {

  if (!storage) {
    return this.createUnknownResult();
  }

  const capacity =
  this.scoreCapacity(storage);

const performance =
  this.scorePerformance(
    storage,
  );

const responsiveness =
  this.scoreResponsiveness(
    storage,
  );

const creativeWork =
  this.scoreCreativeWork(
    storage,
  );

const softwareDevelopment =
  this.scoreSoftwareDevelopment(
    storage,
  );

  const gaming =
  this.scoreGaming(
    storage,
  );

  const aiWorkloads =
  this.scoreAIWorkloads(
    storage,
  );

  const longevity =
  this.scoreLongevity(
    storage,
  );

  const upgradeability =
  this.scoreUpgradeability(
    storage,
  );

  const overall =
  Math.round(
    (
      capacity +
      performance +
      responsiveness +
      creativeWork +
      softwareDevelopment +
      gaming +
      aiWorkloads +
      longevity +
      upgradeability
    ) / 9,
  );

 return {
  storageName:
    this.createStorageName(storage),

  confidence: 95,

  scores: {
    overall,
    capacity,
    performance,
    responsiveness,
    creativeWork,
    softwareDevelopment,
    gaming,
    aiWorkloads,
    longevity,
    upgradeability,
  },

  capabilities: {
    everydayUse:
      createStorageCapability(
        responsiveness,
        "Fast storage improves boot times and everyday responsiveness.",
      ),

    officeWork:
      createStorageCapability(
        responsiveness,
        "Storage performance supports office applications and multitasking.",
      ),

    photoEditing:
      createStorageCapability(
        creativeWork,
        "Storage performance affects loading, caching and saving large image files.",
      ),

    videoEditing:
      createStorageCapability(
        creativeWork,
        "High-speed storage benefits large video projects and media workflows.",
      ),

    softwareDevelopment:
      createStorageCapability(
        softwareDevelopment,
        "Fast storage improves builds, package installation and development workflows.",
      ),

    gaming:
      createStorageCapability(
        gaming,
        "Fast storage reduces game loading times and asset streaming delays.",
      ),

    aiWorkloads:
      createStorageCapability(
        aiWorkloads,
        "Storage performance supports loading models, datasets and AI projects.",
      ),
  },

  strengths:
    this.getStrengths(storage),

  weaknesses:
    this.getWeaknesses(storage),

  warnings:
    this.getWarnings(storage),
};
}
  private scoreCapacity(
  storage: LaptopStorageSpec,
): number {
    

  const maxCapacity =
    Math.max(
      ...storage.optionsGB,
    );

  if (maxCapacity >= 4000) return 100;
  if (maxCapacity >= 2000) return 95;
  if (maxCapacity >= 1000) return 88;
  if (maxCapacity >= 512) return 75;
  if (maxCapacity >= 256) return 60;
  if (maxCapacity >= 128) return 40;

  return 25;
}
private scorePerformance(
  storage: LaptopStorageSpec,
): number {

  const storageInterface = (
    storage as {
      interface?: string;
    }
  ).interface?.toUpperCase();

  switch (storageInterface) {
    case "PCIE_5":
    case "PCIE5":
    case "PCIE 5":
      return 100;

    case "PCIE_4":
    case "PCIE4":
    case "PCIE 4":
      return 95;

    case "PCIE_3":
    case "PCIE3":
    case "PCIE 3":
      return 85;

    case "NVME":
      return 82;

    case "SATA_SSD":
    case "SATA SSD":
    case "SATA":
      return 65;

    case "EMMC":
      return 35;

    case "HDD":
      return 15;

    default:
      return 55;
  }
}
private scoreResponsiveness(
  storage: LaptopStorageSpec,
): number {

  const performance =
    this.scorePerformance(storage);

    const responsiveness =
  this.scoreResponsiveness(
    storage,
  );
  const creativeWork =
  this.scoreCreativeWork(
    storage,
  );

  const maxCapacity =
    Math.max(
      ...storage.optionsGB,
    );

  let score = performance;

  if (maxCapacity >= 512) {
    score += 3;
  }

  if (maxCapacity >= 1000) {
    score += 2;
  }

  return Math.min(
    100,
    score,
  );
}
private scoreCreativeWork(
  storage: LaptopStorageSpec,
): number {

  const capacity =
    this.scoreCapacity(storage);

  const performance =
    this.scorePerformance(storage);

  const responsiveness =
    this.scoreResponsiveness(storage);

  return Math.round(
    (
      capacity * 0.35 +
      performance * 0.4 +
      responsiveness * 0.25
    ),
  );
}
private scoreSoftwareDevelopment(
  storage: LaptopStorageSpec,
): number {

  const performance =
    this.scorePerformance(storage);

  const responsiveness =
    this.scoreResponsiveness(storage);

  const capacity =
    this.scoreCapacity(storage);

  return Math.round(
    (
      performance * 0.45 +
      responsiveness * 0.35 +
      capacity * 0.20
    ),
  );
}
private scoreGaming(
  storage: LaptopStorageSpec,
): number {

  const capacity =
    this.scoreCapacity(storage);

  const performance =
    this.scorePerformance(storage);

  const responsiveness =
    this.scoreResponsiveness(storage);

  return Math.round(
    (
      capacity * 0.45 +
      performance * 0.3 +
      responsiveness * 0.25
    ),
  );
}
private scoreAIWorkloads(
  storage: LaptopStorageSpec,
): number {

  const capacity =
    this.scoreCapacity(storage);

  const performance =
    this.scorePerformance(storage);

  const responsiveness =
    this.scoreResponsiveness(storage);

  return Math.round(
    (
      capacity * 0.4 +
      performance * 0.35 +
      responsiveness * 0.25
    ),
  );
}
private scoreLongevity(
  storage: LaptopStorageSpec,
): number {

  const capacity =
    this.scoreCapacity(storage);

  const performance =
    this.scorePerformance(storage);

  let score =
    capacity * 0.55 +
    performance * 0.45;

  const maxCapacity =
    Math.max(
      ...storage.optionsGB,
    );

  if (maxCapacity <= 256) {
    score -= 12;
  }

  if (maxCapacity >= 1000) {
    score += 5;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(score),
    ),
  );
}
private scoreUpgradeability(
  storage: LaptopStorageSpec,
): number {

  const storageDetails =
    storage as {
      upgradeable?: boolean;
      maximumSupportedGB?: number;
      soldered?: boolean;
    };

  if (storageDetails.upgradeable) {
    if (
      storageDetails.maximumSupportedGB !==
        undefined &&
      storageDetails.maximumSupportedGB >= 4000
    ) {
      return 100;
    }

    if (
      storageDetails.maximumSupportedGB !==
        undefined &&
      storageDetails.maximumSupportedGB >= 2000
    ) {
      return 95;
    }

    return 85;
  }

  if (storageDetails.soldered) {
    return 20;
  }

  return 50;
}
private createStorageName(
  storage: LaptopStorageSpec,
): string {

  const capacities =
    storage.optionsGB.length > 0
      ? storage.optionsGB.join("/")
      : "Unknown capacity";

  const storageInterface = (
    storage as {
      interface?: string;
    }
  ).interface;

  return storageInterface
    ? `${capacities}GB ${storageInterface}`
    : `${capacities}GB storage`;
}
private getStrengths(
  storage: LaptopStorageSpec,
): string[] {

  const strengths: string[] = [];

  const maxCapacity =
    Math.max(...storage.optionsGB);

  if (maxCapacity >= 1000) {
    strengths.push(
      "Large storage capacity provides plenty of space for applications, media and projects.",
    );
  }

  if (this.scorePerformance(storage) >= 90) {
    strengths.push(
      "High-performance storage delivers fast boot times, application launches and file transfers.",
    );
  }

  if (this.scoreResponsiveness(storage) >= 90) {
    strengths.push(
      "Excellent storage responsiveness keeps the system feeling fast during everyday use.",
    );
  }

  const storageInterface = (
    storage as {
      interface?: string;
    }
  ).interface?.toUpperCase();

  if (
    storageInterface?.includes("PCIE") ||
    storageInterface === "NVME"
  ) {
    strengths.push(
      "Modern NVMe/PCIe storage offers significantly better performance than traditional SATA drives.",
    );
  }

  const storageDetails = storage as {
    upgradeable?: boolean;
  };

  if (storageDetails.upgradeable) {
    strengths.push(
      "Storage can be upgraded in the future.",
    );
  }

  return strengths;
}
private getWeaknesses(
  storage: LaptopStorageSpec,
): string[] {

  const weaknesses: string[] = [];

  const maxCapacity =
    Math.max(...storage.optionsGB);

  if (maxCapacity <= 256) {
    weaknesses.push(
      "Lower storage capacity may become restrictive as applications and media libraries grow.",
    );
  }

  if (
    this.scorePerformance(storage) <= 65
  ) {
    weaknesses.push(
      "Slower storage performance may increase boot times and application loading times.",
    );
  }

  const storageInterface = (
    storage as {
      interface?: string;
    }
  ).interface?.toUpperCase();

  if (
    storageInterface === "HDD" ||
    storageInterface === "EMMC"
  ) {
    weaknesses.push(
      "Older storage technology provides noticeably slower performance than modern SSDs.",
    );
  }

  const storageDetails = storage as {
    soldered?: boolean;
    upgradeable?: boolean;
  };

  if (
    storageDetails.soldered &&
    !storageDetails.upgradeable
  ) {
    weaknesses.push(
      "The internal storage cannot be upgraded after purchase.",
    );
  }

  return weaknesses;
}
private getWarnings(
  storage: LaptopStorageSpec,
): string[] {

  const warnings: string[] = [];

  const minimumCapacity =
    Math.min(...storage.optionsGB);

  if (minimumCapacity <= 256) {
    warnings.push(
      "The lowest storage configuration may fill quickly once applications, updates and personal files are installed.",
    );
  }

  const storageDetails = storage as {
    soldered?: boolean;
    upgradeable?: boolean;
    maximumSupportedGB?: number;
  };

  if (
    storageDetails.soldered &&
    !storageDetails.upgradeable
  ) {
    warnings.push(
      "Choose the required storage capacity at purchase because the internal drive cannot be upgraded later.",
    );
  }

  if (
    storageDetails.maximumSupportedGB !== undefined &&
    minimumCapacity <
      storageDetails.maximumSupportedGB
  ) {
    warnings.push(
      "Different storage configurations may offer significantly different long-term suitability.",
    );
  }

  const storageInterface = (
    storage as {
      interface?: string;
    }
  ).interface?.toUpperCase();

  if (
    storageInterface === "EMMC" ||
    storageInterface === "HDD"
  ) {
    warnings.push(
      "This storage technology may make the system feel noticeably slower than a modern NVMe SSD.",
    );
  }

  return warnings;
}

  private createUnknownResult():
    StorageIntelligence {

    return {
      storageName:
        "Unknown storage",

      confidence: 0,

      scores: {
        overall: 0,
        capacity: 0,
        performance: 0,
        responsiveness: 0,
        creativeWork: 0,
        softwareDevelopment: 0,
        gaming: 0,
        aiWorkloads: 0,
        longevity: 0,
        upgradeability: 0,
      },

      capabilities: {
        everydayUse:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        officeWork:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        photoEditing:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        videoEditing:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        softwareDevelopment:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        gaming:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),

        aiWorkloads:
          createStorageCapability(
            0,
            "Storage information is unavailable.",
          ),
      },

      strengths: [],

      weaknesses: [],

      warnings: [],
    };
  }
}