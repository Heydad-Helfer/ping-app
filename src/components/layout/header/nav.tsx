import { Link } from "@tanstack/react-router";

import { usePreferences } from "#/components/preferences-provider";
import { type CopyKey, t } from "#/lib/preferences";
import { cn } from "#/lib/utils";

const mockNav: Array<{
	to: "/";
	key: Extract<CopyKey, "navHome" | "navInbox" | "navSettings">;
	mock?: boolean;
}> = [
	{ to: "/", key: "navHome" },
	{ to: "/", key: "navInbox", mock: true },
	{ to: "/", key: "navSettings", mock: true },
];

export function HeaderNav() {
	const { locale } = usePreferences();

	return (
		<nav aria-label="Primary" className="app-header-nav">
			{mockNav.map((item) => (
				<Link
					key={item.key}
					to={item.to}
					aria-disabled={item.mock || undefined}
					className={cn(
						"app-header-nav-link",
						item.mock && "app-header-nav-link-mock",
					)}
					onClick={item.mock ? (event) => event.preventDefault() : undefined}
				>
					{t(locale, item.key)}
				</Link>
			))}
		</nav>
	);
}
