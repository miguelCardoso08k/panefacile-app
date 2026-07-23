import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Customer = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

type SelectionModalProps<T extends { id: string; name: string }> = {
  filterLabel: string;
  items: T[];
  onClose: () => void;
  onConfirm: (item: T) => void;
  searchPlaceholder: string;
  visible: boolean;
};

const customers: Customer[] = [
  { id: "mercado-oliveira", name: "Mercado Oliveira" },
  { id: "mercado-bom-preco", name: "Mercado Bom Preço" },
  { id: "lanchonete-silva", name: "Lanchonete Silva" },
  { id: "restaurante-central", name: "Restaurante Central" },
];

const products: Product[] = [
  { id: "pao-frances", name: "Pão Francês", price: 18 },
  { id: "pao-forma", name: "Pão de Forma", price: 12.5 },
  { id: "pao-hamburguer", name: "Pão de Hambúrguer", price: 15 },
  { id: "bisnaga", name: "Bisnaga de Pão", price: 10 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value);
}

function SelectionModal<T extends { id: string; name: string }>({
  filterLabel,
  items,
  onClose,
  onConfirm,
  searchPlaceholder,
  visible,
}: SelectionModalProps<T>) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      item.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    );
  }, [items, query]);

  function handleClose() {
    setQuery("");
    setSelectedItem(null);
    onClose();
  }

  function handleConfirm() {
    if (!selectedItem) {
      return;
    }

    onConfirm(selectedItem);
    setQuery("");
    setSelectedItem(null);
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      transparent
      visible={visible}
    >
      <View className="flex-1 items-center justify-center bg-black/55 px-7">
        <Pressable className="absolute inset-0" onPress={handleClose} />
        <View className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-lg">
          <View className="h-16 flex-row items-center rounded-2xl border border-neutral-200 px-4">
            <Ionicons name="search-outline" size={25} color="#626864" />
            <TextInput
              autoFocus
              className="h-full flex-1 px-3 text-base text-ink"
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor="#A3A3A3"
              value={query}
            />
            {query.length > 0 && (
              <Pressable
                accessibilityLabel="Limpar pesquisa"
                hitSlop={10}
                onPress={() => setQuery("")}
              >
                <Ionicons name="close-circle" size={23} color="#7B817D" />
              </Pressable>
            )}
          </View>

          {query.trim().length > 0 && (
            <View className="mt-3 flex-row items-center px-1">
              <Ionicons name="filter-outline" size={19} color="#075C31" />
              <Text className="ml-2 text-xs text-neutral-500">
                Filtrando {filterLabel} que contêm “
                <Text className="font-bold text-brand-700">{query.trim()}</Text>”
              </Text>
            </View>
          )}

          <ScrollView className="mt-4 max-h-72" showsVerticalScrollIndicator={false}>
            <View className="gap-2">
              {filteredItems.map((item) => {
                const selected = selectedItem?.id === item.id;

                return (
                  <Pressable
                    className={`min-h-14 flex-row items-center rounded-xl border px-4 ${
                      selected
                        ? "border-brand-600 bg-brand-50"
                        : "border-neutral-200 bg-white"
                    }`}
                    key={item.id}
                    onPress={() => setSelectedItem(item)}
                  >
                    <Text
                      className={`flex-1 text-base ${
                        selected ? "font-medium text-brand-700" : "text-ink"
                      }`}
                    >
                      {item.name}
                    </Text>
                    {selected && (
                      <Ionicons name="checkmark-circle" size={25} color="#075C31" />
                    )}
                  </Pressable>
                );
              })}

              {filteredItems.length === 0 && (
                <Text className="py-8 text-center text-sm text-neutral-400">
                  Nenhum resultado encontrado.
                </Text>
              )}
            </View>
          </ScrollView>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              className="h-14 flex-1 items-center justify-center rounded-xl border-2 border-brand-700 bg-white"
              onPress={handleClose}
            >
              <Text className="font-bold text-brand-700">Cancelar</Text>
            </Pressable>
            <Pressable
              className={`h-14 flex-1 items-center justify-center rounded-xl ${
                selectedItem ? "bg-brand-700" : "bg-neutral-200"
              }`}
              disabled={!selectedItem}
              onPress={handleConfirm}
            >
              <Text
                className={`font-bold ${selectedItem ? "text-white" : "text-neutral-400"}`}
              >
                Confirmar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1">
      <Text className="mb-2 text-sm font-semibold text-ink">{label}</Text>
      <Pressable className="h-16 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 shadow-sm">
        <Text className="flex-1 text-base text-ink">{value}</Text>
        <Ionicons name="calendar-outline" size={22} color="#626864" />
      </Pressable>
    </View>
  );
}

export default function NewOrderScreen() {
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [notes, setNotes] = useState("");

  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const canSave = selectedCustomer !== null && selectedProducts.length > 0;

  function selectCustomer(customer: Customer) {
    if (selectedCustomer?.id !== customer.id) {
      setSelectedProducts([]);
    }
    setSelectedCustomer(customer);
    setCustomerModalVisible(false);
  }

  function selectProduct(product: Product) {
    setSelectedProducts((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setProductModalVisible(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="h-20 flex-row items-center border-b border-neutral-200 bg-white px-5">
        <Pressable
          accessibilityLabel="Voltar"
          className="h-11 w-11 items-center justify-center"
          hitSlop={8}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={29} color="#17201B" />
        </Pressable>
        <Text className="flex-1 pr-11 text-center text-2xl font-bold text-ink">
          Novo pedido
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8 pt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-2 text-sm font-semibold text-ink">
          Cliente <Text className="text-brand-700">*</Text>
        </Text>
        <Pressable
          className={`h-16 flex-row items-center rounded-xl border bg-white px-4 shadow-sm ${
            selectedCustomer ? "border-brand-600" : "border-neutral-200"
          }`}
          onPress={() => setCustomerModalVisible(true)}
        >
          {selectedCustomer && (
            <Ionicons name="storefront-outline" size={21} color="#075C31" />
          )}
          <Text
            className={`flex-1 ${selectedCustomer ? "ml-3 text-ink" : "text-neutral-400"}`}
          >
            {selectedCustomer?.name ?? "Selecione um cliente"}
          </Text>
          <Ionicons name="chevron-down" size={23} color="#075C31" />
        </Pressable>

        <View className="mb-3 mt-8 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-ink">Itens</Text>
          {!selectedCustomer && (
            <Text className="text-xs font-bold text-brand-700">Toque para adicionar</Text>
          )}
        </View>

        {!selectedCustomer ? (
          <>
            <View className="h-20 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 opacity-60">
              <Text className="flex-1 text-neutral-400">Selecione um cliente primeiro</Text>
              <Ionicons name="lock-closed-outline" size={21} color="#A3A3A3" />
            </View>
            <View className="mt-4 flex-row items-center">
              <Ionicons name="information-circle-outline" size={23} color="#075C31" />
              <Text className="ml-2 flex-1 text-sm text-neutral-600">
                Selecione um cliente para liberar a seleção de produtos.
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text className="mb-2 text-sm font-semibold text-neutral-700">
              Adicionar produto
            </Text>
            <Pressable
              className="h-16 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 shadow-sm"
              onPress={() => setProductModalVisible(true)}
            >
              <Text className="flex-1 text-neutral-400">Selecione um produto</Text>
              <Ionicons name="chevron-down" size={22} color="#626864" />
              <View className="mx-4 h-9 w-px bg-neutral-200" />
              <Ionicons name="add" size={26} color="#075C31" />
            </Pressable>

            {selectedProducts.length > 0 && (
              <View className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white px-4">
                {selectedProducts.map((product, index) => (
                  <View
                    className={`flex-row items-center py-3 ${
                      index < selectedProducts.length - 1 ? "border-b border-neutral-100" : ""
                    }`}
                    key={product.id}
                  >
                    <View className="h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                      <Ionicons name="bag-handle-outline" size={19} color="#075C31" />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-semibold text-ink">{product.name}</Text>
                      <Text className="mt-0.5 text-xs text-neutral-400">1 unidade</Text>
                    </View>
                    <Text className="mr-3 text-sm font-bold text-brand-700">
                      {formatCurrency(product.price)}
                    </Text>
                    <Pressable
                      accessibilityLabel={`Remover ${product.name}`}
                      hitSlop={8}
                      onPress={() =>
                        setSelectedProducts((current) =>
                          current.filter((item) => item.id !== product.id),
                        )
                      }
                    >
                      <Ionicons name="trash-outline" size={19} color="#D93636" />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        <View className="mt-8 flex-row gap-4">
          <DateField label="Data de entrega" value="15/07/2026" />
          <DateField label="Vencimento" value="22/07/2026" />
        </View>

        <Text className="mb-2 mt-7 text-sm font-semibold text-ink">Observações</Text>
        <TextInput
          className="min-h-32 rounded-xl border border-neutral-200 bg-white px-4 py-4 text-sm text-ink shadow-sm"
          multiline
          onChangeText={setNotes}
          placeholder="Digite observações sobre o pedido (opcional)"
          placeholderTextColor="#A3A3A3"
          textAlignVertical="top"
          value={notes}
        />

        <View className="mt-6 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <View className="flex-1">
            <Text className="text-sm text-neutral-400">Total do pedido</Text>
            <Text className="mt-1 text-2xl font-bold text-brand-700">
              {formatCurrency(total)}
            </Text>
          </View>
          <View className="h-16 w-16 items-center justify-center rounded-xl bg-brand-50">
            <Ionicons name="cart-outline" size={34} color="#075C31" />
          </View>
        </View>

        {selectedCustomer && (
          <Pressable className="mt-5 h-14 flex-row items-center justify-center rounded-xl bg-[#CDA354]">
            <Ionicons name="repeat-outline" size={21} color="white" />
            <Text className="ml-2 font-bold text-white">Repetir último pedido</Text>
          </Pressable>
        )}

        <Pressable
          className={`mt-3 h-16 flex-row items-center justify-center rounded-xl ${
            canSave ? "bg-brand-700" : "bg-neutral-200"
          }`}
          disabled={!canSave}
        >
          <Ionicons
            name={canSave ? "checkmark" : "lock-closed-outline"}
            size={22}
            color={canSave ? "white" : "#A3A3A3"}
          />
          <View className="ml-2 items-center">
            <Text className={`font-bold ${canSave ? "text-white" : "text-neutral-400"}`}>
              Salvar pedido
            </Text>
            {!canSave && selectedCustomer && (
              <Text className="text-[10px] text-neutral-400">
                Adicione ao menos um item para salvar o pedido
              </Text>
            )}
          </View>
        </Pressable>
      </ScrollView>

      <SelectionModal
        filterLabel="clientes"
        items={customers}
        onClose={() => setCustomerModalVisible(false)}
        onConfirm={selectCustomer}
        searchPlaceholder="Buscar cliente"
        visible={customerModalVisible}
      />
      <SelectionModal
        filterLabel="produtos"
        items={products}
        onClose={() => setProductModalVisible(false)}
        onConfirm={selectProduct}
        searchPlaceholder="Buscar produto"
        visible={productModalVisible}
      />
    </SafeAreaView>
  );
}
