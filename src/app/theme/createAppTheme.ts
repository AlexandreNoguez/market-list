import { alpha, createTheme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode) {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: dark ? "#92D36E" : "#3E7C3A",
        light: dark ? "#B9E69E" : "#6DA766",
        dark: dark ? "#5B9B40" : "#285D27",
        contrastText: dark ? "#10210E" : "#FFFFFF",
      },
      secondary: {
        main: dark ? "#F4BB62" : "#B76818",
      },
      background: {
        default: dark ? "#111510" : "#F5F7F1",
        paper: dark ? "#1B2119" : "#FFFFFF",
      },
      text: {
        primary: dark ? "#EFF4EB" : "#1C271B",
        secondary: dark ? "#AEB9A9" : "#637060",
      },
      divider: dark ? "rgba(255,255,255,0.09)" : "rgba(35,62,31,0.10)",
      success: { main: dark ? "#92D36E" : "#3E7C3A" },
      error: { main: dark ? "#FF8A80" : "#C43D36" },
    },
    shape: { borderRadius: 4 },
    spacing: 8,
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: "clamp(1.65rem, 6vw, 2.35rem)", fontWeight: 800, letterSpacing: "-0.04em" },
      h2: { fontSize: "1.2rem", fontWeight: 750, letterSpacing: "-0.02em" },
      h3: { fontSize: "1rem", fontWeight: 750 },
      button: { fontWeight: 700, textTransform: "none" },
    },
    shadows: [
      "none",
      dark ? "0 1px 2px rgba(0,0,0,.24)" : "0 1px 3px rgba(41,65,35,.06)",
      dark ? "0 8px 30px rgba(0,0,0,.22)" : "0 8px 30px rgba(41,65,35,.08)",
      ...Array(22).fill(dark ? "0 12px 35px rgba(0,0,0,.28)" : "0 12px 35px rgba(41,65,35,.1)"),
    ] as unknown as ReturnType<typeof createTheme>["shadows"],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "html, body, #root": { minHeight: "100%" },
          body: {
            margin: 0,
            backgroundImage: dark
              ? "radial-gradient(circle at 15% -5%, rgba(105, 159, 78, .13), transparent 30%)"
              : "radial-gradient(circle at 15% -5%, rgba(116, 169, 91, .14), transparent 32%)",
            backgroundAttachment: "fixed",
          },
          "*": { boxSizing: "border-box" },
          "::selection": { background: alpha(dark ? "#92D36E" : "#3E7C3A", 0.25) },
        },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 12, minHeight: 42 } },
      },
      MuiIconButton: {
        styleOverrides: { root: { borderRadius: 12 } },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
      MuiTextField: {
        defaultProps: { size: "small" },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiTooltip: { defaultProps: { arrow: true } },
    },
  });
}
