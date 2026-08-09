import { STORAGE_KEYS } from "../../shared/config";

export type ColorMode = "light" | "dark";

export class LocalStoragePreferencesRepository {
  loadColorMode(): ColorMode | null {
    if (typeof window === "undefined") return null;

    try {
      const value: unknown = JSON.parse(
        window.localStorage.getItem(STORAGE_KEYS.preferences) ?? "null",
      );
      if (
        typeof value === "object" &&
        value !== null &&
        "colorMode" in value &&
        (value.colorMode === "light" || value.colorMode === "dark")
      ) {
        return value.colorMode;
      }
    } catch {
      return null;
    }

    return null;
  }

  saveColorMode(colorMode: ColorMode): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify({ colorMode }));
    } catch {
      // Preferences simply reset if storage is unavailable.
    }
  }
}
