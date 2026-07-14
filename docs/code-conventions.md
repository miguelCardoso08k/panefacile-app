# Code Conventions

## Naming

- `camelCase` para variáveis, propriedades e métodos
- `PascalCase` para classes
- `snake_case` no banco de dados
- nomes de arquivos seguem um padrão descritivo por responsabilidade, como `create-user.use-case.ts` e `prisma-user.repository.ts`

## Estrutura Real dos Módulos

O projeto está organizado por domínio dentro de `src/modules`, com separação em três camadas principais:

```text
src/modules/<module>/
  application/
    dto/
    use-cases/
  domain/
    entities/
    enums/
    repositories/
  infrastructure/
    mappers/
    prisma-*.repository.ts
    *.controller.ts
  <module>.module.ts
```

## Responsabilidade de Cada Camada

### `application`

- concentra `use cases`
- recebe `DTOs` de entrada
- orquestra regras de negócio
- depende de contratos do domínio, não de Prisma diretamente

### `domain`

- define `entities`
- define `enums`
- define contratos de `repositories`
- não conhece NestJS, controller, HTTP ou Prisma

### `infrastructure`

- expõe `controllers`
- implementa `repositories` com Prisma
- faz conversão entre entidade, banco e resposta HTTP com `mappers`

## Padrão de Injeção de Dependência

Os módulos registram o contrato abstrato do repositório no `providers` e ligam esse contrato à implementação com Prisma.

Exemplo conceitual:

```ts
{ provide: UserRepository, useClass: PrismaUserRepository }
```

Isso permite que os `use cases` dependam do contrato do domínio em vez da implementação concreta.

## Padrão de Fluxo Atual

O fluxo real implementado hoje segue esta linha:

1. `Controller` recebe a request
2. `DTO` valida o payload
3. `Use case` executa a regra de negócio
4. `Repository` persiste ou consulta dados
5. `Mapper` converte para retorno HTTP

## DTOs e Validação

- a validação usa `class-validator`
- existe `ValidationPipe` global no `main.ts`
- o projeto usa:
  - `whitelist: true`
  - `transform: true`
  - `forbidNonWhitelisted: true`

## Regras

- nunca acessar Prisma direto fora do `repository`
- `use cases` concentram a lógica de aplicação
- `controllers` devem permanecer finos
- `mappers` fazem a tradução entre camadas
- nunca confiar no frontend para segurança
