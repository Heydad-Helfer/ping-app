import { sql } from "drizzle-orm";
import {
	boolean,
	date,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const pings = pgTable(
	"pings",
	{
		id: uuid("id").primaryKey(),
		authorId: text("author_id").notNull(),
		body: text("body").notNull(),
		isPrivate: boolean("is_private").notNull().default(false),
		priority: text("priority").notNull().default("routine"),
		tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
		targetDate: date("target_date", { mode: "string" }),
		resolved: boolean("resolved").notNull().default(false),
		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		index("pings_author_id_idx").on(table.authorId),
		index("pings_resolved_idx").on(table.resolved),
		index("pings_created_at_idx").on(table.createdAt),
	],
);
