import type { ResolvedLocale } from "#/lib/preferences";

export const DATE_PRESET_IDS = [
	"today",
	"tomorrow",
	"nextWeek",
	"inTwoWeeks",
	"endOfMonth",
	"nextMonth",
] as const;

export type DatePresetId = (typeof DATE_PRESET_IDS)[number];

export function formatPingDate(
	isoDate: string,
	locale: ResolvedLocale,
): string {
	const date = parseIsoDate(isoDate);
	if (!date) return isoDate;
	return new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

export function formatRelativeCreated(
	isoTimestamp: string,
	locale: ResolvedLocale,
	now = new Date(),
): string {
	const created = new Date(isoTimestamp);
	if (Number.isNaN(created.getTime())) return "";

	const startOfToday = startOfLocalDay(now);
	const startOfCreated = startOfLocalDay(created);
	const dayDiff = Math.round(
		(startOfToday.getTime() - startOfCreated.getTime()) / 86_400_000,
	);

	if (dayDiff === 0) return locale === "he" ? "היום" : "Today";
	if (dayDiff === 1) return locale === "he" ? "אתמול" : "Yesterday";
	if (dayDiff === -1) return locale === "he" ? "מחר" : "Tomorrow";

	return formatPingDate(isoTimestamp.slice(0, 10), locale);
}

export function parseIsoDate(value: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	const date = new Date(year, month - 1, day);
	if (Number.isNaN(date.getTime())) return null;
	return date;
}

export function toIsoDate(date: Date): string {
	const local = startOfLocalDay(date);
	const year = String(local.getFullYear());
	const month = String(local.getMonth() + 1).padStart(2, "0");
	const day = String(local.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function isDatePresetId(value: string): value is DatePresetId {
	return (DATE_PRESET_IDS as readonly string[]).includes(value);
}

export function dateFromPreset(id: DatePresetId, now = new Date()): Date {
	const today = startOfLocalDay(now);
	switch (id) {
		case "today":
			return today;
		case "tomorrow":
			return addDays(today, 1);
		case "nextWeek":
			return addDays(today, 7);
		case "inTwoWeeks":
			return addDays(today, 14);
		case "endOfMonth":
			return new Date(today.getFullYear(), today.getMonth() + 1, 0);
		case "nextMonth":
			return addMonthsSameDay(today, 1);
	}
}

export function matchingDatePreset(
	isoDate: string,
	now = new Date(),
): DatePresetId | undefined {
	return DATE_PRESET_IDS.find(
		(id) => toIsoDate(dateFromPreset(id, now)) === isoDate,
	);
}

function startOfLocalDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function addMonthsSameDay(date: Date, months: number): Date {
	const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
	const lastDay = new Date(
		target.getFullYear(),
		target.getMonth() + 1,
		0,
	).getDate();
	target.setDate(Math.min(date.getDate(), lastDay));
	return target;
}

/** UTC calendar date (`YYYY-MM-DD`) for comparing `target_date`. */
export function utcDateString(now = new Date()): string {
	return now.toISOString().slice(0, 10);
}
