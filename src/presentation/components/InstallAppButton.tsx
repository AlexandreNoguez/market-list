import AddToHomeScreenRounded from "@mui/icons-material/AddToHomeScreenRounded";
import IosShareRounded from "@mui/icons-material/IosShareRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useInstallApp } from "../hooks/useInstallApp";

export function InstallAppButton() {
  const { installed, guidance, requestInstall, closeGuidance } = useInstallApp();

  if (installed) return null;

  const isIos = guidance === "ios";

  return (
    <>
      <Tooltip title="Instalar aplicativo">
        <IconButton onClick={requestInstall} aria-label="Instalar Market List" size="small">
          <AddToHomeScreenRounded />
        </IconButton>
      </Tooltip>

      <Dialog
        open={guidance !== null}
        onClose={closeGuidance}
        fullWidth
        maxWidth="xs"
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {isIos ? "Adicionar à Tela de Início" : "Instalar Market List"}
        </DialogTitle>
        <DialogContent>
          {isIos ? (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                No Safari do iPhone ou iPad, siga estes dois passos:
              </Typography>
              <InstallationStep
                number="1"
                icon={<IosShareRounded color="primary" />}
                text="Toque no botão Compartilhar na barra do Safari."
              />
              <InstallationStep
                number="2"
                icon={<AddToHomeScreenRounded color="primary" />}
                text="Escolha Adicionar à Tela de Início e confirme em Adicionar."
              />
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                O navegador não disponibilizou a instalação automática nesta visita.
              </Typography>
              <InstallationStep
                number="1"
                icon={<MoreVertRounded color="primary" />}
                text="Abra o menu do navegador e procure por Instalar aplicativo ou Adicionar à tela inicial."
              />
              <Typography variant="body2" color="text.secondary">
                No Safari do Mac, use Arquivo → Adicionar ao Dock.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button variant="contained" onClick={closeGuidance}>Entendi</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

interface InstallationStepProps {
  number: string;
  icon: React.ReactNode;
  text: string;
}

function InstallationStep({ number, icon, text }: InstallationStepProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          display: "grid",
          placeItems: "center",
          borderRadius: 2.5,
          bgcolor: "action.selected",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="primary" sx={{ fontWeight: 800 }}>
          PASSO {number}
        </Typography>
        <Typography variant="body2">{text}</Typography>
      </Box>
    </Stack>
  );
}
