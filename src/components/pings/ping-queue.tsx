import { InboxIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { FilterBar } from "#/components/pings/filter-bar";
import { PingCard } from "#/components/pings/ping-card";
import { type EditorState, PingEditor } from "#/components/pings/ping-editor";
import { PingFocus } from "#/components/pings/ping-focus";
import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty";
import {
	isSearchCleared,
	type PingListItem,
	type PingSearch,
} from "#/lib/pings";
import { t } from "#/lib/preferences";

export function PingQueue({
	pings,
	focusedPing,
	search,
}: {
	pings: PingListItem[];
	focusedPing: PingListItem | null;
	search: PingSearch;
}) {
	const { locale } = usePreferences();
	const [editor, setEditor] = useState<EditorState>({ open: false });
	const filteredEmpty = pings.length === 0 && !isSearchCleared(search);

	return (
		<div className="ping-queue">
			<FilterBar search={search} />
			{pings.length === 0 ? (
				<Empty className="border">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<InboxIcon />
						</EmptyMedia>
						<EmptyTitle>
							{t(locale, filteredEmpty ? "emptyFilteredTitle" : "emptyTitle")}
						</EmptyTitle>
						<EmptyDescription>
							{t(locale, filteredEmpty ? "emptyFilteredBody" : "emptyBody")}
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			) : (
				<ul className="ping-list">
					{pings.map((ping) => (
						<li key={ping.id}>
							<PingCard
								ping={ping}
								onEdit={(next) =>
									setEditor({ open: true, mode: "edit", ping: next })
								}
							/>
						</li>
					))}
				</ul>
			)}
			<div className="ping-fab-slot">
				<div className="ping-fab-slot-inner">
					<Button
						variant="fab"
						size="fab"
						className="ping-fab"
						aria-label={t(locale, "fabLabel")}
						onClick={() => setEditor({ open: true, mode: "create" })}
					>
						<PlusIcon />
					</Button>
				</div>
			</div>
			<PingFocus
				pingId={search.ping}
				ping={focusedPing}
				search={search}
				onEdit={(next) => setEditor({ open: true, mode: "edit", ping: next })}
			/>
			<PingEditor state={editor} onClose={() => setEditor({ open: false })} />
		</div>
	);
}
