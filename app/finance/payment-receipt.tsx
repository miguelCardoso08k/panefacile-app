import { useLocalSearchParams } from "expo-router";

import { Receipt } from "@/src/components/receipt";
import { AppScreen, Header, PageScroll } from "@/src/components/ui";

export default function PaymentReceiptScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <AppScreen>
      <Header title="Recibo" back />
      <PageScroll><Receipt id={id ?? ""} type="payment" /></PageScroll>
    </AppScreen>
  );
}
