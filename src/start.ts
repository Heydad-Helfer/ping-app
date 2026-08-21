import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import {
	createCsrfMiddleware,
	createMiddleware,
	createStart,
} from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

import {
	detectClientSystemLocale,
	detectClientSystemTheme,
	SYSTEM_LOCALE_HEADER,
	SYSTEM_THEME_HEADER,
} from "#/lib/preferences";

const csrfMiddleware = createCsrfMiddleware({
	filter: (context) => context.handlerType === "serverFn",
});

/**
 * Ask supporting browsers to send Sec-CH-Prefers-Color-Scheme on (re)requests
 * so SSR can resolve `theme=system` without a flash.
 */
const clientHintsMiddleware = createMiddleware().server(async ({ next }) => {
	setResponseHeader("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
	setResponseHeader("Critical-CH", "Sec-CH-Prefers-Color-Scheme");
	setResponseHeader(
		"Vary",
		"Sec-CH-Prefers-Color-Scheme, Accept-Language, Cookie",
	);
	return next();
});

function withSystemPreferenceHeaders(
	url: string | URL | RequestInfo,
	init?: RequestInit,
): Promise<Response> {
	const headers = new Headers(init?.headers);
	headers.set(SYSTEM_THEME_HEADER, detectClientSystemTheme());
	headers.set(SYSTEM_LOCALE_HEADER, detectClientSystemLocale());
	return fetch(url, { ...init, headers });
}

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware, clerkMiddleware(), clientHintsMiddleware],
	serverFns: {
		fetch: withSystemPreferenceHeaders,
	},
}));
