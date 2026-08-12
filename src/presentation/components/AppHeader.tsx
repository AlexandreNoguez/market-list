import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import DeleteSweepRounded from "@mui/icons-material/DeleteSweepRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import ShareRounded from "@mui/icons-material/ShareRounded";
import ShoppingBasketRounded from "@mui/icons-material/ShoppingBasketRounded";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import { APP_NAME } from "../../shared/config";
import { usePreferencesStore } from "../stores/preferencesStore";
import { InstallAppButton } from "./InstallAppButton";

interface AppHeaderProps {
  total: number;
  remaining: number;
  onImport: () => void;
  onExport: () => void;
  onShare: () => void;
  onClear: () => void;
}

export function AppHeader({
  total,
  remaining,
  onImport,
  onExport,
  onShare,
  onClear,
}: AppHeaderProps) {
  const compact = useScrollTrigger({ disableHysteresis: true, threshold: 56 });
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const mode = usePreferencesStore((state) => state.colorMode);
  const toggleMode = usePreferencesStore((state) => state.toggleColorMode);

  const actions = [
    { label: "Importar lista", icon: <FileUploadRounded />, action: onImport },
    { label: "Exportar lista", icon: <FileDownloadRounded />, action: onExport },
    { label: "Compartilhar", icon: <ShareRounded />, action: onShare },
    { label: "Limpar lista", icon: <DeleteSweepRounded color="error" />, action: onClear },
  ];

  return (
    <AppBar
      elevation={compact ? 1 : 0}
      position="sticky"
      color="transparent"
      sx={{
        backdropFilter: "blur(18px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(17,21,16,.86)" : "rgba(245,247,241,.86)",
        borderBottom: "1px solid",
        borderBottomColor: compact ? "divider" : "transparent",
        transition: "all 220ms ease",
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Toolbar
          sx={{
            minHeight: { xs: compact ? 64 : 88, sm: compact ? 68 : 96 },
            px: { xs: 2, sm: 3 },
            transition: "min-height 220ms ease",
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: compact ? 38 : 46,
                height: compact ? 38 : 46,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                color: "primary.contrastText",
                background: (theme) =>
                  `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
                boxShadow: 2,
                transition: "all 220ms ease",
                flexShrink: 0,
              }}
            >
              <ShoppingBasketRounded fontSize={compact ? "small" : "medium"} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h1"
                noWrap
                sx={{ fontWeight: 800, fontSize: compact ? "1.08rem" : { xs: "1.3rem", sm: "1.45rem" }, lineHeight: 1.15 }}
              >
                {APP_NAME}
              </Typography>
              <Typography
                color="text.secondary"
                noWrap
                sx={{
                  fontSize: ".78rem",
                  mt: 0.25,
                  maxHeight: compact ? 0 : 22,
                  opacity: compact ? 0 : 1,
                  overflow: "hidden",
                  transition: "all 180ms ease",
                }}
              >
                {total === 0
                  ? "Pronta para sua próxima compra"
                  : `${remaining} ${remaining === 1 ? "item restante" : "itens restantes"}`}
              </Typography>
            </Box>
          </Stack>

          <InstallAppButton />
          <Tooltip title={mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"}>
            <IconButton onClick={toggleMode} aria-label="Alternar tema" size="small">
              {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Ações da lista">
            <IconButton
              onClick={(event) => setAnchor(event.currentTarget)}
              aria-label="Abrir ações da lista"
              aria-controls={anchor ? "list-actions-menu" : undefined}
              aria-expanded={Boolean(anchor)}
              size="small"
              sx={{ ml: 0.5 }}
            >
              <MoreVertRounded />
            </IconButton>
          </Tooltip>
          <Menu
            id="list-actions-menu"
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 205, borderRadius: 3 } } }}
          >
            {actions.map(({ label, icon, action }) => (
              <MenuItem
                key={label}
                disabled={total === 0 && label !== "Importar lista"}
                onClick={() => {
                  setAnchor(null);
                  action();
                }}
                sx={{ py: 1.1 }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
