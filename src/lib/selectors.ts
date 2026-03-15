import { mealLabels, mealOrder } from "@/lib/constants";
import { getVisibleProducts } from "@/lib/products";
import {
  calculateProductNutrition,
  calculateTargets,
  createEmptyNutrition,
  subtractNutrition,
  sumNutrition,
} from "@/lib/macros";
import type {
  DayMealRow,
  DaySummary,
  MealType,
  NutritionTotals,
  PersistedAppState,
  Product,
  UserProfile,
} from "@/lib/types";

type SuggestionPreset = {
  title: string;
  description: string;
  keywords: string[];
};

const suggestionPresets: SuggestionPreset[] = [
  {
    title: "Добрать белок",
    description: "Сделайте упор на белок без лишней тяжести.",
    keywords: ["кур", "индей", "твор", "йогур", "яйц", "рыб", "тунец", "лосос", "крев"],
  },
  {
    title: "Добрать углеводы",
    description: "Спокойно доберите энергию на день.",
    keywords: ["рис", "греч", "овся", "банан", "карто", "макарон", "хлеб", "булгур"],
  },
  {
    title: "Добрать жиры",
    description: "Подойдет небольшой плотный продукт.",
    keywords: ["авок", "орех", "сыр", "масл", "семеч"],
  },
];

export function getSelectedUser(state: PersistedAppState) {
  return state.profiles.find((profile) => profile.id === state.selectedUserId) ?? state.profiles[0] ?? null;
}

export function getUserById(state: PersistedAppState, userId: string) {
  return state.profiles.find((profile) => profile.id === userId) ?? null;
}

export function getProductMap(products: Product[]) {
  return new Map(products.map((product) => [product.id, product]));
}

export function getActiveProducts(state: PersistedAppState) {
  return getVisibleProducts(state.products);
}

export function getRecentProducts(state: PersistedAppState, userId: string) {
  const productMap = getProductMap(state.products);
  const recentIds = state.recentProductsByUser[userId] ?? [];

  return recentIds
    .map((productId) => productMap.get(productId))
    .filter((product): product is Product => Boolean(product && !product.archivedAt));
}

export function getDayEntry(state: PersistedAppState, userId: string, date: string) {
  return state.dayEntries.find((entry) => entry.userId === userId && entry.date === date);
}

export function getProductUsageCount(state: PersistedAppState, productId: string) {
  return state.mealItems.filter((item) => item.productId === productId).length;
}

export function getDaySummary(state: PersistedAppState, user: UserProfile | null, date: string): DaySummary {
  if (!user) {
    return {
      items: [],
      totals: createEmptyNutrition(),
      target: null,
      balance: null,
    };
  }

  const entry = getDayEntry(state, user.id, date);
  const productMap = getProductMap(state.products);
  const items = state.mealItems
    .filter((item) => item.dayEntryId === entry?.id)
    .sort((left, right) => {
      const leftIndex = mealOrder.indexOf(left.mealType === "custom" ? "dinner" : left.mealType);
      const rightIndex = mealOrder.indexOf(right.mealType === "custom" ? "dinner" : right.mealType);

      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      if ((left.mealLabel ?? "") !== (right.mealLabel ?? "")) {
        return (left.mealLabel ?? "").localeCompare(right.mealLabel ?? "", "ru");
      }

      return left.sortOrder - right.sortOrder;
    })
    .flatMap<DayMealRow>((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        return [];
      }

      return [
        {
          item,
          product,
          nutrition: calculateProductNutrition(product, item.grams),
        },
      ];
    });

  const target = calculateTargets(user);
  const totals = sumNutrition(items.map((item) => item.nutrition));

  return {
    entry,
    items,
    totals,
    target,
    balance: subtractNutrition(target, totals),
  };
}

export function getMealSections(summary: DaySummary) {
  const baseSections = mealOrder.map((mealType) => ({
    id: mealType,
    mealType,
    label: mealLabels[mealType],
    rows: summary.items.filter((item) => item.item.mealType === mealType),
  }));

  const customGroups = new Map<string, DayMealRow[]>();
  for (const row of summary.items.filter((item) => item.item.mealType === "custom")) {
    const label = row.item.mealLabel?.trim() || "Доп. прием";
    const current = customGroups.get(label) ?? [];
    customGroups.set(label, [...current, row]);
  }

  const customSections = [...customGroups.entries()].map(([label, rows], index) => ({
    id: `custom-${index}-${label}`,
    mealType: "custom" as const,
    label,
    rows,
  }));

  return [...baseSections, ...customSections];
}

export function getItemsByMeal(summary: DaySummary) {
  return mealOrder.reduce<Record<MealType, DayMealRow[]>>(
    (acc, mealType) => {
      acc[mealType] = summary.items.filter((item) => item.item.mealType === mealType);
      return acc;
    },
    {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      custom: [],
    },
  );
}

export function getMealTotals(rows: DayMealRow[]) {
  return sumNutrition(rows.map((row) => row.nutrition));
}

function getSuggestedPortion(product: Product) {
  if (product.unitMode === "piece" && (product.gramsPerUnit ?? 0) > 0) {
    return {
      grams: Math.max(1, Math.round(product.gramsPerUnit ?? 0)),
      label: `1 ${product.unitLabel?.trim() || "шт."}`,
    };
  }

  return {
    grams: 100,
    label: "100 г",
  };
}

function matchesSuggestionPreset(product: Product, keywords: string[]) {
  const haystack = `${product.name} ${(product.searchTerms ?? []).join(" ")}`.toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword));
}

function pickSuggestionPreset(balance: NutritionTotals) {
  const positiveProtein = Math.max(balance.protein, 0);
  const positiveFat = Math.max(balance.fat, 0);
  const positiveCarbs = Math.max(balance.carbs, 0);

  if (positiveProtein >= positiveFat && positiveProtein >= positiveCarbs) {
    return suggestionPresets[0];
  }

  if (positiveCarbs >= positiveProtein && positiveCarbs >= positiveFat) {
    return suggestionPresets[1];
  }

  return suggestionPresets[2];
}

export function getDaySuggestion(summary: DaySummary, products: Product[]) {
  if (!summary.target || !summary.balance) {
    return null;
  }

  if (summary.balance.kcal <= 0) {
    return {
      title: "Цель на день уже закрыта",
      description: "Можно оставить только воду, чай или легкий овощной перекус без спешки.",
    };
  }

  const preset = pickSuggestionPreset(summary.balance);
  const preferredProducts = getVisibleProducts(products).filter((product) =>
    matchesSuggestionPreset(product, preset.keywords),
  );
  const candidates = preferredProducts.length ? preferredProducts : getVisibleProducts(products);

  const recommended = candidates
    .map((product) => {
      const portion = getSuggestedPortion(product);
      const nutrition = calculateProductNutrition(product, portion.grams);
      const kcalGap = Math.abs(summary.balance!.kcal - nutrition.kcal);
      const proteinScore = Math.min(nutrition.protein, Math.max(summary.balance!.protein, 0)) * 5;
      const carbScore = Math.min(nutrition.carbs, Math.max(summary.balance!.carbs, 0)) * 3;
      const fatScore = Math.min(nutrition.fat, Math.max(summary.balance!.fat, 0)) * 2;
      const overflowPenalty = nutrition.kcal > summary.balance!.kcal + 120 ? 200 : 0;

      return {
        product,
        portion,
        nutrition,
        score: proteinScore + carbScore + fatScore - kcalGap / 10 - overflowPenalty,
      };
    })
    .sort((left, right) => right.score - left.score)[0];

  if (!recommended) {
    return null;
  }

  return {
    title: preset.title,
    description: `${preset.description} Попробуйте ${recommended.product.name.toLowerCase()} — ${recommended.portion.label}, это примерно ${recommended.nutrition.kcal} ккал.`,
  };
}

export function getMonthSummaryMap(state: PersistedAppState, user: UserProfile | null, monthDate: Date) {
  const result = new Map<
    string,
    {
      totals: NutritionTotals;
      target: NutritionTotals;
      hasItems: boolean;
      isOver: boolean;
    }
  >();

  if (!user) {
    return result;
  }

  const target = calculateTargets(user);
  const entries = state.dayEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entry.userId === user.id &&
      entryDate.getMonth() === monthDate.getMonth() &&
      entryDate.getFullYear() === monthDate.getFullYear()
    );
  });

  for (const entry of entries) {
    const rows = state.mealItems.filter((item) => item.dayEntryId === entry.id);
    const totals = sumNutrition(
      rows.flatMap((item) => {
        const product = state.products.find((candidate) => candidate.id === item.productId);
        return product ? [calculateProductNutrition(product, item.grams)] : [];
      }),
    );

    result.set(entry.date, {
      totals,
      target,
      hasItems: rows.length > 0,
      isOver: totals.kcal > target.kcal,
    });
  }

  return result;
}

export function getMonthStats(state: PersistedAppState, user: UserProfile | null, monthDate: Date) {
  const summaryMap = getMonthSummaryMap(state, user, monthDate);
  const filled = [...summaryMap.values()].filter((entry) => entry.hasItems);

  if (!filled.length) {
    return {
      average: createEmptyNutrition(),
      daysAbove: 0,
      daysWithin: 0,
      daysLogged: 0,
      totalTargetKcal: 0,
      totalActualKcal: 0,
      totalBalanceKcal: 0,
      totalTargetNutrition: createEmptyNutrition(),
      totalActualNutrition: createEmptyNutrition(),
      totalBalanceNutrition: createEmptyNutrition(),
    };
  }

  const totals = sumNutrition(filled.map((entry) => entry.totals));
  const targetTotals = sumNutrition(filled.map((entry) => entry.target));

  return {
    average: {
      protein: Math.round((totals.protein / filled.length) * 10) / 10,
      fat: Math.round((totals.fat / filled.length) * 10) / 10,
      carbs: Math.round((totals.carbs / filled.length) * 10) / 10,
      kcal: Math.round(totals.kcal / filled.length),
      fiber: Math.round((totals.fiber / filled.length) * 10) / 10,
      magnesium: Math.round((totals.magnesium / filled.length) * 10) / 10,
      iron: Math.round((totals.iron / filled.length) * 10) / 10,
      zinc: Math.round((totals.zinc / filled.length) * 10) / 10,
      omega3: Math.round((totals.omega3 / filled.length) * 10) / 10,
      vitaminB12: Math.round((totals.vitaminB12 / filled.length) * 10) / 10,
    },
    daysAbove: filled.filter((entry) => entry.isOver).length,
    daysWithin: filled.filter((entry) => !entry.isOver).length,
    daysLogged: filled.length,
    totalTargetKcal: targetTotals.kcal,
    totalActualKcal: totals.kcal,
    totalBalanceKcal: targetTotals.kcal - totals.kcal,
    totalTargetNutrition: targetTotals,
    totalActualNutrition: totals,
    totalBalanceNutrition: subtractNutrition(targetTotals, totals),
  };
}
