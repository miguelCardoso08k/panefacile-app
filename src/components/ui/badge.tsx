import type { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

import { radius, spacing, statusColors } from "@/src/theme";

import { AppText } from "./app-text";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps extends PropsWithChildren, ViewProps {
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  className = "",
  style,
  ...props
}: BadgeProps) {
  const colors = statusColors[variant];

  return (
    <View
      {...props}
      className={`self-start ${className}`}
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: radius.full,

          paddingHorizontal: spacing[3],
          paddingVertical: spacing[1],
        },
        style,
      ]}
    >
      <AppText
        variant="caption"
        style={{
          color: colors.foreground,
        }}
      >
        {children}
      </AppText>
    </View>
  );
}
