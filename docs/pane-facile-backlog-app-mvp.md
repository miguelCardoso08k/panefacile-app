# Pane Facile — Backlog do Aplicativo Mobile (MVP)

> Backlog exclusivo do aplicativo React Native + Expo.
>
> **Escopo:** somente o MVP  
> **Stack:** React Native, Expo e TypeScript  
> **Status sugeridos:** `TODO`, `IN_PROGRESS`, `BLOCKED`, `REVIEW`, `DONE`

---

# 1. Convenções

## Prioridades

- `P0` — bloqueia o lançamento;
- `P1` — essencial para o MVP;
- `P2` — importante, mas pode ser entregue logo após;
- `P3` — melhoria futura.

## Dependências externas

O aplicativo depende da API para:

- autenticação;
- clientes;
- produtos;
- preços personalizados;
- pedidos;
- repetição de pedidos;
- pagamentos;
- relatórios;
- dados dos comprovantes.

---

# 2. Épico APP-01 — Base do projeto

## APP-001 — Criar projeto Expo

**Prioridade:** P0  
**Status:** TODO

### Critérios de aceitação

- [ ] Projeto inicia em ambiente local.
- [ ] Aplicativo abre no Android.
- [ ] Estrutura inicial documentada.
- [ ] Nome e identificadores do aplicativo definidos.

---

## APP-002 — Configurar TypeScript estrito

**Prioridade:** P0  
**Dependências:** APP-001  
**Status:** TODO

### Critérios de aceitação

- [ ] Modo estrito habilitado.
- [ ] Sem uso desnecessário de `any`.
- [ ] Aliases de importação configurados.
- [ ] Typecheck executável por comando.

---

## APP-003 — Organizar estrutura de pastas

**Prioridade:** P0  
**Dependências:** APP-001  
**Status:** TODO

Estrutura sugerida:

```text
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── customers/
│   ├── products/
│   ├── pricing/
│   ├── orders/
│   ├── payments/
│   ├── finance/
│   └── documents/
├── hooks/
├── services/
├── store/
├── theme/
├── types/
├── utils/
└── validation/
```

---

## APP-004 — Configurar variáveis de ambiente

**Prioridade:** P0  
**Dependências:** APP-001  
**Status:** TODO

Variáveis previstas:

```text
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_APP_ENV
```

### Critérios de aceitação

- [ ] Desenvolvimento e produção usam URLs diferentes.
- [ ] Arquivo de exemplo criado.
- [ ] Nenhum segredo sensível incluído no bundle.

---

## APP-005 — Configurar lint e formatação

**Prioridade:** P0  
**Dependências:** APP-001  
**Status:** TODO

### Critérios de aceitação

- [ ] ESLint funcionando.
- [ ] Prettier funcionando.
- [ ] Scripts adicionados.
- [ ] CI consegue executar as validações.

---

# 3. Épico APP-02 — Navegação

## APP-010 — Configurar navegação principal

**Prioridade:** P0  
**Dependências:** APP-001  
**Status:** TODO

Barra inferior:

```text
Início
Pedidos
Clientes
Produtos
Financeiro
```

---

## APP-011 — Configurar fluxo autenticado e não autenticado

**Prioridade:** P0  
**Dependências:** APP-010  
**Status:** TODO

### Critérios de aceitação

- [ ] Usuário não autenticado vê login.
- [ ] Usuário autenticado vê o app.
- [ ] Logout remove a sessão e retorna ao login.
- [ ] Redirecionamentos não causam loops.

---

## APP-012 — Configurar cabeçalhos e navegação interna

**Prioridade:** P1  
**Dependências:** APP-010  
**Status:** TODO

---

## APP-013 — Preservar navegação ao retornar de modais

**Prioridade:** P1  
**Dependências:** APP-010  
**Status:** TODO

---

# 4. Épico APP-03 — Design system

## APP-020 — Definir paleta oficial

**Prioridade:** P0  
**Status:** TODO

Paleta recomendada:

- fundo branco ou marfim;
- verde profundo como primária;
- dourado como destaque;
- vermelho real para alertas;
- cinzas neutros.

### Critérios de aceitação

- [ ] Paleta aprovada.
- [ ] Tokens documentados.
- [ ] Contraste revisado.

---

## APP-021 — Definir tipografia

**Prioridade:** P1  
**Dependências:** APP-020  
**Status:** TODO

---

## APP-022 — Criar componentes base

**Prioridade:** P0  
**Dependências:** APP-020  
**Status:** TODO

Componentes mínimos:

- botão;
- input;
- textarea;
- select;
- card;
- badge de status;
- modal;
- confirmação;
- lista;
- loading;
- empty state;
- error state;
- toast;
- divisor;
- cabeçalho;
- botão de ação flutuante, se necessário.

---

## APP-023 — Criar componentes financeiros

**Prioridade:** P1  
**Dependências:** APP-022  
**Status:** TODO

Componentes:

- campo monetário;
- resumo de saldo;
- linha de alocação;
- card de pagamento;
- status financeiro;
- totalizador.

---

## APP-024 — Criar componentes de pedidos

**Prioridade:** P1  
**Dependências:** APP-022  
**Status:** TODO

Componentes:

- item de pedido;
- seletor de produto;
- campo de quantidade;
- resumo do pedido;
- chip de status;
- aviso de mudança de preço.

---

# 5. Épico APP-04 — Cliente HTTP e estado remoto

## APP-030 — Configurar cliente HTTP

**Prioridade:** P0  
**Dependências:** APP-004  
**Status:** TODO

### Critérios de aceitação

- [ ] Base URL por ambiente.
- [ ] Timeout configurado.
- [ ] Headers comuns centralizados.
- [ ] Erros normalizados.
- [ ] Token enviado automaticamente.

---

## APP-031 — Configurar gerenciamento de cache remoto

**Prioridade:** P0  
**Dependências:** APP-030  
**Status:** TODO

Usar biblioteca adequada para:

- cache;
- revalidação;
- loading;
- retry controlado;
- invalidação após mutações.

---

## APP-032 — Criar tipos compartilhados da API

**Prioridade:** P0  
**Dependências:** APP-030  
**Status:** TODO

### Critérios de aceitação

- [ ] Tipos de request e response definidos.
- [ ] Enums sincronizados com a API.
- [ ] Erros da API tipados.

---

## APP-033 — Criar tratamento global de erro

**Prioridade:** P0  
**Dependências:** APP-030  
**Status:** TODO

### Critérios de aceitação

- [ ] Mensagens amigáveis.
- [ ] Erros de validação exibidos nos campos.
- [ ] Erro de sessão expirada tratado.
- [ ] Possibilidade de nova tentativa.

---

# 6. Épico APP-05 — Autenticação

## APP-040 — Criar tela de login

**Prioridade:** P0  
**Dependências:** APP-011, APP-022  
**Status:** TODO

Campos:

- e-mail;
- senha.

### Critérios de aceitação

- [ ] Validação local.
- [ ] Estado de carregamento.
- [ ] Mensagem de erro.
- [ ] Botão desabilitado durante envio.

---

## APP-041 — Integrar login com a API

**Prioridade:** P0  
**Dependências:** APP-040, APP-030  
**Status:** TODO

---

## APP-042 — Armazenar token com segurança

**Prioridade:** P0  
**Dependências:** APP-041  
**Status:** TODO

---

## APP-043 — Restaurar sessão ao abrir o app

**Prioridade:** P0  
**Dependências:** APP-042  
**Status:** TODO

---

## APP-044 — Implementar logout

**Prioridade:** P0  
**Dependências:** APP-042  
**Status:** TODO

---

## APP-045 — Criar tela de perfil

**Prioridade:** P2  
**Dependências:** APP-041  
**Status:** TODO

---

# 7. Épico APP-06 — Dashboard

## APP-050 — Criar tela inicial

**Prioridade:** P0  
**Dependências:** APP-022, APP-031  
**Status:** TODO

Exibir:

- pedidos para entregar;
- pedidos em produção;
- pagamentos recebidos;
- recebido hoje;
- em aberto;
- vencido;
- próximas entregas.

---

## APP-051 — Criar ações rápidas

**Prioridade:** P0  
**Dependências:** APP-050  
**Status:** TODO

Ações:

- novo pedido;
- repetir último pedido;
- registrar pagamento.

---

## APP-052 — Criar estados vazio, loading e erro do dashboard

**Prioridade:** P0  
**Dependências:** APP-050  
**Status:** TODO

---

# 8. Épico APP-07 — Clientes

## APP-060 — Criar lista de clientes

**Prioridade:** P0  
**Dependências:** APP-031  
**Status:** TODO

### Critérios de aceitação

- [ ] Busca por nome.
- [ ] Busca por telefone.
- [ ] Paginação ou carregamento incremental.
- [ ] Saldo em aberto visível.
- [ ] Empty state.

---

## APP-061 — Criar cadastro de cliente

**Prioridade:** P0  
**Dependências:** APP-022  
**Status:** TODO

Campos previstos:

- nome fantasia;
- razão social;
- documento;
- responsável;
- telefone;
- e-mail;
- endereço;
- limite de crédito;
- observações.

---

## APP-062 — Criar edição de cliente

**Prioridade:** P0  
**Dependências:** APP-061  
**Status:** TODO

---

## APP-063 — Criar detalhes do cliente

**Prioridade:** P0  
**Dependências:** APP-060  
**Status:** TODO

Exibir:

- cadastro;
- saldo em aberto;
- vencido;
- último pedido;
- histórico;
- preços personalizados;
- observações.

Ações:

- novo pedido;
- repetir último pedido;
- registrar pagamento;
- editar cliente.

---

## APP-064 — Criar ação de inativar cliente

**Prioridade:** P1  
**Dependências:** APP-063  
**Status:** TODO

---

## APP-065 — Criar ação de exclusão lógica

**Prioridade:** P1  
**Dependências:** APP-063  
**Status:** TODO

---

# 9. Épico APP-08 — Produtos

## APP-070 — Criar lista de produtos

**Prioridade:** P0  
**Dependências:** APP-031  
**Status:** TODO

Exibir:

- nome;
- unidade;
- preço padrão;
- preço mínimo;
- status;
- imagem opcional.

---

## APP-071 — Criar cadastro de produto

**Prioridade:** P0  
**Dependências:** APP-022  
**Status:** TODO

---

## APP-072 — Criar edição de produto

**Prioridade:** P0  
**Dependências:** APP-071  
**Status:** TODO

---

## APP-073 — Criar ação de inativar produto

**Prioridade:** P1  
**Dependências:** APP-072  
**Status:** TODO

---

## APP-074 — Criar ação de exclusão lógica

**Prioridade:** P1  
**Dependências:** APP-072  
**Status:** TODO

---

# 10. Épico APP-09 — Preços personalizados

## APP-080 — Criar tela de preços por cliente

**Prioridade:** P0  
**Dependências:** APP-063, APP-070  
**Status:** TODO

---

## APP-081 — Criar formulário de preço personalizado

**Prioridade:** P0  
**Dependências:** APP-080  
**Status:** TODO

### Critérios de aceitação

- [ ] Seleção de produto.
- [ ] Campo monetário.
- [ ] Comparação com preço mínimo.
- [ ] Justificativa quando necessário.
- [ ] Confirmação explícita.

---

## APP-082 — Criar remoção de preço personalizado

**Prioridade:** P0  
**Dependências:** APP-080  
**Status:** TODO

---

## APP-083 — Exibir preço personalizado durante criação de pedido

**Prioridade:** P0  
**Dependências:** APP-081, APP-100  
**Status:** TODO

---

# 11. Épico APP-10 — Pedidos

## APP-090 — Criar lista de pedidos

**Prioridade:** P0  
**Dependências:** APP-031  
**Status:** TODO

Filtros:

- período;
- cliente;
- status;
- entrega;
- situação financeira.

---

## APP-091 — Criar detalhes do pedido

**Prioridade:** P0  
**Dependências:** APP-090  
**Status:** TODO

Exibir:

- número;
- cliente;
- itens;
- totais;
- status;
- saldo;
- pagamentos;
- observações.

---

## APP-092 — Criar fluxo de novo pedido

**Prioridade:** P0  
**Dependências:** APP-022, APP-060, APP-070  
**Status:** TODO

Etapas:

1. selecionar cliente;
2. adicionar produtos;
3. informar quantidades;
4. revisar preços;
5. definir entrega;
6. definir vencimento;
7. incluir observações;
8. revisar.

---

## APP-093 — Criar seletor de cliente

**Prioridade:** P0  
**Dependências:** APP-060  
**Status:** TODO

---

## APP-094 — Criar seletor de produto

**Prioridade:** P0  
**Dependências:** APP-070  
**Status:** TODO

---

## APP-095 — Criar edição de itens

**Prioridade:** P0  
**Dependências:** APP-092  
**Status:** TODO

### Critérios de aceitação

- [ ] Alterar quantidade.
- [ ] Remover item.
- [ ] Editar observação.
- [ ] Exibir preço aplicado.
- [ ] Exibir subtotal.

---

## APP-096 — Criar revisão do pedido

**Prioridade:** P0  
**Dependências:** APP-092  
**Status:** TODO

Exibir:

- itens;
- preços;
- subtotal;
- desconto;
- total;
- entrega;
- vencimento;
- alertas.

---

## APP-097 — Salvar rascunho

**Prioridade:** P0  
**Dependências:** APP-096  
**Status:** TODO

---

## APP-098 — Confirmar pedido

**Prioridade:** P0  
**Dependências:** APP-096  
**Status:** TODO

---

## APP-099 — Alterar status do pedido

**Prioridade:** P0  
**Dependências:** APP-091  
**Status:** TODO

---

## APP-100 — Cancelar pedido

**Prioridade:** P0  
**Dependências:** APP-091  
**Status:** TODO

### Critérios de aceitação

- [ ] Confirmação.
- [ ] Motivo obrigatório.
- [ ] Alerta quando houver pagamentos.

---

## APP-101 — Preservar pedido não enviado localmente

**Prioridade:** P1  
**Dependências:** APP-092  
**Status:** TODO

---

## APP-102 — Impedir duplo envio

**Prioridade:** P0  
**Dependências:** APP-097, APP-098  
**Status:** TODO

---

# 12. Épico APP-11 — Repetição de pedidos

## APP-110 — Criar ação repetir último pedido

**Prioridade:** P0  
**Dependências:** APP-063, APP-092  
**Status:** TODO

---

## APP-111 — Criar ação repetir pedido específico

**Prioridade:** P0  
**Dependências:** APP-091  
**Status:** TODO

---

## APP-112 — Criar tela de prévia da repetição

**Prioridade:** P0  
**Dependências:** APP-110  
**Status:** TODO

Exibir:

- produto;
- quantidade;
- preço anterior;
- preço atual;
- mudança de preço;
- produto inativo;
- produto excluído;
- alerta de mínimo.

---

## APP-113 — Permitir corrigir itens inválidos

**Prioridade:** P0  
**Dependências:** APP-112  
**Status:** TODO

---

## APP-114 — Criar novo rascunho a partir da repetição

**Prioridade:** P0  
**Dependências:** APP-112  
**Status:** TODO

---

# 13. Épico APP-12 — Pagamentos

## APP-120 — Criar tela de pagamento de pedido

**Prioridade:** P0  
**Dependências:** APP-091  
**Status:** TODO

Exibir:

- total;
- já recebido;
- saldo;
- valor;
- forma;
- data;
- observação.

---

## APP-121 — Criar tela de pagamento geral do cliente

**Prioridade:** P0  
**Dependências:** APP-063  
**Status:** TODO

---

## APP-122 — Exibir débitos do cliente

**Prioridade:** P0  
**Dependências:** APP-121  
**Status:** TODO

---

## APP-123 — Exibir distribuição automática

**Prioridade:** P0  
**Dependências:** APP-122  
**Status:** TODO

---

## APP-124 — Permitir edição manual da distribuição

**Prioridade:** P0  
**Dependências:** APP-123  
**Status:** TODO

### Critérios de aceitação

- [ ] Valor aplicado por pedido.
- [ ] Valor restante visível.
- [ ] Erros claros.
- [ ] Confirmação bloqueada em inconsistência.

---

## APP-125 — Confirmar pagamento

**Prioridade:** P0  
**Dependências:** APP-120 ou APP-124  
**Status:** TODO

---

## APP-126 — Preservar formulário de pagamento localmente

**Prioridade:** P1  
**Dependências:** APP-120, APP-121  
**Status:** TODO

---

## APP-127 — Cancelar pagamento

**Prioridade:** P0  
**Dependências:** APP-091 ou APP-165  
**Status:** TODO

---

# 14. Épico APP-13 — Financeiro e relatórios

## APP-130 — Criar tela financeira

**Prioridade:** P0  
**Dependências:** APP-031  
**Status:** TODO

Abas ou seções:

```text
Recebidos
A receber
Vencidos
```

---

## APP-131 — Exibir resumo financeiro

**Prioridade:** P0  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-132 — Criar filtros por período

**Prioridade:** P0  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-133 — Criar relatório de recebido

**Prioridade:** P0  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-134 — Criar relatório de valores a receber

**Prioridade:** P0  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-135 — Criar relatório de vencidos

**Prioridade:** P0  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-136 — Criar relatório por cliente

**Prioridade:** P1  
**Dependências:** APP-130  
**Status:** TODO

---

## APP-137 — Criar relatório por forma de pagamento

**Prioridade:** P1  
**Dependências:** APP-130  
**Status:** TODO

---

# 15. Épico APP-14 — Comprovantes

## APP-140 — Criar visualização de comprovante de pedido

**Prioridade:** P0  
**Dependências:** APP-091  
**Status:** TODO

---

## APP-141 — Criar visualização de recibo

**Prioridade:** P0  
**Dependências:** APP-125  
**Status:** TODO

---

## APP-142 — Gerar imagem do comprovante

**Prioridade:** P0  
**Dependências:** APP-140, APP-141  
**Status:** TODO

---

## APP-143 — Gerar ou baixar PDF

**Prioridade:** P0  
**Dependências:** APP-140, APP-141  
**Status:** TODO

---

## APP-144 — Compartilhar documento

**Prioridade:** P0  
**Dependências:** APP-142, APP-143  
**Status:** TODO

---

## APP-145 — Tratar documento invalidado

**Prioridade:** P1  
**Dependências:** APP-127, APP-141  
**Status:** TODO

---

# 16. Épico APP-15 — Testes

## APP-150 — Configurar testes de componentes

**Prioridade:** P1  
**Status:** TODO

---

## APP-151 — Testar autenticação

**Prioridade:** P0  
**Dependências:** APP-040 a APP-044  
**Status:** TODO

---

## APP-152 — Testar formulários de cliente e produto

**Prioridade:** P1  
**Dependências:** APP-061, APP-071  
**Status:** TODO

---

## APP-153 — Testar criação de pedido

**Prioridade:** P0  
**Dependências:** APP-092 a APP-102  
**Status:** TODO

---

## APP-154 — Testar repetição de pedido

**Prioridade:** P0  
**Dependências:** APP-110 a APP-114  
**Status:** TODO

---

## APP-155 — Testar pagamento específico

**Prioridade:** P0  
**Dependências:** APP-120, APP-125  
**Status:** TODO

---

## APP-156 — Testar pagamento geral

**Prioridade:** P0  
**Dependências:** APP-121 a APP-125  
**Status:** TODO

---

## APP-157 — Testar compartilhamento

**Prioridade:** P0  
**Dependências:** APP-142 a APP-144  
**Status:** TODO

---

## APP-158 — Testar em Android real

**Prioridade:** P0  
**Dependências:** fluxos concluídos  
**Status:** TODO

---

## APP-159 — Revisar acessibilidade

**Prioridade:** P1  
**Dependências:** telas concluídas  
**Status:** TODO

---

# 17. Épico APP-16 — Build e distribuição

## APP-160 — Configurar EAS

**Prioridade:** P0  
**Status:** TODO

---

## APP-161 — Configurar perfis de build

**Prioridade:** P0  
**Dependências:** APP-160  
**Status:** TODO

Perfis:

```text
development
preview
production
```

---

## APP-162 — Gerar build de homologação

**Prioridade:** P0  
**Dependências:** APP-161  
**Status:** TODO

---

## APP-163 — Corrigir problemas do build real

**Prioridade:** P0  
**Dependências:** APP-162  
**Status:** TODO

---

## APP-164 — Gerar build de produção

**Prioridade:** P0  
**Dependências:** homologação aprovada  
**Status:** TODO

---

## APP-165 — Criar documentação de instalação

**Prioridade:** P1  
**Dependências:** APP-164  
**Status:** TODO

---

# 18. Checklist de entrega do aplicativo

## Base

- [ ] Expo configurado.
- [ ] TypeScript estrito.
- [ ] Navegação funcionando.
- [ ] Cliente HTTP funcionando.
- [ ] Sessão segura.
- [ ] Design system consistente.

## Telas

- [ ] Login.
- [ ] Dashboard.
- [ ] Clientes.
- [ ] Produtos.
- [ ] Preços personalizados.
- [ ] Pedidos.
- [ ] Repetição.
- [ ] Pagamento específico.
- [ ] Pagamento geral.
- [ ] Financeiro.
- [ ] Relatórios.
- [ ] Comprovantes.

## UX

- [ ] Loadings.
- [ ] Empty states.
- [ ] Erros.
- [ ] Confirmações.
- [ ] Proteção contra duplo envio.
- [ ] Formulários preservados.
- [ ] Acessibilidade básica.

## Entrega

- [ ] Testado em Android real.
- [ ] Build de homologação aprovado.
- [ ] Build de produção gerado.
- [ ] Manual de uso criado.
- [ ] Cliente treinado.
