import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MainTab = "home" | "orders" | "customers" | "products" | "finance";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const items: {
  key: MainTab;
  label: string;
  icon: IconName;
  activeIcon: IconName;
  href: "/dashboard" | "/orders" | "/customers" | "/products" | "/finance";
}[] = [
  { key: "home", label: "Início", icon: "home-outline", activeIcon: "home", href: "/dashboard" },
  { key: "orders", label: "Pedidos", icon: "receipt-outline", activeIcon: "receipt", href: "/orders" },
  { key: "customers", label: "Clientes", icon: "people-outline", activeIcon: "people", href: "/customers" },
  { key: "products", label: "Produtos", icon: "cube-outline", activeIcon: "cube", href: "/products" },
  { key: "finance", label: "Financeiro", icon: "wallet-outline", activeIcon: "wallet", href: "/finance" },
];

export function BottomNavigation({ activeTab }: { activeTab: MainTab }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t border-neutral-200 bg-white px-2 pt-3"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {items.map((item) => {
        const active = item.key === activeTab;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            className="flex-1 items-center"
            key={item.key}
            onPress={() => {
              if (!active) {
                router.replace(item.href);
              }
            }}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={21}
              color={active ? "#075C31" : "#8A918D"}
            />
            <Text
              className={`mt-1 text-[9px] font-semibold ${
                active ? "text-brand-700" : "text-neutral-400"
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
