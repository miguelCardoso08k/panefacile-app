# Commit Pattern

O historico atual do projeto segue um padrao simples no estilo Conventional Commits:

```text
tipo: descricao curta
```

## Regras

- Use o tipo em minusculas.
- Escreva a descricao em ingles.
- Comece a descricao com verbo no imperativo.
- Mantenha o titulo curto e objetivo.
- Nao use ponto final no assunto do commit.
- Evite misturar mudancas de natureza diferente no mesmo commit.

## Tipos usados e recomendados

- `feat`: nova funcionalidade ou comportamento novo no sistema
- `fix`: correcao de bug
- `chore`: ajustes de infraestrutura, configuracao, geracao de codigo e manutencao
- `docs`: documentacao
- `test`: testes novos ou ajustes em testes
- `refactor`: reorganizacao interna sem alterar comportamento esperado

## Exemplos alinhados ao historico

- `feat: add business hours entity`
- `chore: document domain entities and add initial prisma schema`
- `chore: bootstrap initial backend structure`

## Como separar commits

- Um commit para documentacao
- Um commit para schema, migrations e cliente gerado do Prisma
- Um commit para modulos ou endpoints novos
- Um commit separado para correcao pontual de bug, quando aplicavel
