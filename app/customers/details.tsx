import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

import {
  AppScreen,
  Badge,
  Card,
  Header,
  Metric,
  PageScroll,
  PrimaryButton,
  SectionTitle,
} from "@/src/components/ui";
import { money, useMockData } from "@/src/data/mock-store";

export default function CustomerDetailsScreen() {
  const { id = "c1" } = useLocalSearchParams<{ id?: string }>();
  const { customers, orders, customerBalance, orderTotal, deleteCustomer } =
    useMockData();
  const customer = customers.find((item) => item.id === id);
  if (!customer)
    return (
      <AppScreen>
        <Header title="Cliente" back />
        <View className="flex-1 items-center justify-center">
          <Text>Cliente não encontrado.</Text>
        </View>
      </AppScreen>
    );
  const customerOrders = orders.filter((order) => order.customerId === id);
  function remove() {
    Alert.alert(
      "Excluir cliente",
      "O cliente será removido dos dados desta sessão.",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteCustomer(id);
            router.replace("/customers");
          },
        },
      ],
    );
  }
  return (
    <AppScreen>
      <Header
        title={customer.tradeName}
        back
        action={
          <Pressable
            onPress={() =>
              router.push({ pathname: "/customers/form", params: { id } })
            }
          >
            <Ionicons name="pencil" size={20} color="#17201B" />
          </Pressable>
        }
      />
      <PageScroll className="pt-5">
        <Card>
          <View className="flex-row items-center">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-brand-700">
              <Text className="text-lg font-bold text-white">
                {customer.tradeName.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-ink">{customer.tradeName}</Text>
              <Text className="mt-1 text-xs text-neutral-500">
                {customer.document || "Sem documento"}
              </Text>
              <Text className="mt-1 text-xs text-neutral-500">
                {customer.phone}
              </Text>
            </View>
            <Badge
              label={customer.active ? "Ativo" : "Inativo"}
              tone={customer.active ? "green" : "gray"}
            />
          </View>
        </Card>
        <Card className="mt-3">
          <View className="flex-row">
            <Metric label="Em aberto" value={money(customerBalance(id))} />
            <Metric label="Pedidos" value={String(customerOrders.length)} />
            <Metric
              label="Total comprado"
              value={money(
                customerOrders.reduce(
                  (sum, order) => sum + orderTotal(order),
                  0,
                ),
              )}
            />
          </View>
        </Card>
        <SectionTitle title="Pedidos recentes" />
        {customerOrders.length ? (
          customerOrders.slice(0, 3).map((order) => (
            <Pressable
              className="mb-2"
              key={order.id}
              onPress={() =>
                router.push({
                  pathname: "/orders/details",
                  params: { id: order.id },
                })
              }
            >
              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-xs font-semibold text-ink">
                    {order.number}
                  </Text>
                  <Text className="text-xs font-bold text-ink">
                    {money(orderTotal(order))}
                  </Text>
                </View>
              </Card>
            </Pressable>
          ))
        ) : (
          <Card>
            <Text className="text-sm text-neutral-500">
              Nenhum pedido cadastrado.
            </Text>
          </Card>
        )}
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1">
            <PrimaryButton
              label="Novo pedido"
              onPress={() =>
                router.push({
                  pathname: "/orders/form",
                  params: { customerId: id },
                })
              }
            />
          </View>
          <View className="flex-1">
            <PrimaryButton
              label="Pagamento"
              icon="cash"
              secondary
              onPress={() =>
                router.push({
                  pathname: "/finance/payment-general",
                  params: { customerId: id },
                })
              }
            />
          </View>
        </View>
        <View className="mt-3">
          <PrimaryButton
            label="Preços personalizados"
            icon="pricetag"
            secondary
            onPress={() =>
              router.push({ pathname: "/customers/pricing", params: { customerId: id } })
            }
          />
        </View>
        <Pressable className="mt-6 py-3" onPress={remove}>
          <Text className="text-center text-sm font-bold text-danger">
            Excluir cliente
          </Text>
        </Pressable>
      </PageScroll>
    </AppScreen>
  );
}
