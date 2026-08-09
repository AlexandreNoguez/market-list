import { describe, expect, it } from "vitest";
import {
  addOrIncrementItem,
  changeItemQuantity,
  groupItemsByRoute,
  toggleShoppingItem,
} from "./shoppingList";
import type { ShoppingItem } from "./types";

const item = (overrides: Partial<ShoppingItem> = {}): ShoppingItem => ({
  id: "item-1",
  name: "Arroz",
  categoryId: "grocery",
  quantity: 1,
  completed: false,
  createdAt: "2026-08-09T12:00:00.000Z",
  ...overrides,
});

describe("shopping list rules", () => {
  it("adds a new product", () => {
    const result = addOrIncrementItem(
      [],
      { name: "  Molho   de tomate ", categoryId: "grocery" },
      { createId: () => "new-id", now: () => "2026-08-09T12:00:00.000Z" },
    );

    expect(result.result).toBe("added");
    expect(result.items[0]).toMatchObject({
      id: "new-id",
      name: "Molho de tomate",
      categoryId: "grocery",
      quantity: 1,
    });
  });

  it("increments instead of duplicating a product", () => {
    const result = addOrIncrementItem([item()], { name: " arroz ", categoryId: "grocery" });

    expect(result.result).toBe("incremented");
    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantity).toBe(2);
  });

  it("toggles an item without moving it", () => {
    const other = item({ id: "item-2", name: "Feijão" });
    const result = toggleShoppingItem([item(), other], "item-1");

    expect(result.map(({ id }) => id)).toEqual(["item-1", "item-2"]);
    expect(result[0].completed).toBe(true);
  });

  it("never decreases quantity below one", () => {
    expect(changeItemQuantity([item()], "item-1", -1)[0].quantity).toBe(1);
  });

  it("groups categories in supermarket route order", () => {
    const items = [
      item({ id: "clean", categoryId: "cleaning", name: "Detergente" }),
      item({ id: "fruit", categoryId: "produce", name: "Banana" }),
      item({ id: "milk", categoryId: "dairy", name: "Leite" }),
    ];

    expect(groupItemsByRoute(items).map(({ category }) => category.id)).toEqual([
      "produce",
      "dairy",
      "cleaning",
    ]);
  });
});
