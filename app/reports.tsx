import { router } from "expo-router";
import { Text, View } from "react-native";

import { AppScreen, Card, Field, Header, PageScroll, PrimaryButton, SectionTitle } from "@/src/components/ui";

export default function ReportsScreen() {
  return <AppScreen><Header title="Relatórios" back /><PageScroll className="pt-5"><Field label="Tipo de relatório" value="Dinheiro recebido" /><Field label="Período" value="01/07/2026 até 14/07/2026" />
    <Card><Text className="text-xs text-center text-neutral-500">Total recebido</Text><Text className="mt-2 text-center text-3xl font-bold text-brand-700">R$ 8.450,00</Text><Text className="mt-2 text-center text-xs text-neutral-400">28 pagamentos no período</Text></Card>
    <SectionTitle title="Por forma de pagamento" /><Card>{[["Pix", "R$ 4.100,00", "48,5%"], ["Dinheiro", "R$ 2.450,00", "29,0%"], ["Transferência", "R$ 1.200,00", "14,2%"], ["Outros", "R$ 700,00", "8,3%"]].map((row, i) => <View className={`flex-row py-3 ${i < 3 ? "border-b border-neutral-100" : ""}`} key={row[0]}><View className="mr-3 h-3 w-3 rounded-full" style={{ backgroundColor: ["#D93636", "#0B6B3A", "#2563EB", "#999"][i] }} /><Text className="flex-1 text-xs font-semibold text-ink">{row[0]}</Text><Text className="mr-4 text-xs text-neutral-500">{row[2]}</Text><Text className="text-xs font-bold text-ink">{row[1]}</Text></View>)}</Card>
    <View className="mt-5 flex-row gap-3"><View className="flex-1"><PrimaryButton label="Filtrar" icon="filter" secondary /></View><View className="flex-1"><PrimaryButton label="Ver detalhes" icon="list" onPress={() => router.push("/report-details")} /></View></View>
  </PageScroll></AppScreen>;
}
