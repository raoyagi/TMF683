# Exemplos Práticos de Testes - TMF683

Este documento fornece exemplos práticos e passo-a-passo para testar o microsserviço TMF683.

## Exemplo 1: Testar Criação de Party Interaction

### Objetivo

Criar uma nova interação de cliente e verificar que o evento foi publicado.

### Passo-a-Passo

#### 1. Abrir Terminal

```bash
cd /home/ubuntu/tmf683-party-interaction
```

#### 2. Criar a Interação via cURL

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Cliente chamou sobre problemas de conexão",
    "type": "inbound",
    "channelName": "phone",
    "interactionDate": "2026-02-16T18:00:00Z",
    "involvedParties": [
      {
        "id": "cust-001",
        "name": "Ana Silva",
        "role": "customer"
      },
      {
        "id": "agent-001",
        "name": "Carlos Santos",
        "role": "agent"
      }
    ]
  }'
```

#### 3. Verificar Resposta

Você deve receber algo como:

```json
{
  "result": {
    "data": {
      "id": "int-20260216-001",
      "href": "/partyInteraction/int-20260216-001",
      "description": "Cliente chamou sobre problemas de conexão",
      "type": "inbound",
      "status": "active",
      "interactionDate": "2026-02-16T18:00:00Z",
      "channelName": "phone",
      "involvedParties": [
        {
          "id": "cust-001",
          "name": "Ana Silva",
          "role": "customer"
        },
        {
          "id": "agent-001",
          "name": "Carlos Santos",
          "role": "agent"
        }
      ],
      "createdAt": "2026-02-16T18:30:45.123Z"
    }
  }
}
```

#### 4. Verificar Evento Publicado

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getEventHistory?input={}
```

Você deve ver um evento `PartyInteractionCreatedEvent` com os dados da interação criada.

### ✅ Teste Passou Se

- A resposta contém um `id` único
- O `status` é `active`
- O `createdAt` está preenchido
- Há um evento `PartyInteractionCreatedEvent` no histórico

---

## Exemplo 2: Testar Listagem com Paginação

### Objetivo

Listar interações com paginação e verificar que os dados estão corretos.

### Passo-a-Passo

#### 1. Listar Primeiras 5 Interações

```bash
curl "http://localhost:3000/api/trpc/partyInteraction.list?input={\"offset\":0,\"limit\":5}"
```

#### 2. Verificar Resposta

```json
{
  "result": {
    "data": [
      {
        "id": "int-20260216-001",
        "description": "Cliente chamou sobre problemas de conexão",
        "type": "inbound",
        "status": "active",
        ...
      },
      {
        "id": "int-20260216-002",
        "description": "Solicitação de mudança de plano",
        ...
      }
    ],
    "offset": 0,
    "limit": 5
  }
}
```

#### 3. Listar Próximas 5 Interações

```bash
curl "http://localhost:3000/api/trpc/partyInteraction.list?input={\"offset\":5,\"limit\":5}"
```

### ✅ Teste Passou Se

- A resposta contém um array de interações
- Cada interação tem `id`, `description`, `type`, `status`
- O `offset` e `limit` correspondem aos parâmetros enviados
- Há no máximo 5 itens na resposta

---

## Exemplo 3: Testar Atualização de Status

### Objetivo

Atualizar o status de uma interação de "active" para "completed".

### Passo-a-Passo

#### 1. Obter ID de uma Interação

```bash
curl "http://localhost:3000/api/trpc/partyInteraction.list?input={\"offset\":0,\"limit\":1}"
```

Copie o `id` da primeira interação (ex: `int-20260216-001`).

#### 2. Atualizar Status

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.update \
  -H "Content-Type: application/json" \
  -d '{
    "id": "int-20260216-001",
    "data": {
      "status": "completed",
      "description": "Cliente chamou sobre problemas de conexão - RESOLVIDO"
    }
  }'
```

#### 3. Verificar Resposta

```json
{
  "result": {
    "data": {
      "id": "int-20260216-001",
      "status": "completed",
      "description": "Cliente chamou sobre problemas de conexão - RESOLVIDO",
      "updatedAt": "2026-02-16T18:35:00.000Z",
      ...
    }
  }
}
```

#### 4. Verificar Evento de Atualização

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getEventHistory?input={}
```

Você deve ver um evento `PartyInteractionUpdatedEvent`.

### ✅ Teste Passou Se

- O `status` foi alterado para `completed`
- A `description` foi atualizada
- O `updatedAt` foi preenchido
- Há um evento `PartyInteractionUpdatedEvent` no histórico

---

## Exemplo 4: Testar Deleção

### Objetivo

Deletar uma interação e verificar que o evento foi publicado.

### Passo-a-Passo

#### 1. Obter ID de uma Interação

```bash
curl "http://localhost:3000/api/trpc/partyInteraction.list?input={\"offset\":0,\"limit\":1}"
```

Copie o `id` (ex: `int-20260216-001`).

#### 2. Deletar Interação

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.delete \
  -H "Content-Type: application/json" \
  -d '{"id":"int-20260216-001"}'
```

#### 3. Verificar Resposta

```json
{
  "result": {
    "data": {
      "success": true
    }
  }
}
```

#### 4. Verificar que Não Existe Mais

```bash
curl "http://localhost:3000/api/trpc/partyInteraction.getById?input={\"id\":\"int-20260216-001\"}"
```

Você deve receber um erro indicando que a interação não foi encontrada.

#### 5. Verificar Evento de Deleção

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getEventHistory?input={}
```

Você deve ver um evento `PartyInteractionDeletedEvent`.

### ✅ Teste Passou Se

- A resposta contém `"success": true`
- Tentar obter a interação deletada retorna erro
- Há um evento `PartyInteractionDeletedEvent` no histórico

---

## Exemplo 5: Testar Validação de Entrada

### Objetivo

Verificar que o sistema rejeita dados inválidos.

### Passo-a-Passo

#### 1. Tentar Criar com Descrição Vazia

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "",
    "type": "inbound",
    "channelName": "phone",
    "interactionDate": "2026-02-16T18:00:00Z",
    "involvedParties": []
  }'
```

Você deve receber um erro de validação.

#### 2. Tentar Criar com Tipo Inválido

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Teste",
    "type": "invalid_type",
    "channelName": "phone",
    "interactionDate": "2026-02-16T18:00:00Z",
    "involvedParties": []
  }'
```

Você deve receber um erro indicando tipo inválido.

#### 3. Tentar Criar com Data Inválida

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Teste",
    "type": "inbound",
    "channelName": "phone",
    "interactionDate": "data-invalida",
    "involvedParties": []
  }'
```

Você deve receber um erro de validação de data.

### ✅ Teste Passou Se

- Todas as requisições inválidas retornam erro
- Os erros descrevem o problema (ex: "description is required")
- Nenhuma interação inválida foi criada

---

## Exemplo 6: Testar E2E Completo via UI

### Objetivo

Testar o fluxo completo através da interface web.

### Passo-a-Passo

#### 1. Abrir Navegador

Abra seu navegador e acesse:

```
http://localhost:3000/
```

#### 2. Verificar Página Inicial

- [ ] Título "TMF683 Party Interaction Management" está visível
- [ ] 6 abas estão presentes: Visão Geral, Arquitetura, Documentação, API Tester, Eventos, Glossário
- [ ] Cards de funcionalidades estão visíveis

#### 3. Testar Navegação

- [ ] Clique em "Documentação" - deve exibir conteúdo educacional
- [ ] Clique em "Arquitetura" - deve exibir diagramas C4 Model
- [ ] Clique em "Glossário" - deve exibir lista de termos
- [ ] Clique em "Eventos" - deve exibir monitor de eventos
- [ ] Clique em "Visão Geral" - deve voltar para página inicial

#### 4. Testar Glossário

- [ ] Digite "API" no campo de busca
- [ ] Deve filtrar e mostrar apenas termos com "API"
- [ ] Limpe a busca
- [ ] Deve mostrar todos os termos novamente

#### 5. Testar Responsividade

Abra as ferramentas de desenvolvedor (F12):

- [ ] Teste em Desktop (1920x1080) - deve estar bem formatado
- [ ] Teste em Tablet (768x1024) - deve estar bem formatado
- [ ] Teste em Mobile (375x667) - deve estar bem formatado

#### 6. Testar Performance

- [ ] Página deve carregar em menos de 5 segundos
- [ ] Navegação entre abas deve ser rápida (< 1 segundo)
- [ ] Não deve haver layout shift (conteúdo pulando)

### ✅ Teste Passou Se

- Todos os pontos acima foram verificados
- Não há erros no console do navegador (F12 → Console)
- Página é responsiva em todos os tamanhos

---

## Exemplo 7: Executar Testes Automatizados

### Objetivo

Executar testes unitários e E2E automaticamente.

### Passo-a-Passo

#### 1. Abrir Terminal

```bash
cd /home/ubuntu/tmf683-party-interaction
```

#### 2. Executar Testes Unitários

```bash
pnpm test
```

Você deve ver:

```
✓ server/auth.logout.test.ts (1 test)
✓ server/routers/partyInteraction.test.ts (11 tests)

Test Files  2 passed (2)
     Tests  12 passed (12)
```

#### 3. Executar Testes E2E

```bash
pnpm test:e2e
```

Você deve ver:

```
✓ e2e/create-interaction.spec.ts (5 tests)
✓ e2e/navigation.spec.ts (7 tests)
✓ e2e/documentation.spec.ts (8 tests)
✓ e2e/architecture.spec.ts (6 tests)
✓ e2e/responsive.spec.ts (8 tests)
✓ e2e/performance.spec.ts (8 tests)

Test Files  6 passed (6)
     Tests  42 passed (42)
```

#### 4. Visualizar Relatório E2E

```bash
pnpm exec playwright show-report
```

Um navegador abrirá mostrando detalhes dos testes.

### ✅ Teste Passou Se

- Todos os testes unitários passaram
- Todos os testes E2E passaram
- Relatório HTML foi gerado com sucesso

---

## Exemplo 8: Debugar um Teste Falhando

### Objetivo

Debugar um teste que está falhando.

### Passo-a-Passo

#### 1. Executar Teste em Modo Debug

```bash
pnpm test:e2e:debug
```

Uma janela de debug abrirá.

#### 2. Usar Ferramentas de Debug

Na janela de debug:

- Clique em "Step over" para executar linha por linha
- Clique em "Step into" para entrar em funções
- Clique em "Continue" para continuar execução
- Use "Inspect" para ver estado da página

#### 3. Verificar Console

Abra o console (F12) para ver:

- Erros de JavaScript
- Logs do teste
- Estado da página

#### 4. Usar Playwright Inspector

Pressione `P` durante a execução para abrir o Playwright Inspector.

#### 5. Corrigir Teste

Com base no que você descobriu:

- Atualize seletores se elementos mudaram
- Aumente timeouts se página está lenta
- Adicione logs para entender fluxo

### ✅ Teste Passou Se

- Você entendeu por que o teste falhou
- Você corrigiu o problema
- Teste passa quando executado novamente

---

## Checklist de Testes Completo

Use este checklist para garantir que você testou tudo:

### Testes Unitários
- [ ] Executar `pnpm test`
- [ ] Todos os testes passaram
- [ ] Cobertura de testes > 70%

### Testes E2E
- [ ] Executar `pnpm test:e2e`
- [ ] Todos os testes passaram
- [ ] Testar em Chromium, Firefox, WebKit
- [ ] Visualizar relatório HTML

### Testes de API
- [ ] Criar interação (POST)
- [ ] Listar interações (GET)
- [ ] Obter interação específica (GET)
- [ ] Atualizar interação (PATCH)
- [ ] Deletar interação (DELETE)
- [ ] Verificar eventos publicados

### Testes de UI
- [ ] Página inicial carrega
- [ ] Navegação entre abas funciona
- [ ] Documentação é exibida
- [ ] Arquitetura é exibida
- [ ] Glossário é exibido
- [ ] Busca no glossário funciona

### Testes de Responsividade
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Testes de Performance
- [ ] Página carrega em < 5 segundos
- [ ] Navegação é rápida (< 1 segundo)
- [ ] Sem layout shift
- [ ] Sem erros no console

---

## Dicas Úteis

### Copiar ID de Interação Rapidamente

```bash
# Criar interação e extrair ID
INTERACTION_ID=$(curl -s -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{...}' | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo $INTERACTION_ID
```

### Criar Múltiplas Interações para Teste

```bash
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
    -H "Content-Type: application/json" \
    -d "{
      \"description\": \"Interação $i\",
      \"type\": \"inbound\",
      \"channelName\": \"phone\",
      \"interactionDate\": \"2026-02-16T18:00:00Z\",
      \"involvedParties\": []
    }"
done
```

### Limpar Todas as Interações

```bash
# Obter todos os IDs
curl -s "http://localhost:3000/api/trpc/partyInteraction.list?input={\"offset\":0,\"limit\":1000}" \
  | grep -o '"id":"[^"]*' | cut -d'"' -f4 | while read id; do
  curl -X POST http://localhost:3000/api/trpc/partyInteraction.delete \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$id\"}"
done
```

---

## Próximas Etapas

Após completar todos os exemplos:

1. Crie seus próprios testes para casos de uso específicos
2. Integre testes com CI/CD (GitHub Actions)
3. Configure alertas para testes falhando
4. Aumente cobertura de testes para 90%+
5. Documente padrões de teste para seu time
