import { Text, TextInput, View } from "react-native";

type FieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
  onChangeText?: (value: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad" | "decimal-pad";
};

export function Field({ label, value, placeholder, multiline = false, onChangeText, keyboardType }: FieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-xs font-semibold text-neutral-700">{label}</Text>
      <TextInput
        className={`rounded-xl border border-neutral-200 bg-white px-4 text-sm text-ink ${multiline ? "min-h-24 py-3" : "h-12"}`}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}
