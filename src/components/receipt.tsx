import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { money, useMockData } from "@/src/data/mock-store";

import { Card, Metric, PrimaryButton } from "./ui";

type ReceiptProps =
  | { id: string; type: "order" }
  | { id: string; type: "payment" };

export function Receipt({ id, type }: ReceiptProps) {
  const { customers, orders, payments, customerBalance, orderTotal } = useMockData();
  const order = type === "order" ? orders.find((item) => item.id === id) : undefined;
  const payment = type === "payment" ? payments.find((item) => item.id === id) : undefined;
  const document = order ?? payment;

  if (!document) {
    return (
      <Card className="mt-5">
        <Text className="py-8 text-center text-sm text-neutral-500">
          {type === "order" ? "Pedido não encontrado." : "Pagamento não encontrado."}
        </Text>
      </Card>
    );
  }

  const customer = customers.find((item) => item.id === document.customerId);
  const relatedOrders = payment
    ? payment.orderIds
        .map((orderId) => orders.find((item) => item.id === orderId)?.number)
        .filter((number): number is string => Boolean(number))
    : [];

  return (
    <>
      <Card className="mt-5">
        <View className="items-center border-b border-neutral-200 pb-5">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-brand-700">
            <Ionicons name="restaurant-outline" size={27} color="#F6C65B" />
          </View>
          <Text className="mt-3 text-base font-bold tracking-[2px] text-brand-900">PANE FACILE</Text>
          <Text className="text-[9px] tracking-[3px] text-gold">PADARIA</Text>
          <Text className="mt-5 text-sm font-bold text-ink">
            {order ? "COMPROVANTE DE PEDIDO" : "RECIBO DE PAGAMENTO"}
          </Text>
          <Text className="mt-1 text-xs text-neutral-500">Nº {document.number}</Text>
        </View>

        <View className="py-5">
          <Text className="text-xs text-neutral-500">Cliente</Text>
          <Text className="mt-1 font-bold text-ink">
            {customer?.tradeName ?? "Cliente não encontrado"}
          </Text>
          <Text className="mt-3 text-xs text-neutral-500">Data</Text>
          <Text className="mt-1 text-sm text-ink">
            {order ? order.createdAt : payment?.paidAt}
          </Text>
        </View>

        {order ? (
          <View className="border-y border-neutral-200 py-3">
            {order.items.map((item) => (
              <View className="flex-row py-2" key={item.id}>
                <Text className="flex-1 text-xs text-ink">{item.productName}</Text>
                <Text className="w-14 text-xs text-neutral-500">{item.quantity}</Text>
                <Text className="text-xs font-bold text-ink">
                  {money(item.quantity * item.unitPrice)}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View className="border-y border-neutral-200 py-4">
            <Metric label="Valor recebido" value={money(payment?.amount ?? 0)} tone="text-brand-700" />
            <Text className="mt-4 text-xs text-neutral-500">
              Forma de pagamento: <Text className="font-bold text-ink">{payment?.method}</Text>
            </Text>
            <Text className="mt-2 text-xs text-neutral-500">
              {relatedOrders.length === 1 ? "Pedido" : "Pedidos"}:{" "}
              <Text className="font-bold text-ink">
                {relatedOrders.join(", ") || "Pagamento geral"}
              </Text>
            </Text>
          </View>
        )}

        <View className="pt-5">
          <View className="flex-row justify-between">
            <Text className="font-bold text-ink">{order ? "Total" : "Saldo restante"}</Text>
            <Text className="text-lg font-bold text-brand-700">
              {order ? money(orderTotal(order)) : money(customerBalance(document.customerId))}
            </Text>
          </View>
          <Text className="mt-7 text-center text-xs leading-5 text-neutral-500">
            {order
              ? `Pedido registrado para ${customer?.tradeName ?? "o cliente"}.`
              : `Recebemos de ${customer?.tradeName ?? "cliente"} a importância descrita neste documento.`}
            {`\n\n`}Pane Facile Padaria • Obrigado!
          </Text>
        </View>
      </Card>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1"><PrimaryButton label="Compartilhar" icon="share-social" secondary /></View>
        <View className="flex-1"><PrimaryButton label="Salvar PDF" icon="document" /></View>
      </View>
    </>
  );
}
