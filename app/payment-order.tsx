import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppScreen, Card, Field, Header, Metric, PageScroll, PrimaryButton } from "@/src/components/ui";
import { money, parseMoney, useMockData } from "@/src/data/mock-store";

export default function PaymentOrderScreen() {
  const { orderId = "o2" } = useLocalSearchParams<{ orderId?: string }>(); const { orders, customers, orderTotal, orderPaid, savePayment } = useMockData(); const order = orders.find((item) => item.id === orderId); const total = order ? orderTotal(order) : 0; const paid = orderPaid(orderId); const balance = Math.max(total - paid, 0); const [amount, setAmount] = useState(money(balance)); const [method, setMethod] = useState("Pix"); const [date, setDate] = useState(new Date().toLocaleDateString("pt-BR")); const [notes, setNotes] = useState("");
  function submit() { const value = parseMoney(amount); if (!order || value <= 0 || value > balance) return Alert.alert("Valor inválido", `Informe um valor entre R$ 0,01 e ${money(balance)}.`); const id = savePayment({ customerId: order.customerId, amount: value, method, paidAt: date, notes, orderIds: [orderId] }); router.replace({ pathname: "/payment-receipt", params: { id } }); }
  return <AppScreen><Header title="Registrar pagamento" back /><PageScroll className="pt-5"><Card><Text className="text-xs text-neutral-500">Pedido</Text><Text className="mt-1 font-bold text-ink">{order?.number}</Text><Text className="mt-1 text-xs text-neutral-500">{customers.find((item) => item.id === order?.customerId)?.tradeName}</Text></Card><Card className="mt-3"><View className="flex-row"><Metric label="Total" value={money(total)} /><Metric label="Já recebido" value={money(paid)} /><Metric label="Saldo" value={money(balance)} tone="text-danger" /></View></Card><View className="mt-5"><Field label="Valor recebido *" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" /><Field label="Forma de pagamento" value={method} onChangeText={setMethod} /><Field label="Data do pagamento" value={date} onChangeText={setDate} /><Field label="Observações" value={notes} onChangeText={setNotes} multiline /></View><PrimaryButton label="Confirmar pagamento" icon="checkmark-circle" onPress={submit} /></PageScroll></AppScreen>;
}
