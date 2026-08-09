import { categoryIds } from "../../domain/shopping/catalog";
import type { ShoppingItem, ShoppingListDocument } from "../../domain/shopping/types";
import { LIST_NAME } from "../../shared/config";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidItem(value: unknown): value is ShoppingItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    value.name.length <= 120 &&
    typeof value.categoryId === "string" &&
    categoryIds.has(value.categoryId) &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1 &&
    value.quantity <= 999 &&
    typeof value.completed === "boolean" &&
    typeof value.createdAt === "string" &&
    !Number.isNaN(Date.parse(value.createdAt))
  );
}

export function createListDocument(items: ShoppingItem[]): ShoppingListDocument {
  return {
    version: 1,
    name: LIST_NAME,
    createdAt: new Date().toISOString(),
    items,
  };
}

export function parseListDocument(value: unknown): ShoppingListDocument {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    typeof value.name !== "string" ||
    typeof value.createdAt !== "string" ||
    Number.isNaN(Date.parse(value.createdAt)) ||
    !Array.isArray(value.items) ||
    value.items.length > 5_000 ||
    !value.items.every(isValidItem)
  ) {
    throw new Error("O arquivo não contém uma lista válida do Market List.");
  }

  return value as unknown as ShoppingListDocument;
}

export function serializeList(items: ShoppingItem[]): string {
  return JSON.stringify(createListDocument(items), null, 2);
}
