import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { AppScreen, Badge, Card, Header, PageScroll, PrimaryButton, SearchBox } from "@/src/components/ui";
import { money, useMockData } from "@/src/data/mock-store";

export default function OrdersScreen() {
  const { orders, customers, orderTotal } = useMockData();
  const tone = (status: string) => status === "Cancelado" ? "red" as const : status === "Em produção" ? "gold" as const : "green" as const;
  return <AppScreen tab="Pedidos"><Header title="Pedidos" /><PageScroll><SearchBox placeholder="Buscar pedido ou cliente" /><View className="my-4 flex-row gap-2">{["Todos", "Hoje", "Em aberto"].map((filter, i) => <Text className={`overflow-hidden rounded-full px-3 py-2 text-xs font-semibold ${i === 0 ? "bg-brand-700 text-white" : "bg-white text-neutral-600"}`} key={filter}>{filter}</Text>)}</View>{orders.map((order) => <Pressable className="mb-3" key={order.id} onPress={() => router.push({ pathname: "/orders/details", params: { id: order.id } })}><Card><View className="flex-row justify-between"><Text className="text-sm font-bold text-ink">{order.number}</Text><Text className="text-sm font-bold text-ink">{money(orderTotal(order))}</Text></View><Text className="mt-2 text-xs text-neutral-500">{order.createdAt} • {customers.find((item) => item.id === order.customerId)?.tradeName}</Text><View className="mt-3 flex-row justify-end"><Badge label={order.status} tone={tone(order.status)} /></View></Card></Pressable>)}<PrimaryButton label="Novo pedido" onPress={() => router.push("/orders/form")} /></PageScroll></AppScreen>;
}
