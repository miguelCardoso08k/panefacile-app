import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavigation } from "@/components/bottom-navigation";

const movements = [
  { icon: "arrow-down-outline" as const, customer: "Mercado Oliveira", label: "Pagamento recebido", date: "Hoje, 09:30", value: "+ R$ 420,00", positive: true },
  { icon: "receipt-outline" as const, customer: "Restaurante Central", label: "Pedido #1046", date: "Hoje, 08:15", value: "R$ 610,00", positive: false },
  { icon: "arrow-down-outline" as const, customer: "Lanchonete Silva", label: "Pagamento recebido", date: "Ontem, 16:40", value: "+ R$ 285,50", positive: true },
];

function SummaryCard({ icon, label, value, color, background }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; value: string; color: string; background: string }) {
  return (
    <View className="flex-1 rounded-2xl border border-neutral-200 bg-white p-4">
      <View className="mb-3 h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: background }}>
        <Ionicons name={icon} size={19} color={color} />
      </View>
      <Text className="text-[11px] text-neutral-500">{label}</Text>
      <Text className="mt-1 text-base font-bold" style={{ color }}>{value}</Text>
    </View>
  );
}

export default function FinanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-4">
        <View>
          <Text className="text-2xl font-bold text-ink">Financeiro</Text>
          <Text className="mt-1 text-sm text-neutral-500">Resumo de julho</Text>
        </View>
        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white">
          <Ionicons name="calendar-outline" size={22} color="#075C31" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
        <View className="overflow-hidden rounded-3xl bg-brand-700 p-5">
          <View className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand-600" />
          <Text className="text-sm text-brand-100">Total recebido no mês</Text>
          <Text className="mt-2 text-3xl font-bold text-white">R$ 18.420,50</Text>
          <View className="mt-5 flex-row items-center">
            <View className="rounded-full bg-white/15 px-3 py-1.5">
              <Text className="text-[10px] font-semibold text-white">↑ 12% vs. junho</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <SummaryCard icon="time-outline" label="Em aberto" value="R$ 8.740" color="#B66F00" background="#FFF5DF" />
          <SummaryCard icon="alert-circle-outline" label="Vencido" value="R$ 1.320" color="#D93636" background="#FDEAEA" />
        </View>

        <View className="mb-3 mt-7 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-ink">Movimentações recentes</Text>
          <Pressable><Text className="text-xs font-bold text-brand-700">Ver todas</Text></Pressable>
        </View>

        <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4">
          {movements.map((movement, index) => (
            <View className={`flex-row items-center py-4 ${index < movements.length - 1 ? "border-b border-neutral-100" : ""}`} key={`${movement.customer}-${movement.date}`}>
              <View className={`h-10 w-10 items-center justify-center rounded-full ${movement.positive ? "bg-brand-50" : "bg-neutral-100"}`}>
                <Ionicons name={movement.icon} size={20} color={movement.positive ? "#075C31" : "#737373"} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-ink">{movement.customer}</Text>
                <Text className="mt-1 text-xs text-neutral-400">{movement.label} • {movement.date}</Text>
              </View>
              <Text className={`text-xs font-bold ${movement.positive ? "text-brand-700" : "text-ink"}`}>
                {movement.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="finance" />
    </SafeAreaView>
  );
}
