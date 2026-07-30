import { appleChips } from "./chips";

export function getAppleChipKnowledge(
    chip: string | null
) {

    if (!chip) {
        return null;
    }

    return appleChips[chip] ?? null;
}