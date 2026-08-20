import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import type { IconName } from "@/src/components/ui";

const tabIcons: Record<string, { focused: IconName; unfocused: IconName }> = {
  dashboard: { focused: "home", unfocused: "home-outline" },
  orders: { focused: "receipt", unfocused: "receipt-outline" },
  customers: { focused: "people", unfocused: "people-outline" },
  products: { focused: "cube", unfocused: "cube-outline" },
  finance: { focused: "wallet", unfocused: "wallet-outline" },
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#075C31",
        tabBarInactiveTintColor: "#8A918D",
        tabBarIcon: ({ color, focused, size }) => {
          const icons = tabIcons[route.name];
          return <Ionicons color={color} name={focused ? icons.focused : icons.unfocused} size={size} />;
        },
        tabBarLabelStyle: { fontSize: 9, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E5E5",
          paddingTop: 6,
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Início" }} />
      <Tabs.Screen name="orders" options={{ title: "Pedidos" }} />
      <Tabs.Screen name="customers" options={{ title: "Clientes" }} />
      <Tabs.Screen name="products" options={{ title: "Produtos" }} />
      <Tabs.Screen name="finance" options={{ title: "Financeiro" }} />
    </Tabs>
  );
}
