import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AppProviders } from "../../app/AppProviders";
import { InstallAppButton } from "./InstallAppButton";

function renderButton() {
  return render(
    <AppProviders>
      <InstallAppButton />
    </AppProviders>,
  );
}

describe("install app button", () => {
  it("shows manual browser guidance when a native prompt is unavailable", async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole("button", { name: "Instalar Market List" }));

    expect(screen.getByRole("dialog", { name: "Instalar Market List" })).toBeInTheDocument();
    expect(screen.getByText(/abra o menu do navegador/i)).toBeInTheDocument();
  });

  it("opens the native prompt when the browser provides it", async () => {
    const user = userEvent.setup();
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event("beforeinstallprompt");
    Object.assign(event, {
      prompt,
      userChoice: Promise.resolve({ outcome: "accepted", platform: "web" }),
    });
    renderButton();
    window.dispatchEvent(event);

    await user.click(screen.getByRole("button", { name: "Instalar Market List" }));

    expect(prompt).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Instalar Market List" })).not.toBeInTheDocument();
    });
  });
});
