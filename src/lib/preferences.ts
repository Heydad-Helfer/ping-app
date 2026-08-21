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
		navHome: "Home",
		navInbox: "Inbox",
		navSettings: "Settings",
		themeLabel: "Theme",
		themeSystem: "System",
		themeLight: "Light",
		themeDark: "Dark",
		localeLabel: "Language",
		localeSystem: "System",
		localeEnglish: "English",
		localeHebrew: "עברית",
		homeTitle: "Stay in sync",
		homeBody:
			"Ping keeps your team’s signals clear—capture ideas, flag what’s urgent, and keep routines humming.",
		homePlaceholder: "Main content will live here as routes land.",
	},
	he: {
		brand: "Ping",
		navHome: "בית",
		navInbox: "דואר נכנס",
		navSettings: "הגדרות",
		themeLabel: "ערכת נושא",
		themeSystem: "מערכת",
		themeLight: "בהיר",
		themeDark: "כהה",
		localeLabel: "שפה",
		localeSystem: "מערכת",
		localeEnglish: "English",
		localeHebrew: "עברית",
		homeTitle: "להישאר מסונכרנים",
		homeBody:
			"Ping שומר על האותות של הצוות ברורים—ללכוד רעיונות, לסמן דחוף, ולשמור על שגרה חיה.",
		homePlaceholder: "תוכן ראשי יופיע כאן כשהמסלולים יתווספו.",
	},
} as const;

export type CopyKey = keyof typeof copy.en;

export function t(locale: ResolvedLocale, key: CopyKey): string {
	return copy[locale][key];
}
