import { createServerFn } from "@tanstack/react-start";
import {
	getCookie,
	getRequestHeader,
	setCookie,
} from "@tanstack/react-start/server";
import { z } from "zod";

import {
	buildPreferencesState,
	COOKIE_MAX_AGE,
	LOCALE_COOKIE,
	LOCALE_PREFERENCES,
	type PreferencesState,
	parseAcceptLanguage,
	parseSecChPrefersColorScheme,
	SYSTEM_LOCALE_HEADER,
	SYSTEM_THEME_HEADER,
	THEME_COOKIE,
	THEME_PREFERENCES,
} from "#/lib/preferences";

const themePreferenceSchema = z.enum(THEME_PREFERENCES);
const localePreferenceSchema = z.enum(LOCALE_PREFERENCES);

function readSystemThemeFromRequest(): string | undefined {
	return (
		getRequestHeader(SYSTEM_THEME_HEADER) ??
		parseSecChPrefersColorScheme(
			getRequestHeader("sec-ch-prefers-color-scheme"),
		)
	);
}

function readSystemLocaleFromRequest(): string | undefined {
	const fromHeader = getRequestHeader(SYSTEM_LOCALE_HEADER);
	if (fromHeader) return fromHeader;
	return parseAcceptLanguage(getRequestHeader("accept-language"));
}

function cookieOptions() {
	return {
		path: "/",
		maxAge: COOKIE_MAX_AGE,
		sameSite: "lax" as const,
	};
}

export const getPreferencesServerFn = createServerFn({ method: "GET" }).handler(
	(): PreferencesState => {
		return buildPreferencesState({
			themePreference: getCookie(THEME_COOKIE),
			localePreference: getCookie(LOCALE_COOKIE),
			systemTheme: readSystemThemeFromRequest(),
			systemLocale: readSystemLocaleFromRequest(),
		});
	},
);

export const setThemePreferenceServerFn = createServerFn({ method: "POST" })
	.validator(themePreferenceSchema)
	.handler(async ({ data }): Promise<PreferencesState> => {
		setCookie(THEME_COOKIE, data, cookieOptions());
		return buildPreferencesState({
			themePreference: data,
			localePreference: getCookie(LOCALE_COOKIE),
			systemTheme: readSystemThemeFromRequest(),
			systemLocale: readSystemLocaleFromRequest(),
		});
	});

export const setLocalePreferenceServerFn = createServerFn({ method: "POST" })
	.validator(localePreferenceSchema)
	.handler(async ({ data }): Promise<PreferencesState> => {
		setCookie(LOCALE_COOKIE, data, cookieOptions());
		return buildPreferencesState({
			themePreference: getCookie(THEME_COOKIE),
			localePreference: data,
			systemTheme: readSystemThemeFromRequest(),
			systemLocale: readSystemLocaleFromRequest(),
		});
	});
