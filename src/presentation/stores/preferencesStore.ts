import { create } from "zustand";
import {
  LocalStoragePreferencesRepository,
  type ColorMode,
} from "../../infrastructure/preferences/LocalStoragePreferencesRepository";

const repository = new LocalStoragePreferencesRepository();

function systemColorMode(): ColorMode {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface PreferencesState {
  colorMode: ColorMode;
  hydrate: () => void;
  toggleColorMode: () => void;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  colorMode: "light",
  hydrate: () => set({ colorMode: repository.loadColorMode() ?? systemColorMode() }),
  toggleColorMode: () => {
    const colorMode = get().colorMode === "light" ? "dark" : "light";
    repository.saveColorMode(colorMode);
    set({ colorMode });
  },
}));
