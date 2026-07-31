import type {
  LaptopDisplaySpec,
} from "@/app/components/lib/matching/knowledge/registry/types";

import type {
  DisplayIntelligence,
  DisplayIntelligenceScores,
} from "./DisplayIntelligence";

import {
  clampDisplayScore,
  createDisplayCapability,
} from "./DisplayScoring";

export class DisplayEngine {
  analyse(
    display:
      | LaptopDisplaySpec
      | undefined,
  ): DisplayIntelligence {
    if (!display) {
      return this.createUnknownResult();
    }

    const scores =
      this.calculateScores(display);

    const confidence =
      this.calculateConfidence(display);

    return {
      displayName:
        this.createDisplayName(display),

      confidence,

      scores,

      capabilities: {
        officeWork:
          createDisplayCapability(
            this.calculateOfficeScore(
              scores,
            ),
            "Evaluates sharpness, brightness and general readability for office productivity.",
          ),

        webBrowsing:
          createDisplayCapability(
            this.calculateWebBrowsingScore(
              scores,
            ),
            "Evaluates text clarity, brightness and overall comfort for browsing.",
          ),

        photoEditing:
          createDisplayCapability(
            this.calculatePhotoEditingScore(
              scores,
            ),
            "Evaluates colour performance, sharpness, HDR and brightness for photo-editing work.",
          ),

        videoEditing:
          createDisplayCapability(
            this.calculateVideoEditingScore(
              scores,
            ),
            "Evaluates colour, motion handling, HDR and sharpness for video-editing workflows.",
          ),

        graphicDesign:
          createDisplayCapability(
            this.calculateGraphicDesignScore(
              scores,
            ),
            "Evaluates colour quality, resolution and brightness for visual-design work.",
          ),

        mediaConsumption:
          createDisplayCapability(
            scores.mediaConsumption,
            "Evaluates HDR, brightness, sharpness and motion quality for films and streaming.",
          ),

        casualGaming:
          createDisplayCapability(
            this.calculateCasualGamingScore(
              scores,
            ),
            "Evaluates motion quality, sharpness and panel performance for casual gaming.",
          ),

        competitiveGaming:
          createDisplayCapability(
            scores.gaming,
            "Evaluates refresh rate and motion performance for competitive gaming.",
          ),

        outdoorUse:
          createDisplayCapability(
            scores.outdoorVisibility,
            "Evaluates brightness and surface characteristics for use in bright environments.",
          ),
      },

      strengths:
        this.createStrengths(
          display,
          scores,
        ),

      weaknesses:
        this.createWeaknesses(
          display,
          scores,
        ),

      warnings:
        this.createWarnings(display),
    };
  }

  private calculateScores(
    display: LaptopDisplaySpec,
  ): DisplayIntelligenceScores {
    const sharpness =
      this.scoreSharpness(display);

    const brightness =
      this.scoreBrightness(display);

    const colour =
      this.scoreColour(display);

    const hdr =
      this.scoreHdr(display);

    const motion =
      this.scoreMotion(display);

    const gaming =
      clampDisplayScore(
        motion * 0.65 +
          sharpness * 0.2 +
          brightness * 0.15,
      );

    const creativeWork =
      clampDisplayScore(
        colour * 0.45 +
          sharpness * 0.25 +
          brightness * 0.15 +
          hdr * 0.15,
      );

    const mediaConsumption =
      clampDisplayScore(
        hdr * 0.35 +
          brightness * 0.25 +
          sharpness * 0.2 +
          motion * 0.2,
      );

    const outdoorVisibility =
      this.scoreOutdoorVisibility(
        display,
        brightness,
      );

    const efficiency =
      this.scoreEfficiency(display);

    const longevity =
      this.scoreLongevity(display);

    const overall =
      clampDisplayScore(
        sharpness * 0.2 +
          brightness * 0.15 +
          colour * 0.2 +
          hdr * 0.1 +
          motion * 0.1 +
          creativeWork * 0.1 +
          mediaConsumption * 0.05 +
          outdoorVisibility * 0.05 +
          longevity * 0.05,
      );

    return {
      overall,
      sharpness,
      brightness,
      colour,
      hdr,
      motion,
      gaming,
      creativeWork,
      mediaConsumption,
      outdoorVisibility,
      efficiency,
      longevity,
    };
  }

  private scoreSharpness(
    display: LaptopDisplaySpec,
  ): number {
    const width =
      display.resolutionWidth;

    const height =
      display.resolutionHeight;

    const size =
      display.sizeInches;

    if (
      width === undefined ||
      height === undefined
    ) {
      return 60;
    }

    const totalPixels =
      width * height;

    let score = 50;

    if (totalPixels >= 8_000_000) {
      score += 40;
    } else if (
      totalPixels >= 4_000_000
    ) {
      score += 32;
    } else if (
      totalPixels >= 2_000_000
    ) {
      score += 22;
    } else {
      score += 12;
    }

    if (
      size !== undefined &&
      size <= 16 &&
      totalPixels >= 4_000_000
    ) {
      score += 8;
    }

    return clampDisplayScore(score);
  }

  private scoreBrightness(
    display: LaptopDisplaySpec,
  ): number {
    const nits =
      display.brightnessNits;

    if (nits === undefined) {
      return 55;
    }

    if (nits >= 1600) return 100;
    if (nits >= 1000) return 95;
    if (nits >= 600) return 86;
    if (nits >= 500) return 80;
    if (nits >= 400) return 72;
    if (nits >= 300) return 62;

    return 45;
  }

  private scoreColour(
    display: LaptopDisplaySpec,
  ): number {
    const p3 =
      display.colourGamutP3Percent;

    const srgb =
      display.colourGamutSrgbPercent;

    if (p3 !== undefined) {
      if (p3 >= 100) return 96;
      if (p3 >= 95) return 90;
      if (p3 >= 85) return 80;
      if (p3 >= 70) return 65;

      return 50;
    }

    if (srgb !== undefined) {
      if (srgb >= 100) return 88;
      if (srgb >= 95) return 82;
      if (srgb >= 80) return 70;
      if (srgb >= 60) return 55;

      return 40;
    }

    switch (display.panelType) {
      case "OLED":
        return 90;

      case "MINI_LED":
        return 88;

      case "IPS":
        return 76;

      case "VA":
        return 70;

      case "TN":
        return 48;

      default:
        return 60;
    }
  }

  private scoreHdr(
    display: LaptopDisplaySpec,
  ): number {
    if (!display.hdr) {
      return 30;
    }

    const brightness =
      display.brightnessNits ?? 0;

    if (brightness >= 1000) {
      return 96;
    }

    if (brightness >= 600) {
      return 85;
    }

    if (brightness >= 400) {
      return 70;
    }

    return 58;
  }

  private scoreMotion(
    display: LaptopDisplaySpec,
  ): number {
    const refreshRate =
      display.refreshRateHz;

    if (refreshRate === undefined) {
      return 55;
    }

    if (refreshRate >= 240) return 100;
    if (refreshRate >= 165) return 94;
    if (refreshRate >= 144) return 90;
    if (refreshRate >= 120) return 86;
    if (refreshRate >= 90) return 74;
    if (refreshRate >= 60) return 60;

    return 45;
  }

  private scoreOutdoorVisibility(
    display: LaptopDisplaySpec,
    brightnessScore: number,
  ): number {
    let score =
      brightnessScore;

    if (display.matte) {
      score += 10;
    }

    if (display.glossy) {
      score -= 8;
    }

    return clampDisplayScore(score);
  }

  private scoreEfficiency(
    display: LaptopDisplaySpec,
  ): number {
    let score = 70;

    if (
      display.panelType ===
      "OLED"
    ) {
      score += 4;
    }

    if (
      (display.refreshRateHz ?? 60) >
      120
    ) {
      score -= 8;
    }

    if (
      (display.brightnessNits ?? 0) >=
      1000
    ) {
      score -= 5;
    }

    return clampDisplayScore(score);
  }

  private scoreLongevity(
    display: LaptopDisplaySpec,
  ): number {
    let score = 75;

    if (
      display.panelType ===
      "MINI_LED"
    ) {
      score += 12;
    }

    if (
      display.panelType ===
      "IPS"
    ) {
      score += 8;
    }

    if (
      display.panelType ===
      "OLED"
    ) {
      score -= 5;
    }

    if (
      (display.refreshRateHz ?? 0) >=
      120
    ) {
      score += 4;
    }

    return clampDisplayScore(score);
  }

  private calculateOfficeScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.sharpness * 0.45 +
        scores.brightness * 0.3 +
        scores.outdoorVisibility * 0.15 +
        scores.efficiency * 0.1,
    );
  }

  private calculateWebBrowsingScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.sharpness * 0.5 +
        scores.brightness * 0.3 +
        scores.motion * 0.1 +
        scores.efficiency * 0.1,
    );
  }

  private calculatePhotoEditingScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.colour * 0.45 +
        scores.sharpness * 0.3 +
        scores.brightness * 0.15 +
        scores.hdr * 0.1,
    );
  }

  private calculateVideoEditingScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.colour * 0.3 +
        scores.sharpness * 0.2 +
        scores.hdr * 0.25 +
        scores.motion * 0.15 +
        scores.brightness * 0.1,
    );
  }

  private calculateGraphicDesignScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.colour * 0.5 +
        scores.sharpness * 0.3 +
        scores.brightness * 0.2,
    );
  }

  private calculateCasualGamingScore(
    scores: DisplayIntelligenceScores,
  ): number {
    return clampDisplayScore(
      scores.motion * 0.5 +
        scores.sharpness * 0.25 +
        scores.brightness * 0.15 +
        scores.colour * 0.1,
    );
  }

  private calculateConfidence(
    display: LaptopDisplaySpec,
  ): number {
    const fields = [
      display.sizeInches,
      display.panelType,
      display.resolutionWidth,
      display.resolutionHeight,
      display.refreshRateHz,
      display.brightnessNits,
      display.colourGamutP3Percent,
      display.colourGamutSrgbPercent,
      display.hdr,
      display.glossy,
      display.matte,
    ];

    const knownFields =
      fields.filter(
        (value) =>
          value !== undefined &&
          value !== null,
      ).length;

    return clampDisplayScore(
      35 +
        knownFields * 6,
    );
  }

  private createDisplayName(
    display: LaptopDisplaySpec,
  ): string {
    const parts: string[] = [];

    if (display.panelType) {
      parts.push(
        display.panelType.replace(
          "_",
          " ",
        ),
      );
    }

    if (display.sizeInches) {
      parts.push(
        `${display.sizeInches}-inch`,
      );
    }

    if (
      display.resolutionWidth &&
      display.resolutionHeight
    ) {
      parts.push(
        `${display.resolutionWidth}×${display.resolutionHeight}`,
      );
    }

    return parts.length > 0
      ? parts.join(" ")
      : "Unknown display";
  }

  private createStrengths(
    display: LaptopDisplaySpec,
    scores: DisplayIntelligenceScores,
  ): string[] {
    const strengths: string[] = [];

    if (scores.sharpness >= 85) {
      strengths.push(
        "Very sharp high-resolution display",
      );
    }

    if (scores.brightness >= 85) {
      strengths.push(
        "Excellent display brightness",
      );
    }

    if (scores.colour >= 85) {
      strengths.push(
        "Strong colour performance for creative work",
      );
    }

    if (scores.hdr >= 80) {
      strengths.push(
        "Strong HDR capability",
      );
    }

    if (scores.motion >= 80) {
      strengths.push(
        "Smooth high-refresh-rate motion",
      );
    }

    if (display.touchscreen) {
      strengths.push(
        "Touchscreen input support",
      );
    }

    return strengths;
  }

  private createWeaknesses(
    display: LaptopDisplaySpec,
    scores: DisplayIntelligenceScores,
  ): string[] {
    const weaknesses: string[] = [];

    if (scores.brightness < 55) {
      weaknesses.push(
        "Limited brightness for well-lit environments",
      );
    }

    if (scores.colour < 60) {
      weaknesses.push(
        "Limited colour performance for professional creative work",
      );
    }

    if (scores.motion < 60) {
      weaknesses.push(
        "Limited motion performance for high-refresh gaming",
      );
    }

    if (display.glossy) {
      weaknesses.push(
        "Glossy surface may produce reflections in bright environments",
      );
    }

    return weaknesses;
  }

  private createWarnings(
    display: LaptopDisplaySpec,
  ): string[] {
    const warnings: string[] = [];

    if (
      display.resolutionWidth ===
        undefined ||
      display.resolutionHeight ===
        undefined
    ) {
      warnings.push(
        "Display resolution data is incomplete.",
      );
    }

    if (
      display.brightnessNits ===
      undefined
    ) {
      warnings.push(
        "Brightness data is unavailable, so visibility scores are estimated.",
      );
    }

    if (
      display.colourGamutP3Percent ===
        undefined &&
      display.colourGamutSrgbPercent ===
        undefined
    ) {
      warnings.push(
        "Measured colour-gamut data is unavailable.",
      );
    }

    return warnings;
  }

  private createUnknownResult():
    DisplayIntelligence {
    return {
      displayName:
        "Unknown display",

      confidence: 0,

      scores: {
        overall: 0,
        sharpness: 0,
        brightness: 0,
        colour: 0,
        hdr: 0,
        motion: 0,
        gaming: 0,
        creativeWork: 0,
        mediaConsumption: 0,
        outdoorVisibility: 0,
        efficiency: 0,
        longevity: 0,
      },

      capabilities: {
        officeWork:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        webBrowsing:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        photoEditing:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        videoEditing:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        graphicDesign:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        mediaConsumption:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        casualGaming:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        competitiveGaming:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),

        outdoorUse:
          createDisplayCapability(
            0,
            "Display information is unavailable.",
          ),
      },

      strengths: [],
      weaknesses: [],

      warnings: [
        "Canonical display data is unavailable.",
      ],
    };
  }
}