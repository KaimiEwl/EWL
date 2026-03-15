"use client";

export function NutrientTopUpCard({
  title = "Легко добрать",
  deficits,
  products,
}: {
  title?: string;
  deficits: string[];
  products: string[];
}) {
  if (!deficits.length || !products.length) {
    return null;
  }

  return (
    <section className="theme-important rounded-[2rem] px-5 py-5">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Подсказка по дню</div>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">Не добрали: {deficits.join(" • ")}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">Добрать легко: {products.join(", ")}</p>
    </section>
  );
}
