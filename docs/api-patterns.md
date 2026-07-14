# API Patterns

## REST

GET /conversations
POST /messages
PATCH /conversations/:id

## Resposta padrão oficial

Nos módulos atuais, os `controllers` retornam principalmente:

```json
{
  "message": "User created successfully",
  "data": {}
}
```

Ou, em operações sem payload:

```json
{
  "message": "User deleted successfully"
}
```

Quando não houver payload, o retorno pode conter apenas `message`.

Esse é o padrão oficial do projeto.

## Erros

- 400 → validação
- 401 → não autenticado
- 403 → sem permissão
- 404 → não encontrado
