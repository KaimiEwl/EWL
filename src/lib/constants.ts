import type { BuiltInMealType, FormulaCoefficients } from "@/lib/types";

export const STORAGE_KEY = "ewl.mobile.v1";
export const BACKUP_STORAGE_KEY = "ewl.mobile.backups.v1";
export const STATE_VERSION = 3;
export const MAX_LOCAL_BACKUPS = 14;

export const STANDARD_FORMULA: FormulaCoefficients = {
  proteinPerKg: 1.6,
  fatPerKg: 0.9,
  carbsPerKg: 3,
};

export const mealOrder: BuiltInMealType[] = ["breakfast", "lunch", "snack", "dinner"];

export const mealLabels: Record<BuiltInMealType, string> = {
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус",
};

export const mealHints: Record<BuiltInMealType, string> = {
  breakfast: "Спокойный старт дня",
  lunch: "Основной прием пищи",
  dinner: "Вечерний прием пищи",
  snack: "Небольшой прием между делом",
};
