import type { PreferencesState } from "#/lib/preferences";
import {
	buildPreferencesState,
	detectClientSystemLocale,
	detectClientSystemTheme,
} from "#/lib/preferences";

let clientPreferencesCache: PreferencesState | null = null;

export function getPreferencesForClientNav(): PreferencesState {
	if (clientPreferencesCache) return clientPreferencesCache;

	return buildPreferencesState({
		systemTheme: detectClientSystemTheme(),
		systemLocale: detectClientSystemLocale(),
	});
}

export function setPreferencesForClientNav(state: PreferencesState): void {
	clientPreferencesCache = state;
}
