import { Text, View } from "react-native";

export function Metric({ label, value, tone = "text-ink" }: { label: string; value: string; tone?: string }) {
  return (
    <View className="flex-1">
      <Text className="text-[11px] text-neutral-500">{label}</Text>
      <Text className={`mt-1 text-base font-bold ${tone}`}>{value}</Text>
    </View>
  );
}
