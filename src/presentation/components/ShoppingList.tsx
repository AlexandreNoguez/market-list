import AddRounded from "@mui/icons-material/AddRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { groupItemsByRoute } from "../../domain/shopping/shoppingList";
import type { ShoppingItem } from "../../domain/shopping/types";

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

interface ItemRowProps extends Omit<ShoppingListProps, "items"> {
  item: ShoppingItem;
}

function ShoppingItemRow({ item, onToggle, onIncrement, onDecrement, onRemove }: ItemRowProps) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", gap: 0.5, py: 1, minHeight: 64, opacity: item.completed ? 0.6 : 1, transition: "opacity 160ms ease" }}
    >
      <IconButton
        role="checkbox"
        aria-checked={item.completed}
        onClick={() => onToggle(item.id)}
        aria-label={`Marcar ${item.name} como ${item.completed ? "não comprado" : "comprado"}`}
        sx={{ p: 1 }}
      >
        {item.completed ? (
          <Box sx={{ width: 24, height: 24, borderRadius: 1.5, display: "grid", placeItems: "center", bgcolor: "success.main", color: "primary.contrastText" }}>
            <CheckRounded sx={{ fontSize: 18 }} />
          </Box>
        ) : (
          <Box sx={{ width: 24, height: 24, borderRadius: 1.5, border: "2px solid", borderColor: "divider" }} />
        )}
      </IconButton>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{ fontWeight: 650, textDecoration: item.completed ? "line-through" : "none", wordBreak: "break-word" }}
        >
          {item.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {item.completed ? "No carrinho" : item.quantity === 1 ? "1 unidade" : `${item.quantity} unidades`}
        </Typography>
      </Box>
      <Stack
        direction="row"
        sx={{ alignItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 2.5, bgcolor: "action.hover" }}
      >
        <IconButton
          size="small"
          disabled={item.quantity === 1}
          onClick={() => onDecrement(item.id)}
          aria-label={`Diminuir quantidade de ${item.name}`}
        >
          <RemoveRounded fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ minWidth: 22, textAlign: "center", fontWeight: 800 }}>
          {item.quantity}
        </Typography>
        <IconButton size="small" onClick={() => onIncrement(item.id)} aria-label={`Aumentar quantidade de ${item.name}`}>
          <AddRounded fontSize="small" />
        </IconButton>
      </Stack>
      <Tooltip title="Remover produto">
        <IconButton
          size="small"
          color="error"
          onClick={() => onRemove(item.id)}
          aria-label={`Remover ${item.name}`}
          sx={{ ml: 0.25 }}
        >
          <DeleteOutlineRounded fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export function ShoppingList({ items, ...actions }: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <Paper
        component="section"
        elevation={0}
        sx={{ py: 5, px: 2.5, border: "1px dashed", borderColor: "divider", textAlign: "center" }}
      >
        <Inventory2Outlined sx={{ fontSize: 44, color: "primary.main", mb: 1 }} />
        <Typography variant="h2">Sua lista está vazia</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 0.75 }}>
          Adicione alguns produtos para começar sua próxima compra.
        </Typography>
      </Paper>
    );
  }

  const groups = groupItemsByRoute(items);

  return (
    <Box component="section" aria-labelledby="shopping-list-title">
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1.25 }}>
        <Typography variant="h2" id="shopping-list-title">Sua rota no mercado</Typography>
        <Typography variant="caption" color="text.secondary">{groups.length} {groups.length === 1 ? "seção" : "seções"}</Typography>
      </Stack>
      <Stack spacing={1.5}>
        {groups.map(({ category, items: categoryItems }, index) => (
          <Paper
            key={category.id}
            component="section"
            elevation={0}
            sx={{ overflow: "hidden", border: "1px solid", borderColor: "divider" }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", gap: 1.25, px: 2, py: 1.5, bgcolor: "action.hover" }}
            >
              <Box
                aria-hidden="true"
                sx={{ width: 34, height: 34, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "background.paper" }}
              >
                {category.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3">{category.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Parada {index + 1} da rota
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, px: 1.25, py: 0.5, borderRadius: 99, color: "primary.main", bgcolor: "action.selected" }}
              >
                {categoryItems.length} {categoryItems.length === 1 ? "item" : "itens"}
              </Typography>
            </Stack>
            <Box sx={{ px: { xs: 1, sm: 1.5 } }}>
              {categoryItems.map((item, itemIndex) => (
                <Fragment key={item.id}>
                  <ShoppingItemRow item={item} {...actions} />
                  {itemIndex < categoryItems.length - 1 && <Divider sx={{ ml: 6 }} />}
                </Fragment>
              ))}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
