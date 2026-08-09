import AddRounded from "@mui/icons-material/AddRounded";
import { Box, ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { COMMON_PRODUCTS } from "../../domain/shopping/catalog";
import type { CommonProduct } from "../../domain/shopping/types";

interface QuickAddSectionProps {
  onAdd: (product: CommonProduct) => void;
}

export function QuickAddSection({ onAdd }: QuickAddSectionProps) {
  return (
    <Box component="section" aria-labelledby="quick-add-title">
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", mb: 1.25 }}>
        <Typography variant="h2" id="quick-add-title">Adicionar rápido</Typography>
        <Typography variant="caption" color="text.secondary">Toque para incluir</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ overflowX: "auto", pb: 1, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
      >
        {COMMON_PRODUCTS.map((product) => (
          <Paper
            key={product.id}
            component={ButtonBase}
            onClick={() => onAdd(product)}
            aria-label={`Adicionar ${product.name}`}
            elevation={0}
            sx={{
              minWidth: 90,
              p: 1.25,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              textAlign: "left",
              alignItems: "stretch",
              transition: "transform 150ms ease, border-color 150ms ease",
              "&:hover": { borderColor: "primary.main", transform: "translateY(-2px)" },
            }}
          >
            <Stack spacing={0.5} sx={{ width: "100%" }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "1.35rem", lineHeight: 1 }}>{product.emoji}</Typography>
                <AddRounded sx={{ fontSize: 17, color: "primary.main" }} />
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{product.name}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
