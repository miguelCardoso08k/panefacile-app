import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { AppScreen, Card, Field, Header, PageScroll, PrimaryButton } from "@/src/components/ui";
import { money, parseMoney, useMockData } from "@/src/data/mock-store";

export default function PricingScreen() {
  const { customerId: requestedCustomerId } = useLocalSearchParams<{ customerId?: string }>();
  const customerId = requestedCustomerId ?? "";
  const { customers, products, prices, savePrice, deletePrice } = useMockData();
  const [productId, setProductId] = useState(products[0]?.id ?? ""); const existing = prices.find((item) => item.customerId === customerId && item.productId === productId); const [price, setPrice] = useState(existing ? money(existing.price) : ""); const [reason, setReason] = useState(existing?.reason ?? "");
  const customer = customers.find((item) => item.id === customerId);
  if (!customer) return <AppScreen><Header title="Preços por cliente" back /><View className="flex-1 items-center justify-center"><Text>Cliente não encontrado.</Text></View></AppScreen>;
  function submit() { const value = parseMoney(price); const product = products.find((item) => item.id === productId); if (!product || value <= 0) return Alert.alert("Preço inválido", "Informe um preço maior que zero."); if (value < product.minimumPrice && !reason.trim()) return Alert.alert("Justificativa obrigatória", "Explique por que o preço está abaixo do mínimo."); savePrice({ customerId, productId, price: value, reason }); setPrice(""); }
  return <AppScreen><Header title="Preços por cliente" back /><PageScroll className="pt-5"><Card><Text className="text-xs text-neutral-500">Cliente</Text><Text className="mt-1 text-base font-bold text-ink">{customer?.tradeName ?? "Cliente"}</Text></Card><View className="mt-4">{prices.filter((item) => item.customerId === customerId).map((custom) => { const product = products.find((item) => item.id === custom.productId); return <Card className="mb-3" key={custom.id}><View className="flex-row items-center"><Text className="text-3xl">{product?.icon}</Text><View className="ml-3 flex-1"><Text className="font-bold text-ink">{product?.name}</Text><Text className="mt-1 text-xs text-neutral-500">Padrão: {money(product?.defaultPrice ?? 0)}</Text></View><Text className="mr-3 font-bold text-brand-700">{money(custom.price)}</Text><Pressable onPress={() => deletePrice(custom.id)}><Text className="text-danger">Excluir</Text></Pressable></View></Card>; })}</View>
    <Text className="mb-2 text-xs font-semibold text-neutral-700">Produto</Text><View className="mb-4 flex-row flex-wrap gap-2">{products.map((product) => <Pressable className={`rounded-full px-3 py-2 ${productId === product.id ? "bg-brand-700" : "bg-white"}`} key={product.id} onPress={() => { setProductId(product.id); const found = prices.find((item) => item.customerId === customerId && item.productId === product.id); setPrice(found ? money(found.price) : ""); setReason(found?.reason ?? ""); }}><Text className={`text-xs ${productId === product.id ? "text-white" : "text-ink"}`}>{product.name}</Text></Pressable>)}</View><Field label="Preço personalizado" value={price} onChangeText={setPrice} keyboardType="decimal-pad" /><Field label="Justificativa (se abaixo do mínimo)" value={reason} onChangeText={setReason} multiline /><PrimaryButton label="Salvar preço" icon="pricetag" onPress={submit} />
  </PageScroll></AppScreen>;
}
