"use client";

import { useMemo, useState } from "react";
import { UserSwitcher } from "@/components/user-switcher";
import { FORMULA_PRESETS } from "@/lib/constants";
import { calculateTargets, resolveProfileFormula } from "@/lib/macros";
import { getSelectedUser } from "@/lib/selectors";
import { buildTransferState, decodeTransferKey, downloadStateBackup, encodeTransferKey } from "@/lib/transfer";
import type { ActivityLevel, FormulaMode, PersistedAppState } from "@/lib/types";
import { activityLabel, formulaLabel, sanitizeNumber, useAppStore } from "@/store/app-store";

const inputClass =
  "mt-2 h-12 w-full rounded-[1rem] border border-[var(--color-outline)] bg-white px-4 text-[15px] outline-none";

const formulaDescriptions: Record<FormulaMode, string> = {
  lose: "?????? ??????? ?? ????????-??? ?????: TDEE - 15%.",
  maintain: "??????????? ?? ????????-??? ????? ??? ????????.",
  gain: "????????? ???????? ?? ????????-??? ?????: TDEE + 10%.",
  custom: "???? ???????: ?/?/? ? ????????? ???????? ???????.",
};

type ProfileDraft = {
  name: string;
  sex: "female" | "male";
  age: string;
  activityLevel: ActivityLevel;
  heightCm: string;
  weightKg: string;
  goalWeightKg: string;
  formulaMode: FormulaMode;
  proteinPerKg: string;
  fatPerKg: string;
  carbsPerKg: string;
  fiberTarget: string;
  magnesiumTarget: string;
  ironTarget: string;
  zincTarget: string;
  omega3Target: string;
  vitaminB12Target: string;
};

const emptyDraft: ProfileDraft = {
  name: "",
  sex: "female",
  age: "30",
  activityLevel: "sedentary",
  heightCm: "",
  weightKg: "",
  goalWeightKg: "",
  formulaMode: "maintain",
  proteinPerKg: String(FORMULA_PRESETS.maintain.proteinPerKg),
  fatPerKg: String(FORMULA_PRESETS.maintain.fatPerKg),
  carbsPerKg: "0",
  fiberTarget: "28",
  magnesiumTarget: "310",
  ironTarget: "18",
  zincTarget: "8",
  omega3Target: "1.1",
  vitaminB12Target: "2.4",
};

function buildDraftPreview(draft: ProfileDraft) {
  return calculateTargets({
    id: "preview",
    name: draft.name || "????? ???????",
    sex: draft.sex,
    age: sanitizeNumber(draft.age, 30),
    activityLevel: draft.activityLevel,
    heightCm: sanitizeNumber(draft.heightCm, 0) || null,
    weightKg: sanitizeNumber(draft.weightKg, 0),
    goalWeightKg: sanitizeNumber(draft.goalWeightKg, 0) || sanitizeNumber(draft.weightKg, 0),
    formulaMode: draft.formulaMode,
    proteinPerKg: sanitizeNumber(draft.proteinPerKg, FORMULA_PRESETS.maintain.proteinPerKg),
    fatPerKg: sanitizeNumber(draft.fatPerKg, FORMULA_PRESETS.maintain.fatPerKg),
    carbsPerKg: sanitizeNumber(draft.carbsPerKg, 0),
    fiberTarget: sanitizeNumber(draft.fiberTarget, 0),
    magnesiumTarget: sanitizeNumber(draft.magnesiumTarget, 0),
    ironTarget: sanitizeNumber(draft.ironTarget, 0),
    zincTarget: sanitizeNumber(draft.zincTarget, 0),
    omega3Target: sanitizeNumber(draft.omega3Target, 0),
    vitaminB12Target: sanitizeNumber(draft.vitaminB12Target, 0),
    createdAt: "",
    updatedAt: "",
  });
}

function isDraftValid(draft: ProfileDraft) {
  const commonOk =
    draft.name.trim().length >= 2 &&
    sanitizeNumber(draft.age, 30) >= 14 &&
    sanitizeNumber(draft.heightCm, 0) > 0 &&
    sanitizeNumber(draft.weightKg, 0) > 0 &&
    sanitizeNumber(draft.goalWeightKg, 0) > 0 &&
    sanitizeNumber(draft.proteinPerKg, 0) > 0 &&
    sanitizeNumber(draft.fatPerKg, 0) > 0 &&
    sanitizeNumber(draft.carbsPerKg, 0) >= 0;

  if (!commonOk) {
    return false;
  }

  if (draft.formulaMode !== "custom") {
    return true;
  }

  return (
    sanitizeNumber(draft.fiberTarget, 0) > 0 &&
    sanitizeNumber(draft.magnesiumTarget, 0) > 0 &&
    sanitizeNumber(draft.ironTarget, 0) > 0 &&
    sanitizeNumber(draft.zincTarget, 0) > 0 &&
    sanitizeNumber(draft.omega3Target, 0) > 0 &&
    sanitizeNumber(draft.vitaminB12Target, 0) > 0
  );
}

function FormulaModeSwitch({
  value,
  onChange,
}: {
  value: FormulaMode;
  onChange: (mode: FormulaMode) => void;
}) {
  const options: FormulaMode[] = ["lose", "maintain", "gain", "custom"];

  return (
    <div>
      <div className="text-sm font-medium text-slate-600">???????</div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`rounded-[1rem] px-4 py-3 text-left text-sm transition ${
              value === mode ? "bg-[var(--color-accent)] text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            <div className="font-semibold">{formulaLabel(mode)}</div>
            <div className={`mt-1 text-xs leading-5 ${value === mode ? "text-white/80" : "text-slate-500"}`}>
              {formulaDescriptions[mode]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityInput({
  value,
  onChange,
}: {
  value: ActivityLevel;
  onChange: (value: ActivityLevel) => void;
}) {
  const options: ActivityLevel[] = ["sedentary", "light", "moderate", "high"];

  return (
    <label className="text-sm font-medium text-slate-600">
      ??????????
      <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value as ActivityLevel)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {activityLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function FormulaInputs({
  mode,
  values,
  onChange,
}: {
  mode: FormulaMode;
  values: Pick<
    ProfileDraft,
    | "proteinPerKg"
    | "fatPerKg"
    | "carbsPerKg"
    | "fiberTarget"
    | "magnesiumTarget"
    | "ironTarget"
    | "zincTarget"
    | "omega3Target"
    | "vitaminB12Target"
  >;
  onChange: (
    value: Partial<
      Pick<
        ProfileDraft,
        | "proteinPerKg"
        | "fatPerKg"
        | "carbsPerKg"
        | "fiberTarget"
        | "magnesiumTarget"
        | "ironTarget"
        | "zincTarget"
        | "omega3Target"
        | "vitaminB12Target"
      >
    >,
  ) => void;
}) {
  if (mode !== "custom") {
    const preset = FORMULA_PRESETS[mode];

    return (
      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
        <div className="font-semibold text-slate-900">{formulaLabel(mode)}</div>
        <div className="mt-1">{formulaDescriptions[mode]}</div>
        <div className="mt-2">? {preset.proteinPerKg} / ? {preset.fatPerKg} ?? ?? • ? ???? ?? ?????????? ????????</div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-3">
        <label className="text-sm font-medium text-slate-600">
          ? / ??
          <input className={inputClass} type="number" min="0.1" step="0.1" value={values.proteinPerKg} onChange={(event) => onChange({ proteinPerKg: event.target.value })} />
        </label>
        <label className="text-sm font-medium text-slate-600">
          ? / ??
          <input className={inputClass} type="number" min="0.1" step="0.1" value={values.fatPerKg} onChange={(event) => onChange({ fatPerKg: event.target.value })} />
        </label>
        <label className="text-sm font-medium text-slate-600">
          ? / ??
          <input className={inputClass} type="number" min="0" step="0.1" value={values.carbsPerKg} onChange={(event) => onChange({ carbsPerKg: event.target.value })} />
        </label>
      </div>

      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4">
        <div className="text-sm font-semibold text-slate-900">???? ????????? ?? ????</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-slate-600">
            ?????????, ?
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.fiberTarget} onChange={(event) => onChange({ fiberTarget: event.target.value })} />
          </label>
          <label className="text-sm font-medium text-slate-600">
            ??????, ??
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.magnesiumTarget} onChange={(event) => onChange({ magnesiumTarget: event.target.value })} />
          </label>
          <label className="text-sm font-medium text-slate-600">
            ??????, ??
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.ironTarget} onChange={(event) => onChange({ ironTarget: event.target.value })} />
          </label>
          <label className="text-sm font-medium text-slate-600">
            ????, ??
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.zincTarget} onChange={(event) => onChange({ zincTarget: event.target.value })} />
          </label>
          <label className="text-sm font-medium text-slate-600">
            ?????-3, ?
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.omega3Target} onChange={(event) => onChange({ omega3Target: event.target.value })} />
          </label>
          <label className="text-sm font-medium text-slate-600">
            B12, ???
            <input className={inputClass} type="number" min="0.1" step="0.1" value={values.vitaminB12Target} onChange={(event) => onChange({ vitaminB12Target: event.target.value })} />
          </label>
        </div>
      </div>
    </div>
  );
}

function ProfileForm({
  draft,
  onChange,
  preview,
  valid,
  onSubmit,
  onCancel,
}: {
  draft: ProfileDraft;
  onChange: (draft: ProfileDraft) => void;
  preview: ReturnType<typeof calculateTargets>;
  valid: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="grid gap-4">
      <label className="text-sm font-medium text-slate-600">
        ???
        <input className={inputClass} value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} placeholder="??????? ???" />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???
        <select className={inputClass} value={draft.sex} onChange={(event) => onChange({ ...draft, sex: event.target.value === "male" ? "male" : "female" })}>
          <option value="female">???????</option>
          <option value="male">???????</option>
        </select>
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???????
        <input className={inputClass} type="number" min="14" step="1" value={draft.age} onChange={(event) => onChange({ ...draft, age: event.target.value })} placeholder="???????" />
      </label>

      <ActivityInput value={draft.activityLevel} onChange={(activityLevel) => onChange({ ...draft, activityLevel })} />

      <label className="text-sm font-medium text-slate-600">
        ????
        <input className={inputClass} type="number" min="100" step="1" value={draft.heightCm} onChange={(event) => onChange({ ...draft, heightCm: event.target.value })} placeholder="????" />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???
        <input className={inputClass} type="number" min="1" step="0.1" value={draft.weightKg} onChange={(event) => onChange({ ...draft, weightKg: event.target.value })} placeholder="???" />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???????? ???
        <input className={inputClass} type="number" min="1" step="0.1" value={draft.goalWeightKg} onChange={(event) => onChange({ ...draft, goalWeightKg: event.target.value })} placeholder="???????? ???" />
      </label>

      <FormulaModeSwitch value={draft.formulaMode} onChange={(formulaMode) => onChange({ ...draft, formulaMode })} />

      <FormulaInputs
        mode={draft.formulaMode}
        values={{
          proteinPerKg: draft.proteinPerKg,
          fatPerKg: draft.fatPerKg,
          carbsPerKg: draft.carbsPerKg,
          fiberTarget: draft.fiberTarget,
          magnesiumTarget: draft.magnesiumTarget,
          ironTarget: draft.ironTarget,
          zincTarget: draft.zincTarget,
          omega3Target: draft.omega3Target,
          vitaminB12Target: draft.vitaminB12Target,
        }}
        onChange={(changes) => onChange({ ...draft, ...changes })}
      />

      <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <div className="font-semibold text-slate-900">???????????? ????</div>
        <div className="mt-2">{preview.kcal} ????</div>
        <div className="mt-1">? {preview.protein} • ? {preview.fat} • ? {preview.carbs}</div>
        <div className="mt-2 text-xs text-slate-500">????????? {preview.fiber} ? • ?????? {preview.magnesium} ?? • ?????? {preview.iron} ??</div>
        <div className="mt-1 text-xs text-slate-500">???? {preview.zinc} ?? • ?????-3 {preview.omega3} ? • B12 {preview.vitaminB12} ???</div>
      </div>

      <div className="flex items-center gap-3">
        {onCancel ? (
          <button type="button" onClick={onCancel} className="rounded-[1rem] bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            ??????
          </button>
        ) : null}
        <button type="button" disabled={!valid} onClick={onSubmit} className="theme-accent-button ml-auto rounded-[1rem] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45">
          ??????? ???????
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
    age?: number;
    activityLevel?: ActivityLevel;
    heightCm?: number;
    weightKg?: number;
    goalWeightKg?: number;
    formulaMode?: FormulaMode;
    proteinPerKg?: number;
    fatPerKg?: number;
    carbsPerKg?: number;
    fiberTarget?: number;
    magnesiumTarget?: number;
    ironTarget?: number;
    zincTarget?: number;
    omega3Target?: number;
    vitaminB12Target?: number;
  }) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="grid gap-4">
      <label className="text-sm font-medium text-slate-600">
        ???
        <input className={inputClass} value={user.name} onChange={(event) => onUpdate({ name: event.target.value })} />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???
        <select className={inputClass} value={user.sex} onChange={(event) => onUpdate({ sex: event.target.value === "male" ? "male" : "female" })}>
          <option value="female">???????</option>
          <option value="male">???????</option>
        </select>
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???????
        <input className={inputClass} type="number" min="14" step="1" value={user.age ?? 30} onChange={(event) => onUpdate({ age: sanitizeNumber(event.target.value, user.age ?? 30) })} />
      </label>

      <ActivityInput value={user.activityLevel ?? "sedentary"} onChange={(activityLevel) => onUpdate({ activityLevel })} />

      <label className="text-sm font-medium text-slate-600">
        ????
        <input className={inputClass} type="number" min="100" step="1" value={user.heightCm ?? ""} onChange={(event) => onUpdate({ heightCm: sanitizeNumber(event.target.value, user.heightCm ?? 0) })} />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???
        <input className={inputClass} type="number" min="1" step="0.1" value={user.weightKg} onChange={(event) => onUpdate({ weightKg: sanitizeNumber(event.target.value, user.weightKg) })} />
      </label>

      <label className="text-sm font-medium text-slate-600">
        ???????? ???
        <input className={inputClass} type="number" min="1" step="0.1" value={user.goalWeightKg ?? user.weightKg} onChange={(event) => onUpdate({ goalWeightKg: sanitizeNumber(event.target.value, user.goalWeightKg ?? user.weightKg) })} />
      </label>

      <FormulaModeSwitch value={user.formulaMode} onChange={(formulaMode) => onUpdate({ formulaMode })} />

      <FormulaInputs
        mode={user.formulaMode}
        values={{
          proteinPerKg: String(user.proteinPerKg),
          fatPerKg: String(user.fatPerKg),
          carbsPerKg: String(user.carbsPerKg),
          fiberTarget: String(user.fiberTarget ?? 0),
          magnesiumTarget: String(user.magnesiumTarget ?? 0),
          ironTarget: String(user.ironTarget ?? 0),
          zincTarget: String(user.zincTarget ?? 0),
          omega3Target: String(user.omega3Target ?? 0),
          vitaminB12Target: String(user.vitaminB12Target ?? 0),
        }}
        onChange={(changes) =>
          onUpdate({
            proteinPerKg: changes.proteinPerKg === undefined ? undefined : sanitizeNumber(changes.proteinPerKg, user.proteinPerKg),
            fatPerKg: changes.fatPerKg === undefined ? undefined : sanitizeNumber(changes.fatPerKg, user.fatPerKg),
            carbsPerKg: changes.carbsPerKg === undefined ? undefined : sanitizeNumber(changes.carbsPerKg, user.carbsPerKg),
            fiberTarget: changes.fiberTarget === undefined ? undefined : sanitizeNumber(changes.fiberTarget, user.fiberTarget ?? 0),
            magnesiumTarget: changes.magnesiumTarget === undefined ? undefined : sanitizeNumber(changes.magnesiumTarget, user.magnesiumTarget ?? 0),
            ironTarget: changes.ironTarget === undefined ? undefined : sanitizeNumber(changes.ironTarget, user.ironTarget ?? 0),
            zincTarget: changes.zincTarget === undefined ? undefined : sanitizeNumber(changes.zincTarget, user.zincTarget ?? 0),
            omega3Target: changes.omega3Target === undefined ? undefined : sanitizeNumber(changes.omega3Target, user.omega3Target ?? 0),
            vitaminB12Target:
              changes.vitaminB12Target === undefined ? undefined : sanitizeNumber(changes.vitaminB12Target, user.vitaminB12Target ?? 0),
          })
        }
      />

      {onDelete ? (
        <button type="button" onClick={onDelete} className="rounded-[1rem] bg-[var(--color-danger-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-danger)]">
          ??????? ???????
        </button>
      ) : null}
    </div>
  );
}

export function ProfileScreen() {
  const { state, createProfile, deleteProfile, replaceState, setSelectedUser, updateProfile } = useAppStore();
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showTransferImport, setShowTransferImport] = useState(false);
  const [transferKeyInput, setTransferKeyInput] = useState("");
  const [transferError, setTransferError] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedUser = getSelectedUser(state);
  const transferKey = useMemo(() => encodeTransferKey(buildTransferState(state)), [state]);
  const draftPreview = useMemo(() => buildDraftPreview(draft), [draft]);
  const draftValid = useMemo(() => isDraftValid(draft), [draft]);

  if (!state.hydrated) {
    return <div className="app-card rounded-[2rem] p-6 text-sm text-slate-500">???????? ???????...</div>;
  }

  const saveNewProfile = () => {
    createProfile({
      name: draft.name.trim(),
      sex: draft.sex,
      age: sanitizeNumber(draft.age, 30),
      activityLevel: draft.activityLevel,
      heightCm: sanitizeNumber(draft.heightCm, 0),
      weightKg: sanitizeNumber(draft.weightKg, 0),
      goalWeightKg: sanitizeNumber(draft.goalWeightKg, 0),
      formulaMode: draft.formulaMode,
      proteinPerKg: sanitizeNumber(draft.proteinPerKg, FORMULA_PRESETS.maintain.proteinPerKg),
      fatPerKg: sanitizeNumber(draft.fatPerKg, FORMULA_PRESETS.maintain.fatPerKg),
      carbsPerKg: sanitizeNumber(draft.carbsPerKg, 0),
      fiberTarget: sanitizeNumber(draft.fiberTarget, 0),
      magnesiumTarget: sanitizeNumber(draft.magnesiumTarget, 0),
      ironTarget: sanitizeNumber(draft.ironTarget, 0),
      zincTarget: sanitizeNumber(draft.zincTarget, 0),
      omega3Target: sanitizeNumber(draft.omega3Target, 0),
      vitaminB12Target: sanitizeNumber(draft.vitaminB12Target, 0),
    });
    setDraft(emptyDraft);
    setShowCreateProfile(false);
    setShowEditProfile(false);
    setShowSwitcher(false);
  };

  const importTransferKey = () => {
    try {
      const importedState = decodeTransferKey(transferKeyInput);
      replaceState(importedState as PersistedAppState);
      setTransferKeyInput("");
      setTransferError("");
      setShowTransferImport(false);
      setShowCreateProfile(false);
    } catch {
      setTransferError("???? ?? ???????. ?????????, ??? ???????? ??? ???????.");
    }
  };

  const copyTransferKey = async () => {
    try {
      await navigator.clipboard.writeText(transferKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="space-y-4">
        <section className="app-card rounded-[2rem] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">???????</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">???????? ??????? ??? ?????????? ??????</h1>
          <p className="mt-2 text-sm text-slate-500">????? ?????? ? ?????? ??????? ??? ???????? ???? ???????? ?? ??????? ????????.</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setShowCreateProfile(true);
                setShowTransferImport(false);
                setTransferError("");
              }}
              className="theme-accent-button rounded-[1.2rem] px-5 py-3 text-sm font-semibold"
            >
              ??????? ???????
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTransferImport((value) => !value);
                setShowCreateProfile(false);
                setTransferError("");
              }}
              className="theme-elevated rounded-[1.2rem] px-5 py-3 text-sm font-semibold text-slate-700"
            >
              ?????? ????
            </button>
          </div>

          {showTransferImport ? (
            <div className="theme-important mt-5 rounded-[1.4rem] px-4 py-4">
              <div className="text-sm font-semibold text-slate-900">???? ????????</div>
              <p className="mt-1 text-sm text-slate-600">???????? ???? ?? ??????? ????????, ? ?????? ?????????? ????.</p>
              <textarea
                value={transferKeyInput}
                onChange={(event) => setTransferKeyInput(event.target.value)}
                className="theme-input mt-3 min-h-28 w-full rounded-[1.2rem] border border-[var(--color-outline)] px-4 py-3 outline-none"
                placeholder="???????? ???? ????????"
              />
              {transferError ? <div className="theme-status-warning mt-3 rounded-[1rem] px-4 py-3 text-sm">{transferError}</div> : null}
              <button
                type="button"
                onClick={importTransferKey}
                disabled={!transferKeyInput.trim()}
                className="theme-accent-button mt-4 rounded-[1rem] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
              >
                ????????? ??????
              </button>
            </div>
          ) : null}

          {showCreateProfile ? (
            <div className="mt-5">
              <ProfileForm
                draft={draft}
                onChange={setDraft}
                preview={draftPreview}
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

  const targets = calculateTargets(selectedUser);
  const selectedFormula = resolveProfileFormula(selectedUser);

  return (
    <div className="space-y-4">
      <section className="app-card rounded-[2rem] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">???????</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{selectedUser.name}</h1>
            <p className="mt-2 text-sm text-slate-500">{selectedUser.age ?? 30} ??? • {selectedUser.heightCm ?? "—"} ?? • {selectedUser.weightKg} ??</p>
            <p className="mt-1 text-sm text-slate-500">???? {selectedUser.goalWeightKg ?? selectedUser.weightKg} ?? • {activityLabel(selectedUser.activityLevel ?? "sedentary")}</p>
          </div>
          <button type="button" onClick={() => setShowEditProfile((value) => !value)} className="theme-accent-button rounded-[1rem] px-4 py-3 text-sm font-semibold">
            {showEditProfile ? "???????" : "?????"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.25rem] bg-white px-4 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-400">????</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{targets.kcal} ????</div>
            <div className="mt-2 text-xs text-slate-500">{formulaLabel(selectedUser.formulaMode)}</div>
          </div>
          <div className="rounded-[1.25rem] bg-white px-4 py-4 text-sm text-slate-600">
            <div>? {targets.protein}</div>
            <div className="mt-1">? {targets.fat}</div>
            <div className="mt-1">? {targets.carbs}</div>
          </div>
        </div>

        <div className="mt-4 rounded-[1.35rem] bg-[var(--color-mint-soft)] px-4 py-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">{formulaLabel(selectedUser.formulaMode)}</div>
          <div className="mt-1">{formulaDescriptions[selectedUser.formulaMode]}</div>
          <div className="mt-2">? {selectedFormula.proteinPerKg} / ? {selectedFormula.fatPerKg} ?? ?? • ? {selectedFormula.carbsPerKg} ?? ??</div>
          <div className="mt-3 text-xs text-slate-500">????????? {targets.fiber} ? • ?????? {targets.magnesium} ?? • ?????? {targets.iron} ?? • ???? {targets.zinc} ??</div>
          <div className="mt-1 text-xs text-slate-500">?????-3 {targets.omega3} ? • B12 {targets.vitaminB12} ???</div>
        </div>

        {showEditProfile ? (
          <div className="mt-5">
            <CurrentProfileForm
              user={selectedUser}
              onUpdate={(changes) => updateProfile(selectedUser.id, changes)}
              onDelete={
                state.profiles.length > 1
                  ? () => {
                      if (window.confirm(`??????? ??????? ${selectedUser.name}?`)) {
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
            <h2 className="text-lg font-semibold text-slate-900">??????? ? ???????? ??????</h2>
            <p className="mt-1 text-sm text-slate-500">????? ????????? ?????? ? ?????? ??????? ?? ????? ??? ??????? backup-????.</p>
          </div>
        </div>

        <div className="theme-important mt-4 rounded-[1.35rem] px-4 py-4">
          <div className="text-sm font-semibold text-slate-900">???? ????????</div>
          <p className="mt-1 text-sm text-slate-600">?????????? ???? ???? ? ???????? ??? ? ?????? ???????? ?????? ???????? ???????.</p>
          <textarea value={transferKey} readOnly className="theme-input mt-3 min-h-28 w-full rounded-[1.2rem] border border-[var(--color-outline)] px-4 py-3 outline-none" />
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={copyTransferKey} className="theme-accent-button rounded-[1rem] px-5 py-3 text-sm font-semibold">
              {copied ? "???????????" : "??????????? ????"}
            </button>
            <button type="button" onClick={() => downloadStateBackup(buildTransferState(state))} className="theme-elevated rounded-[1rem] px-5 py-3 text-sm font-semibold text-slate-700">
              ??????? backup
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setShowTransferImport((value) => !value);
              setTransferError("");
            }}
            className="theme-elevated rounded-[1rem] px-4 py-3 text-sm font-semibold text-slate-700"
          >
            {showTransferImport ? "?????? ??????" : "?????? ???? ????????"}
          </button>

          {showTransferImport ? (
            <div className="mt-4 rounded-[1.2rem] bg-slate-50 px-4 py-4">
              <div className="text-sm font-semibold text-slate-900">?????? ?????</div>
              <textarea value={transferKeyInput} onChange={(event) => setTransferKeyInput(event.target.value)} className="theme-input mt-3 min-h-28 w-full rounded-[1.2rem] border border-[var(--color-outline)] px-4 py-3 outline-none" placeholder="???????? ???? ????????" />
              {transferError ? <div className="theme-status-warning mt-3 rounded-[1rem] px-4 py-3 text-sm">{transferError}</div> : null}
              <button type="button" onClick={importTransferKey} disabled={!transferKeyInput.trim()} className="theme-accent-button mt-4 rounded-[1rem] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45">
                ????????? ?????? ?? ?????
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="app-card rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">?????????????? ???????</h2>
            <p className="mt-1 text-sm text-slate-500">????? ????? ???????? ?????? ??????? ??? ?????? ?????????????.</p>
          </div>
          <button type="button" onClick={() => setShowCreateProfile((value) => !value)} className="rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]">
            {showCreateProfile ? "??????" : "??????? ???????"}
          </button>
        </div>

        {state.profiles.length > 1 ? (
          <div className="mt-4">
            <button type="button" onClick={() => setShowSwitcher((value) => !value)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {showSwitcher ? "?????? ???????" : "??????? ???????"}
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
              draft={draft}
              onChange={setDraft}
              preview={draftPreview}
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

