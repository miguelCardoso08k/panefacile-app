import { Text, View } from "react-native";

import { AppScreen, Card, Field, Header, PageScroll, PrimaryButton } from "@/src/components/ui";

const rows = [["14/07", "Mercado Oliveira", "Pix", "R$ 540,00"], ["10/07", "Lanchonete Silva", "Dinheiro", "R$ 320,00"], ["09/07", "Mercado Oliveira", "Pix", "R$ 540,00"], ["08/07", "Restaurante Central", "Transferência", "R$ 650,00"], ["06/07", "Padaria do João", "Dinheiro", "R$ 200,00"]];

export default function ReportDetailsScreen() {
  return <AppScreen><Header title="Relatório detalhado" back /><PageScroll className="pt-5"><Field label="Tipo" value="Dinheiro recebido" /><Field label="Período" value="01/07/2026 até 14/07/2026" /><Card><Text className="text-center text-xs text-neutral-500">Total recebido</Text><Text className="mt-2 text-center text-2xl font-bold text-brand-700">R$ 8.450,00</Text></Card>
    <View className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white"><View className="flex-row bg-neutral-100 px-3 py-3"><Text className="w-12 text-[10px] font-bold">Data</Text><Text className="flex-1 text-[10px] font-bold">Cliente</Text><Text className="w-20 text-[10px] font-bold">Forma</Text><Text className="w-20 text-right text-[10px] font-bold">Valor</Text></View>{rows.map((row) => <View className="flex-row border-t border-neutral-100 px-3 py-4" key={row.join()}><Text className="w-12 text-[10px] text-neutral-500">{row[0]}</Text><Text className="flex-1 text-[10px] font-semibold text-ink">{row[1]}</Text><Text className="w-20 text-[10px] text-neutral-500">{row[2]}</Text><Text className="w-20 text-right text-[10px] font-bold text-ink">{row[3]}</Text></View>)}</View>
    <View className="mt-5"><PrimaryButton label="Exportar relatório" icon="download" /></View>
  </PageScroll></AppScreen>;
}
