import { spreadsheetProducts } from "@/lib/spreadsheet-products";
import type { Product } from "@/lib/types";

const curatedProducts: Product[] = [
  { id: "oatmeal", name: "Овсянка", icon: "🥣", proteinPer100: 12.3, fatPer100: 6.1, carbsPer100: 59.5, kcalPer100: 342, fiberPer100: 10.6, magnesiumPer100: 177, ironPer100: 4.7, zincPer100: 4, omega3Per100: 0.1, vitaminB12Per100: 0, searchTerms: ["Крупы: Овсянка"] },
  { id: "egg", name: "Яйцо", icon: "🥚", proteinPer100: 12.6, fatPer100: 9.5, carbsPer100: 0.7, kcalPer100: 143, fiberPer100: 0, magnesiumPer100: 12, ironPer100: 1.8, zincPer100: 1.3, omega3Per100: 0.1, vitaminB12Per100: 1.1, searchTerms: ["Яйца: Яйцо куриное"] },
  { id: "cottage-cheese", name: "Творог 5%", icon: "🧀", proteinPer100: 17, fatPer100: 5, carbsPer100: 3, kcalPer100: 121, fiberPer100: 0, magnesiumPer100: 23, ironPer100: 0.2, zincPer100: 0.4, omega3Per100: 0.1, vitaminB12Per100: 1 },
  { id: "greek-yogurt", name: "Греческий йогурт", icon: "🥛", proteinPer100: 8.5, fatPer100: 2.8, carbsPer100: 4.2, kcalPer100: 78, fiberPer100: 0, magnesiumPer100: 11, ironPer100: 0.1, zincPer100: 0.5, omega3Per100: 0, vitaminB12Per100: 0.8 },
  { id: "banana", name: "Банан", icon: "🍌", proteinPer100: 1.1, fatPer100: 0.3, carbsPer100: 22.8, kcalPer100: 89, fiberPer100: 2.6, magnesiumPer100: 27, ironPer100: 0.3, zincPer100: 0.2, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "apple", name: "Яблоко", icon: "🍎", proteinPer100: 0.3, fatPer100: 0.2, carbsPer100: 13.8, kcalPer100: 52, fiberPer100: 2.4, magnesiumPer100: 5, ironPer100: 0.1, zincPer100: 0, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "berries", name: "Ягоды", icon: "🫐", proteinPer100: 1, fatPer100: 0.5, carbsPer100: 8.7, kcalPer100: 47, fiberPer100: 4.3, magnesiumPer100: 19, ironPer100: 0.6, zincPer100: 0.4, omega3Per100: 0.1, vitaminB12Per100: 0 },
  { id: "almonds", name: "Миндаль", icon: "🌰", proteinPer100: 21.2, fatPer100: 49.9, carbsPer100: 9.1, kcalPer100: 579, fiberPer100: 12.5, magnesiumPer100: 270, ironPer100: 3.7, zincPer100: 3.1, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "chicken", name: "Куриная грудка", icon: "🍗", proteinPer100: 23.6, fatPer100: 1.9, carbsPer100: 0, kcalPer100: 113, fiberPer100: 0, magnesiumPer100: 29, ironPer100: 0.7, zincPer100: 1, omega3Per100: 0.1, vitaminB12Per100: 0.3, searchTerms: ["Мясо: Куриная грудка"] },
  { id: "turkey", name: "Индейка", icon: "🍗", proteinPer100: 21.6, fatPer100: 4.1, carbsPer100: 0, kcalPer100: 132, fiberPer100: 0, magnesiumPer100: 28, ironPer100: 1.4, zincPer100: 1.8, omega3Per100: 0, vitaminB12Per100: 1.1 },
  { id: "salmon", name: "Лосось", icon: "🐟", proteinPer100: 20, fatPer100: 13, carbsPer100: 0, kcalPer100: 208, fiberPer100: 0, magnesiumPer100: 29, ironPer100: 0.3, zincPer100: 0.6, omega3Per100: 2.3, vitaminB12Per100: 3.2 },
  { id: "tuna", name: "Тунец", icon: "🐟", proteinPer100: 24, fatPer100: 1, carbsPer100: 0, kcalPer100: 109, fiberPer100: 0, magnesiumPer100: 50, ironPer100: 1, zincPer100: 0.6, omega3Per100: 0.2, vitaminB12Per100: 2.2 },
  { id: "rice", name: "Рис", icon: "🍚", proteinPer100: 7, fatPer100: 0.6, carbsPer100: 74, kcalPer100: 333, fiberPer100: 2.8, magnesiumPer100: 116, ironPer100: 1.5, zincPer100: 1.8, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "buckwheat", name: "Гречка", icon: "🌾", proteinPer100: 12.6, fatPer100: 3.3, carbsPer100: 62.1, kcalPer100: 313, fiberPer100: 10, magnesiumPer100: 231, ironPer100: 2.2, zincPer100: 2.4, omega3Per100: 0.1, vitaminB12Per100: 0 },
  { id: "pasta", name: "Паста", icon: "🍝", proteinPer100: 11, fatPer100: 1.3, carbsPer100: 71.5, kcalPer100: 344, fiberPer100: 3.2, magnesiumPer100: 53, ironPer100: 1.3, zincPer100: 1, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "potato", name: "Картофель", icon: "🥔", proteinPer100: 2, fatPer100: 0.4, carbsPer100: 16.3, kcalPer100: 77, fiberPer100: 2.2, magnesiumPer100: 23, ironPer100: 0.8, zincPer100: 0.3, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "avocado", name: "Авокадо", icon: "🥑", proteinPer100: 2, fatPer100: 14.7, carbsPer100: 8.5, kcalPer100: 160, fiberPer100: 6.7, magnesiumPer100: 29, ironPer100: 0.6, zincPer100: 0.6, omega3Per100: 0.1, vitaminB12Per100: 0 },
  { id: "olive-oil", name: "Оливковое масло", icon: "🫒", proteinPer100: 0, fatPer100: 100, carbsPer100: 0, kcalPer100: 884, fiberPer100: 0, magnesiumPer100: 0, ironPer100: 0.6, zincPer100: 0, omega3Per100: 0.8, vitaminB12Per100: 0 },
  { id: "bread", name: "Хлеб цельнозерновой", icon: "🍞", proteinPer100: 12, fatPer100: 3.5, carbsPer100: 41, kcalPer100: 247, fiberPer100: 6.8, magnesiumPer100: 82, ironPer100: 2.7, zincPer100: 1.6, omega3Per100: 0.1, vitaminB12Per100: 0 },
  { id: "kefir", name: "Кефир", icon: "🥛", proteinPer100: 3.2, fatPer100: 2.5, carbsPer100: 4, kcalPer100: 51, fiberPer100: 0, magnesiumPer100: 12, ironPer100: 0.1, zincPer100: 0.4, omega3Per100: 0, vitaminB12Per100: 0.4 },
  { id: "cucumber", name: "Огурец", icon: "🥒", proteinPer100: 0.8, fatPer100: 0.1, carbsPer100: 2.8, kcalPer100: 15, fiberPer100: 0.5, magnesiumPer100: 13, ironPer100: 0.3, zincPer100: 0.2, omega3Per100: 0, vitaminB12Per100: 0 },
  { id: "tomato", name: "Помидор", icon: "🍅", proteinPer100: 1.1, fatPer100: 0.2, carbsPer100: 3.8, kcalPer100: 20, fiberPer100: 1.2, magnesiumPer100: 11, ironPer100: 0.3, zincPer100: 0.2, omega3Per100: 0, vitaminB12Per100: 0 },
  {
    id: "pizza",
    name: "Пицца",
    icon: "🍕",
    proteinPer100: 11,
    fatPer100: 11.5,
    carbsPer100: 28,
    kcalPer100: 260,
    unitMode: "piece",
    unitLabel: "кусок",
    gramsPerUnit: 140,
    searchTerms: ["Додо Пицца Чиризо"],
  },
  {
    id: "choco-pie",
    name: "Чоко Пай",
    icon: "🍫",
    proteinPer100: 3.6,
    fatPer100: 17.5,
    carbsPer100: 70,
    kcalPer100: 456,
    unitMode: "piece",
    unitLabel: "шт.",
    gramsPerUnit: 30,
    searchTerms: ["ЧОКО ПАЙ", "Сладости: Чоко Пай", "чокопай"],
  },
];

function normalizeName(name: string) {
  return name.trim().toLowerCase().replaceAll("ё", "е");
}

function getIconByProduct(product: Product) {
  if (product.icon?.trim()) {
    return product.icon;
  }

  const scope = `${product.name} ${product.notes ?? ""}`.toLowerCase();

  if (scope.includes("пиц")) return "🍕";
  if (scope.includes("шокол") || scope.includes("конф") || scope.includes("слад") || scope.includes("чоко")) return "🍫";
  if (scope.includes("масло")) return "🫒";
  if (scope.includes("рыб") || scope.includes("лосос") || scope.includes("тунец") || scope.includes("сельд")) return "🐟";
  if (scope.includes("мяс") || scope.includes("кур") || scope.includes("индей") || scope.includes("говя") || scope.includes("свин")) return "🍗";
  if (scope.includes("яйц")) return "🥚";
  if (scope.includes("мол") || scope.includes("сыр") || scope.includes("твор") || scope.includes("кеф") || scope.includes("йогур")) return "🥛";
  if (scope.includes("круп") || scope.includes("греч") || scope.includes("рис") || scope.includes("каш")) return "🍚";
  if (scope.includes("макарон") || scope.includes("паста")) return "🍝";
  if (scope.includes("овощ") || scope.includes("салат") || scope.includes("огур") || scope.includes("помид")) return "🥗";
  if (scope.includes("фрукт") || scope.includes("яблок") || scope.includes("банан")) return "🍎";
  if (scope.includes("ягод")) return "🫐";
  if (scope.includes("орех")) return "🥜";
  if (scope.includes("гриб")) return "🍄";
  if (scope.includes("хлеб")) return "🍞";
  if (scope.includes("напит") || scope.includes("кофе") || scope.includes("чай")) return "☕";
  if (scope.includes("боб")) return "🫘";
  if (scope.includes("колбас") || scope.includes("сосиск") || scope.includes("ветчин")) return "🥓";

  return undefined;
}

function withPresentation(product: Product): Product {
  return {
    ...product,
    icon: getIconByProduct(product),
  };
}

export function buildBaseProducts() {
  const existingNames = new Set(curatedProducts.map((product) => normalizeName(product.name)));

  return [
    ...curatedProducts.map(withPresentation),
    ...spreadsheetProducts
      .filter((product) => !existingNames.has(normalizeName(product.name)))
      .map(withPresentation),
  ];
}

export function mergeBuiltInProducts(products: Product[]) {
  const baseProducts = buildBaseProducts();
  const baseById = new Map(baseProducts.map((product) => [product.id, product]));

  const mergedExisting = products.map((existingProduct) => {
    const baseProduct = baseById.get(existingProduct.id);
    if (!baseProduct) {
      return withPresentation(existingProduct);
    }

    if (existingProduct.isCustom) {
      return withPresentation(existingProduct);
    }

    return withPresentation({
      ...existingProduct,
      ...baseProduct,
      archivedAt: existingProduct.archivedAt ?? null,
      createdAt: existingProduct.createdAt ?? baseProduct.createdAt,
      updatedAt: existingProduct.updatedAt ?? baseProduct.updatedAt,
      isCustom: existingProduct.isCustom,
    });
  });

  const existingIds = new Set(mergedExisting.map((product) => product.id));
  return [...mergedExisting, ...baseProducts.filter((product) => !existingIds.has(product.id))];
}
