"use client";

import { useEffect } from "react";
import type { ThemeMode } from "@/lib/types";
import { useAppStore } from "@/store/app-store";

export function ThemeSwitcher() {
  const { state, setThemeMode } = useAppStore();
  const theme = state.themeMode;

  useEffect(() => {
    if (!state.hydrated) {
      return;
    }

    document.documentElement.dataset.theme = theme;
  }, [state.hydrated, theme]);

  const selectTheme = (nextTheme: ThemeMode) => {
    setThemeMode(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <div className="mb-4 flex justify-center">
      <div className="theme-switcher-shell inline-grid grid-cols-2 gap-1 rounded-[1.2rem] p-1">
        <button
          type="button"
          onClick={() => selectTheme("rose")}
          className={`theme-switcher-tab min-h-10 rounded-[1rem] px-4 py-2 text-sm font-semibold transition ${
            theme === "rose" ? "theme-switcher-tab-active text-white" : "text-slate-600"
          }`}
        >
          Мягкая
        </button>
        <button
          type="button"
          onClick={() => selectTheme("beige")}
          className={`theme-switcher-tab min-h-10 rounded-[1rem] px-4 py-2 text-sm font-semibold transition ${
            theme === "beige" ? "theme-switcher-tab-active text-white" : "text-slate-600"
          }`}
        >
          Бежевая
        </button>
      </div>
    </div>
  );
}
