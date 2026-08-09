import { describe, expect, it } from "vitest";
import { createListDocument, parseListDocument } from "./serialization";

const validDocument = createListDocument([
  {
    id: "1",
    name: "Banana",
    categoryId: "produce",
    quantity: 2,
    completed: false,
    createdAt: "2026-08-09T12:00:00.000Z",
  },
]);

describe("list serialization", () => {
  it("creates a versioned export document", () => {
    expect(validDocument).toMatchObject({ version: 1, name: "Minha lista" });
  });

  it("accepts a valid exported list", () => {
    expect(parseListDocument(validDocument).items[0].name).toBe("Banana");
  });

  it.each([
    { ...validDocument, version: 2 },
    { ...validDocument, items: [{ name: "Incomplete" }] },
    { ...validDocument, items: [{ ...validDocument.items[0], categoryId: "unknown" }] },
  ])("rejects malformed or unsupported data", (document) => {
    expect(() => parseListDocument(document)).toThrow(/lista válida/i);
  });
});
