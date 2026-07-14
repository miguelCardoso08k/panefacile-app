import { AppScreen, Header, PageScroll } from "@/src/components/ui";
import { Receipt } from "@/src/components/receipt";

export default function OrderReceiptScreen() { return <AppScreen><Header title="Comprovante" back /><PageScroll><Receipt type="order" /></PageScroll></AppScreen>; }
