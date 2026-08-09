import { Alert, Box, Container, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { CommonProduct, NewShoppingItem, ShoppingItem } from "../../domain/shopping/types";
import { downloadList, shareList } from "../../infrastructure/shopping/listTransfer";
import { parseListDocument } from "../../infrastructure/shopping/serialization";
import { APP_NAME, MAX_IMPORT_SIZE_BYTES } from "../../shared/config";
import { AddShoppingItemForm } from "../components/AddShoppingItemForm";
import { AppHeader } from "../components/AppHeader";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { ListActions } from "../components/ListActions";
import { QuickAddSection } from "../components/QuickAddSection";
import { ShoppingList } from "../components/ShoppingList";
import { ShoppingSummary } from "../components/ShoppingSummary";
import { usePreferencesStore } from "../stores/preferencesStore";
import { useShoppingListStore } from "../stores/shoppingListStore";

interface Feedback {
  message: string;
  severity: "success" | "error" | "info";
}

export function ShoppingPage() {
  const items = useShoppingListStore((state) => state.items);
  const hydrate = useShoppingListStore((state) => state.hydrate);
  const addItem = useShoppingListStore((state) => state.addItem);
  const removeItem = useShoppingListStore((state) => state.removeItem);
  const toggleItem = useShoppingListStore((state) => state.toggleItem);
  const incrementQuantity = useShoppingListStore((state) => state.incrementQuantity);
  const decrementQuantity = useShoppingListStore((state) => state.decrementQuantity);
  const clearList = useShoppingListStore((state) => state.clearList);
  const importList = useShoppingListStore((state) => state.importList);
  const hydratePreferences = usePreferencesStore((state) => state.hydrate);

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<ShoppingItem[] | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    hydrate();
    hydratePreferences();
  }, [hydrate, hydratePreferences]);

  const completed = items.filter((item) => item.completed).length;
  const remaining = items.length - completed;

  const handleAdd = (input: NewShoppingItem) => {
    const result = addItem(input);
    setFeedback({
      message: result === "incremented" ? `Quantidade de ${input.name.trim()} aumentada` : `${input.name.trim()} adicionado`,
      severity: "success",
    });
  };

  const handleQuickAdd = (product: CommonProduct) => {
    handleAdd({ name: product.name, categoryId: product.categoryId });
  };

  const handleExport = () => {
    downloadList(items);
    setFeedback({ message: "Lista exportada em JSON", severity: "success" });
  };

  const handleShare = async () => {
    try {
      const result = await shareList(items);
      if (result !== "cancelled") {
        setFeedback({
          message: result === "shared" ? "Lista compartilhada" : "Lista copiada para a área de transferência",
          severity: "success",
        });
      }
    } catch {
      setFeedback({ message: "Não foi possível compartilhar esta lista", severity: "error" });
    }
  };

  const applyImport = (importedItems: ShoppingItem[]) => {
    importList(importedItems);
    setPendingImport(null);
    setFeedback({ message: "Lista importada com sucesso", severity: "success" });
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      if (file.size > MAX_IMPORT_SIZE_BYTES) {
        throw new Error("O arquivo excede o limite de 1 MB.");
      }
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        throw new Error("O arquivo selecionado não contém um JSON válido.");
      }
      const document = parseListDocument(parsed);
      if (items.length > 0) setPendingImport(document.items);
      else applyImport(document.items);
    } catch (error) {
      setFeedback({
        message: error instanceof Error ? error.message : "Não foi possível ler o arquivo.",
        severity: "error",
      });
    }
  };

  const openImport = () => importInputRef.current?.click();

  return (
    <>
      <AppHeader
        total={items.length}
        remaining={remaining}
        onImport={openImport}
        onExport={handleExport}
        onShare={handleShare}
        onClear={() => setClearDialogOpen(true)}
      />
      <input
        ref={importInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleImportFile}
        hidden
        aria-label="Selecionar arquivo de lista"
      />

      <Container component="main" maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
        <Stack spacing={{ xs: 2.5, sm: 3 }}>
          <ShoppingSummary total={items.length} completed={completed} />
          <QuickAddSection onAdd={handleQuickAdd} />
          <AddShoppingItemForm onAdd={handleAdd} />
          <ShoppingList
            items={items}
            onToggle={toggleItem}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onRemove={(id) => {
              removeItem(id);
              setFeedback({ message: "Produto removido", severity: "info" });
            }}
          />
          <ListActions
            disabled={items.length === 0}
            onImport={openImport}
            onExport={handleExport}
            onShare={handleShare}
          />
          <Box component="footer" sx={{ textAlign: "center", pt: 1, pb: { xs: 3, sm: 5 } }}>
            <Typography variant="caption" color="text.secondary">
              {APP_NAME} · seus dados ficam neste dispositivo
            </Typography>
          </Box>
        </Stack>
      </Container>

      <ConfirmationDialog
        open={clearDialogOpen}
        title="Limpar toda a lista?"
        message="Tem certeza que deseja remover todos os itens? Essa ação não pode ser desfeita."
        confirmLabel="Limpar lista"
        destructive
        onCancel={() => setClearDialogOpen(false)}
        onConfirm={() => {
          clearList();
          setClearDialogOpen(false);
          setFeedback({ message: "Lista limpa", severity: "success" });
        }}
      />
      <ConfirmationDialog
        open={pendingImport !== null}
        title="Substituir a lista atual?"
        message="A importação substituirá todos os produtos que estão na sua lista agora."
        confirmLabel="Importar lista"
        onCancel={() => setPendingImport(null)}
        onConfirm={() => pendingImport && applyImport(pendingImport)}
      />

      <Snackbar
        open={feedback !== null}
        autoHideDuration={2800}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback(null)}
          severity={feedback?.severity ?? "info"}
          variant="filled"
          sx={{ width: "100%", borderRadius: 3 }}
        >
          {feedback?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
