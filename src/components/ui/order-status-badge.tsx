import { Badge } from "./badge";

type OrderStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "IN_PRODUCTION"
  | "SEPARATING"
  | "LOADED"
  | "IN_DELIVERY"
  | "DELIVERED"
  | "CANCELED"
  | "SPLIT";

const statusConfig = {
  DRAFT: {
    label: "Rascunho",
    variant: "neutral",
  },

  CONFIRMED: {
    label: "Confirmado",
    variant: "info",
  },

  IN_PRODUCTION: {
    label: "Em produção",
    variant: "warning",
  },

  SEPARATING: {
    label: "Em separação",
    variant: "warning",
  },

  LOADED: {
    label: "Carregado",
    variant: "info",
  },

  IN_DELIVERY: {
    label: "Em entrega",
    variant: "info",
  },

  DELIVERED: {
    label: "Entregue",
    variant: "success",
  },

  CANCELED: {
    label: "Cancelado",
    variant: "danger",
  },

  SPLIT: {
    label: "Desmembrado",
    variant: "neutral",
  },
} as const satisfies Record<
  OrderStatus,
  {
    label: string;
    variant: "success" | "warning" | "danger" | "info" | "neutral";
  }
>;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
