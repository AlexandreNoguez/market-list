import { getCategory } from "./catalog";
import type { NewShoppingItem, ShoppingItem } from "./types";

export interface ItemFactoryOptions {
  createId?: () => string;
  now?: () => string;
}

const normalizedName = (name: string) =>
  name.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");

export function addOrIncrementItem(
  items: ShoppingItem[],
  input: NewShoppingItem,
  options: ItemFactoryOptions = {},
): { items: ShoppingItem[]; result: "added" | "incremented" } {
  const name = input.name.trim().replace(/\s+/g, " ");
  const existing = items.find((item) => normalizedName(item.name) === normalizedName(name));

  if (existing) {
    return {
      items: items.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: item.quantity + Math.max(1, input.quantity ?? 1) }
          : item,
      ),
      result: "incremented",
    };
  }

  const createId = options.createId ?? (() => crypto.randomUUID());
  const now = options.now ?? (() => new Date().toISOString());

  return {
    items: [
      ...items,
      {
        id: createId(),
        name,
        categoryId: input.categoryId,
        quantity: Math.max(1, input.quantity ?? 1),
        completed: false,
        createdAt: now(),
      },
    ],
    result: "added",
  };
}

export function toggleShoppingItem(items: ShoppingItem[], id: string): ShoppingItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item,
  );
}

export function changeItemQuantity(
  items: ShoppingItem[],
  id: string,
  change: 1 | -1,
): ShoppingItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item,
  );
}

export function groupItemsByRoute(items: ShoppingItem[]) {
  const categoryGroups = new Map<string, ShoppingItem[]>();

  for (const item of items) {
    const group = categoryGroups.get(item.categoryId) ?? [];
    group.push(item);
    categoryGroups.set(item.categoryId, group);
  }

  return [...categoryGroups.entries()]
    .sort(([categoryA], [categoryB]) => getCategory(categoryA).order - getCategory(categoryB).order)
    .map(([categoryId, categoryItems]) => ({
      category: getCategory(categoryId),
      items: categoryItems,
    }));
}
