# Guia Educacional: TMF683 Party Interaction Management com Arquitetura EDA

## Índice

1. [Introdução para Leigos](#introdução-para-leigos)
2. [Conceitos Fundamentais](#conceitos-fundamentais)
3. [Arquitetura ODA](#arquitetura-oda)
4. [Especificação TMF683](#especificação-tmf683)
5. [Arquitetura Orientada a Eventos (EDA)](#arquitetura-orientada-a-eventos-eda)
6. [Como o Microsserviço Funciona](#como-o-microsserviço-funciona)
7. [Fluxos de Uso Prático](#fluxos-de-uso-prático)
8. [Glossário Técnico](#glossário-técnico)

---

## Introdução para Leigos

Imagine uma empresa de telecomunicações que precisa rastrear todas as interações que seus clientes têm com a empresa. Um cliente pode ligar, enviar um email, conversar no chat, ou visitar uma loja. Cada uma dessas interações é importante e precisa ser registrada.

O **TMF683 Party Interaction Management** é um padrão internacional que define como registrar e gerenciar essas interações. Este microsserviço implementa esse padrão usando uma **arquitetura orientada a eventos**, que é uma forma moderna e escalável de construir sistemas.

### Por que isso é importante?

- **Rastreabilidade**: Você pode ver todo o histórico de interações de um cliente
- **Escalabilidade**: O sistema pode lidar com milhões de interações simultaneamente
- **Flexibilidade**: Novos componentes podem ser adicionados sem quebrar o sistema existente
- **Resiliência**: Se uma parte falha, as outras continuam funcionando

---

## Conceitos Fundamentais

### 1. O que é um Microsserviço?

Um microsserviço é um pequeno programa que faz uma coisa muito bem. Ao invés de ter um grande programa que faz tudo, você tem vários pequenos programas que trabalham juntos.

**Analogia**: Pense em uma pizzaria. Ao invés de uma pessoa fazer tudo (receber pedido, preparar massa, adicionar molho, adicionar queijo, assar), você tem especialistas: um recebe o pedido, outro prepara a massa, outro adiciona ingredientes, outro assa. Cada um é especialista no que faz.

**Vantagens**:
- Mais fácil de entender e manter
- Pode ser escalado independentemente
- Pode ser desenvolvido por times diferentes
- Mais resiliente a falhas

### 2. O que é uma API REST?

API significa "Application Programming Interface" (Interface de Programação de Aplicações). É a forma como programas conversam entre si.

REST significa "Representational State Transfer". É um padrão para criar APIs usando HTTP (o mesmo protocolo que você usa para acessar websites).

**Como funciona**:
- **GET**: Obter informações (como ler um livro)
- **POST**: Criar algo novo (como escrever uma nova página)
- **PATCH**: Modificar algo existente (como corrigir um erro em uma página)
- **DELETE**: Remover algo (como rasgar uma página)

**Exemplo**:
```
GET /partyInteraction/123
Retorna os dados da interação com ID 123

POST /partyInteraction
Cria uma nova interação

PATCH /partyInteraction/123
Modifica a interação com ID 123

DELETE /partyInteraction/123
Remove a interação com ID 123
```

### 3. O que é um Event Broker?

Um event broker é como um "carteiro" que entrega mensagens entre diferentes partes do sistema.

**Analogia**: Imagine que você tem vários departamentos em uma empresa. Quando algo importante acontece em um departamento, ele envia uma mensagem para o carteiro (event broker), que a entrega para todos os departamentos interessados.

**Exemplo**:
- Quando uma nova interação é criada, o sistema envia uma mensagem "PartyInteractionCreatedEvent"
- O departamento de notificações recebe essa mensagem e envia um email ao cliente
- O departamento de análise recebe a mesma mensagem e atualiza as estatísticas
- Nenhum departamento precisa conhecer os outros

---

## Arquitetura ODA

### O que é ODA?

ODA significa **Open Digital Architecture** (Arquitetura Digital Aberta). É um blueprint (projeto) criado pelo TM Forum para ajudar empresas de telecomunicações a modernizar seus sistemas.

### Princípios Principais da ODA

| Princípio | Significado | Exemplo |
|-----------|------------|---------|
| **Modularidade** | Dividir o sistema em partes independentes | Cada microsserviço é independente |
| **Escalabilidade** | Crescer sem quebrar | Adicionar mais servidores quando necessário |
| **Resiliência** | Continuar funcionando mesmo com falhas | Se um serviço cai, outros continuam |
| **Observabilidade** | Ver o que está acontecendo | Logs e métricas de tudo |
| **Segurança** | Proteger dados e acesso | Autenticação e autorização |

### Como ODA se Relaciona com TMF683

O TMF683 é uma **API específica** que implementa os princípios da ODA para gerenciar interações de clientes. É como dizer: "ODA é o plano geral, TMF683 é um cômodo específico da casa".

---

## Especificação TMF683

### O que é TMF683?

TMF683 é um padrão internacional que define como registrar e gerenciar **Party Interactions** (Interações de Partes).

### O que é uma "Party Interaction"?

Uma "Party Interaction" é um registro de uma interação entre partes (pessoas, sistemas, etc.). Pode ser:
- Um cliente ligando para o suporte
- Um agente enviando um email
- Um sistema enviando uma notificação
- Uma visita a uma loja

### Estrutura de uma Party Interaction

```
PartyInteraction {
  id: "123456"                    // Identificador único
  description: "Cliente ligou"    // Descrição
  type: "inbound"                 // Tipo (entrada/saída)
  status: "active"                // Status
  interactionDate: "2026-02-16"   // Quando aconteceu
  channelName: "phone"            // Canal (telefone, email, etc)
  involvedParties: [              // Quem estava envolvido
    {
      id: "customer-123",
      name: "João Silva",
      role: "customer"
    },
    {
      id: "agent-456",
      name: "Maria Santos",
      role: "agent"
    }
  ]
}
```

### Operações Disponíveis

| Operação | Descrição | Exemplo |
|----------|-----------|---------|
| **CREATE** | Criar nova interação | POST /partyInteraction |
| **READ** | Obter interação existente | GET /partyInteraction/123 |
| **UPDATE** | Modificar interação | PATCH /partyInteraction/123 |
| **DELETE** | Remover interação | DELETE /partyInteraction/123 |
| **LIST** | Listar todas as interações | GET /partyInteraction |

---

## Arquitetura Orientada a Eventos (EDA)

### O que é EDA?

EDA significa **Event-Driven Architecture** (Arquitetura Orientada a Eventos). É uma forma de construir sistemas onde as coisas acontecem em resposta a eventos.

### Como Funciona?

**Fluxo Tradicional (Síncrono)**:
```
Cliente → Servidor → Banco de Dados → Resposta
(Tudo acontece em sequência, bloqueante)
```

**Fluxo com EDA (Assíncrono)**:
```
Cliente → Servidor → Publica Evento → Resposta Imediata
                          ↓
                    Event Broker
                     ↙  ↓  ↘
                Listener1 Listener2 Listener3
              (Processam em paralelo, não-bloqueante)
```

### Vantagens da EDA

| Vantagem | Explicação |
|----------|-----------|
| **Desacoplamento** | Componentes não precisam conhecer uns aos outros |
| **Escalabilidade** | Fácil adicionar novos listeners |
| **Performance** | Respostas rápidas ao cliente |
| **Resiliência** | Falha em um listener não afeta outros |
| **Auditoria** | Histórico completo de eventos |

### Tipos de Eventos neste Microsserviço

1. **PartyInteractionCreatedEvent**: Disparado quando uma nova interação é criada
2. **PartyInteractionUpdatedEvent**: Disparado quando uma interação é modificada
3. **PartyInteractionDeletedEvent**: Disparado quando uma interação é removida

---

## Como o Microsserviço Funciona

### Arquitetura em Camadas

```
┌─────────────────────────────────────────┐
│         Cliente HTTP                     │
│    (Browser, App Mobile, etc)            │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      API REST Gateway (Express.js)      │
│   POST, GET, PATCH, DELETE              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    Business Logic Service               │
│   Validação, Processamento              │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼────────┐  ┌─────▼──────────┐
│   Database     │  │  Event Bus     │
│   (MySQL)      │  │  (Redis)       │
└────────────────┘  └─────┬──────────┘
                          │
                ┌─────────┴─────────┐
                │                   │
        ┌───────▼────────┐  ┌───────▼────────┐
        │ Notification   │  │  Analytics     │
        │  Service       │  │  Service       │
        └────────────────┘  └────────────────┘
```

### Fluxo Passo a Passo: Criando uma Interação

**1. Cliente Envia Requisição**
```
POST /partyInteraction
{
  "description": "Cliente ligou sobre fatura",
  "type": "inbound",
  "channelName": "phone",
  "involvedParties": [...]
}
```

**2. API Recebe e Valida**
- Verifica se os dados estão corretos
- Verifica se é uma requisição legítima

**3. Business Logic Processa**
- Cria um ID único para a interação
- Prepara os dados para salvar

**4. Banco de Dados Persiste**
- Salva a interação no banco de dados
- Retorna confirmação

**5. Event Bus Publica Evento**
- Cria um evento "PartyInteractionCreatedEvent"
- Publica no Event Broker

**6. Listeners Reagem**
- Notification Service: Envia email de confirmação
- Analytics Service: Atualiza estatísticas
- Audit Service: Registra a ação

**7. Resposta ao Cliente**
- Cliente recebe confirmação imediata
- Não precisa esperar pelos listeners

### Fluxo Passo a Passo: Listando Interações

**1. Cliente Solicita Lista**
```
GET /partyInteraction?offset=0&limit=20
```

**2. API Recebe Requisição**
- Valida parâmetros de paginação

**3. Database Busca Dados**
- Executa query SQL
- Retorna até 20 registros

**4. API Formata Resposta**
- Converte dados para JSON
- Adiciona metadados (offset, limit)

**5. Cliente Recebe Lista**
```
{
  "data": [
    { id: "1", description: "..." },
    { id: "2", description: "..." },
    ...
  ],
  "offset": 0,
  "limit": 20
}
```

---

## Fluxos de Uso Prático

### Caso 1: Centro de Atendimento

Uma empresa de telecomunicações tem um centro de atendimento. Quando um cliente liga:

1. **Agente cria uma nova interação**
   - Tipo: "inbound"
   - Canal: "phone"
   - Partes envolvidas: cliente + agente

2. **Sistema registra automaticamente**
   - Salva no banco de dados
   - Publica evento de criação

3. **Listeners reagem**
   - Email: Envia confirmação ao cliente
   - Analytics: Atualiza métricas de atendimento
   - CRM: Sincroniza com sistema de CRM

4. **Histórico fica disponível**
   - Cliente pode ver histórico de interações
   - Agente pode ver contexto de chamadas anteriores

### Caso 2: Atualização de Interação

Um agente atualiza o status de uma interação de "pendente" para "resolvida":

1. **Agente envia PATCH**
   ```
   PATCH /partyInteraction/123
   { "status": "completed" }
   ```

2. **Sistema atualiza banco de dados**
   - Modifica o registro

3. **Evento de atualização é publicado**
   - PartyInteractionUpdatedEvent

4. **Listeners reagem**
   - Notification: Envia email ao cliente informando resolução
   - Analytics: Atualiza tempo médio de resolução
   - Billing: Pode iniciar processo de cobrança

### Caso 3: Análise de Dados

Um gerente quer analisar todas as interações do último mês:

1. **Gerente acessa dashboard**
   - Solicita lista de interações com filtros

2. **Sistema retorna dados**
   - Paginados para performance
   - Formatados para visualização

3. **Dashboard mostra gráficos**
   - Número de interações por canal
   - Tempo médio de resolução
   - Satisfação do cliente

---

## Glossário Técnico

### A

**API (Application Programming Interface)**
Interface que permite que programas se comuniquem. Neste caso, usamos REST API via HTTP.

**Agregado**
Conceito de Domain-Driven Design que agrupa entidades relacionadas. No nosso caso, PartyInteraction é um agregado.

### B

**Banco de Dados**
Sistema que armazena dados de forma organizada. Usamos MySQL/TiDB.

**Business Logic**
A lógica de negócio do sistema. No nosso caso, as regras para criar, atualizar e deletar interações.

### C

**CRUD**
Create, Read, Update, Delete. As quatro operações básicas em dados.

**Correlação**
Rastreamento de uma requisição através de múltiplos serviços usando um ID único (correlationId).

### D

**Database**
Veja Banco de Dados.

**Domain Event**
Um evento que representa algo importante que aconteceu no domínio do negócio. Exemplo: PartyInteractionCreatedEvent.

### E

**EDA (Event-Driven Architecture)**
Arquitetura onde componentes se comunicam através de eventos.

**Event Broker**
Sistema central que recebe eventos de produtores e os entrega aos consumidores. Usamos Redis.

**Event Bus**
Sistema que gerencia publicação e subscrição de eventos.

**Event Handler**
Função que reage a um evento específico.

**Event Listener**
Componente que "escuta" por eventos e reage quando eles ocorrem.

### H

**HTTP**
Protocolo usado para comunicação na web. GET, POST, PATCH, DELETE são métodos HTTP.

### I

**Idempotência**
Propriedade onde executar uma operação múltiplas vezes tem o mesmo resultado que executá-la uma vez.

### J

**JSON**
Formato de dados legível por humanos e máquinas. Usado para enviar dados pela API.

### L

**Listener**
Veja Event Listener.

### M

**Message Broker**
Sistema que roteia mensagens entre produtores e consumidores.

**Microsserviço**
Pequeno serviço que faz uma coisa bem. Neste caso, gerenciar Party Interactions.

**Middleware**
Software que processa requisições antes de chegarem ao handler principal. Exemplo: autenticação.

### O

**ODA (Open Digital Architecture)**
Blueprint do TM Forum para modernizar sistemas de telecomunicações.

**Observer Pattern**
Padrão de design onde objetos se inscrevem para ser notificados de mudanças.

### P

**Party**
Entidade envolvida em uma interação. Pode ser cliente, agente, sistema.

**Party Interaction**
Registro de uma interação entre partes.

**Payload**
Dados contidos em um evento ou mensagem.

**Persistência**
Ato de salvar dados de forma permanente no banco de dados.

**Pub/Sub (Publish-Subscribe)**
Padrão de comunicação onde produtores publicam mensagens e consumidores se inscrevem.

### R

**REST (Representational State Transfer)**
Padrão para criar APIs usando HTTP.

**Resiliência**
Capacidade de um sistema continuar funcionando mesmo com falhas.

### S

**Schema**
Definição da estrutura de dados. Exemplo: PartyInteraction tem campos id, description, type, etc.

**Serviço**
Componente do sistema que fornece funcionalidade específica.

**Síncrono**
Operação que bloqueia até completar. Cliente espera resposta.

**Subscriber**
Componente que se inscreve para receber eventos.

### T

**TM Forum**
Organização que define padrões para indústria de telecomunicações.

**TMF683**
Especificação do TM Forum para Party Interaction Management.

**Transação**
Operação que deve ser completada inteiramente ou revertida.

### U

**UUID (Universally Unique Identifier)**
Identificador único que pode ser gerado em qualquer lugar sem conflitos.

### V

**Validação**
Processo de verificar se dados estão corretos antes de processar.

**Versionamento**
Manutenção de diferentes versões de um serviço ou API.

---

## Conclusão

Este microsserviço TMF683 implementa um padrão moderno e escalável para gerenciar interações de clientes. Usando arquitetura orientada a eventos e seguindo os princípios ODA, o sistema é:

- **Escalável**: Pode crescer para lidar com milhões de interações
- **Resiliente**: Falhas em uma parte não afetam outras
- **Flexível**: Fácil adicionar novos recursos
- **Observável**: Tudo é rastreado e auditado
- **Seguro**: Dados protegidos e acesso controlado

O conhecimento desses conceitos é fundamental para trabalhar com sistemas modernos de telecomunicações e transformação digital.

---

## Referências

- TM Forum. (2024). TMF683 Party Interaction Management API. https://www.tmforum.org/
- TM Forum. (2024). Open Digital Architecture (ODA). https://www.tmforum.org/oda/
- Martin Fowler. (2020). Microservices. https://martinfowler.com/articles/microservices.html
- Sam Newman. (2015). Building Microservices. O'Reilly Media.
