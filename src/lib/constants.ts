import type { ActivityLevel, BuiltInMealType, FormulaCoefficients, FormulaMode } from "@/lib/types";

export const STORAGE_KEY = "ewl.mobile.v1";
export const BACKUP_STORAGE_KEY = "ewl.mobile.backups.v1";
export const STATE_VERSION = 5;
export const MAX_LOCAL_BACKUPS = 14;

export const FORMULA_PRESETS: Record<Exclude<FormulaMode, "custom">, FormulaCoefficients> = {
  lose: {
    proteinPerKg: 2,
    fatPerKg: 0.8,
    carbsPerKg: 0,
  },
  maintain: {
    proteinPerKg: 1.8,
    fatPerKg: 0.9,
    carbsPerKg: 0,
  },
  gain: {
    proteinPerKg: 1.8,
    fatPerKg: 1,
    carbsPerKg: 0,
  },
};

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
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
