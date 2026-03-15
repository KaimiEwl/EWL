import { mergeBuiltInProducts } from "@/lib/base-products";
import { STATE_VERSION, STORAGE_KEY } from "@/lib/constants";
import { buildSeedState } from "@/lib/seed";
import type { PersistedAppState } from "@/lib/types";

export interface AppRepository {
  load: () => Promise<PersistedAppState>;
  save: (state: PersistedAppState) => Promise<void>;
}

function isPersistedState(value: unknown): value is PersistedAppState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as PersistedAppState;
  return Array.isArray(candidate.profiles) && Array.isArray(candidate.products);
}

function isLikelyDemoState(state: PersistedAppState) {
  const profileIds = state.profiles.map((profile) => profile.id).sort();
  const demoProfiles = profileIds.length === 2 && profileIds[0] === "profile-anna" && profileIds[1] === "profile-max";
  const demoDays = state.dayEntries.every((entry) => entry.userId === "profile-anna");
  const demoItems = state.mealItems.every((item) => item.id.startsWith("meal-"));
  return demoProfiles && demoDays && demoItems;
}

function migrateState(state: PersistedAppState): PersistedAppState {
  if ((state.version ?? 0) < STATE_VERSION && isLikelyDemoState(state)) {
    return buildSeedState();
  }

  return {
    ...state,
    version: STATE_VERSION,
    products: mergeBuiltInProducts(state.products),
  };
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") {
      return buildSeedState();
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return buildSeedState();
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (isPersistedState(parsed)) {
        return migrateState(parsed);
      }
    } catch {
      return buildSeedState();
    }

    return buildSeedState();
  },
  async save(state) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
};
