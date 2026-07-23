import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavigation } from "@/components/bottom-navigation";

const customers = [
  { initials: "MO", name: "Mercado Oliveira", phone: "(11) 98765-1200", balance: "R$ 1.240,00", overdue: false },
  { initials: "LS", name: "Lanchonete Silva", phone: "(11) 97654-3201", balance: "R$ 680,00", overdue: false },
  { initials: "RC", name: "Restaurante Central", phone: "(11) 96543-8870", balance: "R$ 1.320,00", overdue: true },
  { initials: "MB", name: "Mercado Bom Preço", phone: "(11) 95432-1104", balance: "R$ 0,00", overdue: false },
];

export default function CustomersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-4">
        <View>
          <Text className="text-2xl font-bold text-ink">Clientes</Text>
          <Text className="mt-1 text-sm text-neutral-500">4 clientes ativos</Text>
        </View>
        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-brand-700">
          <Ionicons name="person-add-outline" size={22} color="white" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mb-5 h-14 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4">
          <Ionicons name="search-outline" size={21} color="#737373" />
          <TextInput className="h-full flex-1 px-3 text-sm text-ink" placeholder="Buscar cliente" placeholderTextColor="#A3A3A3" />
        </View>

        <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4">
          {customers.map((customer, index) => (
            <Pressable
              className={`flex-row items-center py-4 ${index < customers.length - 1 ? "border-b border-neutral-100" : ""}`}
              key={customer.name}
            >
              <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                <Text className="text-xs font-bold text-brand-700">{customer.initials}</Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-ink">{customer.name}</Text>
                <Text className="mt-1 text-xs text-neutral-400">{customer.phone}</Text>
              </View>
              <View className="items-end">
                <Text className={`text-xs font-bold ${customer.overdue ? "text-danger" : "text-brand-700"}`}>
                  {customer.balance}
                </Text>
                <Text className="mt-1 text-[9px] text-neutral-400">saldo em aberto</Text>
              </View>
              <Ionicons className="ml-2" name="chevron-forward" size={17} color="#A3A3A3" />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="customers" />
    </SafeAreaView>
  );
}
