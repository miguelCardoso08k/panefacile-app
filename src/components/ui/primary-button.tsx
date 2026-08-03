import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import type { IconName } from "./icon-name";

export function PrimaryButton({ label, icon = "add", onPress, secondary = false }: { label: string; icon?: IconName; onPress?: () => void; secondary?: boolean }) {
  return (
    <Pressable
      className={`h-13 flex-row items-center justify-center rounded-xl border px-5 py-4 ${secondary ? "border-gold bg-white" : "border-brand-700 bg-brand-700"}`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={secondary ? "#A86400" : "white"} />
      <Text className={`ml-2 text-sm font-bold ${secondary ? "text-amber-700" : "text-white"}`}>{label}</Text>
    </Pressable>
  );
}
