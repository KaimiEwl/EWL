"use client";

import { useEffect, useState } from "react";
import { ProductAvatar } from "@/components/product-avatar";
import {
  formatAmountValue,
  formatMealItemQuantity,
  getMealItemAmount,
  getProductQuantityMode,
  toMealItemQuantity,
} from "@/lib/products";
import type { DayMealRow } from "@/lib/types";

export function MealItemRow({
  row,
  onUpdateQuantity,
  onDelete,
}: {
  row: DayMealRow;
  onUpdateQuantity: (payload: { grams: number; quantityMode?: "grams" | "piece"; servings?: number | null }) => void;
  onDelete: () => void;
}) {
  const mode = getProductQuantityMode(row.product);
  const currentAmount = getMealItemAmount(row.product, row.item);
  const [draft, setDraft] = useState(formatAmountValue(currentAmount));

  useEffect(() => {
    setDraft(formatAmountValue(currentAmount));
  }, [currentAmount]);

  const currentQuantity = toMealItemQuantity(row.product, currentAmount);
  const nextAmount = Number(draft.replace(",", "."));
  const nextQuantity =
    Number.isFinite(nextAmount) && nextAmount > 0 ? toMealItemQuantity(row.product, nextAmount) : null;
  const hasChanges = Boolean(
    nextQuantity &&
      (nextQuantity.grams !== currentQuantity.grams ||
        nextQuantity.quantityMode !== currentQuantity.quantityMode ||
        (nextQuantity.servings ?? null) !== (currentQuantity.servings ?? null)),
  );

  const stepChange = (step: number) => {
    const draftValue = Number(draft.replace(",", "."));
    const baseValue = Number.isFinite(draftValue) && draftValue > 0 ? draftValue : currentAmount;
    const nextValue = Math.max(0.1, Math.round((baseValue + step) * 10) / 10);
    setDraft(formatAmountValue(nextValue));
  };

  const saveDraft = () => {
    if (!nextQuantity) {
      setDraft(formatAmountValue(currentAmount));
      return;
    }

    onUpdateQuantity(nextQuantity);
  };

  const steps = mode === "piece" ? [-1, -0.5, 0.5, 1] : [-10, -5, 5, 10];

  return (
    <div className="rounded-[1.5rem] bg-white/88 p-4">
      <div className="flex items-start gap-3">
        <ProductAvatar icon={row.product.icon} name={row.product.name} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-slate-900">{row.product.name}</p>
              <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-500">
                {row.product.isCustom ? (
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-1 text-[var(--color-accent)]">
                    Свой продукт
                  </span>
                ) : null}
                <span className="theme-elevated rounded-full px-2 py-1">{row.nutrition.kcal} ккал</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onDelete}
              className="theme-status-warning rounded-full px-3 py-1.5 text-xs font-semibold"
            >
              Удалить
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <div className="rounded-[1rem] bg-slate-50 px-3 py-2">Б {row.nutrition.protein}</div>
            <div className="rounded-[1rem] bg-slate-50 px-3 py-2">Ж {row.nutrition.fat}</div>
            <div className="rounded-[1rem] bg-slate-50 px-3 py-2">У {row.nutrition.carbs}</div>
            <div className="rounded-[1rem] bg-slate-50 px-3 py-2">{formatMealItemQuantity(row.product, row.item)}</div>
          </div>

          <div className="mt-3 grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-2">
            <button
              type="button"
              onClick={() => stepChange(steps[0])}
              className="h-11 rounded-[1rem] bg-slate-100 px-3 text-sm font-semibold text-slate-700"
            >
              {steps[0]}
            </button>
            <button
              type="button"
              onClick={() => stepChange(steps[1])}
              className="h-11 rounded-[1rem] bg-slate-100 px-3 text-sm font-semibold text-slate-700"
            >
              {steps[1]}
            </button>
            <input
              type="number"
              min="0.1"
              step={mode === "piece" ? "0.5" : "1"}
              inputMode="decimal"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="h-11 min-w-0 rounded-[1rem] border border-[var(--color-outline)] bg-white px-3 text-center text-base font-semibold outline-none"
            />
            <button
              type="button"
              onClick={() => stepChange(steps[2])}
              className="theme-status-positive h-11 rounded-[1rem] px-3 text-sm font-semibold"
            >
              +{steps[2]}
            </button>
            <button
              type="button"
              onClick={() => stepChange(steps[3])}
              className="theme-status-positive h-11 rounded-[1rem] px-3 text-sm font-semibold"
            >
              +{steps[3]}
            </button>
          </div>

          {hasChanges ? (
            <button
              type="button"
              onClick={saveDraft}
              className="theme-accent-button mt-3 h-11 w-full rounded-[1rem] px-4 text-sm font-semibold"
            >
              Сохранить
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
