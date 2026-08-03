import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

import { AppScreen, Field, Header, PageScroll, PrimaryButton } from "@/src/components/ui";
import { money, parseMoney, useMockData } from "@/src/data/mock-store";

export default function CustomerFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { customers, saveCustomer } = useMockData();
  const current = customers.find((item) => item.id === id);
  const [tradeName, setTradeName] = useState(current?.tradeName ?? "");
  const [legalName, setLegalName] = useState(current?.legalName ?? "");
  const [document, setDocument] = useState(current?.document ?? "");
  const [contactName, setContactName] = useState(current?.contactName ?? "");
  const [phone, setPhone] = useState(current?.phone ?? "");
  const [email, setEmail] = useState(current?.email ?? "");
  const [address, setAddress] = useState(current?.address ?? "");
  const [creditLimit, setCreditLimit] = useState(current ? money(current.creditLimit) : "");
  const [notes, setNotes] = useState(current?.notes ?? "");

  function submit() {
    if (!tradeName.trim() || !phone.trim()) return Alert.alert("Campos obrigatórios", "Informe o nome fantasia e o telefone.");
    const savedId = saveCustomer({ id, tradeName: tradeName.trim(), legalName, document, contactName, phone, email, address, creditLimit: parseMoney(creditLimit), notes, active: current?.active ?? true });
    router.replace({ pathname: "/customers/details", params: { id: savedId } });
  }

  return <AppScreen><Header title={current ? "Editar cliente" : "Novo cliente"} back /><PageScroll className="pt-5">
    <Field label="Nome fantasia *" value={tradeName} onChangeText={setTradeName} /><Field label="Razão social" value={legalName} onChangeText={setLegalName} /><Field label="CNPJ / CPF" value={document} onChangeText={setDocument} /><Field label="Responsável" value={contactName} onChangeText={setContactName} /><Field label="Telefone *" value={phone} onChangeText={setPhone} keyboardType="phone-pad" /><Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" /><Field label="Endereço" value={address} onChangeText={setAddress} /><Field label="Limite de crédito" value={creditLimit} onChangeText={setCreditLimit} keyboardType="decimal-pad" /><Field label="Observações" value={notes} onChangeText={setNotes} multiline />
    <View className="mb-4 flex-row gap-3"><View className="flex-1"><PrimaryButton label="Cancelar" icon="close" secondary onPress={() => router.back()} /></View><View className="flex-1"><PrimaryButton label="Salvar" icon="checkmark" onPress={submit} /></View></View>
  </PageScroll></AppScreen>;
}
