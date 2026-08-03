import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { IconName } from "./icon-name";

const tabs = [
  { label: "Início", icon: "home-outline" as IconName, href: "/dashboard" as const },
  { label: "Pedidos", icon: "receipt-outline" as IconName, href: "/orders" as const },
  { label: "Clientes", icon: "people-outline" as IconName, href: "/customers" as const },
  { label: "Produtos", icon: "cube-outline" as IconName, href: "/products" as const },
  { label: "Financeiro", icon: "wallet-outline" as IconName, href: "/finance" as const },
];

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
