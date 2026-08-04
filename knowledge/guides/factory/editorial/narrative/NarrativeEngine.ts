export interface NarrativeContext {
  previousHeading?:
    string;

  currentHeading:
    string;

  nextHeading?:
    string;
}

export interface NarrativeBridge {
  opening:
    string;

  closing:
    string;
}

export class NarrativeEngine {
  build(
    _context:
      NarrativeContext,
  ): NarrativeBridge {
    return {
      opening:
        "",

      closing:
        "",
    };
  }
}