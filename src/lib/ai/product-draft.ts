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

function takeExistingOrNext(current: string, next: string) {
  return current.trim() ? current : next;
}

export function mergeSuggestionIntoDraft(currentDraft: ProductDraft, suggestion: ProductAiSuggestion): ProductDraft {
  const nextDraft = productSuggestionToDraft(suggestion);

  return {
    ...currentDraft,
    name: takeExistingOrNext(currentDraft.name, nextDraft.name),
    icon: takeExistingOrNext(currentDraft.icon, nextDraft.icon),
    nutritionInputMode: currentDraft.nutritionInputMode,
    proteinPer100: takeExistingOrNext(currentDraft.proteinPer100, nextDraft.proteinPer100),
    fatPer100: takeExistingOrNext(currentDraft.fatPer100, nextDraft.fatPer100),
    carbsPer100: takeExistingOrNext(currentDraft.carbsPer100, nextDraft.carbsPer100),
    kcalPer100: takeExistingOrNext(currentDraft.kcalPer100, nextDraft.kcalPer100),
    fiberPer100: takeExistingOrNext(currentDraft.fiberPer100, nextDraft.fiberPer100),
    magnesiumPer100: takeExistingOrNext(currentDraft.magnesiumPer100, nextDraft.magnesiumPer100),
    ironPer100: takeExistingOrNext(currentDraft.ironPer100, nextDraft.ironPer100),
    zincPer100: takeExistingOrNext(currentDraft.zincPer100, nextDraft.zincPer100),
    omega3Per100: takeExistingOrNext(currentDraft.omega3Per100, nextDraft.omega3Per100),
    vitaminB12Per100: takeExistingOrNext(currentDraft.vitaminB12Per100, nextDraft.vitaminB12Per100),
    unitMode: currentDraft.unitMode,
    unitLabel: takeExistingOrNext(currentDraft.unitLabel, nextDraft.unitLabel),
    gramsPerUnit: takeExistingOrNext(currentDraft.gramsPerUnit, nextDraft.gramsPerUnit),
  };
}
