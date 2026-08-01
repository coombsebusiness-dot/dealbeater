import {
  ThermalCapabilities,
  ThermalIntelligence,
  ThermalScores,
} from "./ThermalIntelligence";

import {
  IntelligenceEvidence,
} from "../common/IntelligenceEvidence";

import {
  createThermalCapability,
} from "./ThermalScoring";

import {
  ThermalSpec,
} from "./ThermalSpec";

export class ThermalEngine {
  analyse(
    spec?: ThermalSpec,
  ): ThermalIntelligence {
    if (!spec) {
      return this.createUnknownResult();
    }

    const scores =
      this.createScores(spec);

    const capabilities =
      this.createCapabilities(scores);

    return {
      component: "thermal",
      name: this.createThermalName(spec),
      confidence: 50,
      scores,
      capabilities,
      strengths: this.getStrengths(
  spec,
  scores,
),
      weaknesses: this.getWeaknesses(
  spec,
  scores,
),
      warnings: this.getWarnings(
  spec,
  scores,
),

evidence: this.getEvidence(
  spec,
),
    };
  }

  private createScores(
    spec: ThermalSpec,
  ): ThermalScores {
    const cooling =
      this.scoreCooling(spec);

    const sustainedPerformance =
      this.scoreSustainedPerformance(spec);

      const noise =
  this.scoreNoise(spec);

  const surfaceTemperatures =
  this.scoreSurfaceTemperatures(spec);

  const gaming =
  this.scoreGaming(
    cooling,
    sustainedPerformance,
    noise,
    surfaceTemperatures,
  );

  const longevity =
  this.scoreLongevity(
    cooling,
    sustainedPerformance,
    surfaceTemperatures,
    spec,
  );

const creativeWork =
  this.scoreCreativeWork(
    sustainedPerformance,
    noise,
    surfaceTemperatures,
  );

const softwareDevelopment =
  this.scoreSoftwareDevelopment(
    sustainedPerformance,
    noise,
    surfaceTemperatures,
  );

const aiWorkloads =
  this.scoreAIWorkloads(
    cooling,
    sustainedPerformance,
    noise,
  );

    return {
     overall: Math.round(
  cooling * 0.25 +
  sustainedPerformance * 0.35 +
  noise * 0.10 +
  surfaceTemperatures * 0.15 +
  longevity * 0.15,
),
      cooling,
      sustainedPerformance,
      noise,
      surfaceTemperatures,
      gaming,
      creativeWork,
      softwareDevelopment,
      aiWorkloads,
      longevity,
    };
  }
private scoreCooling(
  spec: ThermalSpec,
): number {
  let score = 50;

  if (spec.passiveCooling) {
    score -= 20;
  }

  if (
    typeof spec.fanCount === "number"
  ) {
    if (spec.fanCount >= 3) {
      score += 25;
    } else if (spec.fanCount === 2) {
      score += 18;
    } else if (spec.fanCount === 1) {
      score += 8;
    }
  }

  if (spec.vaporChamber) {
    score += 15;
  }

  if (spec.liquidMetal) {
    score += 8;
  }

  if (
    typeof spec.heatPipeCount ===
      "number" &&
    spec.heatPipeCount > 0
  ) {
    score += Math.min(
      spec.heatPipeCount * 3,
      12,
    );
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}
private scoreSustainedPerformance(
  spec: ThermalSpec,
): number {
  let score = this.scoreCooling(spec);

  if (
    typeof spec.throttlingPercent ===
    "number"
  ) {
    if (spec.throttlingPercent <= 5) {
      score += 15;
    } else if (
      spec.throttlingPercent <= 10
    ) {
      score += 8;
    } else if (
      spec.throttlingPercent <= 20
    ) {
      score -= 5;
    } else if (
      spec.throttlingPercent <= 30
    ) {
      score -= 18;
    } else {
      score -= 30;
    }
  }

  if (
    typeof spec.sustainedPowerWatts ===
      "number" &&
    typeof spec.peakPowerWatts ===
      "number" &&
    spec.peakPowerWatts > 0
  ) {
    const sustainedRatio =
      spec.sustainedPowerWatts /
      spec.peakPowerWatts;

    if (sustainedRatio >= 0.9) {
      score += 15;
    } else if (
      sustainedRatio >= 0.75
    ) {
      score += 8;
    } else if (
      sustainedRatio >= 0.6
    ) {
      score -= 5;
    } else {
      score -= 18;
    }
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}
private scoreNoise(
  spec: ThermalSpec,
): number {
  let score = 60;

  if (
    typeof spec.idleNoiseDb ===
    "number"
  ) {
    if (spec.idleNoiseDb <= 20) {
      score += 15;
    } else if (
      spec.idleNoiseDb <= 25
    ) {
      score += 8;
    } else if (
      spec.idleNoiseDb <= 30
    ) {
      score += 2;
    } else {
      score -= 10;
    }
  }

  if (
    typeof spec.loadNoiseDb ===
    "number"
  ) {
    if (spec.loadNoiseDb <= 35) {
      score += 20;
    } else if (
      spec.loadNoiseDb <= 42
    ) {
      score += 10;
    } else if (
      spec.loadNoiseDb <= 48
    ) {
      score -= 5;
    } else if (
      spec.loadNoiseDb <= 55
    ) {
      score -= 18;
    } else {
      score -= 30;
    }
  }

  if (spec.passiveCooling) {
    score += 25;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}
private scoreSurfaceTemperatures(
  spec: ThermalSpec,
): number {
  let score = 65;

  if (
    typeof spec.keyboardTemperatureC ===
    "number"
  ) {
    if (spec.keyboardTemperatureC <= 35) {
      score += 15;
    } else if (
      spec.keyboardTemperatureC <= 40
    ) {
      score += 8;
    } else if (
      spec.keyboardTemperatureC <= 45
    ) {
      score -= 5;
    } else if (
      spec.keyboardTemperatureC <= 50
    ) {
      score -= 15;
    } else {
      score -= 25;
    }
  }

  if (
    typeof spec.undersideTemperatureC ===
    "number"
  ) {
    if (spec.undersideTemperatureC <= 38) {
      score += 10;
    } else if (
      spec.undersideTemperatureC <= 45
    ) {
      score += 3;
    } else if (
      spec.undersideTemperatureC <= 50
    ) {
      score -= 8;
    } else if (
      spec.undersideTemperatureC <= 55
    ) {
      score -= 18;
    } else {
      score -= 28;
    }
  }

  if (
    typeof spec.exhaustTemperatureC ===
    "number"
  ) {
    if (spec.exhaustTemperatureC <= 45) {
      score += 5;
    } else if (
      spec.exhaustTemperatureC >= 65
    ) {
      score -= 10;
    }
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}
private scoreGaming(
  cooling: number,
  sustainedPerformance: number,
  noise: number,
  surfaceTemperatures: number,
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        cooling * 0.25 +
        sustainedPerformance * 0.45 +
        noise * 0.10 +
        surfaceTemperatures * 0.20,
      ),
    ),
  );
}

private scoreCreativeWork(
  sustainedPerformance: number,
  noise: number,
  surfaceTemperatures: number,
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        sustainedPerformance * 0.60 +
        noise * 0.20 +
        surfaceTemperatures * 0.20,
      ),
    ),
  );
}

private scoreSoftwareDevelopment(
  sustainedPerformance: number,
  noise: number,
  surfaceTemperatures: number,
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        sustainedPerformance * 0.50 +
        noise * 0.30 +
        surfaceTemperatures * 0.20,
      ),
    ),
  );
}

private scoreAIWorkloads(
  cooling: number,
  sustainedPerformance: number,
  noise: number,
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        cooling * 0.25 +
        sustainedPerformance * 0.65 +
        noise * 0.10,
      ),
    ),
  );
}
private scoreLongevity(
  cooling: number,
  sustainedPerformance: number,
  surfaceTemperatures: number,
  spec: ThermalSpec,
): number {
  let score =
    cooling * 0.35 +
    sustainedPerformance * 0.35 +
    surfaceTemperatures * 0.30;

  if (spec.userServiceableCooling) {
    score += 10;
  }

  if (
    spec.chassisMaterial ===
      "ALUMINIUM" ||
    spec.chassisMaterial ===
      "MAGNESIUM"
  ) {
    score += 5;
  }

  if (
    typeof spec.throttlingPercent ===
      "number" &&
    spec.throttlingPercent >= 30
  ) {
    score -= 12;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}
private getStrengths(
  spec: ThermalSpec,
  scores: ThermalScores,
): string[] {
  const strengths: string[] = [];

  if (scores.cooling >= 85) {
    strengths.push(
      "Excellent cooling system.",
    );
  }

  if (
    scores.sustainedPerformance >= 85
  ) {
    strengths.push(
      "Maintains excellent sustained performance under prolonged workloads.",
    );
  }

  if (scores.noise >= 85) {
    strengths.push(
      "Very quiet cooling system.",
    );
  }

  if (
    scores.surfaceTemperatures >= 85
  ) {
    strengths.push(
      "Surface temperatures remain comfortable during heavy use.",
    );
  }

  if (spec.vaporChamber) {
    strengths.push(
      "Uses a vapour chamber cooling system.",
    );
  }

  if (spec.liquidMetal) {
    strengths.push(
      "Uses liquid-metal thermal interface material.",
    );
  }

  return strengths;
}
private getWeaknesses(
  spec: ThermalSpec,
  scores: ThermalScores,
): string[] {
  const weaknesses: string[] = [];

  if (scores.cooling < 50) {
    weaknesses.push(
      "Cooling capability is limited under demanding workloads.",
    );
  }

  if (
    scores.sustainedPerformance < 50
  ) {
    weaknesses.push(
      "Performance may drop during prolonged heavy workloads.",
    );
  }

  if (scores.noise < 50) {
    weaknesses.push(
      "Cooling fans may become noticeably loud under load.",
    );
  }

  if (
    scores.surfaceTemperatures < 50
  ) {
    weaknesses.push(
      "Surface temperatures may become uncomfortable during heavy use.",
    );
  }

  if (spec.passiveCooling) {
    weaknesses.push(
      "Passive cooling limits sustained performance under demanding workloads.",
    );
  }

  if (
    typeof spec.fanCount === "number" &&
    spec.fanCount === 1
  ) {
    weaknesses.push(
      "Single-fan cooling may offer limited thermal headroom.",
    );
  }

  return weaknesses;
}
private getWarnings(
  spec: ThermalSpec,
  scores: ThermalScores,
): string[] {
  const warnings: string[] = [];

  if (
    typeof spec.throttlingPercent ===
      "number" &&
    spec.throttlingPercent >= 30
  ) {
    warnings.push(
      "Severe thermal throttling may significantly reduce performance under sustained load.",
    );
  }

  if (
    typeof spec.loadNoiseDb ===
      "number" &&
    spec.loadNoiseDb >= 55
  ) {
    warnings.push(
      "Fan noise may become very loud during demanding workloads.",
    );
  }

  if (
    typeof spec.keyboardTemperatureC ===
      "number" &&
    spec.keyboardTemperatureC >= 50
  ) {
    warnings.push(
      "Keyboard temperatures may become uncomfortable during heavy use.",
    );
  }

  if (
    typeof spec.undersideTemperatureC ===
      "number" &&
    spec.undersideTemperatureC >= 55
  ) {
    warnings.push(
      "The underside may become too hot for comfortable lap use.",
    );
  }

  if (
    scores.sustainedPerformance < 30
  ) {
    warnings.push(
      "This cooling system may be unsuitable for prolonged rendering, gaming or AI workloads.",
    );
  }

  if (
    spec.passiveCooling &&
    typeof spec.peakPowerWatts ===
      "number" &&
    spec.peakPowerWatts >= 25
  ) {
    warnings.push(
      "Passive cooling may struggle to sustain this system's peak power under prolonged load.",
    );
  }

  return warnings;
}
private getEvidence(
  spec: ThermalSpec,
): IntelligenceEvidence[] {
  const evidence: IntelligenceEvidence[] = [];

  if (
    typeof spec.fanCount === "number"
  ) {
    evidence.push({
      category: "Cooling",
      label: "Fan Count",
      value: spec.fanCount,
    });
  }

  if (spec.vaporChamber) {
    evidence.push({
      category: "Cooling",
      label: "Vapour Chamber",
      value: true,
    });
  }

  if (spec.liquidMetal) {
    evidence.push({
      category: "Cooling",
      label: "Liquid Metal",
      value: true,
    });
  }

  if (
    typeof spec.heatPipeCount ===
    "number"
  ) {
    evidence.push({
      category: "Cooling",
      label: "Heat Pipes",
      value: spec.heatPipeCount,
    });
  }

  if (
    typeof spec.throttlingPercent ===
    "number"
  ) {
    evidence.push({
      category: "Performance",
      label: "Thermal Throttling",
      value: `${spec.throttlingPercent}%`,
    });
  }

  if (
    typeof spec.sustainedPowerWatts ===
    "number"
  ) {
    evidence.push({
      category: "Performance",
      label: "Sustained Power",
      value: `${spec.sustainedPowerWatts}W`,
    });
  }

  if (
    typeof spec.loadNoiseDb ===
    "number"
  ) {
    evidence.push({
      category: "Noise",
      label: "Load Noise",
      value: `${spec.loadNoiseDb} dB`,
    });
  }

  if (
    typeof spec.keyboardTemperatureC ===
    "number"
  ) {
    evidence.push({
      category: "Temperature",
      label: "Keyboard Temperature",
      value: `${spec.keyboardTemperatureC}°C`,
    });
  }

  return evidence;
}
  private createInitialScores(): ThermalScores {
    return {
      overall: 50,
      cooling: 50,
      sustainedPerformance: 50,
      noise: 50,
      surfaceTemperatures: 50,
      gaming: 50,
      creativeWork: 50,
      softwareDevelopment: 50,
      aiWorkloads: 50,
      longevity: 50,
    };
  }

  private createCapabilities(
    scores: ThermalScores,
  ): ThermalCapabilities {
    return {
      everydayUse:
        createThermalCapability(
          scores.cooling,
          50,
          "Thermal performance is currently based on limited cooling information.",
        ),

      sustainedWorkloads:
        createThermalCapability(
          scores.sustainedPerformance,
          50,
          "Sustained workload performance is currently based on limited thermal information.",
        ),

      gaming:
        createThermalCapability(
          scores.gaming,
          50,
          "Gaming thermal capability is currently based on limited cooling information.",
        ),

      creativeWork:
        createThermalCapability(
          scores.creativeWork,
          50,
          "Creative workload thermal capability is currently based on limited cooling information.",
        ),

      softwareDevelopment:
        createThermalCapability(
          scores.softwareDevelopment,
          50,
          "Software-development thermal capability is currently based on limited cooling information.",
        ),

      aiWorkloads:
        createThermalCapability(
          scores.aiWorkloads,
          50,
          "AI workload thermal capability is currently based on limited cooling information.",
        ),
    };
  }

  private createThermalName(
    spec: ThermalSpec,
  ): string {
    if (spec.passiveCooling) {
      return "Passive Cooling System";
    }

    if (
      typeof spec.fanCount === "number" &&
      spec.fanCount > 0
    ) {
      return `${spec.fanCount}-Fan Cooling System`;
    }

    return "Laptop Thermal System";
  }

  private createUnknownResult():
    ThermalIntelligence {
    const scores =
      this.createInitialScores();

    return {
      component: "thermal",
      name: "Unknown Thermal System",
      confidence: 0,
      scores,
      capabilities:
        this.createCapabilities(scores),
      strengths: [],
      weaknesses: [],
      warnings: [
  "Thermal specifications are unavailable.",
],

evidence: [],
    };
  }
}