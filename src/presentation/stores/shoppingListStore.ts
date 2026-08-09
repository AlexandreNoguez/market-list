import { create } from "zustand";
import {
  addOrIncrementItem,
  changeItemQuantity,
  toggleShoppingItem,
} from "../../domain/shopping/shoppingList";
import type { NewShoppingItem, ShoppingItem } from "../../domain/shopping/types";
import { LocalStorageShoppingListRepository } from "../../infrastructure/shopping/LocalStorageShoppingListRepository";

const repository = new LocalStorageShoppingListRepository();

interface ShoppingListState {
  items: ShoppingItem[];
  hydrated: boolean;
  hydrate: () => void;
  addItem: (input: NewShoppingItem) => "added" | "incremented";
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearList: () => void;
  importList: (items: ShoppingItem[]) => void;
}

function persist(items: ShoppingItem[]): ShoppingItem[] {
  repository.save(items);
  return items;
}

export const useShoppingListStore = create<ShoppingListState>((set, get) => ({
  items: [],
  hydrated: false,
  hydrate: () => set({ items: repository.load(), hydrated: true }),
  addItem: (input) => {
    const next = addOrIncrementItem(get().items, input);
    set({ items: persist(next.items) });
    return next.result;
  },
  removeItem: (id) =>
    set(({ items }) => ({ items: persist(items.filter((item) => item.id !== id)) })),
  toggleItem: (id) =>
    set(({ items }) => ({ items: persist(toggleShoppingItem(items, id)) })),
  incrementQuantity: (id) =>
    set(({ items }) => ({ items: persist(changeItemQuantity(items, id, 1)) })),
  decrementQuantity: (id) =>
    set(({ items }) => ({ items: persist(changeItemQuantity(items, id, -1)) })),
  clearList: () => set({ items: persist([]) }),
  importList: (items) => set({ items: persist(items) }),
}));
