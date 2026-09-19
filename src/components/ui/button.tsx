import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";

import { colors, sizes, spacing } from "@/src/theme";
import { AppText } from "./app-text";

const butttonVariants = {
  primary: {
    container: "bg-brand",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
  },
  outline: {
    container: "bg-surface border bordeer-brand",
    textTone: "primary",
    loaderColor: colors.text.primary,
  },

  danger: {
    container: "bg-danger",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
  },
  gold: {
    container: "bg-gold",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
  },
  ghost: {
    container: "bg-transparent",
    textTone: "primary",
    loaderColor: colors.text.primary,
  },
} as const;

const buttonSizes = {
  sm: {
    height: sizes.button.sm,
    paddingHorizontal: spacing[4],
  },

  md: {
    height: sizes.button.md,
    paddingHorizontal: spacing[5],
  },

  lg: {
    height: sizes.button.lg,
    paddingHorizontal: spacing[6],
  },
} as const;

type ButtonVariant = keyof typeof butttonVariants;
type ButtonSize = keyof typeof buttonSizes;

interface ButtonProps extends Omit<PressableProps, "children"> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "lg",
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  style,
  ...props
}: ButtonProps) {
  const currentVariant = butttonVariants[variant];

  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`flex-row items-center justify-center gap-2 rounded-input ${buttonSizes[size]} ${currentVariant.container} ${isDisabled ? "opacity-50" : ""} ${className}`}
      style={(state) => [
        typeof style === "function" ? style(state) : style,
        {
          opacity: state.pressed && !isDisabled ? 0.85 : undefined,
        },
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={currentVariant.loaderColor} />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}

          <AppText variant="label" tone={currentVariant.textTone}>
            {children}
          </AppText>

          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}
