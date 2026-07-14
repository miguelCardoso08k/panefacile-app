# Pane Facile — Entidades e Atributos do MVP

## 1. Objetivo

Este documento descreve as entidades de domínio necessárias para o MVP do Pane Facile, seus atributos, responsabilidades e principais regras de negócio.

O escopo considerado inclui apenas:

- autenticação do administrador;
- clientes;
- produtos;
- preços personalizados;
- pedidos;
- repetição de pedidos;
- pagamentos;
- distribuição de pagamentos;
- comprovantes;
- relatórios financeiros básicos.

Não estão incluídos neste documento módulos futuros como estoque, produção, receitas, fermentação, emissão fiscal ou múltiplas filiais.

---

# 2. Convenções

## 2.1 Tipos sugeridos

Os tipos abaixo são conceituais e podem ser adaptados ao Prisma:

- `UUID`: identificador único;
- `String`: texto;
- `Decimal`: valor monetário ou numérico com precisão;
- `Int`: número inteiro;
- `Boolean`: verdadeiro ou falso;
- `DateTime`: data e hora;
- `Date`: data sem necessidade de horário;
- `Enum`: conjunto fechado de valores;
- `Json`: estrutura flexível, usada somente quando realmente necessária.

## 2.2 Campos comuns

Quando aplicável, as entidades devem possuir:

```text
id
createdAt
updatedAt
deletedAt
```

O campo `deletedAt` deve ser usado apenas nas entidades que suportam exclusão lógica.

## 2.3 Valores monetários

Todos os valores financeiros devem usar `Decimal`.

Nunca utilizar `float` para:

- preços;
- totais;
- descontos;
- pagamentos;
- saldos;
- alocações.

---

# 3. Entidade User

## 3.1 Responsabilidade

Representa o usuário autorizado a acessar o sistema.

No MVP existirá apenas o perfil `ADMIN`, mas a entidade deve ser modelada de forma que permita expansão futura.

## 3.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único do usuário. |
| `name` | String | Sim | Nome do administrador. |
| `email` | String | Sim | E-mail usado no login. |
| `passwordHash` | String | Sim | Hash da senha. Nunca deve ser exposto. |
| `role` | UserRole | Sim | Perfil do usuário. No MVP: `ADMIN`. |
| `active` | Boolean | Sim | Indica se o usuário pode acessar o sistema. |
| `lastLoginAt` | DateTime | Não | Data e hora do último login válido. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |

## 3.3 Enum UserRole

```text
ADMIN
```

## 3.4 Regras

1. O e-mail deve ser único.
2. A senha deve ser armazenada apenas como hash.
3. Usuários inativos não podem autenticar.
4. O primeiro administrador deve ser criado por seed ou bootstrap seguro.
5. Não haverá cadastro público no MVP.

---

# 4. Entidade Customer

## 4.1 Responsabilidade

Representa um estabelecimento que compra produtos da padaria.

O cliente é uma empresa ou comércio B2B, como mercado, lanchonete ou restaurante.

## 4.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `tradeName` | String | Sim | Nome fantasia do estabelecimento. |
| `legalName` | String | Não | Razão social. |
| `document` | String | Não | CPF ou CNPJ. |
| `contactName` | String | Não | Nome do responsável pelo estabelecimento. |
| `phone` | String | Sim | Telefone principal. |
| `email` | String | Não | E-mail de contato. |
| `addressLine` | String | Não | Rua, número e complemento. |
| `district` | String | Não | Bairro. |
| `city` | String | Não | Cidade. |
| `state` | String | Não | Estado ou UF. |
| `postalCode` | String | Não | CEP. |
| `creditLimit` | Decimal | Não | Limite de crédito comercial. |
| `notes` | String | Não | Observações gerais. |
| `active` | Boolean | Sim | Indica se o cliente pode receber novos pedidos. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |
| `deletedAt` | DateTime | Não | Exclusão lógica. |

## 4.3 Regras

1. `tradeName` é obrigatório.
2. `phone` é obrigatório no MVP.
3. Cliente inativo não pode receber novos pedidos.
4. Cliente excluído deve permanecer referenciado em pedidos e pagamentos antigos.
5. O saldo do cliente não deve ser armazenado como fonte de verdade.
6. Total comprado, recebido, em aberto e vencido devem ser calculados a partir de pedidos e pagamentos.
7. O limite de crédito pode gerar alerta, mas não precisa bloquear pedidos no MVP, salvo decisão posterior.

---

# 5. Entidade Product

## 5.1 Responsabilidade

Representa um produto vendido pela padaria.

## 5.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `name` | String | Sim | Nome comercial do produto. |
| `description` | String | Não | Descrição do produto. |
| `unit` | ProductUnit | Sim | Unidade de venda. |
| `defaultPrice` | Decimal | Sim | Preço padrão. |
| `minimumPrice` | Decimal | Sim | Menor preço recomendado ou permitido. |
| `imageUrl` | String | Não | URL da imagem. |
| `notes` | String | Não | Observações internas. |
| `active` | Boolean | Sim | Indica se pode ser usado em novos pedidos. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |
| `deletedAt` | DateTime | Não | Exclusão lógica. |

## 5.3 Enum ProductUnit

Valores iniciais sugeridos:

```text
UNIT
KG
PACKAGE
BOX
DOZEN
```

A lista pode ser ajustada após validação com o cliente.

## 5.4 Regras

1. O nome é obrigatório.
2. O preço padrão deve ser maior ou igual a zero.
3. O preço mínimo deve ser maior ou igual a zero.
4. O preço padrão deve ser maior ou igual ao preço mínimo, salvo exceção explícita.
5. Produtos inativos não podem ser adicionados a novos pedidos.
6. Alterar produto não pode alterar itens de pedidos antigos.
7. Excluir produto deve ser feito por exclusão lógica.

---

# 6. Entidade CustomerProductPrice

## 6.1 Responsabilidade

Representa um preço personalizado de um produto para um cliente específico.

## 6.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `customerId` | UUID | Sim | Cliente relacionado. |
| `productId` | UUID | Sim | Produto relacionado. |
| `price` | Decimal | Sim | Preço personalizado. |
| `belowMinimumReason` | String | Não | Justificativa quando o valor estiver abaixo do mínimo. |
| `createdById` | UUID | Sim | Usuário responsável. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |
| `deletedAt` | DateTime | Não | Exclusão lógica. |

## 6.3 Regras

1. Deve existir no máximo um preço ativo por combinação de cliente e produto.
2. Quando existir, ele tem prioridade sobre o preço padrão.
3. Quando for removido, pedidos futuros voltam a usar o preço padrão.
4. Pedidos antigos não podem ser alterados.
5. Preço abaixo do mínimo deve exigir justificativa.
6. A definição de preço deve ser auditável.

---

# 7. Entidade Order

## 7.1 Responsabilidade

Representa um pedido comercial feito por um cliente.

É a principal entidade operacional do sistema.

## 7.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador interno. |
| `number` | String | Sim | Número amigável e único. |
| `customerId` | UUID | Sim | Cliente do pedido. |
| `status` | OrderStatus | Sim | Status operacional. |
| `deliveryDate` | DateTime | Sim | Data prevista de entrega. |
| `dueDate` | DateTime | Não | Data de vencimento financeiro. |
| `subtotal` | Decimal | Sim | Soma dos subtotais dos itens. |
| `discount` | Decimal | Sim | Desconto total aplicado. |
| `total` | Decimal | Sim | Total final do pedido. |
| `notes` | String | Não | Observações gerais. |
| `createdById` | UUID | Sim | Usuário que criou. |
| `confirmedById` | UUID | Não | Usuário que confirmou. |
| `confirmedAt` | DateTime | Não | Data de confirmação. |
| `canceledById` | UUID | Não | Usuário que cancelou. |
| `canceledAt` | DateTime | Não | Data de cancelamento. |
| `cancelReason` | String | Não | Motivo do cancelamento. |
| `sourceOrderId` | UUID | Não | Pedido usado como base em uma repetição. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |
| `deletedAt` | DateTime | Não | Exclusão lógica, restrita a rascunhos. |

## 7.3 Enum OrderStatus

```text
DRAFT
CONFIRMED
IN_PRODUCTION
READY
DELIVERED
CANCELED
```

## 7.4 Regras

1. O número deve ser único.
2. O pedido deve pertencer a um cliente ativo.
3. Um pedido deve possuir ao menos um item antes da confirmação.
4. O pedido inicia como `DRAFT`.
5. Totais devem ser calculados no backend.
6. Pedido confirmado deve manter histórico imutável dos itens vendidos.
7. Pedido cancelado deve permanecer no histórico.
8. Cancelamento exige motivo.
9. Pedido cancelado não pode receber novos pagamentos.
10. Pedido confirmado não deve ser excluído fisicamente.
11. `sourceOrderId` identifica pedidos criados por repetição.
12. O desconto não pode resultar em total negativo.

---

# 8. Entidade OrderItem

## 8.1 Responsabilidade

Representa um produto dentro de um pedido.

Também preserva um snapshot comercial do produto no momento da venda.

## 8.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `orderId` | UUID | Sim | Pedido relacionado. |
| `productId` | UUID | Sim | Produto original. |
| `productName` | String | Sim | Nome salvo no momento da venda. |
| `unit` | ProductUnit | Sim | Unidade salva no momento da venda. |
| `quantity` | Decimal | Sim | Quantidade vendida. |
| `unitPrice` | Decimal | Sim | Preço aplicado. |
| `subtotal` | Decimal | Sim | `quantity × unitPrice`. |
| `originalUnitPrice` | Decimal | Não | Preço anterior ou sugerido, útil na repetição. |
| `belowMinimumReason` | String | Não | Motivo de preço abaixo do mínimo. |
| `notes` | String | Não | Observações específicas do item. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |

## 8.3 Regras

1. A quantidade deve ser maior que zero.
2. O preço unitário deve ser maior ou igual a zero.
3. O subtotal deve ser calculado no backend.
4. O item deve preservar nome, unidade e preço.
5. Alterações posteriores no produto não afetam o item.
6. O preço aplicado deve seguir:
   1. preço personalizado ativo;
   2. preço padrão.
7. Preço abaixo do mínimo exige justificativa.

---

# 9. Entidade Payment

## 9.1 Responsabilidade

Representa um valor recebido de um cliente.

Um pagamento não precisa pertencer diretamente a apenas um pedido.

## 9.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `number` | String | Sim | Número amigável do recibo ou pagamento. |
| `customerId` | UUID | Sim | Cliente que efetuou o pagamento. |
| `amount` | Decimal | Sim | Valor total recebido. |
| `paymentMethod` | PaymentMethod | Sim | Forma de pagamento. |
| `paidAt` | DateTime | Sim | Data e hora do pagamento. |
| `notes` | String | Não | Observações. |
| `createdById` | UUID | Sim | Usuário que registrou. |
| `canceledById` | UUID | Não | Usuário que cancelou. |
| `canceledAt` | DateTime | Não | Data de cancelamento. |
| `cancelReason` | String | Não | Motivo do cancelamento. |
| `createdAt` | DateTime | Sim | Data de criação. |
| `updatedAt` | DateTime | Sim | Data da última atualização. |

## 9.3 Enum PaymentMethod

```text
CASH
PIX
BANK_TRANSFER
CREDIT
OTHER
```

## 9.4 Regras

1. O valor deve ser maior que zero.
2. O número deve ser único.
3. Um pagamento pode ser distribuído entre vários pedidos.
4. Pagamentos cancelados não contam nos saldos.
5. O cancelamento exige motivo.
6. O pagamento deve pertencer ao mesmo cliente dos pedidos alocados.
7. No MVP, o valor não pode superar o débito total do cliente.
8. Pagamentos não devem ser apagados fisicamente.

---

# 10. Entidade PaymentAllocation

## 10.1 Responsabilidade

Representa a parcela de um pagamento aplicada a um pedido específico.

É a entidade que permite:

- um pedido receber vários pagamentos;
- um pagamento quitar vários pedidos.

## 10.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `paymentId` | UUID | Sim | Pagamento relacionado. |
| `orderId` | UUID | Sim | Pedido relacionado. |
| `amount` | Decimal | Sim | Valor aplicado ao pedido. |
| `createdAt` | DateTime | Sim | Data da alocação. |

## 10.3 Regras

1. O valor deve ser maior que zero.
2. A soma das alocações de um pagamento não pode superar seu valor.
3. A soma das alocações válidas de um pedido não pode superar o total do pedido.
4. Pagamento e pedido devem pertencer ao mesmo cliente.
5. O registro deve ser criado e validado dentro de transação.
6. A distribuição automática deve priorizar:
   1. vencidos mais antigos;
   2. em aberto mais antigos;
   3. mais recentes.
7. Cancelar o pagamento deve invalidar ou remover suas alocações dentro da mesma transação.

---

# 11. Entidade Document

## 11.1 Responsabilidade

Representa metadados de documentos gerados.

Esta entidade é opcional no MVP. Pode ser usada quando houver necessidade de persistir os arquivos ou controlar numeração e histórico.

## 11.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `number` | String | Sim | Número do documento. |
| `type` | DocumentType | Sim | Tipo do documento. |
| `orderId` | UUID | Não | Pedido relacionado. |
| `paymentId` | UUID | Não | Pagamento relacionado. |
| `fileUrl` | String | Não | URL do arquivo persistido. |
| `mimeType` | String | Não | Tipo do arquivo. |
| `generatedById` | UUID | Sim | Usuário que gerou. |
| `generatedAt` | DateTime | Sim | Data de geração. |
| `invalidatedAt` | DateTime | Não | Data de invalidação. |
| `createdAt` | DateTime | Sim | Data de criação. |

## 11.3 Enum DocumentType

```text
ORDER_RECEIPT
PAYMENT_RECEIPT
```

## 11.4 Regras

1. Um comprovante de pedido deve possuir `orderId`.
2. Um recibo de pagamento deve possuir `paymentId`.
3. Documento de pagamento cancelado deve ser marcado como inválido.
4. O sistema pode regenerar documentos a partir dos dados persistidos.
5. Caso os arquivos não sejam armazenados, a entidade pode ser omitida no primeiro release.

---

# 12. Entidade AuditLog

## 12.1 Responsabilidade

Registra ações críticas realizadas no sistema.

Esta entidade é recomendada para o MVP, especialmente por causa das regras financeiras.

## 12.2 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador único. |
| `userId` | UUID | Sim | Usuário responsável. |
| `action` | AuditAction | Sim | Tipo da ação. |
| `entityType` | String | Sim | Tipo da entidade afetada. |
| `entityId` | UUID | Sim | Identificador da entidade. |
| `metadata` | Json | Não | Dados complementares. |
| `createdAt` | DateTime | Sim | Data da ação. |

## 12.3 Enum AuditAction sugerido

```text
ORDER_CONFIRMED
ORDER_CANCELED
BELOW_MINIMUM_PRICE_USED
PAYMENT_CREATED
PAYMENT_CANCELED
PAYMENT_REALLOCATED
ENTITY_SOFT_DELETED
```

## 12.4 Regras

1. Logs de auditoria não devem ser alterados.
2. Não devem armazenar senhas, tokens ou dados sensíveis.
3. Devem ser criados para operações financeiras e comerciais críticas.

---

# 13. Campos calculados

Os campos abaixo não devem ser armazenados como fonte principal de verdade.

## 13.1 Customer

```text
totalPurchased
totalReceived
openBalance
overdueBalance
futureBalance
```

## 13.2 Order

```text
receivedAmount
remainingBalance
financialStatus
```

## 13.3 Payment

```text
allocatedAmount
unallocatedAmount
```

No MVP, recomenda-se exigir que todo valor do pagamento seja alocado antes da confirmação.

---

# 14. Entidades fora do MVP

As seguintes entidades não devem ser implementadas agora:

```text
Inventory
StockMovement
Ingredient
Recipe
RecipeVariation
ProductionBatch
FermentationLog
Supplier
Invoice
DeliveryRoute
CustomerCredit
Branch
Permission
RolePermission
```

---

# 15. Resumo das entidades do MVP

| Entidade | Obrigatória no MVP | Função |
|---|---:|---|
| `User` | Sim | Autenticação e autoria das ações. |
| `Customer` | Sim | Cadastro dos compradores B2B. |
| `Product` | Sim | Catálogo de produtos. |
| `CustomerProductPrice` | Sim | Preço específico por cliente. |
| `Order` | Sim | Pedido comercial. |
| `OrderItem` | Sim | Itens e snapshot da venda. |
| `Payment` | Sim | Valor recebido do cliente. |
| `PaymentAllocation` | Sim | Distribuição do pagamento. |
| `Document` | Opcional | Histórico de comprovantes. |
| `AuditLog` | Recomendado | Auditoria das ações críticas. |
