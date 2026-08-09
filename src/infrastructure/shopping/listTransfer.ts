import { getCategory } from "../../domain/shopping/catalog";
import { groupItemsByRoute } from "../../domain/shopping/shoppingList";
import type { ShoppingItem } from "../../domain/shopping/types";
import { APP_NAME, LIST_NAME } from "../../shared/config";
import { serializeList } from "./serialization";

export function downloadList(items: ShoppingItem[]): void {
  const blob = new Blob([serializeList(items)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `market-list-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function formatListAsText(items: ShoppingItem[]): string {
  const groups = groupItemsByRoute(items);
  const sections = groups.map(
    ({ category, items: groupItems }) =>
      `${category.icon} ${category.name}\n${groupItems
        .map((item) => `${item.completed ? "☑" : "☐"} ${item.name}${item.quantity > 1 ? ` ×${item.quantity}` : ""}`)
        .join("\n")}`,
  );

  return `🛒 ${LIST_NAME}\n\n${sections.join("\n\n")}\n\nFeita no ${APP_NAME}`;
}

export async function shareList(items: ShoppingItem[]): Promise<"shared" | "copied" | "cancelled"> {
  const text = formatListAsText(items);

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: LIST_NAME, text });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
    }
  }

  await navigator.clipboard.writeText(text);
  return "copied";
}

export function categoryLabel(categoryId: string): string {
  return getCategory(categoryId).name;
}
