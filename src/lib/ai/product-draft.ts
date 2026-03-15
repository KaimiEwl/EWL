import type { ProductDraft } from "@/lib/types";
import type { ProductAiSuggestion } from "@/lib/ai/deepseek";

export function productSuggestionToDraft(product: ProductAiSuggestion): ProductDraft {
  return {
    name: product.name,
    icon: "",
    nutritionInputMode: "per100",
    proteinPer100: String(product.proteinPer100),
    fatPer100: String(product.fatPer100),
    carbsPer100: String(product.carbsPer100),
    kcalPer100: String(product.kcalPer100),
    fiberPer100: String(product.fiberPer100),
    magnesiumPer100: String(product.magnesiumPer100),
    ironPer100: String(product.ironPer100),
    zincPer100: String(product.zincPer100),
    omega3Per100: String(product.omega3Per100),
    vitaminB12Per100: String(product.vitaminB12Per100),
    unitMode: product.unitMode,
    unitLabel: product.unitLabel,
    gramsPerUnit: product.gramsPerUnit ? String(product.gramsPerUnit) : "",
  };
}
