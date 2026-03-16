import { micronutrientMeta, getPositiveGap } from "@/lib/nutrients";
import type { DaySummary } from "@/lib/types";

export function formatDayAiContext(summary: DaySummary) {
  const target = summary.target;
  const balance = summary.balance;

  return [
    `Факт: ${summary.totals.kcal} ккал, Б ${summary.totals.protein}, Ж ${summary.totals.fat}, У ${summary.totals.carbs}.`,
    `Цель: ${target?.kcal ?? 0} ккал, Б ${target?.protein ?? 0}, Ж ${target?.fat ?? 0}, У ${target?.carbs ?? 0}.`,
    `Остаток: ${balance?.kcal ?? 0} ккал, Б ${balance?.protein ?? 0}, Ж ${balance?.fat ?? 0}, У ${balance?.carbs ?? 0}.`,
    `Нутриенты: ${micronutrientMeta
      .map((nutrient) => `${nutrient.label} ${getPositiveGap((target?.[nutrient.key] ?? 0) - summary.totals[nutrient.key])} ${nutrient.unit}`)
      .join(", ")}.`,
  ].join(" ");
}

export function getMissingDayNutrients(summary: DaySummary, limit = 4) {
  if (!summary.target) {
    return [];
  }

  return micronutrientMeta
    .map((nutrient) => {
      const gap = getPositiveGap(summary.target![nutrient.key] - summary.totals[nutrient.key]);
      return gap > 0 ? `${nutrient.label} ${gap} ${nutrient.unit}` : null;
    })
    .filter((item): item is string => Boolean(item))
    .slice(0, limit);
}

export function buildDayTopUpQuestion(summary: DaySummary) {
  const missingNutrients = getMissingDayNutrients(summary, 4);
  const nutrientLine = missingNutrients.length
    ? `Не хватает: ${missingNutrients.join(", ")}.`
    : "Посмотри, чего может не хватать по нутриентам.";

  return [
    "Посоветуй коротко, чем лучше закрыть день.",
    nutrientLine,
    "Учитывай уже съеденные калории и остаток по дню.",
    "Ответь очень коротко: 2-4 варианта еды с примерной порцией и почему это подходит.",
    "Если калории уже закрыты, предложи самые легкие варианты или скажи, что день можно просто спокойно завершить.",
  ].join(" ");
}
