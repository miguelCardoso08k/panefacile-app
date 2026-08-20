import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { money, useMockData } from "@/src/data/mock-store";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function parseBrazilianDate(value: string) {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function initials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function FinancialCard({
  icon,
  label,
  value,
  color,
  background,
}: {
  icon: IconName;
  label: string;
  value: string;
  color: string;
  background: string;
}) {
  return (
    <View className="min-w-0 flex-1 rounded-2xl border border-neutral-200 bg-white p-3">
      <View
        className="mb-2 h-8 w-8 items-center justify-center rounded-lg"
        style={{ backgroundColor: background }}
      >
        <Ionicons name={icon} size={17} color={color} />
      </View>
      <Text className="text-[11px] text-neutral-500">{label}</Text>
      <Text className="mt-1 text-sm font-bold" style={{ color }}>
        {value}
      </Text>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  primary,
  onPress,
}: {
  icon: IconName;
  label: string;
  primary?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`h-12 flex-1 flex-row items-center justify-center rounded-xl border ${
        primary ? "border-brand-700 bg-brand-700" : "border-gold bg-white"
      }`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={primary ? "white" : "#B66F00"} />
      <Text
        className={`ml-2 text-xs font-bold ${primary ? "text-white" : "text-[#9A5D00]"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const { customers, orders, payments, customerBalance, orderPaid, orderTotal } = useMockData();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const activeOrders = orders.filter(
    (order) => order.status !== "Entregue" && order.status !== "Cancelado",
  );
  const paymentsToday = payments.filter(
    (payment) =>
      !payment.canceled && isSameDay(parseBrazilianDate(payment.paidAt), today),
  );
  const receivedToday = paymentsToday
    .reduce((sum, payment) => sum + payment.amount, 0);
  const openBalance = customers.reduce(
    (sum, customer) => sum + customerBalance(customer.id),
    0,
  );
  const overdueBalance = orders
    .filter(
      (order) =>
        order.status !== "Cancelado"
        && parseBrazilianDate(order.dueDate) < today
        && orderTotal(order) > orderPaid(order.id),
    )
    .reduce(
      (sum, order) => sum + Math.max(orderTotal(order) - orderPaid(order.id), 0),
      0,
    );
  const deliveries = [...activeOrders]
    .sort(
      (left, right) =>
        parseBrazilianDate(left.deliveryDate).getTime()
        - parseBrazilianDate(right.deliveryDate).getTime(),
    )
    .slice(0, 3)
    .map((order) => {
      const customer = customers.find((item) => item.id === order.customerId);
      const deliveryDate = parseBrazilianDate(order.deliveryDate);
      let date = order.deliveryDate;
      if (deliveryDate < today) date = "Atrasada";
      if (isSameDay(deliveryDate, today)) date = "Hoje";
      if (isSameDay(deliveryDate, tomorrow)) date = "Amanhã";

      return {
        initials: initials(customer?.tradeName ?? "Cliente"),
        name: customer?.tradeName ?? "Cliente não encontrado",
        status: order.status,
        date,
      };
    });
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(today);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <View className="flex-row items-center">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-brand-700">
            <Ionicons name="restaurant-outline" size={22} color="#F6C65B" />
          </View>
          <View>
            <Text className="text-sm font-bold tracking-[1.5px] text-brand-900">
              PANE FACILE
            </Text>
            <Text className="text-[9px] font-semibold tracking-[2px] text-gold">
              PADARIA
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityLabel="Sair da demonstração"
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
          onPress={() => router.replace("/")}
        >
          <Ionicons name="notifications-outline" size={22} color="#17201B" />
          <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-2 text-2xl font-bold text-ink">Olá, Admin! 👋</Text>
        <Text className="mt-1 text-sm capitalize text-neutral-500">
          {formattedDate}
        </Text>

        <View className="mt-5 overflow-hidden rounded-3xl bg-brand-700 p-5">
          {/* <View className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-brand-600" /> */}
          <Text className="text-sm font-semibold text-white">
            Resumo de hoje
          </Text>
          <View className="mt-5 flex-row">
            <View className="flex-1">
              <Text className="text-xs leading-4 text-brand-100">
                Pedidos para{`\n`}entregar
              </Text>
              <Text className="mt-2 text-3xl font-bold text-white">
                {activeOrders.length}
              </Text>
            </View>
            <View className="mx-4 w-px bg-white/20" />
            <View className="flex-1">
              <Text className="text-xs leading-4 text-brand-100">
                Em{`\n`}produção
              </Text>
              <Text className="mt-2 text-3xl font-bold text-white">
                {orders.filter((order) => order.status === "Em produção").length}
              </Text>
            </View>
            <View className="mx-4 w-px bg-white/20" />
            <View className="flex-1">
              <Text className="text-xs leading-4 text-brand-100">
                Pagos{`\n`}hoje
              </Text>
              <Text className="mt-2 text-3xl font-bold text-white">
                {paymentsToday.length}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-2">
          <FinancialCard
            icon="cash-outline"
            label="Recebido hoje"
            value={money(receivedToday)}
            color="#0B6B3A"
            background="#EAF4EE"
          />
          <FinancialCard
            icon="time-outline"
            label="Em aberto"
            value={money(openBalance)}
            color="#B66F00"
            background="#FFF5DF"
          />
          <FinancialCard
            icon="alert-circle-outline"
            label="Vencido"
            value={money(overdueBalance)}
            color="#D93636"
            background="#FDEAEA"
          />
        </View>

        <View className="mb-3 mt-7 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-ink">Próximas entregas</Text>
          <Pressable>
            <Text className="text-xs font-bold text-brand-700">Ver todas</Text>
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4">
          {deliveries.map((delivery, index) => (
            <View
              className={`flex-row items-center py-4 ${index < deliveries.length - 1 ? "border-b border-neutral-100" : ""}`}
              key={delivery.name}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                <Text className="text-xs font-bold text-brand-700">
                  {delivery.initials}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-ink">
                  {delivery.name}
                </Text>
                <Text className="mt-1 text-xs text-neutral-400">
                  Entrega: {delivery.date}
                </Text>
              </View>
              <View className="rounded-full bg-brand-50 px-2.5 py-1">
                <Text className="text-[10px] font-semibold text-brand-700">
                  {delivery.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text className="mb-3 mt-7 text-lg font-bold text-ink">
          Ações rápidas
        </Text>
        <View className="flex-row gap-3">
          <QuickAction
            icon="add"
            label="Novo pedido"
            primary
            onPress={() => router.push("/orders/form")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
