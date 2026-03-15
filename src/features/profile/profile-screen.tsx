"use client";

import { useMemo, useState } from "react";
import { UserSwitcher } from "@/components/user-switcher";
import { calculateTargets } from "@/lib/macros";
import { getSelectedUser } from "@/lib/selectors";
import { useAppStore, sanitizeNumber } from "@/store/app-store";

const inputClass =
  "mt-2 h-12 w-full rounded-[1rem] border border-[var(--color-outline)] bg-white px-4 text-[15px] outline-none";

type ProfileDraft = {
  name: string;
  sex: "female" | "male";
  heightCm: string;
  weightKg: string;
  goalWeightKg: string;
  proteinPerKg: string;
  fatPerKg: string;
  carbsPerKg: string;
};

const emptyDraft: ProfileDraft = {
  name: "",
  sex: "female",
  heightCm: "",
  weightKg: "",
  goalWeightKg: "",
  proteinPerKg: "2",
  fatPerKg: "1.5",
  carbsPerKg: "3",
};

export function ProfileScreen() {
  const { state, createProfile, deleteProfile, setSelectedUser, updateProfile } = useAppStore();
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const selectedUser = getSelectedUser(state);
  const draftHeight = sanitizeNumber(draft.heightCm, 0);
  const draftWeight = sanitizeNumber(draft.weightKg, 0);
  const draftGoalWeight = sanitizeNumber(draft.goalWeightKg, 0);
  const draftProtein = sanitizeNumber(draft.proteinPerKg, 0);
  const draftFat = sanitizeNumber(draft.fatPerKg, 0);
  const draftCarbs = sanitizeNumber(draft.carbsPerKg, 0);
  const draftValid =
    draft.name.trim().length >= 2 &&
    draftHeight > 0 &&
    draftWeight > 0 &&
    draftGoalWeight > 0 &&
    draftProtein > 0 &&
    draftFat > 0 &&
    draftCarbs > 0;

  const draftPreview = useMemo(
    () =>
      calculateTargets({
        id: "preview",
        name: draft.name || "Новый профиль",
        sex: draft.sex,
        heightCm: draftHeight || null,
        weightKg: draftWeight || 0,
        goalWeightKg: draftGoalWeight || draftWeight || 0,
        proteinPerKg: draftProtein || 0,
        fatPerKg: draftFat || 0,
        carbsPerKg: draftCarbs || 0,
        createdAt: "",
        updatedAt: "",
      }),
    [draft, draftCarbs, draftFat, draftGoalWeight, draftHeight, draftProtein, draftWeight],
  );

  if (!state.hydrated) {
    return <div className="app-card rounded-[2rem] p-6 text-sm text-slate-500">Открываю профиль...</div>;
  }

  const saveNewProfile = () => {
    createProfile({
      name: draft.name.trim(),
      sex: draft.sex,
      heightCm: draftHeight,
      weightKg: draftWeight,
      goalWeightKg: draftGoalWeight,
      proteinPerKg: draftProtein,
      fatPerKg: draftFat,
      carbsPerKg: draftCarbs,
    });
    setDraft(emptyDraft);
    setShowCreateProfile(false);
    setShowEditProfile(false);
    setShowSwitcher(false);
  };

  if (!selectedUser) {
    return (
      <div className="space-y-4">
        <section className="app-card rounded-[2rem] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Профиль</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Создайте профиль</h1>
          <p className="mt-2 text-sm text-slate-500">Введите имя, рост, вес и желаемый вес.</p>

          {!showCreateProfile ? (
            <button
              type="button"
              onClick={() => setShowCreateProfile(true)}
              className="mt-5 rounded-[1.2rem] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white"
            >
              Создать профиль
            </button>
          ) : (
            <div className="mt-5">
              <ProfileForm
                mode="create"
                draft={draft}
                onChange={setDraft}
                previewKcal={draftPreview.kcal}
                valid={draftValid}
                onSubmit={saveNewProfile}
                onCancel={() => {
                  setShowCreateProfile(false);
                  setDraft(emptyDraft);
                }}
              />
            </div>
          )}
        </section>
      </div>
    );
  }

  const targets = calculateTargets(selectedUser);

  return (
    <div className="space-y-4">
      <section className="app-card rounded-[2rem] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Профиль</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{selectedUser.name}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {selectedUser.heightCm ?? "—"} см • {selectedUser.weightKg} кг • цель {selectedUser.goalWeightKg ?? selectedUser.weightKg} кг
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowEditProfile((value) => !value)}
            className="rounded-[1rem] bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white"
          >
            {showEditProfile ? "Скрыть" : "Зайти"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.25rem] bg-white px-4 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Калории</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{targets.kcal}</div>
          </div>
          <div className="rounded-[1.25rem] bg-white px-4 py-4 text-sm text-slate-600">
            <div>Б {targets.protein}</div>
            <div className="mt-1">Ж {targets.fat}</div>
            <div className="mt-1">У {targets.carbs}</div>
          </div>
        </div>

        {showEditProfile ? (
          <div className="mt-5">
            <CurrentProfileForm
              user={selectedUser}
              onUpdate={(changes) => updateProfile(selectedUser.id, changes)}
              onDelete={
                state.profiles.length > 1
                  ? () => {
                      if (window.confirm(`Удалить профиль ${selectedUser.name}?`)) {
                        deleteProfile(selectedUser.id);
                      }
                    }
                  : undefined
              }
            />
          </div>
        ) : null}
      </section>

      <section className="app-card rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Дополнительный профиль</h2>
            <p className="mt-1 text-sm text-slate-500">Здесь можно добавить второй профиль или быстро переключиться.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateProfile((value) => !value)}
            className="rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]"
          >
            {showCreateProfile ? "Скрыть" : "Создать профиль"}
          </button>
        </div>

        {state.profiles.length > 1 ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowSwitcher((value) => !value)}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {showSwitcher ? "Скрыть профили" : "Сменить профиль"}
            </button>
            {showSwitcher ? (
              <div className="mt-4">
                <UserSwitcher users={state.profiles} selectedUserId={selectedUser.id} onSelect={setSelectedUser} />
              </div>
            ) : null}
          </div>
        ) : null}

        {showCreateProfile ? (
          <div className="mt-5">
            <ProfileForm
              mode="create"
              draft={draft}
              onChange={setDraft}
              previewKcal={draftPreview.kcal}
              valid={draftValid}
              onSubmit={saveNewProfile}
              onCancel={() => {
                setShowCreateProfile(false);
                setDraft(emptyDraft);
              }}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function ProfileForm({
  mode,
  draft,
  onChange,
  previewKcal,
  valid,
  onSubmit,
  onCancel,
}: {
  mode: "create";
  draft: ProfileDraft;
  onChange: (draft: ProfileDraft) => void;
  previewKcal: number;
  valid: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="grid gap-4">
      <label className="text-sm font-medium text-slate-600">
        Имя
        <input
          className={inputClass}
          value={draft.name}
          onChange={(event) => onChange({ ...draft, name: event.target.value })}
          placeholder="Введите имя"
        />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Пол
        <select
          className={inputClass}
          value={draft.sex}
          onChange={(event) => onChange({ ...draft, sex: event.target.value === "male" ? "male" : "female" })}
        >
          <option value="female">Женский</option>
          <option value="male">Мужской</option>
        </select>
      </label>

      <label className="text-sm font-medium text-slate-600">
        Рост
        <input
          className={inputClass}
          type="number"
          min="100"
          step="1"
          value={draft.heightCm}
          onChange={(event) => onChange({ ...draft, heightCm: event.target.value })}
          placeholder="Рост"
        />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Вес
        <input
          className={inputClass}
          type="number"
          min="1"
          step="0.1"
          value={draft.weightKg}
          onChange={(event) => onChange({ ...draft, weightKg: event.target.value })}
          placeholder="Вес"
        />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Желаемый вес
        <input
          className={inputClass}
          type="number"
          min="1"
          step="0.1"
          value={draft.goalWeightKg}
          onChange={(event) => onChange({ ...draft, goalWeightKg: event.target.value })}
          placeholder="Желаемый вес"
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="text-sm font-medium text-slate-600">
          Б / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={draft.proteinPerKg}
            onChange={(event) => onChange({ ...draft, proteinPerKg: event.target.value })}
          />
        </label>
        <label className="text-sm font-medium text-slate-600">
          Ж / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={draft.fatPerKg}
            onChange={(event) => onChange({ ...draft, fatPerKg: event.target.value })}
          />
        </label>
        <label className="text-sm font-medium text-slate-600">
          У / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={draft.carbsPerKg}
            onChange={(event) => onChange({ ...draft, carbsPerKg: event.target.value })}
          />
        </label>
      </div>

      <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">Предпросмотр цели: {previewKcal} ккал</div>

      <div className="flex items-center gap-3">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[1rem] bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            Отмена
          </button>
        ) : null}
        <button
          type="button"
          disabled={!valid}
          onClick={onSubmit}
          className="ml-auto rounded-[1rem] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          {mode === "create" ? "Создать профиль" : "Сохранить"}
        </button>
      </div>
    </div>
  );
}

function CurrentProfileForm({
  user,
  onUpdate,
  onDelete,
}: {
  user: NonNullable<ReturnType<typeof getSelectedUser>>;
  onUpdate: (changes: {
    name?: string;
    sex?: "female" | "male";
    heightCm?: number;
    weightKg?: number;
    goalWeightKg?: number;
    proteinPerKg?: number;
    fatPerKg?: number;
    carbsPerKg?: number;
  }) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="grid gap-4">
      <label className="text-sm font-medium text-slate-600">
        Имя
        <input className={inputClass} value={user.name} onChange={(event) => onUpdate({ name: event.target.value })} />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Пол
        <select
          className={inputClass}
          value={user.sex}
          onChange={(event) => onUpdate({ sex: event.target.value === "male" ? "male" : "female" })}
        >
          <option value="female">Женский</option>
          <option value="male">Мужской</option>
        </select>
      </label>

      <label className="text-sm font-medium text-slate-600">
        Рост
        <input
          className={inputClass}
          type="number"
          min="100"
          step="1"
          value={user.heightCm ?? ""}
          onChange={(event) => onUpdate({ heightCm: sanitizeNumber(event.target.value, user.heightCm ?? 0) })}
        />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Вес
        <input
          className={inputClass}
          type="number"
          min="1"
          step="0.1"
          value={user.weightKg}
          onChange={(event) => onUpdate({ weightKg: sanitizeNumber(event.target.value, user.weightKg) })}
        />
      </label>

      <label className="text-sm font-medium text-slate-600">
        Желаемый вес
        <input
          className={inputClass}
          type="number"
          min="1"
          step="0.1"
          value={user.goalWeightKg ?? user.weightKg}
          onChange={(event) => onUpdate({ goalWeightKg: sanitizeNumber(event.target.value, user.goalWeightKg ?? user.weightKg) })}
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="text-sm font-medium text-slate-600">
          Б / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={user.proteinPerKg}
            onChange={(event) => onUpdate({ proteinPerKg: sanitizeNumber(event.target.value, user.proteinPerKg) })}
          />
        </label>
        <label className="text-sm font-medium text-slate-600">
          Ж / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={user.fatPerKg}
            onChange={(event) => onUpdate({ fatPerKg: sanitizeNumber(event.target.value, user.fatPerKg) })}
          />
        </label>
        <label className="text-sm font-medium text-slate-600">
          У / кг
          <input
            className={inputClass}
            type="number"
            min="0.1"
            step="0.1"
            value={user.carbsPerKg}
            onChange={(event) => onUpdate({ carbsPerKg: sanitizeNumber(event.target.value, user.carbsPerKg) })}
          />
        </label>
      </div>

      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="rounded-[1rem] bg-[var(--color-danger-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-danger)]"
        >
          Удалить профиль
        </button>
      ) : null}
    </div>
  );
}
