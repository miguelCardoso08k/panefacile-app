import { colors } from "./colors";

export const statusColors = {
  success: {
    background: colors.success.light,
    foreground: colors.success.default,
  },

  warning: {
    background: colors.warning.light,
    foreground: colors.warning.default,
  },

  danger: {
    background: colors.danger.light,
    foreground: colors.danger.default,
  },

  info: {
    background: colors.info.light,
    foreground: colors.info.default,
  },

  neutral: {
    background: colors.surface.muted,
    foreground: colors.text.secondary,
  },
} as const;

export const orderStatusTheme = {
  DRAFT: statusColors.neutral,
  AUTOMATIC_PENDING: statusColors.warning,
  CONFIRMED: statusColors.info,
  IN_PRODUCTION: statusColors.warning,
  SEPARATING: statusColors.warning,
  LOADED: statusColors.info,
  IN_DELIVERY: statusColors.info,
  DELIVERED: statusColors.success,
  CANCELED: statusColors.danger,
  SPLIT: statusColors.neutral,
} as const;

export const billingStatusTheme = {
  OPEN: statusColors.info,
  GRACE_PERIOD: statusColors.warning,
  PARTIALLY_PAID: statusColors.warning,
  OVERDUE: statusColors.danger,
  PAID: statusColors.success,
} as const;
