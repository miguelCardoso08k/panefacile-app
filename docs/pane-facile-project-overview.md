# Pane Facile — Project Overview

## 1. Visão geral

O **Pane Facile** é um sistema de gestão para uma padaria que opera exclusivamente no modelo **B2B**, vendendo para mercados, lanchonetes, restaurantes, padarias e outros estabelecimentos.

A empresa não possui atendimento de balcão. O sistema deve substituir controles manuais e centralizar as operações comerciais e financeiras mais importantes do negócio.

O MVP será um aplicativo mobile utilizado inicialmente pelo administrador da padaria.

---

## 2. Objetivo do MVP

O objetivo do MVP é permitir que o administrador consiga:

- cadastrar clientes;
- cadastrar produtos;
- definir preços diferentes por cliente;
- criar pedidos;
- repetir pedidos anteriores;
- acompanhar o status dos pedidos;
- registrar pagamentos parciais ou totais;
- registrar pagamentos referentes ao débito total do cliente;
- controlar valores recebidos, em aberto e vencidos;
- gerar comprovantes de pedido;
- gerar recibos de pagamento;
- consultar relatórios financeiros básicos.

O sistema deve priorizar:

- rapidez operacional;
- simplicidade;
- redução de erros;
- preservação do histórico;
- consistência financeira.

---

## 3. Tecnologias

### Aplicativo mobile

- React Native;
- Expo;
- TypeScript;
- navegação compatível com Expo;
- armazenamento seguro do token;
- compartilhamento nativo de imagens e PDFs.

### Backend

- NestJS;
- TypeScript;
- Prisma ORM;
- PostgreSQL;
- autenticação JWT;
- Swagger/OpenAPI;
- validação de entrada;
- arquitetura modular;
- DDD simplificado.

### Infraestrutura sugerida

- backend hospedado no Railway ou serviço equivalente;
- PostgreSQL gerenciado;
- aplicativo distribuído com Expo/EAS;
- Docker Compose para desenvolvimento local;
- armazenamento de arquivos compatível com S3, caso seja necessário persistir documentos.

---

## 4. Arquitetura geral

```text
React Native + Expo
        |
        | REST / JSON
        v
NestJS API
        |
        | Prisma ORM
        v
PostgreSQL
```

O backend deve ser independente do aplicativo mobile para permitir, futuramente, a criação de um painel web sem reescrever as regras de negócio.

### Estrutura sugerida do backend

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── customers/
│   ├── products/
│   ├── pricing/
│   ├── orders/
│   ├── payments/
│   ├── reports/
│   └── documents/
│
├── shared/
│   ├── database/
│   ├── errors/
│   ├── guards/
│   ├── interceptors/
│   ├── decorators/
│   └── utils/
│
├── app.module.ts
└── main.ts
```

Estrutura interna sugerida para cada módulo:

```text
module-name/
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── enums/
│   └── services/
│
├── application/
│   ├── use-cases/
│   └── dto/
│
├── infrastructure/
│   ├── repositories/
│   ├── prisma/
│   └── mappers/
│
├── presentation/
│   └── controllers/
│
└── module-name.module.ts
```

O projeto deve usar DDD de forma pragmática. O foco é separar regra de negócio, acesso a dados e camada HTTP sem criar abstrações desnecessárias.

---

## 5. Perfis de usuário

### ADMIN

No MVP haverá apenas um perfil de usuário: `ADMIN`.

O administrador poderá:

- fazer login;
- cadastrar e editar clientes;
- cadastrar e editar produtos;
- definir preços personalizados;
- criar pedidos;
- repetir pedidos;
- alterar status de pedidos;
- registrar pagamentos;
- cancelar pagamentos;
- visualizar relatórios;
- gerar e compartilhar comprovantes.

O primeiro administrador deve ser criado por seed ou rotina de bootstrap segura.

Não haverá cadastro público de usuários no MVP.

---

## 6. Módulos do sistema

### 6.1 Autenticação

Responsável por:

- login;
- validação de credenciais;
- emissão de token;
- proteção de rotas;
- consulta do usuário autenticado;
- alteração de senha.

### 6.2 Clientes

Responsável por:

- cadastro;
- edição;
- listagem;
- busca;
- inativação;
- exclusão lógica;
- consulta de pedidos;
- consulta de débitos;
- preços personalizados;
- observações.

### 6.3 Produtos

Responsável por:

- cadastro;
- edição;
- listagem;
- busca;
- inativação;
- exclusão lógica;
- preço padrão;
- preço mínimo;
- unidade de venda;
- foto opcional.

### 6.4 Preços personalizados

Responsável pela configuração de preços específicos para cada combinação de cliente e produto.

### 6.5 Pedidos

Responsável por:

- criação;
- edição;
- revisão;
- confirmação;
- alteração de status;
- repetição;
- cancelamento;
- consulta;
- geração de comprovante.

### 6.6 Financeiro

Responsável por:

- pagamentos parciais;
- pagamentos totais;
- pagamentos gerais do cliente;
- distribuição de pagamentos;
- valores recebidos;
- valores em aberto;
- valores vencidos;
- cancelamento de pagamentos.

### 6.7 Comprovantes

Responsável por:

- comprovante de pedido;
- recibo de pagamento;
- exportação para imagem;
- exportação para PDF;
- compartilhamento nativo.

### 6.8 Relatórios

Responsável por:

- dinheiro recebido;
- valores em aberto;
- valores vencidos;
- vendas por cliente;
- pedidos por período;
- pagamentos por forma.

---

## 7. Entidades principais

### User

```text
id
name
email
passwordHash
role
active
createdAt
updatedAt
```

### Customer

```text
id
tradeName
legalName
document
contactName
phone
address
creditLimit
notes
active
createdAt
updatedAt
deletedAt
```

### Product

```text
id
name
description
unit
defaultPrice
minimumPrice
imageUrl
notes
active
createdAt
updatedAt
deletedAt
```

### CustomerProductPrice

```text
id
customerId
productId
price
createdAt
updatedAt
deletedAt
```

Deve existir no máximo um preço ativo por combinação de cliente e produto.

### Order

```text
id
number
customerId
status
deliveryDate
dueDate
subtotal
discount
total
notes
createdById
confirmedAt
canceledAt
cancelReason
createdAt
updatedAt
deletedAt
```

### OrderItem

```text
id
orderId
productId
productName
unit
quantity
unitPrice
subtotal
notes
```

O item deve armazenar um snapshot dos dados do produto no momento da venda.

### Payment

```text
id
number
customerId
amount
paymentMethod
paidAt
notes
createdById
canceledAt
cancelReason
createdAt
updatedAt
```

### PaymentAllocation

```text
id
paymentId
orderId
amount
createdAt
```

Essa tabela permite:

- um pagamento quitar vários pedidos;
- um pedido receber vários pagamentos.

### Document

Opcionalmente pode armazenar metadados de comprovantes gerados.

```text
id
type
referenceId
number
fileUrl
createdAt
```

---

## 8. Relações principais

```text
Customer 1 ─── N Order
Order    1 ─── N OrderItem
Product  1 ─── N OrderItem

Customer 1 ─── N CustomerProductPrice
Product  1 ─── N CustomerProductPrice

Customer 1 ─── N Payment
Payment  1 ─── N PaymentAllocation
Order    1 ─── N PaymentAllocation
```

---

## 9. Status do pedido

```text
DRAFT
CONFIRMED
IN_PRODUCTION
READY
DELIVERED
CANCELED
```

### Fluxo principal

```text
DRAFT
  ↓
CONFIRMED
  ↓
IN_PRODUCTION
  ↓
READY
  ↓
DELIVERED
```

O status `CANCELED` pode ser aplicado conforme as regras do negócio.

Pedidos confirmados não devem ser excluídos fisicamente. Devem ser cancelados.

---

## 10. Situação financeira do pedido

A situação financeira deve ser calculada, não armazenada como fonte principal.

```text
OPEN
PARTIALLY_PAID
PAID
OVERDUE
CANCELED
```

### Regras

```text
totalReceived = soma das alocações válidas
remainingBalance = order.total - totalReceived
```

- `PAID`: saldo igual a zero;
- `PARTIALLY_PAID`: recebeu algum valor e ainda existe saldo;
- `OPEN`: nenhum pagamento e ainda não venceu;
- `OVERDUE`: existe saldo e a data de vencimento passou;
- `CANCELED`: pedido cancelado.

---

## 11. Regras de preços

A ordem para resolução do preço deve ser:

```text
1. preço personalizado do cliente;
2. preço padrão do produto.
```

O produto também possui um preço mínimo.

### Preço abaixo do mínimo

Quando o administrador informar um preço abaixo do mínimo:

- o sistema deve exibir um alerta;
- deve exigir confirmação explícita;
- deve exigir uma justificativa;
- o valor final usado deve ser salvo no item do pedido;
- a ação deve ser auditável.

### Histórico de preços

Alterações no produto ou no preço personalizado não devem alterar pedidos antigos.

---

## 12. Regras de pedido

### Criação

Um pedido deve:

- pertencer a um cliente ativo;
- possuir ao menos um item;
- possuir quantidades maiores que zero;
- ser criado inicialmente como `DRAFT`;
- receber um número amigável único;
- ter seus totais calculados no backend.

Exemplo de número:

```text
PED-2026-000143
```

### Snapshot do item

Cada `OrderItem` deve salvar:

- nome do produto;
- unidade;
- quantidade;
- preço unitário;
- subtotal.

Isso preserva o histórico quando o produto for alterado.

### Cancelamento

Cancelar um pedido deve:

- exigir motivo;
- preservar todos os dados;
- manter o pedido no histórico;
- tratar pagamentos existentes antes de concluir o cancelamento.

---

## 13. Repetição de pedido

O sistema deve permitir:

- repetir o último pedido válido do cliente;
- repetir um pedido específico do histórico.

### Pedido válido

O pedido usado como referência deve:

- não estar cancelado;
- não estar excluído;
- estar confirmado, em produção, pronto ou entregue.

### Dados copiados

- cliente;
- produtos;
- quantidades;
- observações dos itens, quando aplicável.

### Dados não copiados

- pagamentos;
- recibos;
- status;
- datas antigas;
- número;
- motivo de cancelamento;
- desconto antigo, salvo decisão explícita.

### Preços

O novo pedido deve usar os preços atuais.

O sistema deve mostrar:

- preço antigo;
- preço atual;
- produtos inativos;
- produtos excluídos;
- alertas de preço mínimo.

O novo pedido deve ser criado como `DRAFT`.

---

## 14. Pagamentos

Pedido e pagamento são entidades diferentes.

### Pagamento de pedido específico

O administrador pode registrar um pagamento diretamente em um pedido.

Nesse caso:

- cria-se um `Payment`;
- cria-se uma `PaymentAllocation` para o pedido;
- o saldo é recalculado;
- o recibo pode ser gerado.

### Pagamento geral do cliente

O cliente pode pagar um valor referente ao débito total, sem indicar um pedido específico.

O sistema deve:

1. listar os pedidos em aberto;
2. criar uma sugestão de distribuição;
3. permitir edição manual;
4. validar os valores;
5. confirmar o pagamento;
6. gerar recibo com a distribuição.

### Distribuição automática

Ordem padrão:

```text
1. pedidos vencidos mais antigos;
2. pedidos em aberto mais antigos;
3. pedidos mais recentes.
```

### Restrições

- o valor deve ser maior que zero;
- o pagamento não pode superar o débito total no MVP;
- uma alocação não pode superar o saldo do pedido;
- a soma das alocações não pode superar o pagamento;
- pagamentos cancelados não contam nos saldos;
- cancelamento deve desfazer as alocações.

Pagamentos acima do débito total e crédito do cliente ficam fora do MVP.

---

## 15. Formas de pagamento

```text
CASH
PIX
BANK_TRANSFER
CREDIT
OTHER
```

A nomenclatura pode ser traduzida no aplicativo:

```text
Dinheiro
Pix
Transferência
Crédito
Outro
```

---

## 16. Comprovantes

### Comprovante de pedido

Deve conter:

- identidade da empresa;
- número do pedido;
- data;
- cliente;
- itens;
- quantidades;
- valores;
- total;
- entrega;
- observações.

### Recibo de pagamento

Deve conter:

- identidade da empresa;
- número do recibo;
- data;
- cliente;
- valor recebido;
- forma de pagamento;
- pedidos relacionados;
- valores distribuídos;
- saldo restante.

Exemplo de número:

```text
REC-2026-000089
```

### Saídas

- visualização no aplicativo;
- compartilhamento como imagem;
- geração de PDF;
- compartilhamento pelo mecanismo nativo do dispositivo.

---

## 17. Relatórios do MVP

### Dinheiro recebido

Filtros:

- hoje;
- semana;
- mês;
- período personalizado.

Resultados:

- total recebido;
- quantidade de pagamentos;
- valores por forma de pagamento;
- percentual por forma de pagamento.

### Valores a receber

Resultados:

- total em aberto;
- total vencido;
- total a vencer;
- detalhamento por cliente;
- detalhamento por pedido.

### Vendas por cliente

Resultados:

- total vendido;
- total recebido;
- saldo;
- quantidade de pedidos.

### Pedidos por período

Resultados:

- quantidade;
- valor total;
- entregues;
- cancelados;
- em produção.

---

## 18. Dashboard

O dashboard deve exibir:

- pedidos para entregar;
- pedidos em produção;
- pagamentos recebidos;
- valor recebido hoje;
- valor em aberto;
- valor vencido;
- próximas entregas.

### Ações rápidas

- novo pedido;
- repetir último pedido;
- registrar pagamento.

---

## 19. Telas do aplicativo

1. Login.
2. Início/Dashboard.
3. Lista de clientes.
4. Cadastro de cliente.
5. Edição de cliente.
6. Detalhes do cliente.
7. Lista de produtos.
8. Cadastro de produto.
9. Edição de produto.
10. Preços personalizados.
11. Lista de pedidos.
12. Criação de pedido.
13. Revisão do pedido.
14. Detalhes do pedido.
15. Pagamento de pedido específico.
16. Pagamento geral do cliente.
17. Financeiro.
18. Relatórios.
19. Relatório detalhado.
20. Comprovante de pedido.
21. Recibo de pagamento.

Algumas telas podem reaproveitar o mesmo componente para criação e edição.

---

## 20. Navegação principal

Barra inferior sugerida:

```text
Início
Pedidos
Clientes
Produtos
Financeiro
```

Relatórios ficam dentro de Financeiro.

Configurações e perfil podem ficar em um menu secundário.

---

## 21. Identidade visual

A marca é inspirada na bandeira italiana.

### Paleta recomendada

- fundo branco ou marfim;
- verde profundo como cor primária;
- dourado como destaque;
- vermelho real para alertas e ações destrutivas;
- cinza neutro para textos secundários e bordas.

### Uso das cores

- verde: ações principais, navegação ativa, status positivos;
- dourado: destaques, branding, ícones institucionais;
- vermelho: vencidos, cancelamentos e erros;
- branco: fundo e áreas de leitura;
- cinza: divisores e informações secundárias.

O design deve manter boa legibilidade e não depender apenas da cor para comunicar status.

---

## 22. Requisitos técnicos importantes

### Valores monetários

Usar `Decimal` no Prisma/PostgreSQL.

Não usar `float` para dinheiro.

### Transações

Operações financeiras devem usar transações de banco:

- criação de pagamento;
- criação de alocações;
- cancelamento;
- redistribuição.

### Idempotência

Criação de pedidos e pagamentos deve possuir mecanismo de idempotência para evitar duplicidade por repetição de requisição.

### Soft delete

Usar exclusão lógica em:

- clientes;
- produtos;
- pedidos em situações permitidas;
- preços personalizados;
- outros registros históricos quando necessário.

### Validação

O backend é a fonte de verdade para:

- totais;
- preços;
- saldos;
- status;
- alocações;
- regras financeiras.

### Paginação

Listagens devem possuir paginação ou carregamento incremental.

### Logs

Registrar:

- erros;
- login inválido;
- criação de pedido;
- confirmação;
- cancelamento;
- criação de pagamento;
- cancelamento de pagamento;
- geração de documentos.

---

## 23. Testes prioritários

### Testes unitários

- resolução de preço;
- cálculo de subtotal;
- cálculo de total;
- aplicação de desconto;
- repetição de pedido;
- cálculo de saldo;
- situação financeira;
- distribuição automática;
- redistribuição manual;
- cancelamento de pagamento.

### Testes de integração

- criação de cliente;
- criação de produto;
- criação de preço personalizado;
- criação e confirmação de pedido;
- repetição de pedido;
- pagamento parcial;
- pagamento total;
- pagamento geral;
- cancelamento de pagamento;
- relatórios.

### Testes ponta a ponta

Fluxos críticos:

```text
cliente
→ pedido
→ confirmação
→ comprovante
```

```text
pedido
→ pagamento
→ recibo
```

```text
cliente
→ pagamento geral
→ distribuição
→ recibo
```

```text
pedido anterior
→ repetir
→ revisar preços
→ novo pedido
```

---

## 24. Fora do escopo do MVP

- estoque;
- emissão fiscal;
- integração bancária;
- conciliação automática;
- múltiplas filiais;
- múltiplos perfis de permissão;
- portal do cliente;
- integração automática com WhatsApp;
- controle de produção;
- receitas;
- cálculo de ingredientes;
- fermentação;
- inteligência preditiva;
- funcionamento offline completo;
- crédito por pagamento excedente;
- rotas de entrega;
- impressão automática.

---

## 25. Prioridade de implementação

### Fase 1 — Base técnica

- configurar repositórios;
- configurar NestJS;
- configurar Prisma;
- configurar PostgreSQL;
- configurar React Native + Expo;
- autenticação;
- tratamento de erros;
- Swagger;
- CI.

### Fase 2 — Cadastros

- clientes;
- produtos;
- preços personalizados.

### Fase 3 — Pedidos

- criação;
- itens;
- totais;
- revisão;
- confirmação;
- status;
- repetição;
- cancelamento.

### Fase 4 — Financeiro

- pagamento de pedido;
- pagamento geral;
- distribuição automática;
- edição manual;
- saldo;
- vencidos;
- cancelamento.

### Fase 5 — Documentos

- comprovante de pedido;
- recibo;
- imagem;
- PDF;
- compartilhamento.

### Fase 6 — Dashboard e relatórios

- dashboard;
- recebido;
- em aberto;
- vencidos;
- relatórios.

### Fase 7 — Homologação

- testes;
- correções;
- treinamento do cliente;
- backup;
- monitoramento;
- publicação.

---

## 26. Definição de pronto do MVP

O MVP será considerado pronto quando:

1. o administrador conseguir fazer login;
2. clientes e produtos puderem ser gerenciados;
3. preços personalizados forem aplicados corretamente;
4. pedidos puderem ser criados, confirmados, repetidos e cancelados;
5. pagamentos parciais e gerais funcionarem corretamente;
6. saldos não apresentarem inconsistências;
7. comprovantes e recibos puderem ser compartilhados;
8. relatórios básicos estiverem corretos;
9. os fluxos críticos estiverem testados;
10. o aplicativo estiver validado em dispositivo Android real;
11. houver ambiente de homologação e produção;
12. houver backup automático;
13. o cliente tiver aprovado a operação;
14. a documentação mínima estiver disponível.

---

## 27. Decisões pendentes

Antes da implementação final, confirmar com o cliente:

1. unidades de venda utilizadas;
2. regra exata de preço abaixo do mínimo;
3. descontos permitidos;
4. condições de vencimento;
5. status realmente usados na produção;
6. necessidade de limite de crédito;
7. necessidade de fotos dos produtos;
8. campos obrigatórios de cliente;
9. formato oficial dos comprovantes;
10. paleta final da interface;
11. necessidade de exportação CSV;
12. política para cancelamento de pedidos pagos;
13. necessidade de histórico detalhado de alterações.

---

## 28. Diretrizes para o Codex

Ao gerar código para este projeto:

1. use TypeScript estrito;
2. não use `float` para valores monetários;
3. mantenha regras de negócio fora dos controllers;
4. não confie em totais calculados pelo aplicativo;
5. use transações em operações financeiras;
6. preserve histórico por snapshots;
7. utilize soft delete quando indicado;
8. escreva testes para regras críticas;
9. evite abstrações sem necessidade;
10. prefira código simples, legível e modular;
11. documente decisões importantes;
12. mantenha contratos de API consistentes;
13. trate duplicidade de requisições;
14. valide toda entrada no backend;
15. não implemente funcionalidades fora do MVP sem solicitação explícita.
