import type { ShoppingItem } from "../../domain/shopping/types";
import { STORAGE_KEYS } from "../../shared/config";
import { createListDocument, parseListDocument } from "./serialization";

function storageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export class LocalStorageShoppingListRepository {
  load(): ShoppingItem[] {
    if (!storageAvailable()) return [];

    try {
      const saved = window.localStorage.getItem(STORAGE_KEYS.shoppingList);
      return saved ? parseListDocument(JSON.parse(saved)).items : [];
    } catch {
      return [];
    }
  }

  save(items: ShoppingItem[]): void {
    if (!storageAvailable()) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEYS.shoppingList,
        JSON.stringify(createListDocument(items)),
      );
    } catch {
      // The app remains usable in private browsing or when storage is full.
    }
  }
}
