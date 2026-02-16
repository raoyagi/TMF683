import { EventEmitter } from 'events';
import { nanoid } from 'nanoid';
import { logEvent } from './db';

/**
 * Event Bus - Implementação de Pub/Sub para eventos do microsserviço
 * Segue padrões ODA e TMF683
 */

// Tipos de Eventos
export type EventType = 
  | 'PartyInteractionCreatedEvent'
  | 'PartyInteractionUpdatedEvent'
  | 'PartyInteractionDeletedEvent';

export interface DomainEvent {
  id: string;
  eventType: EventType;
  aggregateId: string;
  aggregateType: 'PartyInteraction';
  timestamp: Date;
  version: number;
  payload: Record<string, any>;
  correlationId?: string;
  causationId?: string;
}

export interface PartyInteractionCreatedEvent extends DomainEvent {
  eventType: 'PartyInteractionCreatedEvent';
  payload: {
    id: string;
    description: string;
    type: string;
    status: string;
    interactionDate: string;
    channelName: string;
    involvedParties: any[];
  };
}

export interface PartyInteractionUpdatedEvent extends DomainEvent {
  eventType: 'PartyInteractionUpdatedEvent';
  payload: {
    id: string;
    changes: Record<string, any>;
    previousValues: Record<string, any>;
  };
}

export interface PartyInteractionDeletedEvent extends DomainEvent {
  eventType: 'PartyInteractionDeletedEvent';
  payload: {
    id: string;
    deletedAt: string;
  };
}

// Event Handler type
export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void> | void;

/**
 * EventBus - Gerenciador central de eventos
 * Implementa padrão Pub/Sub com persistência opcional
 */
class EventBus {
  private emitter: EventEmitter;
  private handlers: Map<EventType, EventHandler<any>[]> = new Map();
  private eventHistory: DomainEvent[] = [];
  private maxHistorySize: number = 1000;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
  }

  /**
   * Registrar um handler para um tipo de evento
   */
  subscribe(eventType: EventType, handler: EventHandler<any>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
    console.log(`[EventBus] Handler registrado para ${eventType}`);
  }

  /**
   * Desregistrar um handler
   */
  unsubscribe(eventType: EventType, handler: EventHandler<any>): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        console.log(`[EventBus] Handler removido de ${eventType}`);
      }
    }
  }

  /**
   * Publicar um evento
   * Executa todos os handlers registrados de forma assíncrona
   */
  async publish(event: DomainEvent): Promise<void> {
    // Adicionar IDs se não existirem
    if (!event.id) {
      event.id = nanoid();
    }
    if (!event.timestamp) {
      event.timestamp = new Date();
    }

    console.log(`[EventBus] Publicando evento: ${event.eventType} (${event.id})`);

    // Persistir evento no banco de dados
    try {
      await logEvent({
        id: event.id,
        eventType: event.eventType,
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: JSON.stringify(event.payload),
        version: event.version,
        timestamp: event.timestamp,
        correlationId: event.correlationId,
        causationId: event.causationId,
        processed: 0,
      });
    } catch (error) {
      console.error('[EventBus] Erro ao persistir evento:', error);
    }

    // Manter histórico em memória
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // Executar handlers registrados
    const handlers = this.handlers.get(event.eventType) || [];
    
    // Executar handlers de forma paralela mas não bloqueante
    const promises = handlers.map(handler => {
      return Promise.resolve()
        .then(() => handler(event))
        .catch(error => {
          console.error(`[EventBus] Erro ao executar handler para ${event.eventType}:`, error);
        });
    });

    // Não aguardar handlers para não bloquear a resposta HTTP
    Promise.all(promises).catch(error => {
      console.error('[EventBus] Erro ao executar handlers:', error);
    });
  }

  /**
   * Obter histórico de eventos
   */
  getHistory(eventType?: EventType): DomainEvent[] {
    if (eventType) {
      return this.eventHistory.filter(e => e.eventType === eventType);
    }
    return [...this.eventHistory];
  }

  /**
   * Limpar histórico
   */
  clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Obter número de handlers registrados
   */
  getHandlerCount(eventType: EventType): number {
    return this.handlers.get(eventType)?.length || 0;
  }

  /**
   * Obter todos os tipos de eventos com handlers
   */
  getRegisteredEventTypes(): EventType[] {
    return Array.from(this.handlers.keys());
  }
}

// Singleton instance
export const eventBus = new EventBus();

/**
 * Event Listeners - Handlers que reagem aos eventos
 */

// Listener para PartyInteractionCreatedEvent
export async function handlePartyInteractionCreated(event: PartyInteractionCreatedEvent): Promise<void> {
  console.log(`[EventListener] PartyInteraction criada: ${event.payload.id}`);
  
  // Aqui você poderia:
  // - Enviar notificação por email
  // - Atualizar cache
  // - Sincronizar com sistema externo
  // - Gerar relatório
  
  // Exemplo simples de logging
  console.log(`[EventListener] Detalhes: ${event.payload.description}`);
}

// Listener para PartyInteractionUpdatedEvent
export async function handlePartyInteractionUpdated(event: PartyInteractionUpdatedEvent): Promise<void> {
  console.log(`[EventListener] PartyInteraction atualizada: ${event.payload.id}`);
  console.log(`[EventListener] Mudanças:`, event.payload.changes);
}

// Listener para PartyInteractionDeletedEvent
export async function handlePartyInteractionDeleted(event: PartyInteractionDeletedEvent): Promise<void> {
  console.log(`[EventListener] PartyInteraction deletada: ${event.payload.id}`);
  
  // Aqui você poderia:
  // - Limpar cache
  // - Arquivar dados
  // - Notificar sistemas dependentes
}

/**
 * Registrar todos os listeners
 */
export function registerEventListeners(): void {
  eventBus.subscribe('PartyInteractionCreatedEvent', handlePartyInteractionCreated);
  eventBus.subscribe('PartyInteractionUpdatedEvent', handlePartyInteractionUpdated);
  eventBus.subscribe('PartyInteractionDeletedEvent', handlePartyInteractionDeleted);
  
  console.log('[EventBus] Todos os listeners foram registrados');
}
