import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { AppLayout } from "#/components/layout/app-layout";
import { PreferencesProvider } from "#/components/preferences-provider";
import ClerkProvider from "#/integrations/clerk/provider";
import { htmlClassForTheme, type PreferencesState } from "#/lib/preferences";
import { getPreferencesForClientNav } from "#/lib/preferences.client";
import { getPreferencesServerFn } from "#/lib/preferences.functions";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	beforeLoad: async (): Promise<{ preferences: PreferencesState }> => {
		if (typeof window === "undefined") {
			return { preferences: await getPreferencesServerFn() };
		}
		return { preferences: getPreferencesForClientNav() };
	},
	head: ({ match }) => {
		const preferences = match.context.preferences;
		const themeColor =
			preferences?.theme === "dark"
				? "oklch(0.19 0.041 265.486)"
				: "oklch(0.981 0.003 247.858)";

		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, viewport-fit=cover",
				},
				{
					name: "color-scheme",
					content: "light dark",
				},
				{
					name: "theme-color",
					content: themeColor,
				},
				{
					name: "mobile-web-app-capable",
					content: "yes",
				},
				{
					name: "apple-mobile-web-app-capable",
					content: "yes",
				},
				{
					name: "apple-mobile-web-app-status-bar-style",
					content: "black-translucent",
				},
				{
					title: "Ping",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					href: "/favicon.ico",
					sizes: "48x48",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "manifest",
					href: "/site.webmanifest",
				},
			],
		};
	},
	component: RootComponent,
	shellComponent: RootDocument,
});

function RootComponent() {
	const { preferences } = Route.useRouteContext();

	return (
		<PreferencesProvider initial={preferences}>
			<AppLayout>
				<Outlet />
			</AppLayout>
		</PreferencesProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { preferences } = Route.useRouteContext();
	const themeClass = htmlClassForTheme(
		preferences.themePreference,
		preferences.theme,
	);

	return (
		<html
			lang={preferences.locale}
			dir={preferences.dir}
			className={themeClass}
		>
			<head>
				<HeadContent />
			</head>
			<body>
				<ClerkProvider>
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ClerkProvider>
				<Scripts />
			</body>
		</html>
	);
}
