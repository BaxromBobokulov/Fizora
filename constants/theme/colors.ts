// Fizora brand color tokens. Keep in sync with the `--color-*` vars in global.css —
// this file is the typed source of truth for use in places NativeWind can't reach
// (e.g. StyleSheet, SVG props, native-only components).

export const primaryColors = {
  orange: "#FF7A00",
  purple: "#6C4EFF",
  blue: "#428BFF",
  green: "#22C55E",
} as const;

export const semanticColors = {
  success: "#22C55E",
  warning: "#FBBF24",
  energy: "#FF7A00",
  error: "#FF4D4F",
  info: "#428BFF",
} as const;

export const neutralColors = {
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export const colors = {
  ...primaryColors,
  ...semanticColors,
  ...neutralColors,
} as const;

export type ColorToken = keyof typeof colors;
