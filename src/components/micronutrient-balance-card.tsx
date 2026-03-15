import { micronutrientMeta, getPositiveGap } from "@/lib/nutrients";
import type { NutritionTotals } from "@/lib/types";

export function MicronutrientBalanceCard({
  title,
  description,
  target,
  actual,
}: {
  title: string;
  description: string;
  target: NutritionTotals | null;
  actual: NutritionTotals;
}) {
  if (!target) {
    return null;
  }

  return (
    <section className="app-card rounded-[2rem] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {micronutrientMeta.map((nutrient) => {
          const targetValue = target[nutrient.key];
          const actualValue = actual[nutrient.key];
          const gap = getPositiveGap(targetValue - actualValue);
          const complete = gap <= 0;

          return (
            <div
              key={nutrient.key}
              className={`flex items-center justify-between rounded-[1.2rem] px-4 py-3 ${
                complete ? "theme-completed" : "theme-elevated"
              }`}
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">{nutrient.label}</div>
                <div className="mt-1 text-xs text-slate-500">
                  Факт {actualValue} {nutrient.unit} • цель {targetValue} {nutrient.unit}
                </div>
              </div>
              <div className={`rounded-full px-3 py-2 text-xs font-semibold ${complete ? "theme-completed" : "theme-important"}`}>
                {complete ? "Закрыто" : `Не хватает ${gap} ${nutrient.unit}`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
