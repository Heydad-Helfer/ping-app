export const THEME_COOKIE = "ping-theme";
export const LOCALE_COOKIE = "ping-locale";

/** Client → server headers carrying live system preferences for SSR / server fns. */
export const SYSTEM_THEME_HEADER = "x-ping-system-theme";
export const SYSTEM_LOCALE_HEADER = "x-ping-system-locale";

export const THEME_PREFERENCES = ["system", "light", "dark"] as const;
export const LOCALE_PREFERENCES = ["system", "en", "he"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type LocalePreference = (typeof LOCALE_PREFERENCES)[number];
export type ResolvedTheme = "light" | "dark";
export type ResolvedLocale = "en" | "he";
export type TextDirection = "ltr" | "rtl";

export type PreferencesState = {
	themePreference: ThemePreference;
	localePreference: LocalePreference;
	systemTheme: ResolvedTheme;
	systemLocale: ResolvedLocale;
	theme: ResolvedTheme;
	locale: ResolvedLocale;
	dir: TextDirection;
};

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isThemePreference(value: unknown): value is ThemePreference {
	return (
		typeof value === "string" &&
		(THEME_PREFERENCES as readonly string[]).includes(value)
	);
}

export function isLocalePreference(value: unknown): value is LocalePreference {
	return (
		typeof value === "string" &&
		(LOCALE_PREFERENCES as readonly string[]).includes(value)
	);
}

export function isResolvedTheme(value: unknown): value is ResolvedTheme {
	return value === "light" || value === "dark";
}

export function isResolvedLocale(value: unknown): value is ResolvedLocale {
	return value === "en" || value === "he";
}

export function parseAcceptLanguage(
	header: string | undefined,
): ResolvedLocale {
	if (!header) return "en";

	const candidates = header.split(",").map((part) => {
		const [tag, ...params] = part.trim().split(";");
		const qParam = params.find((p) => p.trim().startsWith("q="));
		const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
		return { tag: (tag ?? "").toLowerCase(), q: Number.isFinite(q) ? q : 0 };
	});

	candidates.sort((a, b) => b.q - a.q);

	for (const { tag } of candidates) {
		if (tag.startsWith("he")) return "he";
		if (tag.startsWith("en")) return "en";
	}

	return "en";
}

export function parseSecChPrefersColorScheme(
	header: string | undefined,
): ResolvedTheme | undefined {
	if (!header) return undefined;
	const value = header.trim().toLowerCase();
	if (value === "dark" || value === "light") return value;
	return undefined;
}

export function resolveTheme(
	preference: ThemePreference,
	systemTheme: ResolvedTheme,
): ResolvedTheme {
	return preference === "system" ? systemTheme : preference;
}

export function resolveLocale(
	preference: LocalePreference,
	systemLocale: ResolvedLocale,
): ResolvedLocale {
	return preference === "system" ? systemLocale : preference;
}

export function localeDir(locale: ResolvedLocale): TextDirection {
	return locale === "he" ? "rtl" : "ltr";
}

export function buildPreferencesState(input: {
	themePreference?: string | undefined;
	localePreference?: string | undefined;
	systemTheme?: string | undefined;
	systemLocale?: string | undefined;
}): PreferencesState {
	const themePreference = isThemePreference(input.themePreference)
		? input.themePreference
		: "system";
	const localePreference = isLocalePreference(input.localePreference)
		? input.localePreference
		: "system";
	const systemTheme = isResolvedTheme(input.systemTheme)
		? input.systemTheme
		: "light";
	const systemLocale = isResolvedLocale(input.systemLocale)
		? input.systemLocale
		: "en";
	const theme = resolveTheme(themePreference, systemTheme);
	const locale = resolveLocale(localePreference, systemLocale);

	return {
		themePreference,
		localePreference,
		systemTheme,
		systemLocale,
		theme,
		locale,
		dir: localeDir(locale),
	};
}

export function detectClientSystemTheme(): ResolvedTheme {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function detectClientSystemLocale(): ResolvedLocale {
	if (typeof window === "undefined") return "en";
	return navigator.language.toLowerCase().startsWith("he") ? "he" : "en";
}

export function htmlClassForTheme(
	themePreference: ThemePreference,
	theme: ResolvedTheme,
): string | undefined {
	// Keep system preference class-free so CSS @media (prefers-color-scheme) can win.
	if (themePreference === "system") return undefined;
	return theme;
}

export const copy = {
	en: {
		brand: "Ping",
		themeLabel: "Theme",
		themeSystem: "System",
		themeLight: "Light",
		themeDark: "Dark",
		localeLabel: "Language",
		localeSystem: "System",
		localeEnglish: "English",
		localeHebrew: "עברית",
		accessTitle: "Access Restricted",
		accessBody:
			"Ping is a private space for the two of you. If you already have an account, sign in below.",
		signIn: "Sign In",
		filterAll: "All",
		filterPrivate: "My Private Notes",
		filterDone: "Done",
		priorityUrgent: "Urgent",
		priorityIdea: "Idea",
		priorityRoutine: "Routine",
		tagGroceries: "Groceries",
		tagHome: "Home",
		tagMedical: "Medical",
		tagWork: "Work",
		tagTravel: "Travel",
		authorMe: "Me",
		authorPartner: "Partner",
		emptyTitle: "Nothing here yet",
		emptyBody: "Add a ping to share a note, idea, or reminder.",
		emptyFilteredTitle: "No matching pings",
		emptyFilteredBody: "Try clearing filters or adding a new ping.",
		fabLabel: "Create ping",
		editorCreateTitle: "New ping",
		editorEditTitle: "Edit ping",
		editorBodyLabel: "Note",
		editorBodyPlaceholder: "What's on your mind?",
		editorPriority: "Priority",
		editorTags: "Tags",
		editorTagsPlaceholder: "Choose tags",
		editorDueDate: "Due date (optional)",
		editorPrivate: "Private note",
		editorPrivateHint: "Visible only to you",
		editorSave: "Save ping",
		editorAdd: "Add ping",
		editorCancel: "Cancel",
		editorClose: "Close",
		cardMenu: "Ping actions",
		actionEdit: "Edit",
		actionResolve: "Resolve",
		actionRestore: "Restore",
		actionDelete: "Delete",
		deleteConfirm: "Delete this ping? This cannot be undone.",
		duePrefix: "Due",
		privateBadge: "Private",
	},
	he: {
		brand: "Ping",
		themeLabel: "ערכת נושא",
		themeSystem: "מערכת",
		themeLight: "בהיר",
		themeDark: "כהה",
		localeLabel: "שפה",
		localeSystem: "מערכת",
		localeEnglish: "English",
		localeHebrew: "עברית",
		accessTitle: "הגישה מוגבלת",
		accessBody: "Ping הוא מרחב פרטי לשניכם. אם כבר יש לכם חשבון, התחברו למטה.",
		signIn: "התחברות",
		filterAll: "הכל",
		filterPrivate: "הפתקים הפרטיים שלי",
		filterDone: "הושלם",
		priorityUrgent: "דחוף",
		priorityIdea: "רעיון",
		priorityRoutine: "שגרתי",
		tagGroceries: "מצרכים",
		tagHome: "בית",
		tagMedical: "רפואה",
		tagWork: "עבודה",
		tagTravel: "טיולים",
		authorMe: "אני",
		authorPartner: "פרטנר",
		emptyTitle: "עדיין אין כאן כלום",
		emptyBody: "הוסיפו פינג כדי לשתף פתק, רעיון או תזכורת.",
		emptyFilteredTitle: "אין פינגים תואמים",
		emptyFilteredBody: "נסו לנקות סינון או להוסיף פינג חדש.",
		fabLabel: "פינג חדש",
		editorCreateTitle: "פינג חדש",
		editorEditTitle: "עריכת פינג",
		editorBodyLabel: "פתק",
		editorBodyPlaceholder: "מה על דעתך?",
		editorPriority: "עדיפות",
		editorTags: "תגיות",
		editorTagsPlaceholder: "בחירת תגיות",
		editorDueDate: "תאריך יעד (אופציונלי)",
		editorPrivate: "פתק פרטי",
		editorPrivateHint: "גלוי רק לך",
		editorSave: "שמירת פינג",
		editorAdd: "הוספת פינג",
		editorCancel: "ביטול",
		editorClose: "סגירה",
		cardMenu: "פעולות פינג",
		actionEdit: "עריכה",
		actionResolve: "סימון כהושלם",
		actionRestore: "שחזור",
		actionDelete: "מחיקה",
		deleteConfirm: "למחוק את הפינג? לא ניתן לבטל.",
		duePrefix: "יעד",
		privateBadge: "פרטי",
	},
} as const;

export type CopyKey = keyof typeof copy.en;

export function t(locale: ResolvedLocale, key: CopyKey): string {
	return copy[locale][key];
}
