import type { CommonProduct, ShoppingCategory } from "./types";

export const SHOPPING_CATEGORIES = [
  { id: "produce", name: "Hortifruti", order: 1, icon: "🥬" },
  { id: "bakery", name: "Padaria", order: 2, icon: "🥖" },
  { id: "butcher", name: "Açougue", order: 3, icon: "🥩" },
  { id: "deli", name: "Frios", order: 4, icon: "🧀" },
  { id: "dairy", name: "Laticínios", order: 5, icon: "🥛" },
  { id: "grocery", name: "Mercearia", order: 6, icon: "🫘" },
  { id: "drinks", name: "Bebidas", order: 7, icon: "🧃" },
  { id: "frozen", name: "Congelados", order: 8, icon: "❄️" },
  { id: "hygiene", name: "Higiene", order: 9, icon: "🧴" },
  { id: "cleaning", name: "Limpeza", order: 10, icon: "🧽" },
  { id: "other", name: "Outros", order: 11, icon: "🛒" },
] as const satisfies readonly ShoppingCategory[];

export const COMMON_PRODUCTS = [
  { id: "rice", name: "Arroz", categoryId: "grocery", emoji: "🍚" },
  { id: "beans", name: "Feijão", categoryId: "grocery", emoji: "🫘" },
  { id: "milk", name: "Leite", categoryId: "dairy", emoji: "🥛" },
  { id: "bread", name: "Pão", categoryId: "bakery", emoji: "🥖" },
  { id: "coffee", name: "Café", categoryId: "grocery", emoji: "☕" },
  { id: "eggs", name: "Ovos", categoryId: "dairy", emoji: "🥚" },
  { id: "banana", name: "Banana", categoryId: "produce", emoji: "🍌" },
  { id: "apple", name: "Maçã", categoryId: "produce", emoji: "🍎" },
  { id: "tomato", name: "Tomate", categoryId: "produce", emoji: "🍅" },
  { id: "onion", name: "Cebola", categoryId: "produce", emoji: "🧅" },
  { id: "meat", name: "Carne", categoryId: "butcher", emoji: "🥩" },
  { id: "chicken", name: "Frango", categoryId: "butcher", emoji: "🍗" },
  { id: "cheese", name: "Queijo", categoryId: "deli", emoji: "🧀" },
  { id: "toilet-paper", name: "Papel higiênico", categoryId: "hygiene", emoji: "🧻" },
  { id: "detergent", name: "Detergente", categoryId: "cleaning", emoji: "🧽" },
] as const satisfies readonly CommonProduct[];

export const categoryIds = new Set<string>(SHOPPING_CATEGORIES.map(({ id }) => id));

export function getCategory(categoryId: string): ShoppingCategory {
  return (
    SHOPPING_CATEGORIES.find(({ id }) => id === categoryId) ??
    SHOPPING_CATEGORIES[SHOPPING_CATEGORIES.length - 1]
  );
}
