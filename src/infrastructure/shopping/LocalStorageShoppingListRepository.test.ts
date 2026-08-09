import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEYS } from "../../shared/config";
import { LocalStorageShoppingListRepository } from "./LocalStorageShoppingListRepository";

describe("local storage shopping repository", () => {
  const repository = new LocalStorageShoppingListRepository();

  beforeEach(() => localStorage.clear());

  it("persists and restores a shopping list", () => {
    const items = [
      {
        id: "item-1",
        name: "Café",
        categoryId: "grocery",
        quantity: 1,
        completed: false,
        createdAt: "2026-08-09T12:00:00.000Z",
      },
    ];

    repository.save(items);
    expect(repository.load()).toEqual(items);
  });

  it("recovers safely from corrupted browser storage", () => {
    localStorage.setItem(STORAGE_KEYS.shoppingList, "corrupted");
    expect(repository.load()).toEqual([]);
  });
});
