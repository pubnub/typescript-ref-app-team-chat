// theme based on the system-ui specification https://github.com/system-ui/theme-specification

/* breakpoints */
const breakpoints = ["600px", "1200px"] as const;
const mediaQueries = {
  medium: `@media screen and (min-width: ${breakpoints[0]})`,
  large: `@media screen and (min-width: ${breakpoints[1]})`,
  touch: `@media (hover: none)`
} as const;
const fonts = {
  app: '"Roboto", sans-serif'
} as const;
/* fonts */
const fontSizes = ["0px", "11px", "13px", "15px", "20px"] as const;
const fontSizesAliases = {
  none: fontSizes[0],
  small: fontSizes[1],
  regular: fontSizes[2],
  medium: fontSizes[3],
  large: fontSizes[4]
};
const fontWeights = [0, 300, 400, 500, 700, 900] as const;
const fontWeightsAliases = {
  none: fontWeights[0],
  light: fontWeights[1],
  regular: fontWeights[2],
  medium: fontWeights[3],
  bold: fontWeights[4],
  black: fontWeights[5]
};
/* colors */
const colors = {
  error: "#B63133",
  success: "#62E905",
  inactive: "#F5A623",
  primary: ["#8E2DE2", "#4A00E0"],
  neutral: ["#FFFFFF", "#F8F6FD", "#F1EDFD", "#9B9B9B", "#585858"],
  avatars: ["#F7861C", "#35B7DF", "#DE2440", "#1F68EF", "#9F34C3"]
} as const;
const colorAliases = {
  onPrimary: colors.neutral[0],
  selectedText: "rgba(0, 0, 0, 0.5)",
  active: colors.primary[0],
  activeText: colors.neutral[0],
  messageText: colors.neutral[4],
  normalText: colors.neutral[3],
  importantText: colors.neutral[4],
  avatarText: colors.neutral[0],
  borderLight: colors.neutral[2],
  borderDark: colors.neutral[3]
} as const;
// backgrounds can be colors or gradients
const backgrounds = {
  primary: `linear-gradient(180deg, ${colors.primary[0]} 0%, ${colors.primary[1]} 100%)`,
  primaryHover: "rgba(255, 255, 255, 0.1)",
  primaryActive: "rgba(0, 0, 0, 0.1)",
  panel: colors.neutral[0],
  panelHover: colors.neutral[1],
  content: colors.neutral[1],
  contentHover: colors.neutral[2],
  message: colors.neutral[0]
};
/* space and sizes */
const sizes = ["0", "36px", "56px", "85px", "260px", "290px"] as const;
const space = [
  "0",
  "10px",
  "12px",
  "14px",
  "16px",
  "21px",
  "24px",
  "32px",
  "40px"
] as const;
/* borders */
const radii = ["0", "5px", "10px", "100vmax"] as const;
const radiiAliases = {
  square: radii[0],
  light: radii[1],
  messageEditor: radii[1],
  medium: radii[2],
  strong: radii[2],
  round: radii[3]
};
const borderWidths = ["0", "1px", "5px"] as const;
const borderStyles = ["solid"] as const;
const borders = [
  "none",
  `${borderWidths[1]} ${borderStyles[0]}`,
  `${borderWidths[2]} ${borderStyles[0]}`
] as const;
const bordersAliases = {
  none: borders[0],
  light: borders[1],
  strong: borders[2]
};
/* other */
const shadows = [
  "0 6px 10px rgba(103, 19, 176, 0.06)",
  "0 4px 30px rgba(0, 0, 0, 0.4)"
] as const;
const custom = {
  dark: false,
  companyName: "PubNub",
  tagLine: "World-Class APIs for In-App Chat"
} as const;

export const appTheme = {
  breakpoints,
  mediaQueries,
  fonts,
  fontSizes: { ...fontSizes, ...fontSizesAliases },
  fontWeights: { ...fontWeights, ...fontWeightsAliases },
  colors: { ...colors, ...colorAliases },
  backgrounds,
  sizes,
  space,
  radii: { ...radii, ...radiiAliases },
  borderWidths,
  borderStyles,
  borders: { ...borders, ...bordersAliases },
  shadows,
  custom
};

export type Theme = typeof appTheme;
