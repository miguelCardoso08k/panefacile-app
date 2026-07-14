# Pane Facile — Registro de Decisões do Projeto

> Documento de referência para manter consistência durante o desenvolvimento do MVP.
>
> **Última atualização:** 14/07/2026  
> **Escopo:** somente decisões já tomadas ou explicitamente adiadas para depois do MVP.

---

## 1. Visão do produto

### DEC-001 — O sistema será voltado para uma padaria B2B

**Status:** Decidido

A padaria vende exclusivamente para outros estabelecimentos, sem atendimento de balcão.

### Consequências

- o cliente do sistema representa um estabelecimento comercial;
- os fluxos principais são pedidos recorrentes, preços negociados e controle de débitos;
- recursos típicos de balcão, comandas e consumidor final não fazem parte do MVP.

---

### DEC-002 — O MVP será focado na gestão comercial e financeira

**Status:** Decidido

Os módulos prioritários do MVP são:

- clientes;
- produtos;
- preços personalizados;
- pedidos;
- pagamentos;
- financeiro;
- comprovantes;
- relatórios básicos.

### Consequências

O módulo inicialmente discutido de receitas, produção, ingredientes e fermentação não fará parte do primeiro lançamento.

---

### DEC-003 — O sistema será inicialmente utilizado por um administrador

**Status:** Decidido

No MVP haverá apenas um perfil de acesso:

```text
ADMIN
```

### Consequências

- não haverá cadastro público;
- não haverá sistema complexo de permissões;
- o primeiro administrador será criado por seed ou bootstrap seguro;
- a modelagem poderá ser expandida futuramente para funcionários.

---

## 2. Escopo do MVP

### DEC-004 — Funcionalidades incluídas no MVP

**Status:** Decidido

O MVP deve permitir:

1. autenticação do administrador;
2. cadastro e consulta de clientes;
3. cadastro e consulta de produtos;
4. preço padrão e preço mínimo;
5. preços personalizados por cliente;
6. criação e edição de pedidos;
7. repetição do último pedido;
8. repetição de qualquer pedido válido;
9. acompanhamento do status operacional;
10. pagamentos parciais e totais;
11. pagamento geral do débito do cliente;
12. distribuição de pagamentos entre pedidos;
13. valores recebidos, em aberto e vencidos;
14. comprovante de pedido;
15. recibo de pagamento;
16. compartilhamento como imagem;
17. geração de PDF;
18. relatórios financeiros básicos;
19. exclusão lógica das entidades apropriadas.

---

### DEC-005 — Funcionalidades fora do MVP

**Status:** Adiado

Não serão implementados no primeiro lançamento:

- estoque;
- movimentação de insumos;
- receitas;
- cálculo de ingredientes;
- registro de fornadas;
- fermentação;
- análise preditiva;
- Python para análise de dados;
- emissão fiscal;
- conciliação bancária;
- múltiplas filiais;
- portal do cliente;
- integração automática com WhatsApp;
- controle de rotas de entrega;
- funcionamento offline completo;
- crédito automático por pagamento excedente;
- permissões avançadas;
- impressão automática.

---

## 3. Tecnologias e arquitetura

### DEC-006 — Aplicativo em React Native com Expo

**Status:** Decidido

O aplicativo mobile será desenvolvido com:

- React Native;
- Expo;
- TypeScript.

### Motivo

A operação será feita principalmente pelo celular, e o Expo acelera o desenvolvimento, testes, builds e distribuição.

---

### DEC-007 — Backend em NestJS

**Status:** Decidido

A API será implementada com NestJS e TypeScript.

### Motivo

- padronização estrutural;
- modularidade;
- validação;
- facilidade de crescimento;
- compatibilidade com a experiência técnica já existente no projeto.

---

### DEC-008 — Prisma como ORM

**Status:** Decidido

O acesso ao banco será feito com Prisma ORM.

---

### DEC-009 — PostgreSQL como banco de dados

**Status:** Decidido

O banco relacional será PostgreSQL.

### Consequências

- relações e integridade serão priorizadas;
- valores monetários usarão `Decimal`;
- migrações serão versionadas;
- relatórios básicos serão feitos com consultas agregadas no banco.

---

### DEC-010 — Backend independente do aplicativo

**Status:** Decidido

A API não será acoplada ao React Native.

### Consequências

Será possível criar futuramente um painel em Next.js ou outro cliente sem reescrever as regras do domínio.

---

### DEC-011 — Monolito modular com DDD simplificado

**Status:** Decidido

O backend será um monolito modular.

Separações esperadas:

```text
domain
application
infrastructure
presentation
```

### Diretriz

Aplicar DDD de forma pragmática, sem criar abstrações desnecessárias.

---

### DEC-012 — API REST versionada

**Status:** Decidido

A comunicação será por REST e JSON.

Prefixo sugerido:

```text
/api/v1
```

A API deverá ser documentada com Swagger/OpenAPI.

---

## 4. Autenticação e segurança

### DEC-013 — Autenticação com JWT

**Status:** Decidido

Rotas privadas exigirão token válido.

### Consequências

- token com expiração;
- armazenamento seguro no aplicativo;
- senha armazenada com hash;
- credenciais e segredos fora do código-fonte.

---

### DEC-014 — O backend será a fonte de verdade

**Status:** Decidido

O aplicativo não será considerado confiável para cálculos críticos.

O backend deve calcular e validar:

- preços;
- subtotais;
- descontos;
- totais;
- saldos;
- status financeiros;
- alocações;
- transições de status.

---

## 5. Clientes

### DEC-015 — Cliente representa um estabelecimento

**Status:** Decidido

A entidade `Customer` representa mercados, lanchonetes, restaurantes e outros compradores B2B.

### Dados previstos

- nome fantasia;
- razão social;
- CPF/CNPJ;
- responsável;
- telefone;
- endereço;
- observações;
- limite de crédito;
- status ativo.

---

### DEC-016 — Cliente pode ser inativado

**Status:** Decidido

Cliente inativo:

- permanece no histórico;
- não pode receber novos pedidos;
- pode ser reativado.

---

### DEC-017 — Exclusão de cliente será lógica

**Status:** Decidido

A exclusão utilizará `deletedAt`.

Pedidos e pagamentos antigos devem permanecer íntegros.

---

### DEC-018 — Saldo do cliente será calculado

**Status:** Decidido

Não haverá um campo de saldo usado como fonte principal de verdade.

O saldo será derivado de:

- pedidos válidos;
- pagamentos válidos;
- alocações válidas.

---

## 6. Produtos e preços

### DEC-019 — Produto terá preço padrão e preço mínimo

**Status:** Decidido

Cada produto terá:

```text
defaultPrice
minimumPrice
```

---

### DEC-020 — Cliente pode ter preço personalizado por produto

**Status:** Decidido

Será usada uma entidade intermediária:

```text
CustomerProductPrice
```

### Ordem de resolução de preço

```text
1. preço personalizado ativo;
2. preço padrão do produto.
```

---

### DEC-021 — Produto não será duplicado por cliente

**Status:** Decidido

Produtos iguais não devem ser cadastrados várias vezes para representar preços diferentes.

A diferenciação será feita por `CustomerProductPrice`.

---

### DEC-022 — Preço abaixo do mínimo exige tratamento explícito

**Status:** Decidido

Quando o preço aplicado ficar abaixo do mínimo:

- o sistema deve alertar;
- o administrador deve confirmar;
- uma justificativa deve ser informada;
- o preço final deve ficar salvo no item do pedido;
- a ação deve ser auditável.

---

### DEC-023 — Pedidos antigos preservarão o preço usado

**Status:** Decidido

Alterar preço padrão ou personalizado não pode modificar pedidos antigos.

---

### DEC-024 — Produto terá exclusão lógica

**Status:** Decidido

Produto inativo ou excluído não pode ser usado em novos pedidos, mas continua aparecendo no histórico.

---

## 7. Pedidos

### DEC-025 — Pedido será a entidade operacional central

**Status:** Decidido

O pedido relacionará:

- cliente;
- itens;
- entrega;
- vencimento;
- status;
- totais;
- observações;
- pagamentos alocados.

---

### DEC-026 — Pedido será criado como rascunho

**Status:** Decidido

Status inicial:

```text
DRAFT
```

O administrador poderá revisar antes da confirmação.

---

### DEC-027 — Status operacionais do pedido

**Status:** Decidido

```text
DRAFT
CONFIRMED
IN_PRODUCTION
READY
DELIVERED
CANCELED
```

Fluxo principal:

```text
DRAFT
→ CONFIRMED
→ IN_PRODUCTION
→ READY
→ DELIVERED
```

---

### DEC-028 — Pedido terá número amigável

**Status:** Decidido

Exemplo:

```text
PED-2026-000143
```

O UUID será usado internamente.

---

### DEC-029 — Item do pedido armazenará snapshot

**Status:** Decidido

`OrderItem` deve salvar:

- referência ao produto;
- nome do produto;
- unidade;
- quantidade;
- preço unitário;
- subtotal;
- observações.

### Motivo

Preservar o histórico mesmo quando produto, unidade ou preço forem alterados.

---

### DEC-030 — Totais serão calculados no backend

**Status:** Decidido

Regras básicas:

```text
itemSubtotal = quantity × unitPrice
orderSubtotal = soma dos itens
orderTotal = orderSubtotal - discount
```

---

### DEC-031 — Pedido confirmado não será apagado

**Status:** Decidido

Pedidos confirmados devem ser cancelados, não excluídos.

A exclusão lógica ficará restrita principalmente a rascunhos criados por engano.

---

### DEC-032 — Cancelamento de pedido exige motivo

**Status:** Decidido

O cancelamento deve registrar:

- usuário;
- data;
- motivo.

Pedidos com pagamentos exigirão tratamento financeiro antes ou durante o cancelamento.

---

## 8. Repetição de pedidos

### DEC-033 — Repetir último pedido faz parte do MVP

**Status:** Decidido

A função será disponibilizada na ficha do cliente e em ações rápidas.

---

### DEC-034 — Também será possível repetir pedido específico

**Status:** Decidido

Cada pedido válido do histórico poderá ser usado como modelo.

---

### DEC-035 — Pedido repetido será criado como rascunho

**Status:** Decidido

O novo pedido nunca deve ser confirmado automaticamente.

---

### DEC-036 — Dados copiados na repetição

**Status:** Decidido

Copiar:

- cliente;
- produtos;
- quantidades;
- observações dos itens, quando aplicável.

Não copiar:

- número;
- pagamentos;
- recibos;
- status;
- datas antigas;
- motivo de cancelamento;
- situação financeira.

---

### DEC-037 — Repetição usará preços atuais

**Status:** Decidido

O sistema deve recalcular usando:

- preço personalizado atual;
- ou preço padrão atual.

### Consequências

A interface deve informar:

- preço anterior;
- preço atual;
- produtos inativos;
- produtos excluídos;
- alertas de preço abaixo do mínimo.

---

### DEC-038 — Pedido repetido guardará referência ao pedido original

**Status:** Decidido

A entidade `Order` poderá possuir:

```text
sourceOrderId
```

Isso permite rastrear a origem da repetição.

---

## 9. Pagamentos e financeiro

### DEC-039 — Pedido e pagamento são entidades diferentes

**Status:** Decidido

Não será utilizado apenas um campo `paid: true`.

### Motivo

Um pedido pode receber vários pagamentos e um pagamento pode quitar vários pedidos.

---

### DEC-040 — Pagamento pertence ao cliente

**Status:** Decidido

`Payment` terá `customerId`.

Não haverá vínculo obrigatório direto `Payment.orderId`.

---

### DEC-041 — Pagamentos serão relacionados aos pedidos por alocação

**Status:** Decidido

Será usada a entidade:

```text
PaymentAllocation
```

Ela conterá:

```text
paymentId
orderId
amount
```

---

### DEC-042 — Um pagamento pode quitar vários pedidos

**Status:** Decidido

Isso permite registrar pagamento referente ao débito total do cliente.

---

### DEC-043 — Um pedido pode receber vários pagamentos

**Status:** Decidido

Isso permite pagamentos parciais.

---

### DEC-044 — Haverá pagamento de pedido específico

**Status:** Decidido

Ao registrar pagamento dentro de um pedido, o sistema cria automaticamente uma alocação para ele.

---

### DEC-045 — Haverá pagamento geral do cliente

**Status:** Decidido

O administrador poderá registrar um pagamento sem selecionar previamente um pedido.

O sistema deverá:

1. listar os débitos;
2. sugerir uma distribuição;
3. permitir revisão;
4. permitir edição manual;
5. confirmar de forma transacional.

---

### DEC-046 — Distribuição automática seguirá os débitos mais antigos

**Status:** Decidido

Ordem padrão:

```text
1. pedidos vencidos mais antigos;
2. pedidos em aberto mais antigos;
3. pedidos mais recentes.
```

---

### DEC-047 — Distribuição poderá ser editada manualmente

**Status:** Decidido

O administrador poderá alterar quanto será aplicado em cada pedido antes de confirmar.

---

### DEC-048 — Pagamento acima do débito será bloqueado no MVP

**Status:** Decidido

O sistema não criará crédito automático para o cliente no primeiro lançamento.

---

### DEC-049 — Pagamentos poderão ser cancelados, não apagados

**Status:** Decidido

Cancelamento exige:

- motivo;
- usuário;
- data;
- invalidação das alocações;
- recálculo dos saldos.

---

### DEC-050 — Operações financeiras usarão transações

**Status:** Decidido

Devem ser transacionais:

- criação de pagamento;
- criação das alocações;
- redistribuição;
- cancelamento;
- auditoria relacionada.

---

### DEC-051 — Valores monetários usarão Decimal

**Status:** Decidido

Não utilizar `float` para dinheiro.

No Prisma/PostgreSQL:

```text
Decimal
NUMERIC(12,2)
```

---

### DEC-052 — Situação financeira será calculada

**Status:** Decidido

Estados previstos:

```text
OPEN
PARTIALLY_PAID
PAID
OVERDUE
CANCELED
```

A situação será derivada de:

- total do pedido;
- pagamentos alocados;
- vencimento;
- cancelamento.

---

## 10. Comprovantes

### DEC-053 — Haverá dois tipos de documento

**Status:** Decidido

1. comprovante de pedido;
2. recibo de pagamento.

---

### DEC-054 — O recibo geral mostrará a distribuição

**Status:** Decidido

Quando um pagamento quitar vários pedidos, o recibo deverá apresentar:

- pedidos relacionados;
- valor aplicado em cada pedido;
- saldo restante do cliente.

---

### DEC-055 — Documentos poderão ser compartilhados como imagem

**Status:** Decidido

O aplicativo usará o compartilhamento nativo do dispositivo.

---

### DEC-056 — Documentos poderão ser gerados em PDF

**Status:** Decidido

O usuário poderá salvar ou compartilhar o PDF.

---

### DEC-057 — Persistência de arquivos é opcional no primeiro release

**Status:** Decidido com implementação pendente

Os documentos podem ser gerados sob demanda a partir dos dados do banco.

A tabela `Document` só será necessária se houver exigência de:

- armazenar arquivo;
- manter histórico de geração;
- invalidar documento específico;
- controlar metadados.

---

## 11. Relatórios e dashboard

### DEC-058 — Dashboard exibirá informações operacionais e financeiras

**Status:** Decidido

Indicadores previstos:

- pedidos para entregar;
- pedidos em produção;
- pagamentos recebidos;
- recebido hoje;
- em aberto;
- vencido;
- próximas entregas.

---

### DEC-059 — Relatórios básicos fazem parte do MVP

**Status:** Decidido

Relatórios previstos:

- dinheiro recebido;
- valores a receber;
- valores vencidos;
- vendas por cliente;
- pedidos por período;
- pagamentos por forma.

---

### DEC-060 — Relatórios serão feitos no PostgreSQL/NestJS

**Status:** Decidido

Python não será utilizado no MVP.

### Motivo

As análises iniciais são agregações e consultas relacionais simples.

---

## 12. Aplicativo e experiência de uso

### DEC-061 — Navegação principal por barra inferior

**Status:** Decidido

Itens sugeridos:

```text
Início
Pedidos
Clientes
Produtos
Financeiro
```

Relatórios ficarão dentro de Financeiro.

---

### DEC-062 — O aplicativo será online no MVP

**Status:** Decidido

Não haverá sincronização offline completa.

### Mitigações

- preservar formulários não enviados localmente;
- impedir envio duplicado;
- mostrar estados de erro;
- permitir nova tentativa;
- usar idempotência em operações críticas.

---

### DEC-063 — Android será a prioridade inicial

**Status:** Decidido

O aplicativo deverá ser testado em dispositivos Android reais.

Compatibilidade com iOS será mantida quando não aumentar significativamente o escopo.

---

### DEC-064 — A interface deverá favorecer ações recorrentes

**Status:** Decidido

Ações rápidas importantes:

- novo pedido;
- repetir último pedido;
- registrar pagamento;
- gerar comprovante.

---

## 13. Identidade visual

### DEC-065 — A identidade da marca é inspirada na bandeira italiana

**Status:** Decidido

Cores institucionais mencionadas:

- verde;
- branco;
- vermelho;
- detalhes dourados.

---

### DEC-066 — Foram avaliadas múltiplas paletas

**Status:** Registrado

Paletas exploradas:

1. verde, vermelho e amarelo pastel;
2. verde profundo e dourado em fundo branco;
3. azul-marinho, dourado e vermelho;
4. neutra com verde e dourado.

---

### DEC-067 — Paleta final ainda não foi formalmente escolhida

**Status:** Pendente

Apesar dos protótipos, ainda deve ser confirmada uma única paleta oficial para implementação.

### Opção mais alinhada à marca original

```text
fundo branco ou marfim
verde profundo como primária
vermelho para alertas e ações destrutivas
dourado para destaque e branding
```

---

## 14. Banco de dados

### DEC-068 — Entidades obrigatórias do MVP

**Status:** Decidido

```text
User
Customer
Product
CustomerProductPrice
Order
OrderItem
Payment
PaymentAllocation
```

---

### DEC-069 — Entidades recomendadas ou opcionais

**Status:** Decidido

Recomendada:

```text
AuditLog
```

Opcional:

```text
Document
```

---

### DEC-070 — Foreign keys históricas não usarão cascade delete

**Status:** Decidido

Evitar `CASCADE DELETE` em:

- clientes;
- produtos;
- pedidos;
- pagamentos;
- itens;
- alocações.

Preferir:

```text
RESTRICT
NO ACTION
```

---

### DEC-071 — Exclusão lógica será usada onde necessário

**Status:** Decidido

Aplicar principalmente em:

- clientes;
- produtos;
- preços personalizados;
- pedidos em rascunho, quando permitido.

Não apagar fisicamente:

- pagamentos;
- alocações financeiras;
- pedidos confirmados;
- auditoria.

---

### DEC-072 — Listagens terão paginação

**Status:** Decidido

Clientes, produtos, pedidos e pagamentos deverão usar paginação ou carregamento incremental.

---

### DEC-073 — Operações críticas terão idempotência

**Status:** Decidido

Criação de pedidos e pagamentos deverá impedir duplicidade causada por:

- duplo toque;
- timeout;
- repetição de requisição;
- perda de conexão.

---

## 15. Qualidade e testes

### DEC-074 — Regras financeiras terão testes prioritários

**Status:** Decidido

Testar especialmente:

- resolução de preço;
- cálculo de totais;
- preço abaixo do mínimo;
- repetição de pedido;
- cálculo de saldo;
- situação financeira;
- distribuição automática;
- redistribuição manual;
- cancelamento de pagamento.

---

### DEC-075 — Haverá testes unitários, de integração e ponta a ponta

**Status:** Decidido

Fluxos críticos de ponta a ponta:

```text
cliente → pedido → confirmação → comprovante
```

```text
pedido → pagamento → recibo
```

```text
cliente → pagamento geral → distribuição → recibo
```

```text
pedido anterior → repetir → revisar preços → novo pedido
```

---

### DEC-076 — CI executará validações automáticas

**Status:** Decidido

O pipeline deverá executar:

- instalação;
- lint;
- checagem de tipos;
- testes;
- build.

---

## 16. Infraestrutura e operação

### DEC-077 — Ambientes serão separados

**Status:** Decidido

```text
development
staging
production
```

---

### DEC-078 — Banco de produção terá backup automático

**Status:** Decidido

Recomendação inicial:

- backup diário;
- retenção mínima de 7 dias;
- teste de restauração antes do lançamento.

---

### DEC-079 — Produção terá observabilidade mínima

**Status:** Decidido

Monitorar:

- disponibilidade da API;
- erros;
- latência;
- CPU;
- memória;
- conexões com o banco.

---

### DEC-080 — Hospedagem sugerida

**Status:** Preferência atual

- Railway ou equivalente para backend;
- PostgreSQL gerenciado;
- Expo/EAS para builds e distribuição;
- Docker Compose no desenvolvimento local.

A escolha final do provedor ainda pode ser alterada sem impacto no domínio.

---

## 17. Estrutura de implementação

### DEC-081 — Ordem de desenvolvimento

**Status:** Decidido

### Fase 1 — Base técnica

- NestJS;
- Prisma;
- PostgreSQL;
- React Native + Expo;
- autenticação;
- erros;
- Swagger;
- CI.

### Fase 2 — Cadastros

- clientes;
- produtos;
- preços personalizados.

### Fase 3 — Pedidos

- criação;
- itens;
- revisão;
- confirmação;
- status;
- repetição;
- cancelamento.

### Fase 4 — Financeiro

- pagamento de pedido;
- pagamento geral;
- distribuição;
- saldo;
- vencidos;
- cancelamento.

### Fase 5 — Documentos

- comprovantes;
- recibos;
- imagem;
- PDF;
- compartilhamento.

### Fase 6 — Dashboard e relatórios

- indicadores;
- listas;
- filtros;
- exportações necessárias.

### Fase 7 — Homologação e lançamento

- testes;
- correções;
- treinamento;
- backup;
- monitoramento;
- publicação.

---

## 18. Decisões ainda pendentes

Os pontos abaixo ainda precisam ser confirmados antes ou durante a implementação:

1. paleta oficial da interface;
2. unidades de venda realmente usadas;
3. obrigatoriedade e unicidade do CPF/CNPJ;
4. política exata para limite de crédito;
5. desconto global, por item ou ambos;
6. edição de pedidos após confirmação;
7. tratamento de cancelamento de pedido já pago;
8. persistência ou geração sob demanda dos documentos;
9. necessidade de histórico detalhado de status;
10. campos obrigatórios completos do cliente;
11. formato visual final dos comprovantes;
12. necessidade de exportação CSV;
13. política para preço padrão abaixo do preço mínimo;
14. provedor final de hospedagem;
15. compatibilidade oficial com iOS no lançamento.

---

## 19. Diretrizes que não devem ser quebradas pelo Codex

Ao gerar ou alterar código:

1. não usar `float` para dinheiro;
2. não confiar em totais enviados pelo aplicativo;
3. não colocar regras de negócio nos controllers;
4. usar transações nas operações financeiras;
5. preservar snapshots dos itens;
6. respeitar soft delete;
7. não apagar pagamentos fisicamente;
8. não vincular `Payment` diretamente a um único pedido;
9. usar `PaymentAllocation` para relacionar pagamentos e pedidos;
10. repetir pedidos usando preços atuais;
11. criar pedidos repetidos como rascunho;
12. impedir pagamentos superiores ao débito no MVP;
13. validar cliente e produto ativos;
14. manter histórico de cancelamentos;
15. evitar funcionalidades fora do MVP sem solicitação explícita;
16. escrever testes para regras críticas;
17. manter a API modular e versionada;
18. usar TypeScript estrito;
19. evitar abstrações desnecessárias;
20. priorizar consistência financeira e legibilidade.
