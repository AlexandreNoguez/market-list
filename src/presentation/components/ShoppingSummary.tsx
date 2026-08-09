import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import RouteRounded from "@mui/icons-material/RouteRounded";
import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";

interface ShoppingSummaryProps {
  total: number;
  completed: number;
}

export function ShoppingSummary({ total, completed }: ShoppingSummaryProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Paper
      component="section"
      aria-label="Resumo da compra"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg, rgba(146,211,110,.11), rgba(255,255,255,.02))"
            : "linear-gradient(145deg, rgba(87,139,73,.10), rgba(255,255,255,.9))",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 750, lineHeight: 1 }}>
            Progresso da compra
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5 }}>
            {total === 0 ? "Lista pronta para começar" : `${completed} de ${total} encontrados`}
          </Typography>
        </Box>
        <Stack sx={{ alignItems: "center", color: total > 0 && completed === total ? "success.main" : "primary.main" }}>
          {total > 0 && completed === total ? <CheckCircleRounded /> : <RouteRounded />}
          <Typography variant="caption" sx={{ fontWeight: 800 }}>{percentage}%</Typography>
        </Stack>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={percentage}
        aria-label={`${percentage}% da compra concluída`}
        sx={{ height: 8, borderRadius: 99, bgcolor: "action.hover", "& .MuiLinearProgress-bar": { borderRadius: 99 } }}
      />
    </Paper>
  );
}
