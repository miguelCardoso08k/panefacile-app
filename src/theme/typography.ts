import type { TextStyle } from "react-native";

export const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extrabold: "Inter_800ExtraBold",
} as const;

export const fontSize = {
  caption: 12,
  label: 14,
  body: 16,
  cardTitle: 17,
  sectionTitle: 20,
  screenTitle: 26,
  pageTitle: 30,
  display: 44,
} as const;

export const lineHeight = {
  caption: 16,
  label: 20,
  body: 22,
  cardTitle: 22,
  sectionTitle: 26,
  screenTitle: 32,
  pageTitle: 36,
  display: 48,
} as const;

export const typography = {
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
  },

  label: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
  },

  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },

  bodyMedium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },

  cardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.cardTitle,
    lineHeight: lineHeight.cardTitle,
  },

  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sectionTitle,
    lineHeight: lineHeight.sectionTitle,
  },

  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.screenTitle,
    lineHeight: lineHeight.screenTitle,
  },

  pageTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.pageTitle,
    lineHeight: lineHeight.pageTitle,
  },

  display: {
    fontFamily: fontFamily.extrabold,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
  },
} satisfies Record<string, TextStyle>;
