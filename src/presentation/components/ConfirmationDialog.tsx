import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel,
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: 4 } } }}>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color={destructive ? "error" : "primary"}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
