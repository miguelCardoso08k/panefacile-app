export const customers = [
  { initials: "MO", name: "Mercado Oliveira", phone: "(11) 98765-4321", balance: "R$ 480,00" },
  { initials: "LS", name: "Lanchonete Silva", phone: "(11) 98765-3210", balance: "R$ 320,00" },
  { initials: "RC", name: "Restaurante Central", phone: "(11) 96643-2109", balance: "R$ 1.250,00" },
  { initials: "PD", name: "Padaria do João", phone: "(11) 95432-1008", balance: "R$ 0,00" },
  { initials: "MB", name: "Mercado Bom Preço", phone: "(11) 84221-0987", balance: "R$ 620,00" },
];

export const products = [
  { icon: "🥖", name: "Pão Francês", unit: "Unidade", price: "R$ 0,85", minimum: "R$ 0,78" },
  { icon: "🍞", name: "Pão de Forma", unit: "Unidade", price: "R$ 5,50", minimum: "R$ 5,00" },
  { icon: "🍔", name: "Pão de Hambúrguer", unit: "Pacote c/ 4", price: "R$ 4,20", minimum: "R$ 3,80" },
  { icon: "🥐", name: "Bisnaga de Pão", unit: "Pacote c/ 10", price: "R$ 7,50", minimum: "R$ 6,80" },
  { icon: "🥖", name: "Baguete", unit: "Unidade", price: "R$ 1,20", minimum: "R$ 1,10" },
];

export const orders = [
  { number: "PED-2026-000144", date: "14/07/2026", customer: "Mercado Oliveira", total: "R$ 650,00", status: "Em produção", tone: "gold" as const },
  { number: "PED-2026-000143", date: "10/07/2026", customer: "Mercado Oliveira", total: "R$ 540,00", status: "Entregue", tone: "green" as const },
  { number: "PED-2026-000142", date: "06/07/2026", customer: "Lanchonete Silva", total: "R$ 480,00", status: "Pago", tone: "green" as const },
  { number: "PED-2026-000141", date: "05/07/2026", customer: "Restaurante Central", total: "R$ 560,00", status: "Vencido", tone: "red" as const },
  { number: "PED-2026-000140", date: "02/07/2026", customer: "Padaria do João", total: "R$ 300,00", status: "Pago", tone: "green" as const },
];
