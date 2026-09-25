import { type ReactNode, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";

import { colors, fontSize, sizes, spacing } from "@/src/theme";
import { AppText } from "./app-text";

const butttonVariants = {
  primary: {
    container: "bg-brand",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
    rippleColor: "rgba(255, 255, 255, 0.22)",
  },
  outline: {
    container: "bg-surface border border-brand",
    textTone: "primary",
    loaderColor: colors.text.primary,
    rippleColor: "rgba(5, 91, 57, 0.14)",
  },

  danger: {
    container: "bg-danger",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
    rippleColor: "rgba(255, 255, 255, 0.22)",
  },
  gold: {
    container: "bg-gold",
    textTone: "inverse",
    loaderColor: colors.text.inverse,
    rippleColor: "rgba(255, 255, 255, 0.22)",
  },
  ghost: {
    container: "bg-transparent",
    textTone: "primary",
    loaderColor: colors.text.primary,
    rippleColor: "rgba(11, 16, 38, 0.1)",
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
  children: string | ReactNode;
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
  onBlur,
  onFocus,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const currentVariant = butttonVariants[variant];
  const currentSize = buttonSizes[size];
  const isDisabled = disabled || isLoading;
  const visualPressed = props.testOnly_pressed ?? isPressed;
  const interactionState = {
    focused: isFocused,
    hovered: isHovered,
    pressed: visualPressed,
  };
  const resolvedStyle =
    typeof style === "function" ? style(interactionState) : style;

  return (
    <Pressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? "button"}
      disabled={isDisabled}
      android_ripple={
        props.android_ripple ?? { color: currentVariant.rippleColor }
      }
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onHoverIn={(event) => {
        setIsHovered(true);
        onHoverIn?.(event);
      }}
      onHoverOut={(event) => {
        setIsHovered(false);
        onHoverOut?.(event);
      }}
      onPressIn={(event) => {
        setIsPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setIsPressed(false);
        onPressOut?.(event);
      }}
      className={`flex-row items-center justify-center rounded-input ${currentVariant.container} ${isDisabled ? "opacity-50" : ""} ${className}`}
      style={[
        {
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          gap: spacing[2],
        },
        resolvedStyle,
        visualPressed && !isDisabled
          ? {
              opacity: 0.82,
              transform: [{ scale: 0.98 }],
            }
          : undefined,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={currentVariant.loaderColor} />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}

          {children && typeof children !== "string" ? (
            <View>{children}</View>
          ) : (
            <AppText
              variant="label"
              style={{ fontSize: fontSize.body }}
              tone={currentVariant.textTone}
            >
              {children}
            </AppText>
          )}

          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}
