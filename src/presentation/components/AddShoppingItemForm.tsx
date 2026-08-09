import AddRounded from "@mui/icons-material/AddRounded";
import { Autocomplete, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import { COMMON_PRODUCTS, SHOPPING_CATEGORIES } from "../../domain/shopping/catalog";
import type { NewShoppingItem } from "../../domain/shopping/types";

interface AddShoppingItemFormProps {
  onAdd: (item: NewShoppingItem) => void;
}

export function AddShoppingItemForm({ onAdd }: AddShoppingItemFormProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>("grocery");
  const [error, setError] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    onAdd({ name, categoryId });
    setName("");
    setError(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={0}
      sx={{ p: { xs: 2, sm: 2.5 }, border: "1px solid", borderColor: "divider" }}
    >
      <Typography variant="h2" sx={{ mb: 1.5 }}>Adicionar outro produto</Typography>
      <Stack spacing={1.25}>
        <Autocomplete
          freeSolo
          options={COMMON_PRODUCTS.map((product) => product.name)}
          inputValue={name}
          onInputChange={(_, value) => {
            setName(value);
            setError(false);
            const known = COMMON_PRODUCTS.find(
              (product) => product.name.toLocaleLowerCase("pt-BR") === value.toLocaleLowerCase("pt-BR"),
            );
            if (known) setCategoryId(known.categoryId);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nome do produto"
              placeholder="Ex.: Molho de tomate"
              error={error}
              helperText={error ? "Digite o nome do produto" : undefined}
              slotProps={{
                ...params.slotProps,
                htmlInput: { ...params.slotProps.htmlInput, maxLength: 120 },
              }}
            />
          )}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <TextField
            select
            label="Categoria"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            sx={{ flex: 1 }}
          >
            {SHOPPING_CATEGORIES.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Box component="span" sx={{ mr: 1 }}>{category.icon}</Box>{category.name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" startIcon={<AddRounded />} sx={{ px: 3 }}>
            Adicionar
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
