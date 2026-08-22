import type { PriorityToken, TagToken } from "#/lib/pings";
import type { CopyKey, ResolvedLocale } from "#/lib/preferences";
import { t } from "#/lib/preferences";

const priorityKeys: Record<PriorityToken, CopyKey> = {
	urgent: "priorityUrgent",
	idea: "priorityIdea",
	routine: "priorityRoutine",
};

const tagKeys: Record<TagToken, CopyKey> = {
	groceries: "tagGroceries",
	home: "tagHome",
	medical: "tagMedical",
	work: "tagWork",
	travel: "tagTravel",
};

export function priorityLabel(locale: ResolvedLocale, token: PriorityToken) {
	return t(locale, priorityKeys[token]);
}

export function tagLabel(locale: ResolvedLocale, token: TagToken) {
	return t(locale, tagKeys[token]);
}
