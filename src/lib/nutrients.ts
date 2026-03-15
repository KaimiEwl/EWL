import type { NutritionTotals } from "@/lib/types";

export const micronutrientMeta: Array<{
  key: keyof Pick<NutritionTotals, "fiber" | "magnesium" | "iron" | "zinc" | "omega3" | "vitaminB12">;
  label: string;
  unit: string;
}> = [
  { key: "fiber", label: "Клетчатка", unit: "г" },
  { key: "magnesium", label: "Магний", unit: "мг" },
  { key: "iron", label: "Железо", unit: "мг" },
  { key: "zinc", label: "Цинк", unit: "мг" },
  { key: "omega3", label: "Омега-3", unit: "г" },
  { key: "vitaminB12", label: "B12", unit: "мкг" },
];

export function getPositiveGap(value: number) {
  return Math.max(0, Math.round(value * 10) / 10);
}
