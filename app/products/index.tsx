import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { AppScreen, Header, PageScroll, PrimaryButton, SearchBox } from "@/src/components/ui";
import { money, useMockData } from "@/src/data/mock-store";

export default function ProductsScreen() {
  const { products } = useMockData();
  return <AppScreen tab="Produtos"><Header title="Produtos" /><PageScroll><SearchBox placeholder="Buscar produto" /><View className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4">{products.map((product, index) => <Pressable className={`flex-row items-center py-4 ${index < products.length - 1 ? "border-b border-neutral-100" : ""}`} key={product.id} onPress={() => router.push({ pathname: "/products/form", params: { id: product.id } })}><View className="h-14 w-14 items-center justify-center rounded-xl bg-amber-50"><Text className="text-3xl">{product.icon}</Text></View><View className="ml-3 flex-1"><Text className="text-sm font-bold text-ink">{product.name}</Text><Text className="mt-1 text-xs text-neutral-500">{product.unit}</Text><Text className="mt-1 text-xs text-neutral-400">Mín: {money(product.minimumPrice)}</Text></View><Text className="text-sm font-bold text-ink">{money(product.defaultPrice)}</Text></Pressable>)}</View><View className="mt-5"><PrimaryButton label="Novo produto" onPress={() => router.push("/products/form")} /></View></PageScroll></AppScreen>;
}
