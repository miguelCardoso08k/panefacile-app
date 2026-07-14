import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { AppScreen, Header, PageScroll, PrimaryButton, SearchBox } from "@/src/components/ui";
import { money, useMockData } from "@/src/data/mock-store";

export default function CustomersScreen() {
  const { customers, customerBalance } = useMockData();
  return (
    <AppScreen tab="Clientes">
      <Header title="Clientes" />
      <PageScroll>
        <SearchBox placeholder="Buscar cliente" />
        <View className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4">
          {customers.map((customer, index) => (
            <Pressable
              className={`flex-row items-center py-4 ${index < customers.length - 1 ? "border-b border-neutral-100" : ""}`}
              key={customer.id}
              onPress={() => router.push({ pathname: "/customer-details", params: { id: customer.id } })}
            >
              <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-700">
                <Text className="text-xs font-bold text-white">{customer.tradeName.split(" ").map((word) => word[0]).join("").slice(0, 2)}</Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-ink">{customer.tradeName}</Text>
                <Text className="mt-1 text-xs text-neutral-500">{customer.phone}</Text>
                <Text className="mt-1 text-xs text-neutral-500">Em aberto: <Text className="font-bold text-ink">{money(customerBalance(customer.id))}</Text></Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>
          ))}
        </View>
        <View className="mt-5"><PrimaryButton label="Novo cliente" onPress={() => router.push("/customer-form")} /></View>
      </PageScroll>
    </AppScreen>
  );
}
