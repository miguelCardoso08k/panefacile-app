import { Text, View } from "react-native";

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-ink">{title}</Text>
      {action ? <Text className="text-xs font-bold text-brand-700">{action}</Text> : null}
    </View>
  );
}
