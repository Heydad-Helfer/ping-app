import { useRouter } from "@tanstack/react-router";
import {
	createContext,
	type ReactNode,
	startTransition,
	use,
	useEffect,
	useOptimistic,
	useRef,
} from "react";
import {
	buildPreferencesState,
	detectClientSystemLocale,
	detectClientSystemTheme,
	htmlClassForTheme,
	type LocalePreference,
	type PreferencesState,
	type ThemePreference,
} from "#/lib/preferences";
import {
	setLocalePreferenceServerFn,
	setThemePreferenceServerFn,
} from "#/lib/preferences.functions";
import {
	getPreferencesForClientNav,
	setPreferencesForClientNav,
} from "#/lib/preferences-cache";

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

type PreferencesContextValue = PreferencesState & {
	setThemePreference: (preference: ThemePreference) => void;
	setLocalePreference: (preference: LocalePreference) => void;
};

export function PreferencesProvider({
	initial,
	children,
}: {
	initial: PreferencesState;
	children: ReactNode;
}) {
	const router = useRouter();
	const [state, setOptimisticState] = useOptimistic(initial);
	const requestRef = useRef(0);

	useEffect(() => {
		setPreferencesForClientNav(initial);
	}, [initial]);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const syncSystem = () => {
			const cached = getPreferencesForClientNav();
			const next = buildPreferencesState({
				themePreference: cached.themePreference,
				localePreference: cached.localePreference,
				systemTheme: detectClientSystemTheme(),
				systemLocale: detectClientSystemLocale(),
			});
			setPreferencesForClientNav(next);
			applyDocumentPreferences(next);
		};

		media.addEventListener("change", syncSystem);
		return () => media.removeEventListener("change", syncSystem);
	}, []);

	useEffect(() => {
		applyDocumentPreferences(state);
	}, [state]);

	const setThemePreference = (preference: ThemePreference) => {
		const id = ++requestRef.current;
		const next = buildPreferencesState({
			themePreference: preference,
			localePreference: state.localePreference,
			systemTheme: detectClientSystemTheme(),
			systemLocale: detectClientSystemLocale(),
		});
		setPreferencesForClientNav(next);
		applyDocumentPreferences(next);

		startTransition(async () => {
			setOptimisticState(next);
			const saved = await setThemePreferenceServerFn({ data: preference });
			if (id === requestRef.current) {
				setPreferencesForClientNav(saved);
				await router.invalidate();
			}
		});
	};

	const setLocalePreference = (preference: LocalePreference) => {
		const id = ++requestRef.current;
		const next = buildPreferencesState({
			themePreference: state.themePreference,
			localePreference: preference,
			systemTheme: detectClientSystemTheme(),
			systemLocale: detectClientSystemLocale(),
		});
		setPreferencesForClientNav(next);
		applyDocumentPreferences(next);

		startTransition(async () => {
			setOptimisticState(next);
			const saved = await setLocalePreferenceServerFn({ data: preference });
			if (id === requestRef.current) {
				setPreferencesForClientNav(saved);
				await router.invalidate();
			}
		});
	};

	return (
		<PreferencesContext
			value={{
				...state,
				setThemePreference,
				setLocalePreference,
			}}
		>
			{children}
		</PreferencesContext>
	);
}

export function usePreferences(): PreferencesContextValue {
	const ctx = use(PreferencesContext);
	if (!ctx) {
		throw new Error("usePreferences must be used within PreferencesProvider");
	}
	return ctx;
}

function applyDocumentPreferences(state: PreferencesState) {
	if (typeof document === "undefined") return;

	const root = document.documentElement;
	root.lang = state.locale;
	root.dir = state.dir;

	root.classList.remove("light", "dark");
	const themeClass = htmlClassForTheme(state.themePreference, state.theme);
	if (themeClass) root.classList.add(themeClass);
}
