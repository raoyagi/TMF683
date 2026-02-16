CREATE TABLE `eventLogs` (
	`id` varchar(64) NOT NULL,
	`eventType` varchar(128) NOT NULL,
	`aggregateId` varchar(64) NOT NULL,
	`aggregateType` varchar(64) NOT NULL,
	`payload` text NOT NULL,
	`version` int NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`correlationId` varchar(64),
	`causationId` varchar(64),
	`processed` int NOT NULL DEFAULT 0,
	`processedAt` timestamp,
	CONSTRAINT `eventLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partyInteractions` (
	`id` varchar(64) NOT NULL,
	`href` varchar(256) NOT NULL,
	`description` text,
	`type` varchar(64) NOT NULL,
	`status` enum('active','inactive','pending','completed') NOT NULL DEFAULT 'active',
	`interactionDate` timestamp NOT NULL,
	`completionDate` timestamp,
	`channelId` varchar(64),
	`channelName` varchar(64),
	`involvedParties` text,
	`characteristics` text,
	`notes` text,
	`attachments` text,
	`createdBy` varchar(64),
	`updatedBy` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partyInteractions_id` PRIMARY KEY(`id`)
);
