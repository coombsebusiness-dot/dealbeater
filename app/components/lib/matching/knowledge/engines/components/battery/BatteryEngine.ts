import type {
  LaptopBatterySpec,
} from "@/app/components/lib/matching/knowledge/registry/types";

import type {
  BatteryIntelligence,
  BatteryIntelligenceScores,
} from "./BatteryIntelligence";

import {
  clampBatteryScore,
  createBatteryCapability,
} from "./BatteryScoring";

export class BatteryEngine {
  analyse(
    battery: LaptopBatterySpec | undefined,
  ): BatteryIntelligence {

    if (!battery) {
      return this.createUnknownResult();
    }

    const scores =
      this.calculateScores(battery);

    const confidence =
      this.calculateConfidence(battery);

    return {
      batteryName:
        this.createBatteryName(battery),

      confidence,

      scores,

      capabilities: {
        everydayUse:
          createBatteryCapability(
            this.calculateEverydayUseScore(
              scores,
            ),
            "Evaluates whether the battery is suitable for typical mixed daily use.",
          ),

        officeWork:
          createBatteryCapability(
            this.calculateOfficeWorkScore(
              scores,
            ),
            "Evaluates battery endurance for documents, email, meetings and productivity work.",
          ),

        webBrowsing:
          createBatteryCapability(
            scores.webEndurance,
            "Evaluates expected endurance during web browsing and lighter connected workloads.",
          ),

        mediaPlayback:
          createBatteryCapability(
            scores.videoEndurance,
            "Evaluates expected battery endurance for local and streamed video playback.",
          ),

        travel:
          createBatteryCapability(
            scores.mobility,
            "Evaluates battery suitability for commuting, travel and extended use away from power.",
          ),

        professionalUse:
          createBatteryCapability(
            scores.professionalUse,
            "Evaluates battery suitability for sustained professional and creative workflows.",
          ),

        heavyWorkloads:
          createBatteryCapability(
            this.calculateHeavyWorkloadScore(
              scores,
            ),
            "Estimates battery suitability during demanding workloads where endurance is normally reduced.",
          ),
      },

      strengths:
        this.createStrengths(
          battery,
          scores,
        ),

      weaknesses:
        this.createWeaknesses(
          battery,
          scores,
        ),

      warnings:
        this.createWarnings(battery),
    };
  }

  private calculateScores(
    battery: LaptopBatterySpec,
  ): BatteryIntelligenceScores {
    const capacity =
      this.scoreCapacity(battery);

    const webEndurance =
      this.scoreWebEndurance(battery);

    const videoEndurance =
      this.scoreVideoEndurance(battery);

    const generalEndurance =
      this.scoreGeneralEndurance(
        battery,
        webEndurance,
        videoEndurance,
      );

    const charging =
      this.scoreCharging(battery);

    const mobility =
      clampBatteryScore(
        generalEndurance * 0.65 +
          webEndurance * 0.2 +
          charging * 0.15,
      );

    const professionalUse =
      clampBatteryScore(
        generalEndurance * 0.45 +
          capacity * 0.3 +
          charging * 0.15 +
          webEndurance * 0.1,
      );

    const longevity =
      this.scoreLongevity(battery);

    const overall =
      clampBatteryScore(
        generalEndurance * 0.35 +
          webEndurance * 0.15 +
          videoEndurance * 0.15 +
          capacity * 0.15 +
          charging * 0.1 +
          mobility * 0.05 +
          longevity * 0.05,
      );

    return {
      overall,
      capacity,
      webEndurance,
      videoEndurance,
      generalEndurance,
      charging,
      mobility,
      professionalUse,
      longevity,
    };
  }

  private scoreCapacity(
    battery: LaptopBatterySpec,
  ): number {
    const capacityWh =
      battery.capacityWh;

    if (capacityWh === undefined) {
      return 55;
    }

    if (capacityWh >= 95) return 100;
    if (capacityWh >= 85) return 94;
    if (capacityWh >= 75) return 88;
    if (capacityWh >= 65) return 80;
    if (capacityWh >= 55) return 72;
    if (capacityWh >= 45) return 63;
    if (capacityWh >= 35) return 52;

    return 40;
  }

  private scoreWebEndurance(
    battery: LaptopBatterySpec,
  ): number {
    const hours =
      battery.webBrowsingHours ??
      battery.manufacturerClaimHours;

    if (hours === undefined) {
      return 55;
    }

    if (hours >= 20) return 100;
    if (hours >= 17) return 94;
    if (hours >= 14) return 87;
    if (hours >= 12) return 80;
    if (hours >= 10) return 72;
    if (hours >= 8) return 62;
    if (hours >= 6) return 50;

    return 35;
  }

  private scoreVideoEndurance(
    battery: LaptopBatterySpec,
  ): number {
    const hours =
      battery.videoPlaybackHours ??
      battery.manufacturerClaimHours;

    if (hours === undefined) {
      return 55;
    }

    if (hours >= 22) return 100;
    if (hours >= 19) return 95;
    if (hours >= 16) return 88;
    if (hours >= 13) return 80;
    if (hours >= 10) return 70;
    if (hours >= 8) return 60;
    if (hours >= 6) return 48;

    return 35;
  }

  private scoreGeneralEndurance(
    battery: LaptopBatterySpec,
    webEndurance: number,
    videoEndurance: number,
  ): number {
    const manufacturerHours =
      battery.manufacturerClaimHours;

    if (
      battery.webBrowsingHours !== undefined ||
      battery.videoPlaybackHours !== undefined
    ) {
      return clampBatteryScore(
        webEndurance * 0.55 +
          videoEndurance * 0.45,
      );
    }

    if (manufacturerHours !== undefined) {
      return this.scoreClaimedEndurance(
        manufacturerHours,
      );
    }

    return clampBatteryScore(
      webEndurance * 0.5 +
        videoEndurance * 0.5,
    );
  }

  private scoreClaimedEndurance(
    hours: number,
  ): number {
    if (hours >= 20) return 96;
    if (hours >= 17) return 90;
    if (hours >= 14) return 84;
    if (hours >= 12) return 76;
    if (hours >= 10) return 68;
    if (hours >= 8) return 58;
    if (hours >= 6) return 47;

    return 35;
  }

  private scoreCharging(
    battery: LaptopBatterySpec,
  ): number {
    if (battery.fastCharging === true) {
      return 88;
    }

    if (battery.fastCharging === false) {
      return 55;
    }

    return 60;
  }

  private scoreLongevity(
    battery: LaptopBatterySpec,
  ): number {
    let score = 70;

    if (
      (battery.capacityWh ?? 0) >= 70
    ) {
      score += 8;
    }

    if (
      (battery.webBrowsingHours ?? 0) >=
      14
    ) {
      score += 7;
    }

    if (
      (battery.videoPlaybackHours ?? 0) >=
      16
    ) {
      score += 5;
    }

    if (battery.fastCharging === true) {
      score += 3;
    }

    return clampBatteryScore(score);
  }

  private calculateEverydayUseScore(
    scores: BatteryIntelligenceScores,
  ): number {
    return clampBatteryScore(
      scores.generalEndurance * 0.5 +
        scores.webEndurance * 0.25 +
        scores.charging * 0.15 +
        scores.longevity * 0.1,
    );
  }

  private calculateOfficeWorkScore(
    scores: BatteryIntelligenceScores,
  ): number {
    return clampBatteryScore(
      scores.webEndurance * 0.45 +
        scores.generalEndurance * 0.35 +
        scores.mobility * 0.1 +
        scores.charging * 0.1,
    );
  }

  private calculateHeavyWorkloadScore(
    scores: BatteryIntelligenceScores,
  ): number {
    return clampBatteryScore(
      scores.capacity * 0.4 +
        scores.generalEndurance * 0.3 +
        scores.professionalUse * 0.2 +
        scores.charging * 0.1,
    );
  }

  private calculateConfidence(
    battery: LaptopBatterySpec,
  ): number {
    const fields = [
      battery.capacityWh,
      battery.manufacturerClaimHours,
      battery.webBrowsingHours,
      battery.videoPlaybackHours,
      battery.fastCharging,
    ];

    const knownFields =
      fields.filter(
        (value) =>
          value !== undefined &&
          value !== null,
      ).length;

    return clampBatteryScore(
      35 +
        knownFields * 13,
    );
  }

  private createBatteryName(
    battery: LaptopBatterySpec,
  ): string {
    const parts: string[] = [];

    if (
      battery.capacityWh !== undefined
    ) {
      parts.push(
        `${battery.capacityWh}Wh`,
      );
    }

    if (battery.fastCharging === true) {
      parts.push("fast charging");
    }

    return parts.length > 0
      ? parts.join(" ")
      : "Unknown battery";
  }

  private createStrengths(
    battery: LaptopBatterySpec,
    scores: BatteryIntelligenceScores,
  ): string[] {
    const strengths: string[] = [];

    if (scores.generalEndurance >= 85) {
      strengths.push(
        "Excellent all-day battery endurance",
      );
    }

    if (scores.webEndurance >= 85) {
      strengths.push(
        "Strong web-browsing battery life",
      );
    }

    if (scores.videoEndurance >= 85) {
      strengths.push(
        "Excellent video-playback endurance",
      );
    }

    if (scores.capacity >= 85) {
      strengths.push(
        "High-capacity battery",
      );
    }

    if (battery.fastCharging === true) {
      strengths.push(
        "Supports fast charging",
      );
    }

    if (scores.mobility >= 85) {
      strengths.push(
        "Well suited to travel and extended use away from power",
      );
    }

    return strengths;
  }

  private createWeaknesses(
    battery: LaptopBatterySpec,
    scores: BatteryIntelligenceScores,
  ): string[] {
    const weaknesses: string[] = [];

    if (scores.generalEndurance < 55) {
      weaknesses.push(
        "Limited battery endurance for a full working day",
      );
    }

    if (scores.webEndurance < 55) {
      weaknesses.push(
        "Below-average web-browsing endurance",
      );
    }

    if (scores.videoEndurance < 55) {
      weaknesses.push(
        "Limited video-playback battery life",
      );
    }

    if (scores.capacity < 50) {
      weaknesses.push(
        "Relatively small battery capacity",
      );
    }

    if (battery.fastCharging === false) {
      weaknesses.push(
        "Fast charging is not supported",
      );
    }

    return weaknesses;
  }

  private createWarnings(
    battery: LaptopBatterySpec,
  ): string[] {
    const warnings: string[] = [];

    if (
      battery.capacityWh === undefined
    ) {
      warnings.push(
        "Battery capacity data is unavailable.",
      );
    }

    if (
      battery.webBrowsingHours ===
        undefined &&
      battery.videoPlaybackHours ===
        undefined
    ) {
      warnings.push(
        "Independent workload-specific battery figures are unavailable.",
      );
    }

    if (
      battery.manufacturerClaimHours !==
      undefined &&
      battery.webBrowsingHours ===
        undefined &&
      battery.videoPlaybackHours ===
        undefined
    ) {
      warnings.push(
        "Battery endurance is based primarily on the manufacturer's claimed figure.",
      );
    }

    if (
      battery.fastCharging === undefined
    ) {
      warnings.push(
        "Fast-charging support has not been confirmed.",
      );
    }

    return warnings;
  }

  private createUnknownResult():
    BatteryIntelligence {
    return {
      batteryName:
        "Unknown battery",

      confidence: 0,

      scores: {
        overall: 0,
        capacity: 0,
        webEndurance: 0,
        videoEndurance: 0,
        generalEndurance: 0,
        charging: 0,
        mobility: 0,
        professionalUse: 0,
        longevity: 0,
      },

      capabilities: {
        everydayUse:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        officeWork:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        webBrowsing:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        mediaPlayback:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        travel:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        professionalUse:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),

        heavyWorkloads:
          createBatteryCapability(
            0,
            "Battery information is unavailable.",
          ),
      },

      strengths: [],
      weaknesses: [],

      warnings: [
        "Canonical battery data is unavailable.",
      ],
    };
  }
}