export interface ShoppingCategory {
  id: string;
  name: string;
  order: number;
  icon: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  completed: boolean;
  createdAt: string;
}

export interface NewShoppingItem {
  name: string;
  categoryId: string;
  quantity?: number;
}

export interface CommonProduct {
  id: string;
  name: string;
  categoryId: string;
  emoji: string;
}

export interface ShoppingListDocument {
  version: 1;
  name: string;
  createdAt: string;
  items: ShoppingItem[];
}
