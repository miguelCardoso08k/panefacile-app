import { AppScreen, Header, PageScroll } from "@/src/components/ui";
import { Receipt } from "@/src/components/receipt";

export default function PaymentReceiptScreen() { return <AppScreen><Header title="Recibo" back /><PageScroll><Receipt type="payment" /></PageScroll></AppScreen>; }
