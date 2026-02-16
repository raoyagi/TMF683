import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * PartyInteraction table following TMF683 specification
 * Stores information about interactions between parties (customers, agents, systems)
 */
export const partyInteractions = mysqlTable("partyInteractions", {
  // Identifiers
  id: varchar("id", { length: 64 }).primaryKey(), // UUID
  href: varchar("href", { length: 256 }).notNull(), // URI reference
  
  // Basic Information
  description: text("description"),
  type: varchar("type", { length: 64 }).notNull(), // inbound, outbound, etc
  status: mysqlEnum("status", ["active", "inactive", "pending", "completed"]).default("active").notNull(),
  
  // Dates
  interactionDate: timestamp("interactionDate").notNull(),
  completionDate: timestamp("completionDate"),
  
  // Channel Information
  channelId: varchar("channelId", { length: 64 }),
  channelName: varchar("channelName", { length: 64 }), // email, phone, chat, social, etc
  
  // Involved Parties (JSON for flexibility)
  involvedParties: text("involvedParties"), // JSON array of RelatedParty objects
  
  // Additional Metadata
  characteristics: text("characteristics"), // JSON array of key-value pairs
  notes: text("notes"), // JSON array of notes
  attachments: text("attachments"), // JSON array of attachment references
  
  // Audit Fields
  createdBy: varchar("createdBy", { length: 64 }),
  updatedBy: varchar("updatedBy", { length: 64 }),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PartyInteraction = typeof partyInteractions.$inferSelect;
export type InsertPartyInteraction = typeof partyInteractions.$inferInsert;

/**
 * Event Log table for tracking all events emitted by the system
 * Useful for event sourcing and audit trails
 */
export const eventLogs = mysqlTable("eventLogs", {
  id: varchar("id", { length: 64 }).primaryKey(), // UUID
  eventType: varchar("eventType", { length: 128 }).notNull(), // PartyInteractionCreatedEvent, etc
  aggregateId: varchar("aggregateId", { length: 64 }).notNull(), // Reference to PartyInteraction
  aggregateType: varchar("aggregateType", { length: 64 }).notNull(), // "PartyInteraction"
  
  // Event Payload
  payload: text("payload").notNull(), // JSON payload of the event
  
  // Metadata
  version: int("version").notNull(), // Event version for schema evolution
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  correlationId: varchar("correlationId", { length: 64 }), // For tracing
  causationId: varchar("causationId", { length: 64 }), // Parent event ID
  
  // Processing Status
  processed: int("processed").default(0).notNull(), // 0 = pending, 1 = processed
  processedAt: timestamp("processedAt"),
});

export type EventLog = typeof eventLogs.$inferSelect;
export type InsertEventLog = typeof eventLogs.$inferInsert;