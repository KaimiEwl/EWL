"use client";

import { useMemo, useState } from "react";
import { getAutoKcalFromDraft, toProductDraft, validateProductDraft } from "@/lib/products";
import type { Product, ProductDraft } from "@/lib/types";

const inputClass =
  "mt-2 h-12 w-full rounded-[1rem] border border-[var(--color-outline)] bg-white px-4 text-[15px] outline-none";

export function ProductFormSheet({
  mode,
  product,
  usageCount = 0,
  onClose,
  onSave,
  onDelete,
}: {
  mode: "create" | "edit";
  product?: Product;
  usageCount?: number;
  onClose: () => void;
  onSave: (draft: ProductDraft) => void;
  onDelete?: () => void;
}) {
  const [draft, setDraft] = useState<ProductDraft>(() => toProductDraft(product));
  const validation = useMemo(() => validateProductDraft(draft), [draft]);
  const autoKcal = useMemo(() => getAutoKcalFromDraft(draft), [draft]);

  return (
    <div className="theme-overlay fixed inset-0 z-[60] flex items-end p-3">
      <div className="w-full max-w-md rounded-[2rem] bg-[#fffdfa] p-4 shadow-[0_24px_70px_rgba(35,43,53,0.24)]">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === "create" ? "Новый продукт" : "Редактировать продукт"}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {mode === "create"
                ? "Добавьте продукт в свою базу, и он сразу появится в поиске."
                : "Можно менять локальную карточку продукта, и изменения сразу попадут в приложение."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="theme-elevated rounded-full px-3 py-2 text-sm font-semibold text-slate-600"
          >
            Закрыть
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          <label className="text-sm font-medium text-slate-600">
            Название
            <input
              className={inputClass}
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="Например, сырники"
            />
          </label>

          <label className="text-sm font-medium text-slate-600">
            Иконка
            <input
              className={inputClass}
              value={draft.icon}
              onChange={(event) => setDraft({ ...draft, icon: event.target.value })}
              placeholder="Опционально: 🥗"
            />
          </label>

          <div>
            <div className="text-sm font-medium text-slate-600">Как добавлять продукт</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDraft({ ...draft, unitMode: "grams", unitLabel: "", gramsPerUnit: "" })}
                className={`min-h-11 rounded-[1rem] px-4 py-3 text-sm font-semibold ${
                  draft.unitMode === "grams"
                    ? "theme-switcher-tab-active text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                По граммам
              </button>
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    ...draft,
                    unitMode: "piece",
                    unitLabel: draft.unitLabel || "шт.",
                    gramsPerUnit: draft.gramsPerUnit || "100",
                  })
                }
                className={`min-h-11 rounded-[1rem] px-4 py-3 text-sm font-semibold ${
                  draft.unitMode === "piece"
                    ? "theme-switcher-tab-active text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                По штукам
              </button>
            </div>
          </div>

          {draft.unitMode === "piece" ? (
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium text-slate-600">
                Единица
                <input
                  className={inputClass}
                  value={draft.unitLabel}
                  onChange={(event) => setDraft({ ...draft, unitLabel: event.target.value })}
                  placeholder="кусок"
                />
              </label>
              <label className="text-sm font-medium text-slate-600">
                Граммов в 1 шт.
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  step="1"
                  value={draft.gramsPerUnit}
                  onChange={(event) => setDraft({ ...draft, gramsPerUnit: event.target.value })}
                />
              </label>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-medium text-slate-600">
              Белки / 100 г
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.1"
                value={draft.proteinPer100}
                onChange={(event) => setDraft({ ...draft, proteinPer100: event.target.value })}
              />
            </label>
            <label className="text-sm font-medium text-slate-600">
              Жиры / 100 г
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.1"
                value={draft.fatPer100}
                onChange={(event) => setDraft({ ...draft, fatPer100: event.target.value })}
              />
            </label>
            <label className="text-sm font-medium text-slate-600">
              Углеводы / 100 г
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.1"
                value={draft.carbsPer100}
                onChange={(event) => setDraft({ ...draft, carbsPer100: event.target.value })}
              />
            </label>
            <label className="text-sm font-medium text-slate-600">
              Ккал / 100 г
              <input
                className={inputClass}
                type="number"
                min="0"
                step="1"
                value={draft.kcalPer100}
                onChange={(event) => setDraft({ ...draft, kcalPer100: event.target.value })}
                placeholder={`Авто: ${autoKcal}`}
              />
            </label>
          </div>
        </div>

        <div className="theme-important mt-4 rounded-[1.25rem] px-4 py-3 text-sm">
          <div className="font-semibold text-slate-800">Калории</div>
          <div className="mt-1">
            {draft.kcalPer100.trim()
              ? `Использую ${draft.kcalPer100} ккал на 100 г.`
              : `Автоматически считаю ${autoKcal} ккал по формуле 4/9/4.`}
          </div>
        </div>

        {!validation.valid ? (
          <div className="theme-status-warning mt-4 rounded-[1.1rem] px-4 py-3 text-sm">
            {validation.message}
          </div>
        ) : null}

        {mode === "edit" && onDelete ? (
          <div className="mt-4 rounded-[1.25rem] bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-500">
            {usageCount > 0
              ? "Если удалить этот продукт, он станет архивным и сохранится в старых записях."
              : "Этот продукт пока не использовался, поэтому его можно удалить полностью."}
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-3">
          {mode === "edit" && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="theme-status-warning rounded-[1rem] px-4 py-3 text-sm font-semibold"
            >
              Удалить
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onSave(draft)}
            disabled={!validation.valid}
            className="theme-accent-button ml-auto rounded-[1rem] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
          >
            {mode === "create" ? "Сохранить продукт" : "Сохранить изменения"}
          </button>
        </div>
      </div>
    </div>
  );
}
