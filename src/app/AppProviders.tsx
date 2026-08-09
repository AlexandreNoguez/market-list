import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, type PropsWithChildren } from "react";
import { usePreferencesStore } from "../presentation/stores/preferencesStore";
import { createAppTheme } from "./theme/createAppTheme";

export function AppProviders({ children }: PropsWithChildren) {
  const mode = usePreferencesStore((state) => state.colorMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
