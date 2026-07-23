import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavigation } from "@/components/bottom-navigation";

const products = [
  { emoji: "🥖", name: "Pão Francês", unit: "Quilograma", price: "R$ 18,00", active: true },
  { emoji: "🍞", name: "Pão de Forma", unit: "Unidade", price: "R$ 12,50", active: true },
  { emoji: "🍔", name: "Pão de Hambúrguer", unit: "Pacote", price: "R$ 15,00", active: true },
  { emoji: "🥐", name: "Bisnaga de Pão", unit: "Pacote", price: "R$ 10,00", active: true },
  { emoji: "🥯", name: "Pão Integral", unit: "Unidade", price: "R$ 14,00", active: false },
];

export default function ProductsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-4">
        <View>
          <Text className="text-2xl font-bold text-ink">Produtos</Text>
          <Text className="mt-1 text-sm text-neutral-500">Catálogo e preços</Text>
        </View>
        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-brand-700">
          <Ionicons name="add" size={27} color="white" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mb-5 h-14 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4">
          <Ionicons name="search-outline" size={21} color="#737373" />
          <TextInput className="h-full flex-1 px-3 text-sm text-ink" placeholder="Buscar produto" placeholderTextColor="#A3A3A3" />
          <Ionicons name="options-outline" size={21} color="#075C31" />
        </View>

        <View className="gap-3">
          {products.map((product) => (
            <Pressable className="flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4" key={product.name}>
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7E8]">
                <Text className="text-2xl">{product.emoji}</Text>
              </View>
              <View className="ml-3 flex-1">
                <View className="flex-row items-center">
                  <Text className="text-sm font-semibold text-ink">{product.name}</Text>
                  {!product.active && (
                    <View className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5">
                      <Text className="text-[9px] text-neutral-400">Inativo</Text>
                    </View>
                  )}
                </View>
                <Text className="mt-1 text-xs text-neutral-400">Venda por {product.unit.toLowerCase()}</Text>
              </View>
              <View className="items-end">
                <Text className="text-sm font-bold text-brand-700">{product.price}</Text>
                <Text className="mt-1 text-[9px] text-neutral-400">preço padrão</Text>
              </View>
              <Ionicons className="ml-2" name="chevron-forward" size={17} color="#A3A3A3" />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="products" />
    </SafeAreaView>
  );
}
