export const DEBUG = false;

export function log(
  ...args: unknown[]
): void {
  if (!DEBUG) return;

  console.log(...args);
}

export function dir(
  ...args: unknown[]
): void {
  if (!DEBUG) return;

  console.dir(...args);
}