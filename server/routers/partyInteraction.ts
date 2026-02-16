import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import {
  createPartyInteraction,
  getPartyInteractionById,
  listPartyInteractions,
  updatePartyInteraction,
  deletePartyInteraction,
} from '../db';
import { eventBus, PartyInteractionCreatedEvent, PartyInteractionUpdatedEvent, PartyInteractionDeletedEvent } from '../eventBus';
import { nanoid } from 'nanoid';

// Validation Schemas following TMF683 specification

const RelatedPartySchema = z.object({
  id: z.string(),
  href: z.string().optional(),
  name: z.string(),
  role: z.enum(['customer', 'agent', 'system']),
});

const ChannelRefSchema = z.object({
  id: z.string().optional(),
  name: z.enum(['email', 'phone', 'chat', 'social', 'in-person', 'web']),
});

const CharacteristicSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const PartyInteractionCreateSchema = z.object({
  description: z.string().min(1).max(1000),
  type: z.enum(['inbound', 'outbound', 'internal']),
  status: z.enum(['active', 'inactive', 'pending', 'completed']).default('active'),
  interactionDate: z.string().datetime(),
  channelName: z.enum(['email', 'phone', 'chat', 'social', 'in-person', 'web']),
  involvedParties: z.array(RelatedPartySchema),
  characteristics: z.array(CharacteristicSchema).optional(),
  notes: z.string().optional(),
});

const PartyInteractionUpdateSchema = PartyInteractionCreateSchema.partial();

export type PartyInteractionCreateInput = z.infer<typeof PartyInteractionCreateSchema>;
export type PartyInteractionUpdateInput = z.infer<typeof PartyInteractionUpdateSchema>;

// PartyInteraction Router - Implementa endpoints TMF683

export const partyInteractionRouter = router({
  // POST /partyInteraction - Criar uma nova PartyInteraction
  create: publicProcedure
    .input(PartyInteractionCreateSchema)
    .mutation(async ({ input }) => {
      const id = nanoid();
      const now = new Date();

      const partyInteraction = {
        id,
        href: `/partyInteraction/${id}`,
        description: input.description,
        type: input.type,
        status: input.status,
        interactionDate: new Date(input.interactionDate),
        completionDate: null,
        channelId: nanoid(),
        channelName: input.channelName,
        involvedParties: JSON.stringify(input.involvedParties),
        characteristics: input.characteristics ? JSON.stringify(input.characteristics) : null,
        notes: input.notes || null,
        attachments: null,
        createdBy: 'system',
        updatedBy: 'system',
        createdAt: now,
        updatedAt: now,
      };

      // Persistir no banco
      await createPartyInteraction(partyInteraction);

      // Publicar evento
      const event: PartyInteractionCreatedEvent = {
        id: nanoid(),
        eventType: 'PartyInteractionCreatedEvent',
        aggregateId: id,
        aggregateType: 'PartyInteraction',
        timestamp: now,
        version: 1,
        payload: {
          id,
          description: input.description,
          type: input.type,
          status: input.status,
          interactionDate: input.interactionDate,
          channelName: input.channelName,
          involvedParties: input.involvedParties,
        },
      };

      await eventBus.publish(event);

      return {
        id,
        href: `/partyInteraction/${id}`,
        ...input,
        createdAt: now.toISOString(),
      };
    }),

  // GET /partyInteraction - Listar PartyInteractions com paginação
  list: publicProcedure
    .input(
      z.object({
        offset: z.number().int().min(0).default(0),
        limit: z.number().int().min(1).max(100).default(20),
        fields: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const interactions = await listPartyInteractions(input.offset, input.limit);

      return {
        data: interactions.map(interaction => ({
          id: interaction.id,
          href: interaction.href,
          description: interaction.description,
          type: interaction.type,
          status: interaction.status,
          interactionDate: interaction.interactionDate?.toISOString(),
          channelName: interaction.channelName,
          involvedParties: interaction.involvedParties ? JSON.parse(interaction.involvedParties) : [],
          createdAt: interaction.createdAt?.toISOString(),
          updatedAt: interaction.updatedAt?.toISOString(),
        })),
        offset: input.offset,
        limit: input.limit,
      };
    }),

  // GET /partyInteraction/{id} - Obter uma PartyInteraction específica
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const interaction = await getPartyInteractionById(input.id);

      if (!interaction) {
        throw new Error('PartyInteraction not found');
      }

      return {
        id: interaction.id,
        href: interaction.href,
        description: interaction.description,
        type: interaction.type,
        status: interaction.status,
        interactionDate: interaction.interactionDate?.toISOString(),
        channelName: interaction.channelName,
        involvedParties: interaction.involvedParties ? JSON.parse(interaction.involvedParties) : [],
        characteristics: interaction.characteristics ? JSON.parse(interaction.characteristics) : [],
        notes: interaction.notes,
        createdAt: interaction.createdAt?.toISOString(),
        updatedAt: interaction.updatedAt?.toISOString(),
      };
    }),

  // PATCH /partyInteraction/{id} - Atualizar uma PartyInteraction
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: PartyInteractionUpdateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const existing = await getPartyInteractionById(input.id);

      if (!existing) {
        throw new Error('PartyInteraction not found');
      }

      const now = new Date();
      const updateData: any = {};

      if (input.data.description !== undefined) updateData.description = input.data.description;
      if (input.data.type !== undefined) updateData.type = input.data.type;
      if (input.data.status !== undefined) updateData.status = input.data.status;
      if (input.data.interactionDate !== undefined) updateData.interactionDate = new Date(input.data.interactionDate);
      if (input.data.channelName !== undefined) updateData.channelName = input.data.channelName;
      if (input.data.involvedParties !== undefined) updateData.involvedParties = JSON.stringify(input.data.involvedParties);
      if (input.data.characteristics !== undefined) updateData.characteristics = JSON.stringify(input.data.characteristics);
      if (input.data.notes !== undefined) updateData.notes = input.data.notes;
      updateData.updatedBy = 'system';
      updateData.updatedAt = now;

      const updated = await updatePartyInteraction(input.id, updateData);

      // Publicar evento de atualização
      const event: PartyInteractionUpdatedEvent = {
        id: nanoid(),
        eventType: 'PartyInteractionUpdatedEvent',
        aggregateId: input.id,
        aggregateType: 'PartyInteraction',
        timestamp: now,
        version: 2,
        payload: {
          id: input.id,
          changes: input.data,
          previousValues: {
            description: existing.description,
            type: existing.type,
            status: existing.status,
          },
        },
      };

      await eventBus.publish(event);

      return updated;
    }),

  // DELETE /partyInteraction/{id} - Deletar uma PartyInteraction
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const existing = await getPartyInteractionById(input.id);

      if (!existing) {
        throw new Error('PartyInteraction not found');
      }

      const deleted = await deletePartyInteraction(input.id);
      const now = new Date();

      // Publicar evento de deleção
      const event: PartyInteractionDeletedEvent = {
        id: nanoid(),
        eventType: 'PartyInteractionDeletedEvent',
        aggregateId: input.id,
        aggregateType: 'PartyInteraction',
        timestamp: now,
        version: 3,
        payload: {
          id: input.id,
          deletedAt: now.toISOString(),
        },
      };

      await eventBus.publish(event);

      return { success: deleted };
    }),

  // GET /partyInteraction/events/history - Obter histórico de eventos
  getEventHistory: publicProcedure
    .input(
      z.object({
        eventType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const history = eventBus.getHistory(input.eventType as any);
      return history.map(event => ({
        ...event,
        timestamp: event.timestamp.toISOString(),
      }));
    }),

  // GET /partyInteraction/events/stats - Obter estatísticas de eventos
  getEventStats: publicProcedure.query(async () => {
    const registeredTypes = eventBus.getRegisteredEventTypes();
    const stats: Record<string, number> = {};

    for (const eventType of registeredTypes) {
      stats[eventType] = eventBus.getHandlerCount(eventType);
    }

    return {
      registeredEventTypes: registeredTypes,
      handlerStats: stats,
      totalHistory: eventBus.getHistory().length,
    };
  }),
});
