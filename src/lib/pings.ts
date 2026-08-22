import { z } from "zod";

export const PRIORITY_TOKENS = ["urgent", "idea", "routine"] as const;
export const TAG_TOKENS = [
	"groceries",
	"home",
	"medical",
	"work",
	"travel",
] as const;

export type PriorityToken = (typeof PRIORITY_TOKENS)[number];
export type TagToken = (typeof TAG_TOKENS)[number];

export const priorityTokenSchema = z.enum(PRIORITY_TOKENS);
export const tagTokenSchema = z.enum(TAG_TOKENS);

function oneOrMany<T extends string>(schema: z.ZodType<T>) {
	return z
		.union([schema, z.array(schema)])
		.transform((value): T[] => (Array.isArray(value) ? value : [value]));
}

const trueFlag = z
	.union([z.literal(true), z.literal("true"), z.literal("1")])
	.transform(() => true as const)
	.optional();

export const pingSearchSchema = z.object({
	tag: oneOrMany(tagTokenSchema).optional().catch(undefined),
	priority: oneOrMany(priorityTokenSchema).optional().catch(undefined),
	private: trueFlag.catch(undefined),
	resolved: trueFlag.catch(undefined),
});

export type PingSearch = z.infer<typeof pingSearchSchema>;

export const pingWriteSchema = z.object({
	body: z.string().trim().min(1).max(4000),
	isPrivate: z.boolean(),
	priority: priorityTokenSchema,
	tags: z.array(tagTokenSchema),
	targetDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.nullable(),
});

export type PingWrite = z.infer<typeof pingWriteSchema>;

export function isPriorityToken(value: string): value is PriorityToken {
	return (PRIORITY_TOKENS as readonly string[]).includes(value);
}

export function isTagToken(value: string): value is TagToken {
	return (TAG_TOKENS as readonly string[]).includes(value);
}

export function parseTagTokens(values: string[]): TagToken[] {
	return values.filter(isTagToken);
}

export function toggleSearchList(
	search: PingSearch,
	key: "tag" | "priority",
	token: string,
): PingSearch {
	const current = search[key] ?? [];
	const next = current.includes(token as never)
		? current.filter((item) => item !== token)
		: [...current, token];
	return {
		...search,
		[key]: next.length ? next : undefined,
	};
}

export function toggleSearchFlag(
	search: PingSearch,
	key: "private" | "resolved",
): PingSearch {
	return {
		...search,
		[key]: search[key] ? undefined : true,
	};
}

export function isSearchCleared(search: PingSearch): boolean {
	return (
		!search.tag?.length &&
		!search.priority?.length &&
		!search.private &&
		!search.resolved
	);
}

export type PingAuthor = {
	id: string;
	relation: "me" | "partner";
	name: string | null;
	imageUrl: string | null;
	initials: string;
};

export type PingListItem = {
	id: string;
	body: string;
	isPrivate: boolean;
	priority: PriorityToken;
	tags: TagToken[];
	targetDate: string | null;
	resolved: boolean;
	createdAt: string;
	updatedAt: string;
	author: PingAuthor;
	canEdit: boolean;
	canResolve: boolean;
	canDelete: boolean;
};
