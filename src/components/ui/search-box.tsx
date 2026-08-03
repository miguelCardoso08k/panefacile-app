import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export function SearchBox({ placeholder = "Buscar" }: { placeholder?: string }) {
  return (
    <View className="mt-4 flex-row items-center rounded-xl bg-neutral-100 px-4">
      <Ionicons name="search" size={19} color="#737373" />
      <TextInput className="h-12 flex-1 px-3 text-sm text-ink" placeholder={placeholder} placeholderTextColor="#999" />
      <Ionicons name="options-outline" size={19} color="#737373" />
    </View>
  );
}
