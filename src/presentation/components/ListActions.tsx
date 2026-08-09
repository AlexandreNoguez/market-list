import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import ShareRounded from "@mui/icons-material/ShareRounded";
import { Button, Paper, Stack, Typography } from "@mui/material";

interface ListActionsProps {
  disabled: boolean;
  onImport: () => void;
  onExport: () => void;
  onShare: () => void;
}

export function ListActions({ disabled, onImport, onExport, onShare }: ListActionsProps) {
  return (
    <Paper component="section" elevation={0} sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h3" sx={{ mb: 1.25 }}>Leve sua lista com você</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <Button variant="outlined" startIcon={<FileUploadRounded />} onClick={onImport} fullWidth>
          Importar
        </Button>
        <Button variant="outlined" startIcon={<FileDownloadRounded />} onClick={onExport} disabled={disabled} fullWidth>
          Exportar
        </Button>
        <Button variant="outlined" startIcon={<ShareRounded />} onClick={onShare} disabled={disabled} fullWidth>
          Compartilhar
        </Button>
      </Stack>
    </Paper>
  );
}
