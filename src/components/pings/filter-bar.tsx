import { Link } from "@tanstack/react-router";

import { usePreferences } from "#/components/preferences-provider";
import { priorityLabel, tagLabel } from "#/lib/ping-labels";
import {
	isSearchCleared,
	type PingSearch,
	PRIORITY_TOKENS,
	TAG_TOKENS,
	toggleSearchFlag,
	toggleSearchList,
} from "#/lib/pings";
import { t } from "#/lib/preferences";
import { cn } from "#/lib/utils";

export function FilterBar({ search }: { search: PingSearch }) {
	const { locale } = usePreferences();
	const allActive = isSearchCleared(search);

	return (
		<nav aria-label={t(locale, "filterAll")} className="filter-bar">
			<FilterChip
				to="/"
				search={{}}
				active={allActive}
				label={t(locale, "filterAll")}
			/>
			<FilterChip
				to="/"
				search={toggleSearchFlag(search, "private")}
				active={Boolean(search.private)}
				label={t(locale, "filterPrivate")}
			/>
			{PRIORITY_TOKENS.map((token) => (
				<FilterChip
					key={token}
					to="/"
					search={toggleSearchList(search, "priority", token)}
					active={Boolean(search.priority?.includes(token))}
					label={priorityLabel(locale, token)}
					tone={token}
				/>
			))}
			{TAG_TOKENS.map((token) => (
				<FilterChip
					key={token}
					to="/"
					search={toggleSearchList(search, "tag", token)}
					active={Boolean(search.tag?.includes(token))}
					label={tagLabel(locale, token)}
				/>
			))}
			<FilterChip
				to="/"
				search={toggleSearchFlag(search, "resolved")}
				active={Boolean(search.resolved)}
				label={t(locale, "filterDone")}
			/>
		</nav>
	);
}

function FilterChip({
	to,
	search,
	active,
	label,
	tone,
}: {
	to: "/";
	search: PingSearch;
	active: boolean;
	label: string;
	tone?: "urgent" | "idea" | "routine";
}) {
	return (
		<Link
			to={to}
			search={search}
			aria-pressed={active}
			className={cn(
				"filter-chip",
				active && !tone && "filter-chip-active",
				active && tone === "urgent" && "filter-chip-active-urgent",
				active && tone === "idea" && "filter-chip-active-idea",
				active && tone === "routine" && "filter-chip-active-routine",
			)}
		>
			{label}
		</Link>
	);
}
