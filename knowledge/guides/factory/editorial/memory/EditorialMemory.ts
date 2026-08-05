export type EditorialKnowledgeKind =
  | "FACT"
  | "TRADE_OFF"
  | "MISTAKE"
  | "PRODUCT"
  | "RECOMMENDATION"
  | "TERM"
  | "IDEA";

export interface EditorialMemoryEntry {
  key: string;

  kind:
    EditorialKnowledgeKind;

  title: string;

  sectionId: string;

  detail?: string;
}

export interface RememberEditorialEntryInput {
  key?: string;

  kind:
    EditorialKnowledgeKind;

  title: string;

  sectionId: string;

  detail?: string;
}

function normaliseMemoryKey(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(
      /[^a-z0-9£]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function createEntryKey(
  input:
    RememberEditorialEntryInput,
): string {
  if (input.key?.trim()) {
    return normaliseStoredKey(
  input.key,
);
  }

  return [
    input.kind,
    input.title,
  ]
    .map(
      normaliseMemoryKey,
    )
    .filter(Boolean)
    .join(":");
}
function normaliseStoredKey(
  value: string,
): string {
  return value
    .split(":")
    .map(
      normaliseMemoryKey,
    )
    .filter(Boolean)
    .join(":");
}

export class EditorialMemory {
  private readonly entries =
    new Map<
      string,
      EditorialMemoryEntry
    >();

  remember(
    input:
      RememberEditorialEntryInput,
  ): EditorialMemoryEntry {
    const key =
      createEntryKey(
        input,
      );

    const existing =
      this.entries.get(
        key,
      );

    if (existing) {
      return existing;
    }

    const entry:
      EditorialMemoryEntry = {
      key,

      kind:
        input.kind,

      title:
        input.title.trim(),

      sectionId:
        input.sectionId,

      detail:
        input.detail?.trim() ||
        undefined,
    };

    this.entries.set(
      key,
      entry,
    );

    return entry;
  }

 has(
  key: string,
): boolean {
  return this.entries.has(
    normaliseStoredKey(
      key,
    ),
  );
}

  hasCovered(
    kind:
      EditorialKnowledgeKind,
    title: string,
  ): boolean {
    const key =
      createEntryKey({
        kind,
        title,
        sectionId:
          "lookup",
      });

    return this.entries.has(
      key,
    );
  }

  get(
  key: string,
): EditorialMemoryEntry | null {
  return (
    this.entries.get(
      normaliseStoredKey(
        key,
      ),
    ) ?? null
  );
}

  getAll():
    EditorialMemoryEntry[] {
    return Array.from(
      this.entries.values(),
    );
  }

  getBySection(
    sectionId: string,
  ): EditorialMemoryEntry[] {
    return this.getAll().filter(
      (entry) =>
        entry.sectionId ===
        sectionId,
    );
  }

  getByKind(
    kind:
      EditorialKnowledgeKind,
  ): EditorialMemoryEntry[] {
    return this.getAll().filter(
      (entry) =>
        entry.kind ===
        kind,
    );
  }

  filterUncovered<T>(
    values: T[],
    kind:
      EditorialKnowledgeKind,
    getTitle:
      (value: T) => string,
  ): T[] {
    return values.filter(
      (value) =>
        !this.hasCovered(
          kind,
          getTitle(
            value,
          ),
        ),
    );
  }

  markFactCovered(
    title: string,
    sectionId: string,
    detail?: string,
  ): EditorialMemoryEntry {
    return this.remember({
      kind:
        "FACT",

      title,

      sectionId,

      detail,
    });
  }

  markTradeOffCovered(
    title: string,
    sectionId: string,
    detail?: string,
  ): EditorialMemoryEntry {
    return this.remember({
      kind:
        "TRADE_OFF",

      title,

      sectionId,

      detail,
    });
  }

  markMistakeCovered(
    title: string,
    sectionId: string,
    detail?: string,
  ): EditorialMemoryEntry {
    return this.remember({
      kind:
        "MISTAKE",

      title,

      sectionId,

      detail,
    });
  }
  hasCoveredTitle(
  title: string,
): boolean {
  const normalisedTitle =
    normaliseMemoryKey(
      title,
    );

  return this.getAll().some(
    (entry) =>
      normaliseMemoryKey(
        entry.title,
      ) === normalisedTitle,
  );
}

  reset():
    void {
    this.entries.clear();
  }

  get size():
    number {
    return this.entries.size;
  }
}