import { createContext, type PropsWithChildren, useContext, useMemo, useState } from "react";

export type Customer = {
  id: string;
  tradeName: string;
  legalName: string;
  document: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  creditLimit: number;
  notes: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  unit: string;
  defaultPrice: number;
  minimumPrice: number;
  notes: string;
  active: boolean;
  icon: string;
};

export type CustomPrice = { id: string; customerId: string; productId: string; price: number; reason: string };
export type OrderItem = { id: string; productId: string; productName: string; quantity: number; unitPrice: number };
export type Order = { id: string; number: string; customerId: string; status: string; deliveryDate: string; dueDate: string; notes: string; items: OrderItem[]; createdAt: string };
export type Payment = { id: string; number: string; customerId: string; amount: number; method: string; paidAt: string; notes: string; orderIds: string[]; canceled: boolean };

const initialCustomers: Customer[] = [
  { id: "c1", tradeName: "Mercado Oliveira", legalName: "Mercado Oliveira LTDA", document: "12.345.678/0001-90", contactName: "João Oliveira", phone: "(11) 98765-4321", email: "contato@oliveira.com", address: "Rua das Flores, 123 - Centro", creditLimit: 2000, notes: "Entrega preferencial no período da manhã.", active: true },
  { id: "c2", tradeName: "Lanchonete Silva", legalName: "Lanchonete Silva ME", document: "23.456.789/0001-10", contactName: "Ana Silva", phone: "(11) 98765-3210", email: "", address: "Av. Central, 45", creditLimit: 1500, notes: "", active: true },
  { id: "c3", tradeName: "Restaurante Central", legalName: "Restaurante Central LTDA", document: "34.567.890/0001-21", contactName: "Carlos Lima", phone: "(11) 96643-2109", email: "", address: "Rua do Comércio, 80", creditLimit: 3000, notes: "", active: true },
  { id: "c4", tradeName: "Padaria do João", legalName: "", document: "", contactName: "João", phone: "(11) 95432-1008", email: "", address: "", creditLimit: 1000, notes: "", active: true },
  { id: "c5", tradeName: "Mercado Bom Preço", legalName: "", document: "", contactName: "Marina", phone: "(11) 84221-0987", email: "", address: "", creditLimit: 2500, notes: "", active: true },
];

const initialProducts: Product[] = [
  { id: "p1", name: "Pão Francês", description: "Pão francês tradicional", unit: "Unidade", defaultPrice: 0.85, minimumPrice: 0.78, notes: "Produção própria", active: true, icon: "🥖" },
  { id: "p2", name: "Pão de Forma", description: "", unit: "Unidade", defaultPrice: 5.5, minimumPrice: 5, notes: "", active: true, icon: "🍞" },
  { id: "p3", name: "Pão de Hambúrguer", description: "", unit: "Pacote c/ 4", defaultPrice: 4.2, minimumPrice: 3.8, notes: "", active: true, icon: "🍔" },
  { id: "p4", name: "Bisnaga de Pão", description: "", unit: "Pacote c/ 10", defaultPrice: 7.5, minimumPrice: 6.8, notes: "", active: true, icon: "🥐" },
  { id: "p5", name: "Baguete", description: "", unit: "Unidade", defaultPrice: 1.2, minimumPrice: 1.1, notes: "", active: true, icon: "🥖" },
];

const initialOrders: Order[] = [
  { id: "o1", number: "PED-2026-000144", customerId: "c1", status: "Em produção", deliveryDate: "15/07/2026", dueDate: "22/07/2026", notes: "", createdAt: "14/07/2026", items: [{ id: "i1", productId: "p1", productName: "Pão Francês", quantity: 200, unitPrice: 0.85 }, { id: "i2", productId: "p2", productName: "Pão de Forma", quantity: 10, unitPrice: 5.5 }] },
  { id: "o2", number: "PED-2026-000143", customerId: "c1", status: "Entregue", deliveryDate: "10/07/2026", dueDate: "17/07/2026", notes: "", createdAt: "10/07/2026", items: [{ id: "i3", productId: "p1", productName: "Pão Francês", quantity: 150, unitPrice: 0.8 }, { id: "i4", productId: "p3", productName: "Pão de Hambúrguer", quantity: 30, unitPrice: 4.2 }] },
  { id: "o3", number: "PED-2026-000142", customerId: "c2", status: "Entregue", deliveryDate: "06/07/2026", dueDate: "13/07/2026", notes: "", createdAt: "06/07/2026", items: [{ id: "i5", productId: "p2", productName: "Pão de Forma", quantity: 40, unitPrice: 5.5 }] },
];

const initialPayments: Payment[] = [{ id: "pay1", number: "REC-2026-000089", customerId: "c1", amount: 100, method: "Pix", paidAt: "14/07/2026", notes: "Pagamento parcial", orderIds: ["o2"], canceled: false }];

type Store = {
  customers: Customer[]; products: Product[]; prices: CustomPrice[]; orders: Order[]; payments: Payment[];
  saveCustomer: (value: Omit<Customer, "id"> & { id?: string }) => string; deleteCustomer: (id: string) => void;
  saveProduct: (value: Omit<Product, "id"> & { id?: string }) => string; deleteProduct: (id: string) => void;
  savePrice: (value: Omit<CustomPrice, "id"> & { id?: string }) => void; deletePrice: (id: string) => void;
  saveOrder: (value: Omit<Order, "id" | "number"> & { id?: string }) => string; deleteOrder: (id: string) => void; updateOrderStatus: (id: string, status: string) => void;
  savePayment: (value: Omit<Payment, "id" | "number" | "canceled">) => string; cancelPayment: (id: string) => void;
  orderTotal: (order: Order) => number; orderPaid: (orderId: string) => number; customerBalance: (customerId: string) => number; resolvePrice: (customerId: string, productId: string) => number;
};

const MockDataContext = createContext<Store | null>(null);
const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function MockDataProvider({ children }: PropsWithChildren) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [products, setProducts] = useState(initialProducts);
  const [prices, setPrices] = useState<CustomPrice[]>([{ id: "price1", customerId: "c1", productId: "p1", price: 0.82, reason: "" }]);
  const [orders, setOrders] = useState(initialOrders);
  const [payments, setPayments] = useState(initialPayments);

  const store = useMemo<Store>(() => {
    const orderTotal = (order: Order) => order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const orderPaid = (orderId: string) => payments.filter((payment) => !payment.canceled && payment.orderIds.includes(orderId)).reduce((sum, payment) => sum + payment.amount / Math.max(payment.orderIds.length, 1), 0);
    return {
      customers, products, prices, orders, payments,
      saveCustomer: (value) => { const id = value.id ?? makeId("customer"); setCustomers((items) => value.id ? items.map((item) => item.id === value.id ? { ...value, id } : item) : [...items, { ...value, id }]); return id; },
      deleteCustomer: (id) => setCustomers((items) => items.filter((item) => item.id !== id)),
      saveProduct: (value) => { const id = value.id ?? makeId("product"); setProducts((items) => value.id ? items.map((item) => item.id === value.id ? { ...value, id } : item) : [...items, { ...value, id }]); return id; },
      deleteProduct: (id) => setProducts((items) => items.filter((item) => item.id !== id)),
      savePrice: (value) => setPrices((items) => { const existing = items.find((item) => item.customerId === value.customerId && item.productId === value.productId); return existing ? items.map((item) => item.id === existing.id ? { ...value, id: existing.id } : item) : [...items, { ...value, id: makeId("price") }]; }),
      deletePrice: (id) => setPrices((items) => items.filter((item) => item.id !== id)),
      saveOrder: (value) => { const id = value.id ?? makeId("order"); const number = value.id ? orders.find((item) => item.id === value.id)?.number ?? "PED-RASCUNHO" : `PED-2026-${String(145 + orders.length).padStart(6, "0")}`; setOrders((items) => value.id ? items.map((item) => item.id === value.id ? { ...value, id, number } : item) : [{ ...value, id, number }, ...items]); return id; },
      deleteOrder: (id) => setOrders((items) => items.filter((item) => item.id !== id)),
      updateOrderStatus: (id, status) => setOrders((items) => items.map((item) => item.id === id ? { ...item, status } : item)),
      savePayment: (value) => { const id = makeId("payment"); setPayments((items) => [{ ...value, id, number: `REC-2026-${String(90 + items.length).padStart(6, "0")}`, canceled: false }, ...items]); return id; },
      cancelPayment: (id) => setPayments((items) => items.map((item) => item.id === id ? { ...item, canceled: true } : item)),
      orderTotal, orderPaid,
      customerBalance: (customerId) => orders.filter((order) => order.customerId === customerId && order.status !== "Cancelado").reduce((sum, order) => sum + Math.max(orderTotal(order) - orderPaid(order.id), 0), 0),
      resolvePrice: (customerId, productId) => prices.find((item) => item.customerId === customerId && item.productId === productId)?.price ?? products.find((item) => item.id === productId)?.defaultPrice ?? 0,
    };
  }, [customers, orders, payments, prices, products]);

  return <MockDataContext.Provider value={store}>{children}</MockDataContext.Provider>;
}

export function useMockData() {
  const value = useContext(MockDataContext);
  if (!value) throw new Error("useMockData must be used inside MockDataProvider");
  return value;
}

export const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
export const parseMoney = (value: string) => Number(value.replace(/[^\d,.-]/g, "").replace(".", "").replace(",", ".")) || 0;
