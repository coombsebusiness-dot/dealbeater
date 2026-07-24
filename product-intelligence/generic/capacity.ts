import type { ProductType } from "../types";

export interface CapacityResult {
  memory: string | null;
  storage: string | null;
}

interface CapacityCandidate {
  value: string;
  amountGb: number;
  amount: number;
  unit: "GB" | "TB";
  index: number;
  before: string;
  after: string;
}

const MEMORY_LABEL_PATTERN =
  /\b(ram|memory|ddr3|ddr4|ddr5|lpddr4|lpddr4x|lpddr5|lpddr5x|unified memory)\b/i;

const STORAGE_LABEL_PATTERN =
  /\b(storage|ssd|nvme|hdd|hard drive|solid state|flash storage|emmc)\b/i;

function normaliseCapacity(
  amount: number,
  unit: "GB" | "TB"
): string {
  return `${amount}${unit}`;
}

function extractCapacityCandidates(
  title: string
): CapacityCandidate[] {
  const candidates: CapacityCandidate[] = [];

  const pattern =
    /\b(\d+(?:\.\d+)?)\s?(tb|gb)\b/gi;

  for (const match of title.matchAll(pattern)) {
    const amount = Number(match[1]);

    const unit = match[2].toUpperCase() as
      | "GB"
      | "TB";

    const index = match.index ?? 0;
    const matchEnd = index + match[0].length;

    // Only inspect the nearest words on either side.
    const before = title
      .slice(Math.max(0, index - 18), index)
      .toLowerCase();

    const after = title
      .slice(matchEnd, matchEnd + 18)
      .toLowerCase();

    candidates.push({
      value: normaliseCapacity(amount, unit),
      amount,
      unit,
      amountGb:
        unit === "TB" ? amount * 1024 : amount,
      index,
      before,
      after,
    });
  }

  return candidates;
}

function hasMemoryLabel(
  candidate: CapacityCandidate
): boolean {
  const memoryBefore =
    /\b(ram|memory|ddr3|ddr4|ddr5|lpddr4|lpddr4x|lpddr5|lpddr5x|unified memory)\s*$/i;

  const memoryAfter =
    /^\s*(ram|memory|ddr3|ddr4|ddr5|lpddr4|lpddr4x|lpddr5|lpddr5x|unified memory)\b/i;

  return (
    memoryBefore.test(candidate.before) ||
    memoryAfter.test(candidate.after)
  );
}

function hasStorageLabel(
  candidate: CapacityCandidate
): boolean {
  const storageBefore =
    /\b(storage|ssd|nvme|hdd|hard drive|solid state|flash storage|emmc)\s*$/i;

  const storageAfter =
    /^\s*(storage|ssd|nvme|hdd|hard drive|solid state|flash storage|emmc)\b/i;

  return (
    storageBefore.test(candidate.before) ||
    storageAfter.test(candidate.after)
  );
}

function chooseLargest(
  candidates: CapacityCandidate[]
): CapacityCandidate | null {
  return (
    [...candidates].sort(
      (a, b) => b.amountGb - a.amountGb
    )[0] ?? null
  );
}

function chooseSmallest(
  candidates: CapacityCandidate[]
): CapacityCandidate | null {
  return (
    [...candidates].sort(
      (a, b) => a.amountGb - b.amountGb
    )[0] ?? null
  );
}

function withoutCandidate(
  candidates: CapacityCandidate[],
  selected: CapacityCandidate | null
): CapacityCandidate[] {
  return candidates.filter(
    candidate => candidate !== selected
  );
}

function parseMemoryProduct(
  candidates: CapacityCandidate[]
): CapacityResult {
  return {
    memory:
      chooseLargest(candidates)?.value ?? null,
    storage: null,
  };
}

function parseStorageProduct(
  candidates: CapacityCandidate[]
): CapacityResult {
  return {
    memory: null,
    storage:
      chooseLargest(candidates)?.value ?? null,
  };
}

function parseComputerLikeProduct(
  candidates: CapacityCandidate[]
): CapacityResult {
 let memory =
  candidates.find(hasMemoryLabel) ?? null;

let storage =
  candidates.find(hasStorageLabel) ?? null;

  if (memory === storage) {
    if (memory?.unit === "TB") {
      memory = null;
    } else {
      storage = null;
    }
  }

  let remaining = candidates.filter(
    candidate =>
      candidate !== memory &&
      candidate !== storage
  );

  if (!memory) {
    const likelyMemory = remaining.filter(
      candidate =>
        candidate.unit === "GB" &&
        candidate.amount <= 128
    );

    memory = chooseSmallest(likelyMemory);
    remaining = withoutCandidate(
      remaining,
      memory
    );
  }

  if (!storage) {
    const likelyStorage = remaining.filter(
      candidate =>
        candidate.unit === "TB" ||
        candidate.amount >= 64
    );

    storage = chooseLargest(likelyStorage);
  }

  // Common shorthand:
  // "16GB 512GB" means memory first, storage second.
  if (
    candidates.length >= 2 &&
    !memory &&
    !storage
  ) {
    memory = chooseSmallest(candidates);
    storage = chooseLargest(
      withoutCandidate(candidates, memory)
    );
  }

  return {
    memory: memory?.value ?? null,
    storage: storage?.value ?? null,
  };
}

function parsePhoneOrTablet(
  candidates: CapacityCandidate[]
): CapacityResult {
 let memory =
  candidates.find(hasMemoryLabel) ?? null;

let storage =
  candidates.find(hasStorageLabel) ?? null;

  if (memory === storage) {
    if (memory?.unit === "TB") {
      memory = null;
    } else {
      storage = null;
    }
  }

  let remaining = candidates.filter(
    candidate =>
      candidate !== memory &&
      candidate !== storage
  );

  if (!memory && remaining.length >= 2) {
    const likelyMemory = remaining.filter(
      candidate =>
        candidate.unit === "GB" &&
        candidate.amount <= 32
    );

    memory = chooseSmallest(likelyMemory);
    remaining = withoutCandidate(
      remaining,
      memory
    );
  }

  if (!storage) {
    storage = chooseLargest(remaining);
  }

  // A single unlabelled phone capacity is almost
  // always storage rather than memory.
  if (
    candidates.length === 1 &&
    !hasMemoryLabel(candidates[0])
  ) {
    memory = null;
    storage = candidates[0];
  }

  return {
    memory: memory?.value ?? null,
    storage: storage?.value ?? null,
  };
}

export function extractCapacities(
  title: string,
  productType: ProductType
): CapacityResult {
  const candidates =
    extractCapacityCandidates(title);

  if (candidates.length === 0) {
    return {
      memory: null,
      storage: null,
    };
  }

 switch (productType) {
  case "memory":
    return parseMemoryProduct(candidates);

  case "storage":
  case "console":
    return parseStorageProduct(candidates);

  case "laptop":
  case "gpu":
  case "motherboard":
    return parseComputerLikeProduct(
      candidates
    );

  case "phone":
  case "tablet":
    return parsePhoneOrTablet(candidates);

  default:
    return {
      memory:
        chooseLargest(
          candidates.filter(hasMemoryLabel)
        )?.value ?? null,

      storage:
        chooseLargest(
          candidates.filter(hasStorageLabel)
        )?.value ?? null,
    };
}
}