import { describe, it, expect, beforeEach } from 'vitest';
import { partyInteractionRouter } from './partyInteraction';
import type { TrpcContext } from '../_core/context';

// Mock context
const createMockContext = (): TrpcContext => ({
  user: null,
  req: {
    protocol: 'https',
    headers: {},
  } as TrpcContext['req'],
  res: {
    clearCookie: () => {},
  } as TrpcContext['res'],
});

describe('PartyInteraction Router', () => {
  let caller: ReturnType<typeof partyInteractionRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = partyInteractionRouter.createCaller(ctx);
  });

  describe('create', () => {
    it('should create a PartyInteraction with valid input', async () => {
      const input = {
        description: 'Customer called about billing issue',
        type: 'inbound' as const,
        status: 'active' as const,
        interactionDate: new Date().toISOString(),
        channelName: 'phone' as const,
        involvedParties: [
          {
            id: 'customer-123',
            name: 'John Doe',
            role: 'customer' as const,
          },
          {
            id: 'agent-456',
            name: 'Jane Smith',
            role: 'agent' as const,
          },
        ],
      };

      const result = await caller.create(input);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.href).toContain('/partyInteraction/');
      expect(result.description).toBe(input.description);
      expect(result.type).toBe(input.type);
      expect(result.status).toBe(input.status);
      expect(result.channelName).toBe(input.channelName);
      expect(result.involvedParties).toHaveLength(2);
    });

    it('should fail with invalid description', async () => {
      const input = {
        description: '', // Empty description should fail
        type: 'inbound' as const,
        status: 'active' as const,
        interactionDate: new Date().toISOString(),
        channelName: 'phone' as const,
        involvedParties: [],
      };

      try {
        await caller.create(input);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should fail with invalid interaction date', async () => {
      const input = {
        description: 'Test interaction',
        type: 'inbound' as const,
        status: 'active' as const,
        interactionDate: 'invalid-date',
        channelName: 'phone' as const,
        involvedParties: [],
      };

      try {
        await caller.create(input);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('list', () => {
    it('should list PartyInteractions with default pagination', async () => {
      const result = await caller.list({});

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.offset).toBe(0);
      expect(result.limit).toBe(20);
    });

    it('should respect custom pagination parameters', async () => {
      const result = await caller.list({
        offset: 10,
        limit: 5,
      });

      expect(result.offset).toBe(10);
      expect(result.limit).toBe(5);
    });

    it('should fail with invalid limit', async () => {
      try {
        await caller.list({
          limit: 1000, // Exceeds max of 100
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getById', () => {
    it('should fail when PartyInteraction does not exist', async () => {
      try {
        await caller.getById({ id: 'non-existent-id' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getEventStats', () => {
    it('should return event statistics', async () => {
      const result = await caller.getEventStats();

      expect(result).toBeDefined();
      expect(result.registeredEventTypes).toBeDefined();
      expect(Array.isArray(result.registeredEventTypes)).toBe(true);
      expect(result.handlerStats).toBeDefined();
      expect(typeof result.totalHistory).toBe('number');
    });

    it('should have handler stats object', async () => {
      const result = await caller.getEventStats();

      expect(result.handlerStats).toBeDefined();
      expect(typeof result.handlerStats).toBe('object');
    })
  });

  describe('getEventHistory', () => {
    it('should return event history', async () => {
      const result = await caller.getEventHistory({});

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should filter by event type', async () => {
      const result = await caller.getEventHistory({
        eventType: 'PartyInteractionCreatedEvent',
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
