import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { AppScreen, Field, Header, PageScroll, PrimaryButton } from "@/src/components/ui";
import { money, parseMoney, useMockData } from "@/src/data/mock-store";

export default function ProductFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, saveProduct, deleteProduct } = useMockData();
  const current = products.find((item) => item.id === id);
  const [name, setName] = useState(current?.name ?? ""); const [description, setDescription] = useState(current?.description ?? ""); const [unit, setUnit] = useState(current?.unit ?? "Unidade"); const [defaultPrice, setDefaultPrice] = useState(current ? money(current.defaultPrice) : ""); const [minimumPrice, setMinimumPrice] = useState(current ? money(current.minimumPrice) : ""); const [notes, setNotes] = useState(current?.notes ?? "");
  function submit() { if (!name.trim()) return Alert.alert("Campo obrigatório", "Informe o nome do produto."); saveProduct({ id, name, description, unit, defaultPrice: parseMoney(defaultPrice), minimumPrice: parseMoney(minimumPrice), notes, active: current?.active ?? true, icon: current?.icon ?? "🥖" }); router.replace("/products"); }
  function remove() { if (!id) return; Alert.alert("Excluir produto", "O produto será removido desta sessão.", [{ text: "Cancelar" }, { text: "Excluir", style: "destructive", onPress: () => { deleteProduct(id); router.replace("/products"); } }]); }
  return <AppScreen><Header title={current ? "Editar produto" : "Novo produto"} back /><PageScroll className="pt-5"><View className="mb-5 h-28 items-center justify-center rounded-2xl bg-amber-50"><Text className="text-6xl">{current?.icon ?? "🥖"}</Text></View><Field label="Nome do produto *" value={name} onChangeText={setName} /><Field label="Descrição" value={description} onChangeText={setDescription} /><Field label="Unidade *" value={unit} onChangeText={setUnit} /><Field label="Preço padrão *" value={defaultPrice} onChangeText={setDefaultPrice} keyboardType="decimal-pad" /><Field label="Preço mínimo *" value={minimumPrice} onChangeText={setMinimumPrice} keyboardType="decimal-pad" /><Field label="Observações" value={notes} onChangeText={setNotes} multiline /><View className="flex-row gap-3"><View className="flex-1"><PrimaryButton label="Cancelar" icon="close" secondary onPress={() => router.back()} /></View><View className="flex-1"><PrimaryButton label="Salvar" icon="checkmark" onPress={submit} /></View></View>{current ? <Pressable className="mt-5 py-3" onPress={remove}><Text className="text-center font-bold text-danger">Excluir produto</Text></Pressable> : null}</PageScroll></AppScreen>;
}
