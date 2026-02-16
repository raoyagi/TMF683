# Guia Completo de Testes - TMF683 Party Interaction Management

## Índice

1. [Preparação do Ambiente](#preparação-do-ambiente)
2. [Testes Unitários (Vitest)](#testes-unitários-vitest)
3. [Testes E2E (Playwright)](#testes-e2e-playwright)
4. [Testes de API (Manual)](#testes-de-api-manual)
5. [Testes de Integração](#testes-de-integração)
6. [Troubleshooting](#troubleshooting)
7. [Boas Práticas](#boas-práticas)

---

## Preparação do Ambiente

### Pré-requisitos

Antes de começar a testar, certifique-se de que você tem:

- **Node.js 22.13.0 ou superior** instalado
- **pnpm 10.4.1 ou superior** instalado
- **Git** para controle de versão
- **Terminal/Console** para executar comandos

### Verificar Instalação

Execute os seguintes comandos para verificar se tudo está instalado corretamente:

```bash
# Verificar Node.js
node --version
# Esperado: v22.13.0 ou superior

# Verificar pnpm
pnpm --version
# Esperado: 10.4.1 ou superior

# Verificar Git
git --version
# Esperado: git version 2.x.x ou superior
```

### Clonar o Repositório

Se você ainda não clonou o repositório, faça isso agora:

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO> tmf683-party-interaction
cd tmf683-party-interaction

# Instalar dependências
pnpm install
```

### Iniciar o Servidor de Desenvolvimento

Abra um terminal e execute:

```bash
pnpm dev
```

Você deverá ver uma mensagem como:

```
Server running on http://localhost:3000/
```

**Mantenha este terminal aberto durante todos os testes.**

---

## Testes Unitários (Vitest)

Os testes unitários validam funções e componentes individuais em isolamento.

### O que é Testado

Os testes unitários cobrem:

- **Autenticação**: Logout de usuários
- **Party Interaction API**: Criar, listar, obter, atualizar e deletar interações
- **Event Bus**: Publicação e consumo de eventos
- **Validação de dados**: Schemas Zod

### Passo 1: Abrir um Novo Terminal

Abra um **novo terminal** (não feche o servidor de desenvolvimento):

```bash
cd /home/ubuntu/tmf683-party-interaction
```

### Passo 2: Executar Todos os Testes Unitários

Execute o comando:

```bash
pnpm test
```

**Resultado esperado:**

```
 RUN  v2.1.9 /home/ubuntu/tmf683-party-interaction

 ✓ server/auth.logout.test.ts (1 test) 6ms
 ✓ server/routers/partyInteraction.test.ts (11 tests) 184ms

 Test Files  2 passed (2)
      Tests  12 passed (12)
   Start at  13:14:06
   Duration  991ms
```

### Passo 3: Entender os Resultados

| Símbolo | Significado |
|---------|------------|
| ✓ | Teste passou com sucesso |
| ✕ | Teste falhou |
| ⊙ | Teste foi ignorado |
| ⊗ | Teste foi pulado |

### Passo 4: Executar um Arquivo de Teste Específico

Se quiser testar apenas a autenticação:

```bash
pnpm exec vitest run server/auth.logout.test.ts
```

Se quiser testar apenas Party Interaction:

```bash
pnpm exec vitest run server/routers/partyInteraction.test.ts
```

### Passo 5: Executar um Teste Específico

Para executar apenas um teste:

```bash
pnpm exec vitest run -t "should create a PartyInteraction with valid input"
```

### Passo 6: Modo Watch (Desenvolvimento)

Para executar testes em modo watch (reexecuta automaticamente quando você salva arquivos):

```bash
pnpm exec vitest
```

Pressione `q` para sair do modo watch.

### Passo 7: Visualizar Cobertura de Testes

Para ver qual percentual do código está coberto por testes:

```bash
pnpm exec vitest run --coverage
```

---

## Testes E2E (Playwright)

Os testes E2E validam fluxos completos da aplicação, como se um usuário real estivesse usando.

### O que é Testado

Os testes E2E cobrem:

- **Navegação**: Entre abas da aplicação
- **Documentação**: Conteúdo educacional e busca
- **Arquitetura**: Diagramas C4 Model
- **Responsividade**: Desktop, tablet e mobile
- **Performance**: Tempo de carregamento
- **Acessibilidade**: Navegação por teclado e labels

### Passo 1: Verificar Servidor Rodando

Certifique-se de que o servidor de desenvolvimento está rodando:

```bash
# Em outro terminal, se não estiver rodando
pnpm dev
```

Você deverá ver: `Server running on http://localhost:3000/`

### Passo 2: Abrir um Novo Terminal

Abra um **novo terminal** para executar os testes E2E:

```bash
cd /home/ubuntu/tmf683-party-interaction
```

### Passo 3: Executar Todos os Testes E2E

Execute o comando:

```bash
pnpm test:e2e
```

**Resultado esperado:**

```
 RUN  v1.58.2 /home/ubuntu/tmf683-party-interaction

 ✓ e2e/create-interaction.spec.ts (5 tests) 2.5s
 ✓ e2e/navigation.spec.ts (7 tests) 3.2s
 ✓ e2e/documentation.spec.ts (8 tests) 3.8s
 ✓ e2e/architecture.spec.ts (6 tests) 2.9s
 ✓ e2e/responsive.spec.ts (8 tests) 4.1s
 ✓ e2e/performance.spec.ts (8 tests) 3.5s

 Test Files  6 passed (6)
      Tests  42 passed (42)
   Start at  14:30:00
   Duration  20.0s
```

### Passo 4: Executar Testes E2E com Interface Visual

Para ver os testes sendo executados visualmente:

```bash
pnpm test:e2e:ui
```

Uma janela do navegador abrirá mostrando:

- Lista de testes no lado esquerdo
- Progresso de execução
- Screenshots de cada teste
- Logs detalhados

### Passo 5: Executar um Arquivo de Teste Específico

Para testar apenas navegação:

```bash
pnpm exec playwright test e2e/navigation.spec.ts
```

Para testar apenas documentação:

```bash
pnpm exec playwright test e2e/documentation.spec.ts
```

### Passo 6: Executar um Teste Específico

Para executar apenas um teste:

```bash
pnpm exec playwright test e2e/navigation.spec.ts -g "deve navegar para aba Arquitetura"
```

### Passo 7: Modo Debug

Para debugar um teste interativamente:

```bash
pnpm test:e2e:debug
```

Uma janela de debug abrirá permitindo:

- Pausar execução
- Inspecionar elementos
- Executar comandos passo-a-passo
- Ver estado da página

### Passo 8: Visualizar Relatório HTML

Após executar os testes, visualize o relatório:

```bash
pnpm exec playwright show-report
```

Um navegador abrirá mostrando:

- Resumo de testes
- Detalhes de cada teste
- Screenshots
- Vídeos (se configurado)
- Traces para debugging

### Passo 9: Executar Testes em um Browser Específico

Para testar apenas em Chromium:

```bash
pnpm exec playwright test --project=chromium
```

Para testar apenas em Firefox:

```bash
pnpm exec playwright test --project=firefox
```

Para testar apenas em WebKit:

```bash
pnpm exec playwright test --project=webkit
```

### Passo 10: Executar Testes com Filtro

Para executar apenas testes que contêm "navegacao":

```bash
pnpm exec playwright test -g "navegacao"
```

---

## Testes de API (Manual)

Os testes de API validam os endpoints REST do microsserviço.

### Pré-requisitos

Você pode usar uma das seguintes ferramentas:

- **cURL** (linha de comando)
- **Postman** (aplicação desktop)
- **Insomnia** (aplicação desktop)
- **Thunder Client** (extensão VS Code)

### Passo 1: Verificar Servidor Rodando

Certifique-se de que o servidor está rodando:

```bash
curl http://localhost:3000/
```

Você deverá receber uma resposta HTML.

### Passo 2: Criar uma Party Interaction (POST)

#### Usando cURL

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.create \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Cliente ligou sobre fatura",
    "type": "inbound",
    "channelName": "phone",
    "interactionDate": "2026-02-16T18:00:00Z",
    "involvedParties": [
      {
        "id": "customer-123",
        "name": "Joao Silva",
        "role": "customer"
      },
      {
        "id": "agent-456",
        "name": "Maria Santos",
        "role": "agent"
      }
    ]
  }'
```

#### Resultado esperado

```json
{
  "result": {
    "data": {
      "id": "abc123xyz",
      "href": "/partyInteraction/abc123xyz",
      "description": "Cliente ligou sobre fatura",
      "type": "inbound",
      "status": "active",
      "interactionDate": "2026-02-16T18:00:00Z",
      "channelName": "phone",
      "involvedParties": [...],
      "createdAt": "2026-02-16T18:30:45.123Z"
    }
  }
}
```

**Copie o ID retornado (ex: `abc123xyz`) para usar nos próximos testes.**

### Passo 3: Listar Party Interactions (GET)

#### Usando cURL

```bash
curl http://localhost:3000/api/trpc/partyInteraction.list?input={"offset":0,"limit":10}
```

#### Resultado esperado

```json
{
  "result": {
    "data": [
      {
        "id": "abc123xyz",
        "href": "/partyInteraction/abc123xyz",
        "description": "Cliente ligou sobre fatura",
        "type": "inbound",
        "status": "active",
        "interactionDate": "2026-02-16T18:00:00Z",
        "channelName": "phone",
        "involvedParties": [...],
        "createdAt": "2026-02-16T18:30:45.123Z"
      }
    ],
    "offset": 0,
    "limit": 10
  }
}
```

### Passo 4: Obter uma Party Interaction Específica (GET)

#### Usando cURL

Substitua `abc123xyz` pelo ID que você copiou:

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getById?input={"id":"abc123xyz"}
```

#### Resultado esperado

```json
{
  "result": {
    "data": {
      "id": "abc123xyz",
      "href": "/partyInteraction/abc123xyz",
      "description": "Cliente ligou sobre fatura",
      "type": "inbound",
      "status": "active",
      "interactionDate": "2026-02-16T18:00:00Z",
      "channelName": "phone",
      "involvedParties": [...],
      "createdAt": "2026-02-16T18:30:45.123Z"
    }
  }
}
```

### Passo 5: Atualizar uma Party Interaction (PATCH)

#### Usando cURL

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.update \
  -H "Content-Type: application/json" \
  -d '{
    "id": "abc123xyz",
    "data": {
      "status": "completed",
      "description": "Cliente ligou sobre fatura - RESOLVIDO"
    }
  }'
```

#### Resultado esperado

```json
{
  "result": {
    "data": {
      "id": "abc123xyz",
      "status": "completed",
      "description": "Cliente ligou sobre fatura - RESOLVIDO",
      ...
    }
  }
}
```

### Passo 6: Deletar uma Party Interaction (DELETE)

#### Usando cURL

```bash
curl -X POST http://localhost:3000/api/trpc/partyInteraction.delete \
  -H "Content-Type: application/json" \
  -d '{"id":"abc123xyz"}'
```

#### Resultado esperado

```json
{
  "result": {
    "data": {
      "success": true
    }
  }
}
```

### Passo 7: Obter Histórico de Eventos

#### Usando cURL

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getEventHistory?input={}
```

#### Resultado esperado

```json
{
  "result": {
    "data": [
      {
        "id": "event-123",
        "eventType": "PartyInteractionCreatedEvent",
        "aggregateId": "abc123xyz",
        "aggregateType": "PartyInteraction",
        "timestamp": "2026-02-16T18:30:45.123Z",
        "version": 1,
        "payload": {
          "id": "abc123xyz",
          "description": "Cliente ligou sobre fatura",
          ...
        }
      }
    ]
  }
}
```

### Passo 8: Obter Estatísticas de Eventos

#### Usando cURL

```bash
curl http://localhost:3000/api/trpc/partyInteraction.getEventStats
```

#### Resultado esperado

```json
{
  "result": {
    "data": {
      "registeredEventTypes": [
        "PartyInteractionCreatedEvent",
        "PartyInteractionUpdatedEvent",
        "PartyInteractionDeletedEvent"
      ],
      "handlerStats": {
        "PartyInteractionCreatedEvent": 1,
        "PartyInteractionUpdatedEvent": 1,
        "PartyInteractionDeletedEvent": 1
      },
      "totalHistory": 5
    }
  }
}
```

### Usando Postman (Alternativa)

Se preferir usar Postman:

1. Abra Postman
2. Clique em "New" → "Request"
3. Configure:
   - **Method**: POST
   - **URL**: `http://localhost:3000/api/trpc/partyInteraction.create`
   - **Headers**: `Content-Type: application/json`
   - **Body**: JSON com dados da interação
4. Clique "Send"

---

## Testes de Integração

Os testes de integração validam como diferentes partes do sistema trabalham juntas.

### Teste de Fluxo Completo

Este teste valida o fluxo completo: criar interação → publicar evento → atualizar UI.

#### Passo 1: Abrir a Página Web

Abra seu navegador e acesse:

```
http://localhost:3000/
```

#### Passo 2: Navegar para a Aba Documentação

Clique no botão "Documentação" no topo da página.

**Verificar**: A aba de documentação deve carregar mostrando conceitos, ODA, TMF683 e EDA.

#### Passo 3: Navegar para a Aba Arquitetura

Clique no botão "Arquitetura".

**Verificar**: Deve exibir diagramas C4 Model com 4 níveis (Context, Container, Component, Code).

#### Passo 4: Navegar para a Aba Glossário

Clique no botão "Glossário".

**Verificar**: Deve exibir lista de termos técnicos.

#### Passo 5: Buscar no Glossário

Digite "API" no campo de busca.

**Verificar**: Deve filtrar e mostrar apenas termos relacionados a "API".

#### Passo 6: Testar Responsividade

Abra as ferramentas de desenvolvedor (F12) e teste em diferentes resoluções:

- **Desktop**: 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667

**Verificar**: A página deve se adaptar corretamente em cada resolução.

---

## Troubleshooting

### Problema: Servidor não inicia

**Sintoma**: `Error: EADDRINUSE: address already in use :::3000`

**Solução**:

```bash
# Encontrar processo usando porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar porta diferente
PORT=3001 pnpm dev
```

### Problema: Testes Unitários Falhando

**Sintoma**: `Test failed: Cannot find module`

**Solução**:

```bash
# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Executar testes novamente
pnpm test
```

### Problema: Testes E2E Falhando

**Sintoma**: `Timeout waiting for element`

**Solução**:

```bash
# Aumentar timeout em playwright.config.ts
use: {
  timeout: 10000, // Aumentar de 5000 para 10000
}

# Ou executar em modo debug
pnpm test:e2e:debug
```

### Problema: Playwright não encontra navegadores

**Sintoma**: `Error: Chromium is not installed`

**Solução**:

```bash
# Instalar navegadores do Playwright
pnpm exec playwright install

# Ou instalar navegador específico
pnpm exec playwright install chromium
```

### Problema: API retorna erro 404

**Sintoma**: `curl: (7) Failed to connect`

**Solução**:

```bash
# Verificar se servidor está rodando
curl http://localhost:3000/

# Se não responder, iniciar servidor
pnpm dev

# Verificar porta correta
netstat -an | grep 3000
```

### Problema: Testes E2E lentos

**Sintoma**: Testes levam mais de 1 minuto

**Solução**:

```bash
# Reduzir número de workers
pnpm exec playwright test --workers=1

# Ou executar apenas um arquivo
pnpm exec playwright test e2e/navigation.spec.ts
```

---

## Boas Práticas

### Para Testes Unitários

1. **Execute regularmente**: Rode `pnpm test` antes de fazer commit
2. **Mantenha testes rápidos**: Cada teste deve levar menos de 100ms
3. **Use nomes descritivos**: `should create a PartyInteraction with valid input`
4. **Teste casos de erro**: Não apenas o caminho feliz
5. **Mantenha testes isolados**: Um teste não deve depender de outro

### Para Testes E2E

1. **Use seletores robustos**: Prefira `has-text()` a seletores CSS
2. **Aguarde elementos**: Use `waitForLoadState()` e `waitForTimeout()`
3. **Teste em múltiplos browsers**: Não apenas Chromium
4. **Teste responsividade**: Desktop, tablet e mobile
5. **Mantenha testes independentes**: Cada teste deve ser executável sozinho

### Para Testes de API

1. **Use ferramentas apropriadas**: cURL para scripts, Postman para exploração
2. **Teste todos os status codes**: 200, 400, 404, 500
3. **Valide resposta completa**: Não apenas o status
4. **Teste com dados inválidos**: Validação de entrada
5. **Documente exemplos**: Inclua exemplos de requisição/resposta

### Geral

1. **Teste frequentemente**: Não deixe para o final
2. **Automatize**: Use CI/CD para executar testes automaticamente
3. **Mantenha testes atualizados**: Quando código muda, testes também
4. **Revise falhas**: Sempre investigue testes que falham
5. **Documente**: Deixe claro o que cada teste faz

---

## Resumo de Comandos

| Comando | Descrição |
|---------|-----------|
| `pnpm test` | Executar testes unitários |
| `pnpm test:e2e` | Executar testes E2E |
| `pnpm test:e2e:ui` | Executar testes E2E com UI |
| `pnpm test:e2e:debug` | Executar testes E2E em modo debug |
| `pnpm dev` | Iniciar servidor de desenvolvimento |
| `pnpm check` | Verificar erros de TypeScript |
| `pnpm format` | Formatar código |
| `curl http://localhost:3000/` | Testar API manualmente |

---

## Próximas Etapas

1. **Integração com CI/CD**: Configure GitHub Actions para executar testes automaticamente
2. **Testes de Carga**: Use k6 ou Artillery para testar performance sob carga
3. **Testes Visuais**: Integre Percy ou Chromatic para regressão visual
4. **Cobertura de Testes**: Aumente cobertura para 80%+
5. **Documentação de Testes**: Crie guias para novos desenvolvedores

---

## Referências

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [cURL Documentation](https://curl.se/docs/)
- [Postman Learning Center](https://learning.postman.com/)
