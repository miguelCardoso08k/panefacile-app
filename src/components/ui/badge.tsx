import { Text } from "react-native";

export function Badge({ label, tone = "green" }: { label: string; tone?: "green" | "red" | "gold" | "blue" | "gray" }) {
  const tones = {
    green: "bg-brand-50 text-brand-700",
    red: "bg-red-50 text-danger",
    gold: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    gray: "bg-neutral-100 text-neutral-600",
  };

  return <Text className={`overflow-hidden rounded-full px-2.5 py-1 text-[10px] font-semibold ${tones[tone]}`}>{label}</Text>;
}
