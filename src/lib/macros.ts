import { ACTIVITY_MULTIPLIERS, FORMULA_PRESETS } from "@/lib/constants";
import type {
  ActivityLevel,
  FormulaCoefficients,
  FormulaMode,
  NutritionTotals,
  Product,
  UserProfile,
} from "@/lib/types";

export function roundMacro(value: number) {
  return Math.round(value * 10) / 10;
}

export function roundKcal(value: number) {
  return Math.round(value);
}

export function createEmptyNutrition(): NutritionTotals {
  return {
    protein: 0,
    fat: 0,
    carbs: 0,
    kcal: 0,
    fiber: 0,
    magnesium: 0,
    iron: 0,
    zinc: 0,
    omega3: 0,
    vitaminB12: 0,
  };
}

export function resolveProductKcal(product: Product) {
  if (typeof product.kcalPer100 === "number" && product.kcalPer100 > 0) {
    return product.kcalPer100;
  }

  return roundKcal(product.proteinPer100 * 4 + product.fatPer100 * 9 + product.carbsPer100 * 4);
}

export function normalizeFormulaMode(mode?: string | null): FormulaMode {
  if (mode === "lose" || mode === "maintain" || mode === "gain" || mode === "custom") {
    return mode;
  }

  if (mode === "standard") {
    return "maintain";
  }

  return "maintain";
}

export function normalizeActivityLevel(level?: string | null): ActivityLevel {
  if (level === "light" || level === "moderate" || level === "high") {
    return level;
  }

  return "sedentary";
}

export function resolveProfileFormula(
  profile: Pick<UserProfile, "formulaMode" | "weightKg" | "proteinPerKg" | "fatPerKg" | "carbsPerKg">,
): FormulaCoefficients {
  const mode = normalizeFormulaMode(profile.formulaMode);

  if (mode === "custom") {
    return {
      proteinPerKg: profile.proteinPerKg,
      fatPerKg: profile.fatPerKg,
      carbsPerKg: profile.carbsPerKg,
    };
  }

  const preset = FORMULA_PRESETS[mode];
  const weight = Math.max(profile.weightKg, 1);
  const protein = roundMacro(weight * preset.proteinPerKg);
  const fat = roundMacro(weight * preset.fatPerKg);
  const tdeeCalories = calculateCalorieTargetFromMifflin(profile as UserProfile);
  const carbs = roundMacro(Math.max(0, (tdeeCalories - (protein * 4 + fat * 9)) / 4));

  return {
    proteinPerKg: preset.proteinPerKg,
    fatPerKg: preset.fatPerKg,
    carbsPerKg: roundMacro(carbs / weight),
  };
}

export function calculateBmr(profile: Pick<UserProfile, "sex" | "weightKg" | "heightCm" | "age">) {
  const weight = Math.max(profile.weightKg, 0);
  const fallbackHeight = profile.sex === "male" ? 178 : 165;
  const height = Math.max(profile.heightCm ?? fallbackHeight, 0);
  const age = Math.max(profile.age ?? 30, 0);

  if (profile.sex === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }

  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTdee(profile: Pick<UserProfile, "sex" | "weightKg" | "heightCm" | "age" | "activityLevel">) {
  const bmr = calculateBmr(profile);
  const multiplier = ACTIVITY_MULTIPLIERS[normalizeActivityLevel(profile.activityLevel)];
  return bmr * multiplier;
}

function calculateCalorieTargetFromMifflin(
  profile: Pick<UserProfile, "sex" | "weightKg" | "heightCm" | "age" | "activityLevel" | "formulaMode">,
) {
  const tdee = calculateTdee(profile);
  const mode = normalizeFormulaMode(profile.formulaMode);

  if (mode === "lose") {
    return roundKcal(tdee * 0.85);
  }

  if (mode === "gain") {
    return roundKcal(tdee * 1.1);
  }

  return roundKcal(tdee);
}

export function calculateMicronutrientTargets(
  profile: Pick<UserProfile, "sex">,
  kcalTarget: number,
): Pick<NutritionTotals, "fiber" | "magnesium" | "iron" | "zinc" | "omega3" | "vitaminB12"> {
  const female = profile.sex === "female";

  return {
    fiber: roundMacro((kcalTarget / 1000) * 14),
    magnesium: female ? 310 : 400,
    iron: female ? 18 : 8,
    zinc: female ? 8 : 11,
    omega3: female ? 1.1 : 1.6,
    vitaminB12: 2.4,
  };
}

export function calculateTargets(profile: UserProfile): NutritionTotals {
  const mode = normalizeFormulaMode(profile.formulaMode);
  const weight = Math.max(profile.weightKg, 0);

  let protein = 0;
  let fat = 0;
  let carbs = 0;
  let kcal = 0;

  if (mode === "custom") {
    protein = roundMacro(weight * profile.proteinPerKg);
    fat = roundMacro(weight * profile.fatPerKg);
    carbs = roundMacro(weight * profile.carbsPerKg);
    kcal = roundKcal(protein * 4 + fat * 9 + carbs * 4);
  } else {
    const coefficients = FORMULA_PRESETS[mode];
    kcal = calculateCalorieTargetFromMifflin(profile);
    protein = roundMacro(weight * coefficients.proteinPerKg);
    fat = roundMacro(weight * coefficients.fatPerKg);
    carbs = roundMacro(Math.max(0, (kcal - (protein * 4 + fat * 9)) / 4));
  }

  return {
    protein,
    fat,
    carbs,
    kcal,
    ...calculateMicronutrientTargets(profile, kcal),
  };
}

export function calculateProductNutrition(product: Product, grams: number): NutritionTotals {
  const ratio = grams / 100;

  return {
    protein: roundMacro(product.proteinPer100 * ratio),
    fat: roundMacro(product.fatPer100 * ratio),
    carbs: roundMacro(product.carbsPer100 * ratio),
    kcal: roundKcal(resolveProductKcal(product) * ratio),
    fiber: roundMacro((product.fiberPer100 ?? 0) * ratio),
    magnesium: roundMacro((product.magnesiumPer100 ?? 0) * ratio),
    iron: roundMacro((product.ironPer100 ?? 0) * ratio),
    zinc: roundMacro((product.zincPer100 ?? 0) * ratio),
    omega3: roundMacro((product.omega3Per100 ?? 0) * ratio),
    vitaminB12: roundMacro((product.vitaminB12Per100 ?? 0) * ratio),
  };
}

export function sumNutrition(values: NutritionTotals[]) {
  return values.reduce<NutritionTotals>(
    (acc, item) => ({
      protein: roundMacro(acc.protein + item.protein),
      fat: roundMacro(acc.fat + item.fat),
      carbs: roundMacro(acc.carbs + item.carbs),
      kcal: roundKcal(acc.kcal + item.kcal),
      fiber: roundMacro(acc.fiber + item.fiber),
      magnesium: roundMacro(acc.magnesium + item.magnesium),
      iron: roundMacro(acc.iron + item.iron),
      zinc: roundMacro(acc.zinc + item.zinc),
      omega3: roundMacro(acc.omega3 + item.omega3),
      vitaminB12: roundMacro(acc.vitaminB12 + item.vitaminB12),
    }),
    createEmptyNutrition(),
  );
}

export function subtractNutrition(target: NutritionTotals, actual: NutritionTotals): NutritionTotals {
  return {
    protein: roundMacro(target.protein - actual.protein),
    fat: roundMacro(target.fat - actual.fat),
    carbs: roundMacro(target.carbs - actual.carbs),
    kcal: roundKcal(target.kcal - actual.kcal),
    fiber: roundMacro(target.fiber - actual.fiber),
    magnesium: roundMacro(target.magnesium - actual.magnesium),
    iron: roundMacro(target.iron - actual.iron),
    zinc: roundMacro(target.zinc - actual.zinc),
    omega3: roundMacro(target.omega3 - actual.omega3),
    vitaminB12: roundMacro(target.vitaminB12 - actual.vitaminB12),
  };
}
