import { colors, sizes } from "@/src/theme";
import { Search, X } from "lucide-react-native";
import { Pressable } from "react-native";
import { Input } from "./input";

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  disabled,
  onSubmit,
  onClear,
  className,
}: SearchInputProps) {
  function handleClear() {
    onChangeText("");
    onClear?.();
  }

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={!disabled}
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      containerClassName={className}
      onSubmitEditing={onSubmit}
      leftElement={
        <Search size={sizes.icon.md} color={colors.text.secondary} />
      }
      rightElement={
        value.length > 0 && !disabled ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Limpar Pesquisa"
            hitSlop={8}
            onPress={handleClear}
          >
            <X size={sizes.icon.md} color={colors.text.secondary} />
          </Pressable>
        ) : null
      }
    />
  );
}
