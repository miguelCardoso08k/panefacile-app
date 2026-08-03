import type { PropsWithChildren } from "react";
import { View } from "react-native";

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <View className={`rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}>{children}</View>;
}
