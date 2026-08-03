import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { AppScreen } from "@/src/components/ui";
import { money, type OrderItem, useMockData } from "@/src/data/mock-store";

type SelectionItem = { id: string; name: string; subtitle?: string };

function SelectionModal({
  items,
  label,
  onClose,
  onConfirm,
  visible,
}: {
  items: SelectionItem[];
  label: string;
  onClose: () => void;
  onConfirm: (item: SelectionItem) => void;
  visible: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SelectionItem | null>(null);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    return term ? items.filter((item) => item.name.toLocaleLowerCase("pt-BR").includes(term)) : items;
  }, [items, query]);

  function close() {
    setQuery("");
    setSelected(null);
    onClose();
  }

  return (
    <Modal animationType="fade" onRequestClose={close} transparent visible={visible}>
      <View className="flex-1 items-center justify-center bg-black/55 px-7">
        <Pressable className="absolute inset-0" onPress={close} />
        <View className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-lg">
          <View className="h-14 flex-row items-center rounded-2xl border border-neutral-200 px-4">
            <Ionicons name="search-outline" size={22} color="#626864" />
            <TextInput className="h-full flex-1 px-3 text-base text-ink" onChangeText={setQuery} placeholder={`Buscar ${label}`} placeholderTextColor="#A3A3A3" value={query} />
            {query ? <Pressable onPress={() => setQuery("")}><Ionicons name="close-circle" size={22} color="#7B817D" /></Pressable> : null}
          </View>
          {query.trim() ? <Text className="mt-3 text-xs text-neutral-500">Filtrando {label} que contêm “<Text className="font-bold text-brand-700">{query.trim()}</Text>”</Text> : null}
          <ScrollView className="mt-4 max-h-72" showsVerticalScrollIndicator={false}>
            <View className="gap-2">
              {filtered.map((item) => {
                const isSelected = selected?.id === item.id;
                return <Pressable className={`min-h-14 flex-row items-center rounded-xl border px-4 py-3 ${isSelected ? "border-brand-600 bg-brand-50" : "border-neutral-200"}`} key={item.id} onPress={() => setSelected(item)}><View className="flex-1"><Text className={`text-sm ${isSelected ? "font-bold text-brand-700" : "text-ink"}`}>{item.name}</Text>{item.subtitle ? <Text className="mt-1 text-xs text-neutral-400">{item.subtitle}</Text> : null}</View>{isSelected ? <Ionicons name="checkmark-circle" size={24} color="#075C31" /> : null}</Pressable>;
              })}
              {!filtered.length ? <Text className="py-8 text-center text-sm text-neutral-400">Nenhum resultado encontrado.</Text> : null}
            </View>
          </ScrollView>
          <View className="mt-6 flex-row gap-3">
            <Pressable className="h-14 flex-1 items-center justify-center rounded-xl border-2 border-brand-700" onPress={close}><Text className="font-bold text-brand-700">Cancelar</Text></Pressable>
            <Pressable className={`h-14 flex-1 items-center justify-center rounded-xl ${selected ? "bg-brand-700" : "bg-neutral-200"}`} disabled={!selected} onPress={() => { if (selected) { onConfirm(selected); setQuery(""); setSelected(null); } }}><Text className={`font-bold ${selected ? "text-white" : "text-neutral-400"}`}>Confirmar</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <View className="flex-1"><Text className="mb-2 text-sm font-semibold text-ink">{label}</Text><View className="h-16 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4"><TextInput className="flex-1 text-sm text-ink" onChangeText={onChange} value={value} /><Ionicons name="calendar-outline" size={21} color="#626864" /></View></View>;
}

export default function OrderFormScreen() {
  const params = useLocalSearchParams<{ id?: string; customerId?: string }>();
  const { customers, products, orders, resolvePrice, saveOrder } = useMockData();
  const current = orders.find((order) => order.id === params.id);
  const [customerId, setCustomerId] = useState(current?.customerId ?? params.customerId ?? "");
  const [items, setItems] = useState<OrderItem[]>(current?.items ?? []);
  const [deliveryDate, setDeliveryDate] = useState(current?.deliveryDate ?? "15/07/2026");
  const [dueDate, setDueDate] = useState(current?.dueDate ?? "22/07/2026");
  const [notes, setNotes] = useState(current?.notes ?? "");
  const [customerModal, setCustomerModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const customer = customers.find((item) => item.id === customerId);
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const canSave = Boolean(customerId && items.length);

  function selectCustomer(id: string) {
    if (id !== customerId) setItems([]);
    setCustomerId(id);
    setCustomerModal(false);
  }

  function addProduct(productId: string) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setItems((list) => list.some((item) => item.productId === productId) ? list : [...list, { id: `item-${Date.now()}`, productId, productName: product.name, quantity: 1, unitPrice: resolvePrice(customerId, productId) }]);
    setProductModal(false);
  }

  function quantity(productId: string, change: number) {
    setItems((list) => list.map((item) => item.productId === productId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item).filter((item) => item.quantity > 0));
  }

  function repeatLast() {
    const last = orders.find((order) => order.customerId === customerId && order.id !== current?.id && order.status !== "Cancelado");
    if (!last) return Alert.alert("Sem pedido anterior", "Este cliente ainda não possui um pedido válido para repetir.");
    setItems(last.items.map((item) => ({ ...item, id: `item-${Date.now()}-${item.productId}`, unitPrice: resolvePrice(customerId, item.productId) })));
  }

  function submit() {
    if (!canSave) return;
    const id = saveOrder({ id: params.id, customerId, status: current?.status ?? "Rascunho", deliveryDate, dueDate, notes, items, createdAt: current?.createdAt ?? new Date().toLocaleDateString("pt-BR") });
    router.replace({ pathname: "/orders/details", params: { id } });
  }

  return (
    <AppScreen>
      <View className="h-20 flex-row items-center border-b border-neutral-200 bg-white px-5"><Pressable accessibilityLabel="Voltar" className="h-11 w-11 items-center justify-center" onPress={() => router.back()}><Ionicons name="arrow-back" size={27} color="#17201B" /></Pressable><Text className="flex-1 pr-11 text-center text-2xl font-bold text-ink">{current ? "Editar pedido" : "Novo pedido"}</Text></View>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-8 pt-6" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-2 text-sm font-semibold text-ink">Cliente <Text className="text-brand-700">*</Text></Text>
        <Pressable className={`h-16 flex-row items-center rounded-xl border bg-white px-4 ${customer ? "border-brand-600" : "border-neutral-200"}`} onPress={() => setCustomerModal(true)}>{customer ? <Ionicons name="storefront-outline" size={21} color="#075C31" /> : null}<Text className={`flex-1 ${customer ? "ml-3 text-ink" : "text-neutral-400"}`}>{customer?.tradeName ?? "Selecione um cliente"}</Text><Ionicons name="chevron-down" size={22} color="#075C31" /></Pressable>
        <View className="mb-3 mt-8 flex-row items-center justify-between"><Text className="text-xl font-bold text-ink">Itens</Text><Text className="text-xs font-bold text-brand-700">{items.length} selecionado(s)</Text></View>
        {!customer ? <View className="rounded-xl border border-neutral-200 bg-white p-5 opacity-60"><View className="flex-row items-center"><Text className="flex-1 text-neutral-400">Selecione um cliente primeiro</Text><Ionicons name="lock-closed-outline" size={21} color="#A3A3A3" /></View><Text className="mt-3 text-xs text-neutral-500">A seleção do cliente define os preços personalizados.</Text></View> : <><Pressable className="h-16 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4" onPress={() => setProductModal(true)}><Text className="flex-1 text-neutral-400">Selecione um produto</Text><Ionicons name="add-circle-outline" size={26} color="#075C31" /></Pressable>{items.length ? <View className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white px-4">{items.map((item, index) => <View className={`py-4 ${index < items.length - 1 ? "border-b border-neutral-100" : ""}`} key={item.id}><View className="flex-row items-center"><View className="h-10 w-10 items-center justify-center rounded-lg bg-brand-50"><Ionicons name="bag-handle-outline" size={19} color="#075C31" /></View><View className="ml-3 flex-1"><Text className="text-sm font-semibold text-ink">{item.productName}</Text><Text className="mt-0.5 text-xs text-neutral-400">{money(item.unitPrice)} cada</Text></View><Pressable className="h-9 w-9 items-center justify-center rounded-lg bg-neutral-100" onPress={() => quantity(item.productId, -1)}><Text className="text-lg">−</Text></Pressable><Text className="w-10 text-center font-bold text-ink">{item.quantity}</Text><Pressable className="h-9 w-9 items-center justify-center rounded-lg bg-brand-50" onPress={() => quantity(item.productId, 1)}><Text className="text-lg text-brand-700">+</Text></Pressable></View><Text className="mt-2 text-right text-sm font-bold text-brand-700">{money(item.quantity * item.unitPrice)}</Text></View>)}</View> : null}</>}
        <View className="mt-8 flex-row gap-4"><DateField label="Data de entrega" value={deliveryDate} onChange={setDeliveryDate} /><DateField label="Vencimento" value={dueDate} onChange={setDueDate} /></View>
        <Text className="mb-2 mt-7 text-sm font-semibold text-ink">Observações</Text><TextInput className="min-h-28 rounded-xl border border-neutral-200 bg-white px-4 py-4 text-sm text-ink" multiline onChangeText={setNotes} placeholder="Digite observações sobre o pedido" placeholderTextColor="#A3A3A3" textAlignVertical="top" value={notes} />
        <View className="mt-6 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-5"><View className="flex-1"><Text className="text-sm text-neutral-400">Total do pedido</Text><Text className="mt-1 text-2xl font-bold text-brand-700">{money(total)}</Text></View><View className="h-16 w-16 items-center justify-center rounded-xl bg-brand-50"><Ionicons name="cart-outline" size={32} color="#075C31" /></View></View>
        {customer && !current ? <Pressable className="mt-5 h-14 flex-row items-center justify-center rounded-xl bg-[#CDA354]" onPress={repeatLast}><Ionicons name="repeat-outline" size={21} color="white" /><Text className="ml-2 font-bold text-white">Repetir último pedido</Text></Pressable> : null}
        <Pressable className={`mt-3 h-16 flex-row items-center justify-center rounded-xl ${canSave ? "bg-brand-700" : "bg-neutral-200"}`} disabled={!canSave} onPress={submit}><Ionicons name={canSave ? "checkmark" : "lock-closed-outline"} size={22} color={canSave ? "white" : "#A3A3A3"} /><Text className={`ml-2 font-bold ${canSave ? "text-white" : "text-neutral-400"}`}>{current ? "Salvar alterações" : "Salvar pedido"}</Text></Pressable>
      </ScrollView>
      <SelectionModal items={customers.map((item) => ({ id: item.id, name: item.tradeName, subtitle: item.phone }))} label="clientes" onClose={() => setCustomerModal(false)} onConfirm={(item) => selectCustomer(item.id)} visible={customerModal} />
      <SelectionModal items={products.filter((product) => !items.some((item) => item.productId === product.id)).map((item) => ({ id: item.id, name: item.name, subtitle: `${item.unit} • ${money(resolvePrice(customerId, item.id))}` }))} label="produtos" onClose={() => setProductModal(false)} onConfirm={(item) => addProduct(item.id)} visible={productModal} />
    </AppScreen>
  );
}
