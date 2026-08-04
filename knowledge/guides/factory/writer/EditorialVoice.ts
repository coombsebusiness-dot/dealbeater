export const BLINLX_EDITORIAL_MARKER =
  "BLINLX GENERATED DRAFT:";

export const BLINLX_EDITORIAL_RULES = {
  principles: [
    "Help the reader make a better buying decision.",
    "Teach before recommending.",
    "Explain why something matters.",
    "Be honest about compromises.",
    "Say when spending more is unnecessary.",
    "Say when waiting or buying used may be smarter.",
    "Never recommend something purely because it is expensive.",
    "Write for a real person rather than a search engine.",
  ],

  voice: [
    "Use natural British English.",
    "Use contractions where they sound natural.",
    "Mix short and longer sentences.",
    "Speak directly to the reader.",
    "Prefer plain English over technical jargon.",
    "Sound experienced, calm and helpful.",
    "Avoid corporate or promotional language.",
    "Do not exaggerate benefits.",
  ],

  forbiddenPhrases: [
    "in conclusion",
    "it is important to note",
    "it is worth noting",
    "furthermore",
    "moreover",
    "as previously mentioned",
    "in today's fast-paced world",
    "game-changing",
    "revolutionary",
    "cutting-edge",
    "state-of-the-art",
    "unlock the potential",
    "delve into",
    "navigate the landscape",
    "whether you're a seasoned professional",
  ],
} as const;

export function containsForbiddenEditorialPhrase(
  value: string,
): string | null {
  const normalised =
    value.toLowerCase();

  return (
    BLINLX_EDITORIAL_RULES
      .forbiddenPhrases
      .find((phrase) =>
        normalised.includes(
          phrase,
        ),
      ) ?? null
  );
}