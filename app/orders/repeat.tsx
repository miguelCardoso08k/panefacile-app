import { router, useLocalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import { AppScreen, Badge, Card, Header, PageScroll, PrimaryButton, SectionTitle } from "@/src/components/ui";
import { money, useMockData } from "@/src/data/mock-store";

export default function RepeatOrderScreen() {
  const { id: requestedId } = useLocalSearchParams<{ id?: string }>(); const id = requestedId ?? ""; const { orders, products, resolvePrice, saveOrder } = useMockData(); const source = orders.find((item) => item.id === id);
  if (!source) return <AppScreen><Header title="Repetir pedido" back /><View className="flex-1 items-center justify-center"><Text>Pedido não encontrado.</Text></View></AppScreen>;
  function repeat() { if (!source) return Alert.alert("Sem pedido", "Não existe um pedido para repetir."); const newId = saveOrder({ customerId: source.customerId, status: "Rascunho", deliveryDate: new Date().toLocaleDateString("pt-BR"), dueDate: source.dueDate, notes: source.notes, createdAt: new Date().toLocaleDateString("pt-BR"), items: source.items.map((item) => ({ ...item, id: `item-${Date.now()}-${item.productId}`, unitPrice: resolvePrice(source.customerId, item.productId) })) }); router.replace({ pathname: "/orders/form", params: { id: newId } }); }
  return <AppScreen><Header title="Repetir pedido" back /><PageScroll className="pt-5"><Card><Text className="text-xs text-neutral-500">Pedido de origem</Text><Text className="mt-1 font-bold text-ink">{source?.number}</Text></Card><SectionTitle title="Revisão de itens" />{source?.items.map((item) => { const current = resolvePrice(source.customerId, item.productId); return <Card className="mb-3" key={item.id}><View className="flex-row items-center"><Text className="text-3xl">{products.find((p) => p.id === item.productId)?.icon}</Text><View className="ml-3 flex-1"><Text className="font-bold text-ink">{item.productName}</Text><Text className="mt-1 text-xs text-neutral-400">Preço anterior: {money(item.unitPrice)}</Text><Text className="text-xs font-bold text-brand-700">Preço atual: {money(current)}</Text></View><Badge label={current === item.unitPrice ? "Sem alteração" : "Preço alterado"} tone={current === item.unitPrice ? "green" : "gold"} /></View></Card>; })}<PrimaryButton label="Criar novo rascunho" icon="repeat" onPress={repeat} /></PageScroll></AppScreen>;
}
