import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, partyInteractions, eventLogs, PartyInteraction, InsertPartyInteraction, EventLog, InsertEventLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// PartyInteraction queries
export async function createPartyInteraction(data: InsertPartyInteraction): Promise<PartyInteraction | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(partyInteractions).values(data);
    return data as PartyInteraction;
  } catch (error) {
    console.error("[Database] Failed to create PartyInteraction:", error);
    throw error;
  }
}

export async function getPartyInteractionById(id: string): Promise<PartyInteraction | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(partyInteractions).where(eq(partyInteractions.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get PartyInteraction:", error);
    throw error;
  }
}

export async function listPartyInteractions(offset: number = 0, limit: number = 20): Promise<PartyInteraction[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(partyInteractions).limit(limit).offset(offset);
    return result;
  } catch (error) {
    console.error("[Database] Failed to list PartyInteractions:", error);
    throw error;
  }
}

export async function updatePartyInteraction(id: string, data: Partial<InsertPartyInteraction>): Promise<PartyInteraction | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(partyInteractions).set(data).where(eq(partyInteractions.id, id));
    return getPartyInteractionById(id);
  } catch (error) {
    console.error("[Database] Failed to update PartyInteraction:", error);
    throw error;
  }
}

export async function deletePartyInteraction(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(partyInteractions).where(eq(partyInteractions.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete PartyInteraction:", error);
    throw error;
  }
}

// Event Log queries
export async function logEvent(data: InsertEventLog): Promise<EventLog | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(eventLogs).values(data);
    return data as EventLog;
  } catch (error) {
    console.error("[Database] Failed to log event:", error);
    throw error;
  }
}

export async function getUnprocessedEvents(): Promise<EventLog[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(eventLogs).where(eq(eventLogs.processed, 0));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get unprocessed events:", error);
    throw error;
  }
}
