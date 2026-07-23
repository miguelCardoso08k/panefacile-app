import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavigation } from "@/components/bottom-navigation";

const orders = [
  { number: "#1048", customer: "Mercado Oliveira", date: "Hoje", total: "R$ 420,00", status: "Em produção", tone: "green" },
  { number: "#1047", customer: "Lanchonete Silva", date: "Hoje", total: "R$ 285,50", status: "Pronto", tone: "blue" },
  { number: "#1046", customer: "Restaurante Central", date: "Amanhã", total: "R$ 610,00", status: "Confirmado", tone: "gold" },
  { number: "#1045", customer: "Mercado Bom Preço", date: "16/07", total: "R$ 198,00", status: "Entregue", tone: "neutral" },
];

const statusStyles: Record<string, { background: string; color: string }> = {
  green: { background: "#EAF4EE", color: "#075C31" },
  blue: { background: "#EAF2FB", color: "#2E68A1" },
  gold: { background: "#FFF5DF", color: "#9A5D00" },
  neutral: { background: "#F2F2F2", color: "#626864" },
};

export default function OrdersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-4">
        <View>
          <Text className="text-2xl font-bold text-ink">Pedidos</Text>
          <Text className="mt-1 text-sm text-neutral-500">Acompanhe as entregas da padaria</Text>
        </View>
        <Pressable
          accessibilityLabel="Novo pedido"
          className="h-12 w-12 items-center justify-center rounded-full bg-brand-700"
          onPress={() => router.push("/new-order")}
        >
          <Ionicons name="add" size={27} color="white" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mb-4 flex-row gap-2">
          {[
            ["Todos", true],
            ["Hoje", false],
            ["Em produção", false],
          ].map(([label, active]) => (
            <Pressable
              className={`rounded-full border px-4 py-2 ${
                active ? "border-brand-700 bg-brand-700" : "border-neutral-200 bg-white"
              }`}
              key={String(label)}
            >
              <Text className={`text-xs font-semibold ${active ? "text-white" : "text-neutral-500"}`}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-3">
          {orders.map((order) => {
            const style = statusStyles[order.tone];
            return (
              <Pressable className="rounded-2xl border border-neutral-200 bg-white p-4" key={order.number}>
                <View className="flex-row items-start">
                  <View className="h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                    <Ionicons name="receipt-outline" size={22} color="#075C31" />
                  </View>
                  <View className="ml-3 flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-sm font-bold text-ink">{order.number}</Text>
                      <Text className="ml-2 text-xs text-neutral-400">Entrega: {order.date}</Text>
                    </View>
                    <Text className="mt-1 text-sm text-neutral-600">{order.customer}</Text>
                  </View>
                  <Text className="text-sm font-bold text-brand-700">{order.total}</Text>
                </View>
                <View className="mt-3 flex-row items-center justify-between border-t border-neutral-100 pt-3">
                  <View className="rounded-full px-3 py-1" style={{ backgroundColor: style.background }}>
                    <Text className="text-[10px] font-semibold" style={{ color: style.color }}>{order.status}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#A3A3A3" />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="orders" />
    </SafeAreaView>
  );
}
