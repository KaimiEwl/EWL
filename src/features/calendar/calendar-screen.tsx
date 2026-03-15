"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { MicronutrientBalanceCard } from "@/components/micronutrient-balance-card";
import { MonthCalendar } from "@/components/month-calendar";
import { getMonthStats, getMonthSummaryMap, getSelectedUser } from "@/lib/selectors";
import { useAppStore } from "@/store/app-store";

export function CalendarScreen() {
  const { state } = useAppStore();
  const router = useRouter();
  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string>();

  if (!state.hydrated) {
    return <div className="app-card rounded-[2rem] p-6 text-sm text-slate-500">Собираю календарь...</div>;
  }

  const user = getSelectedUser(state);
  if (!user) {
    return (
      <EmptyState
        title="Календарь появится после создания профиля"
        description="Как только у пользователя будут дни с приемами пищи, здесь появится история и статистика."
      />
    );
  }

  const summaryMap = getMonthSummaryMap(state, user, monthDate);
  const stats = getMonthStats(state, user, monthDate);
  const now = new Date();
  const isCurrentMonth =
    monthDate.getMonth() === now.getMonth() && monthDate.getFullYear() === now.getFullYear();
  const isFutureMonth =
    monthDate.getFullYear() > now.getFullYear() ||
    (monthDate.getFullYear() === now.getFullYear() && monthDate.getMonth() > now.getMonth());
  const canShowFinalMonthResult = !isCurrentMonth && !isFutureMonth && stats.daysLogged > 0;
  const monthResultPositive = stats.totalBalanceKcal >= 0;

  return (
    <div className="space-y-4">
      <MonthCalendar
        monthDate={monthDate}
        selectedDate={selectedDate}
        summaryMap={summaryMap}
        onChangeMonth={(amount) => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + amount, 1))}
        onSelectDate={(date) => {
          setSelectedDate(date);
          router.push(`/plan?date=${date}`);
        }}
      />

      <section className="app-card rounded-[2rem] p-5">
        <h2 className="text-lg font-semibold text-slate-900">Статистика месяца</h2>

        {stats.daysLogged ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[1.35rem] bg-white px-4 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Заполнено дней</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.daysLogged}</div>
            </div>
            <div className="rounded-[1.35rem] bg-white px-4 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Средние ккал</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.average.kcal}</div>
            </div>
            <div className="rounded-[1.35rem] bg-[var(--color-danger-soft)] px-4 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-danger)]/70">Дней выше нормы</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--color-danger)]">{stats.daysAbove}</div>
            </div>
            <div className="rounded-[1.35rem] bg-[var(--color-mint-soft)] px-4 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-mint)]/70">Дней в норме</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--color-mint)]">{stats.daysWithin}</div>
            </div>

            {canShowFinalMonthResult ? (
              <div
                className={`col-span-2 rounded-[1.35rem] px-4 py-4 text-sm ${
                  monthResultPositive ? "bg-[var(--color-mint-soft)] text-slate-700" : "bg-[var(--color-danger-soft)] text-slate-700"
                }`}
              >
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Итог месяца</div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-[1rem] bg-white/70 px-3 py-3">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Цель</div>
                    <div className="mt-1 font-semibold text-slate-900">{stats.totalTargetKcal} ккал</div>
                  </div>
                  <div className="rounded-[1rem] bg-white/70 px-3 py-3">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Факт</div>
                    <div className="mt-1 font-semibold text-slate-900">{stats.totalActualKcal} ккал</div>
                  </div>
                  <div className="rounded-[1rem] bg-white/70 px-3 py-3">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Итог</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {monthResultPositive ? `-${stats.totalBalanceKcal}` : `+${Math.abs(stats.totalBalanceKcal)}`} ккал
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-700">
                  {monthResultPositive
                    ? "По итогам месяца получилось ниже цели."
                    : "По итогам месяца получилось выше цели."}
                </div>
              </div>
            ) : (
              <div className="col-span-2 rounded-[1.35rem] bg-white px-4 py-4 text-sm text-slate-600">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Итог месяца</div>
                <div className="mt-2 text-base font-semibold text-slate-900">Завершите месяц, чтобы получить итоговую статистику.</div>
                <div className="mt-2">
                  Когда месяц закончится, здесь покажу итог по калориям: цель, факт и общий результат за месяц.
                </div>
              </div>
            )}

            <div className="col-span-2 rounded-[1.35rem] bg-white px-4 py-4 text-sm text-slate-600">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Средние Б/Ж/У</div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="rounded-[1rem] bg-slate-50 px-3 py-3">Б {stats.average.protein}</div>
                <div className="rounded-[1rem] bg-slate-50 px-3 py-3">Ж {stats.average.fat}</div>
                <div className="rounded-[1rem] bg-slate-50 px-3 py-3">У {stats.average.carbs}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="В этом месяце еще нет данных"
              description="Как только появятся заполненные дни, здесь соберется простая месячная статистика."
            />
          </div>
        )}
      </section>

      {stats.daysLogged && canShowFinalMonthResult ? (
        <MicronutrientBalanceCard
          title="Нутриенты за месяц"
          description="Показываю итог по нутриентам за завершенный месяц."
          target={stats.totalTargetNutrition}
          actual={stats.totalActualNutrition}
        />
      ) : stats.daysLogged ? (
        <section className="app-card rounded-[2rem] p-5 text-sm text-slate-600">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Нутриенты за месяц</div>
          <div className="mt-2 text-base font-semibold text-slate-900">Завершите месяц, чтобы получить статистику.</div>
          <div className="mt-2">
            После завершения месяца здесь покажу, чего в итоге не хватило или что удалось закрыть по нутриентам.
          </div>
        </section>
      ) : null}

      <section className="app-card rounded-[2rem] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Профиль</div>
        <div className="mt-2 text-lg font-semibold text-slate-900">{user.name}</div>
        <div className="mt-2 text-sm text-slate-500">
          {user.weightKg} кг • цель {user.goalWeightKg ?? user.weightKg} кг
        </div>
      </section>
    </div>
  );
}
