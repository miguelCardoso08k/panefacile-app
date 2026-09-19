import { colors, radius, spacing } from "@/src/theme";
import type { PropsWithChildren } from "react";
import { Pressable, PressableProps, View, type ViewProps } from "react-native";

type cardVariant = "default" | "muted" | "selected";

interface BaseCardProps extends PropsWithChildren {
  variant?: cardVariant;
  className?: string;
}

type CardProps =
  | (BaseCardProps & ViewProps & { onPress?: undefined })
  | (BaseCardProps & PressableProps & { onPress: PressableProps["onPress"] });

const variants = {
  default: {
    backgroundColor: colors.surface.default,
    borderColor: colors.border.default,
  },

  muted: {
    backgroundColor: colors.surface.muted,
    borderColor: colors.border.default,
  },

  selected: {
    backgroundColor: colors.brand.light,
    borderColor: colors.brand.primary,
  },
} as const;

export function Card({
  children,
  variant = "default",
  className = "",
  onPress,
  style,
  ...props
}: CardProps) {
  const currentVariant = variants[variant];

  const baseStyle = {
    backgroundColor: currentVariant.backgroundColor,
    borderColor: currentVariant.borderColor,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
  };

  if (onPress) {
    return (
      <Pressable
        {...(props as PressableProps)}
        onPress={onPress}
        className={className}
        style={({ pressed }) => [
          baseStyle,
          typeof style === "function"
            ? style({
                pressed,
                hovered: false,
              })
            : style,
          pressed && {
            opacity: 0.85,
          },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      {...(props as ViewProps)}
      className={className}
      style={[baseStyle, style as ViewProps["style"]]}
    >
      {children}
    </View>
  );
}
