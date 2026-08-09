import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppProviders } from "../../app/AppProviders";
import { useShoppingListStore } from "../stores/shoppingListStore";
import { ShoppingPage } from "./ShoppingPage";

function renderPage() {
  return render(
    <AppProviders>
      <ShoppingPage />
    </AppProviders>,
  );
}

describe("shopping page", () => {
  beforeEach(() => {
    localStorage.clear();
    useShoppingListStore.setState({ items: [], hydrated: false });
  });

  it("adds a common product and marks it as bought", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Adicionar Arroz" }));
    expect(screen.getByRole("checkbox", { name: /marcar arroz como comprado/i })).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /marcar arroz como comprado/i }));
    expect(screen.getByText("No carrinho")).toBeInTheDocument();
    expect(screen.getByText("1 de 1 encontrados")).toBeInTheDocument();
  });

  it("adds a custom product with its selected category", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText("Nome do produto"), "Molho de tomate");
    await user.click(screen.getByRole("button", { name: /^adicionar$/i }));

    expect(screen.getByText("Molho de tomate")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mercearia" })).toBeInTheDocument();
  });

  it("clears the list only after confirmation", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Adicionar Arroz" }));
    await user.click(screen.getByRole("button", { name: "Abrir ações da lista" }));
    await user.click(screen.getByRole("menuitem", { name: "Limpar lista" }));

    const dialog = screen.getByRole("dialog", { name: "Limpar toda a lista?" });
    await user.click(within(dialog).getByRole("button", { name: "Limpar lista" }));

    await waitFor(() => expect(screen.getByText("Sua lista está vazia")).toBeInTheDocument());
  });

  it("shows friendly feedback for an invalid import", async () => {
    const user = userEvent.setup();
    renderPage();
    const file = new File(["not-json"], "lista.json", { type: "application/json" });
    Object.defineProperty(file, "text", { value: async () => "not-json" });

    await user.upload(screen.getByLabelText("Selecionar arquivo de lista"), file);

    expect(await screen.findByText("O arquivo selecionado não contém um JSON válido.")).toBeInTheDocument();
  });
});
