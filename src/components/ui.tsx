import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

const tabs = [
  { label: "Início", icon: "home-outline" as IconName, href: "/dashboard" as const },
  { label: "Pedidos", icon: "receipt-outline" as IconName, href: "/orders" as const },
  { label: "Clientes", icon: "people-outline" as IconName, href: "/customers" as const },
  { label: "Produtos", icon: "cube-outline" as IconName, href: "/products" as const },
  { label: "Financeiro", icon: "wallet-outline" as IconName, href: "/finance" as const },
];

export function AppScreen({ children, tab }: PropsWithChildren<{ tab?: string }>) {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-1">{children}</View>
      {tab ? <BottomNav active={tab} /> : null}
    </SafeAreaView>
  );
}

export function PageScroll({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName={`px-5 pb-8 ${className}`}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function Header({ title, back = false, action }: { title: string; back?: boolean; action?: ReactNode }) {
  return (
    <View className="h-16 flex-row items-center border-b border-neutral-200 bg-white px-5">
      <View className="w-10">
        {back ? (
          <Pressable className="h-10 w-10 items-center justify-center" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={23} color="#17201B" />
          </Pressable>
        ) : null}
      </View>
      <Text className="flex-1 text-center text-lg font-bold text-ink">{title}</Text>
      <View className="w-10 items-end">{action}</View>
    </View>
  );
}

export function BottomNav({ active }: { active: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-row border-t border-neutral-200 bg-white px-2 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
      {tabs.map((item) => {
        const selected = active === item.label;
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className="flex-1 items-center"
            key={item.label}
            onPress={() => {
              if (!selected) router.replace(item.href);
            }}
          >
            <Ionicons name={selected ? item.icon.replace("-outline", "") as IconName : item.icon} size={21} color={selected ? "#075C31" : "#8A918D"} />
            <Text className={`mt-1 text-[9px] font-semibold ${selected ? "text-brand-700" : "text-neutral-400"}`}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SearchBox({ placeholder = "Buscar" }: { placeholder?: string }) {
  return (
    <View className="mt-4 flex-row items-center rounded-xl bg-neutral-100 px-4">
      <Ionicons name="search" size={19} color="#737373" />
      <TextInput className="h-12 flex-1 px-3 text-sm text-ink" placeholder={placeholder} placeholderTextColor="#999" />
      <Ionicons name="options-outline" size={19} color="#737373" />
    </View>
  );
}

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <View className={`rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}>{children}</View>;
}

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

export function Field({ label, value, placeholder, multiline = false, onChangeText, keyboardType }: { label: string; value?: string; placeholder?: string; multiline?: boolean; onChangeText?: (value: string) => void; keyboardType?: "default" | "email-address" | "phone-pad" | "decimal-pad" }) {
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

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-ink">{title}</Text>
      {action ? <Text className="text-xs font-bold text-brand-700">{action}</Text> : null}
    </View>
  );
}

export function Metric({ label, value, tone = "text-ink" }: { label: string; value: string; tone?: string }) {
  return (
    <View className="flex-1">
      <Text className="text-[11px] text-neutral-500">{label}</Text>
      <Text className={`mt-1 text-base font-bold ${tone}`}>{value}</Text>
    </View>
  );
}
