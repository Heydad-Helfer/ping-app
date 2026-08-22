import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { pings } from "#/db/schema";
import {
	isPriorityToken,
	type PingListItem,
	type PingSearch,
	type PriorityToken,
	parseTagTokens,
	pingSearchSchema,
	pingWriteSchema,
} from "#/lib/pings";
import { uuidv7 } from "#/lib/uuidv7";

async function requireUserId(): Promise<string> {
	const { userId, isAuthenticated } = await auth();
	if (!isAuthenticated || !userId) {
		setResponseStatus(401);
		throw new Error("Unauthorized");
	}
	return userId;
}

function canResolvePing(
	userId: string,
	ping: { authorId: string; isPrivate: boolean },
) {
	if (ping.isPrivate) return ping.authorId === userId;
	return true;
}

async function loadAuthors(
	ids: string[],
	viewerId: string,
): Promise<Map<string, PingListItem["author"]>> {
	const unique = [...new Set(ids)];
	const client = clerkClient();
	const authors = new Map<string, PingListItem["author"]>();

	await Promise.all(
		unique.map(async (id) => {
			try {
				const user = await client.users.getUser(id);
				const name =
					user.firstName ??
					user.username ??
					user.primaryEmailAddress?.emailAddress ??
					null;
				authors.set(id, {
					id,
					relation: id === viewerId ? "me" : "partner",
					name,
					imageUrl: user.imageUrl ?? null,
					initials: (name ?? "?").trim().slice(0, 1).toUpperCase() || "?",
				});
			} catch {
				authors.set(id, {
					id,
					relation: id === viewerId ? "me" : "partner",
					name: null,
					imageUrl: null,
					initials: "?",
				});
			}
		}),
	);

	return authors;
}

function toListItem(
	row: typeof pings.$inferSelect,
	author: PingListItem["author"],
	userId: string,
): PingListItem {
	const priority: PriorityToken = isPriorityToken(row.priority)
		? row.priority
		: "routine";
	const isAuthor = row.authorId === userId;
	return {
		id: row.id,
		body: row.body,
		isPrivate: row.isPrivate,
		priority,
		tags: parseTagTokens(row.tags),
		targetDate: row.targetDate,
		resolved: row.resolved,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
		author,
		canEdit: isAuthor,
		canDelete: isAuthor,
		canResolve: canResolvePing(userId, row),
	};
}

export const getSessionFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const { userId } = await auth();
		return { userId: userId ?? null };
	},
);

export const listPingsFn = createServerFn({ method: "GET" })
	.validator(pingSearchSchema)
	.handler(async ({ data }): Promise<PingListItem[]> => {
		const userId = await requireUserId();
		const filters: PingSearch = data;

		const conditions = [
			filters.private
				? and(eq(pings.isPrivate, true), eq(pings.authorId, userId))
				: sql`(${pings.isPrivate} = false OR ${pings.authorId} = ${userId})`,
			eq(pings.resolved, Boolean(filters.resolved)),
		];

		if (filters.priority?.length) {
			conditions.push(inArray(pings.priority, filters.priority));
		}

		if (filters.tag?.length) {
			conditions.push(
				sql`${pings.tags} && ARRAY[${sql.join(
					filters.tag.map((tag) => sql`${tag}`),
					sql`, `,
				)}]::text[]`,
			);
		}

		const rows = await db
			.select()
			.from(pings)
			.where(and(...conditions))
			.orderBy(
				sql`CASE WHEN ${pings.priority} = 'urgent' THEN 0 ELSE 1 END`,
				sql`${pings.targetDate} ASC NULLS LAST`,
				desc(pings.createdAt),
			);

		const authors = await loadAuthors(
			rows.map((row) => row.authorId),
			userId,
		);

		return rows.map((row) => {
			const author = authors.get(row.authorId) ?? {
				id: row.authorId,
				relation:
					row.authorId === userId ? ("me" as const) : ("partner" as const),
				name: null,
				imageUrl: null,
				initials: "?",
			};
			return toListItem(row, author, userId);
		});
	});

export const createPingFn = createServerFn({ method: "POST" })
	.validator(pingWriteSchema)
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const now = new Date();
		const id = uuidv7();

		await db.insert(pings).values({
			id,
			authorId: userId,
			body: data.body,
			isPrivate: data.isPrivate,
			priority: data.priority,
			tags: data.tags,
			targetDate: data.targetDate,
			resolved: false,
			createdAt: now,
			updatedAt: now,
		});

		return { id };
	});

export const updatePingFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			id: z.uuid(),
			...pingWriteSchema.shape,
		}),
	)
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const [existing] = await db
			.select()
			.from(pings)
			.where(eq(pings.id, data.id))
			.limit(1);

		if (!existing) {
			setResponseStatus(404);
			throw new Error("Not found");
		}
		if (existing.authorId !== userId) {
			setResponseStatus(403);
			throw new Error("Forbidden");
		}

		await db
			.update(pings)
			.set({
				body: data.body,
				isPrivate: data.isPrivate,
				priority: data.priority,
				tags: data.tags,
				targetDate: data.targetDate,
				updatedAt: new Date(),
			})
			.where(eq(pings.id, data.id));

		return { id: data.id };
	});

export const setPingResolvedFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			id: z.uuid(),
			resolved: z.boolean(),
		}),
	)
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const [existing] = await db
			.select()
			.from(pings)
			.where(eq(pings.id, data.id))
			.limit(1);

		if (!existing) {
			setResponseStatus(404);
			throw new Error("Not found");
		}
		if (!canResolvePing(userId, existing)) {
			setResponseStatus(403);
			throw new Error("Forbidden");
		}

		await db
			.update(pings)
			.set({
				resolved: data.resolved,
				updatedAt: new Date(),
			})
			.where(eq(pings.id, data.id));

		return { id: data.id };
	});

export const deletePingFn = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.uuid() }))
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const [existing] = await db
			.select()
			.from(pings)
			.where(eq(pings.id, data.id))
			.limit(1);

		if (!existing) {
			setResponseStatus(404);
			throw new Error("Not found");
		}
		if (existing.authorId !== userId) {
			setResponseStatus(403);
			throw new Error("Forbidden");
		}

		await db.delete(pings).where(eq(pings.id, data.id));
		return { id: data.id };
	});
