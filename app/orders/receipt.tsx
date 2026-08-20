import { useLocalSearchParams } from "expo-router";

import { Receipt } from "@/src/components/receipt";
import { AppScreen, Header, PageScroll } from "@/src/components/ui";

export default function OrderReceiptScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <AppScreen>
      <Header title="Comprovante" back />
      <PageScroll><Receipt id={id ?? ""} type="order" /></PageScroll>
    </AppScreen>
  );
}
