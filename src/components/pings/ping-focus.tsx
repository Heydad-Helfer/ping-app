import { useNavigate } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { PingCard } from "#/components/pings/ping-card";
import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "#/components/ui/drawer";
import {
	omitPingFromSearch,
	type PingListItem,
	type PingSearch,
} from "#/lib/pings";
import { t } from "#/lib/preferences";

export function PingFocus({
	pingId,
	ping,
	search,
	onEdit,
}: {
	pingId: string | undefined;
	ping: PingListItem | null;
	search: PingSearch;
	onEdit: (ping: PingListItem) => void;
}) {
	const open = Boolean(pingId);
	const desktop = useDesktop();
	const { locale } = usePreferences();
	const navigate = useNavigate({ from: "/" });

	function close() {
		void navigate({
			to: "/",
			search: omitPingFromSearch(search),
		});
	}

	const title = t(locale, ping ? "focusTitle" : "focusUnavailableTitle");

	const body = ping ? (
		<PingCard ping={ping} onEdit={onEdit} onDeleted={close} />
	) : (
		<p className="text-body-md text-muted-foreground">
			{t(locale, "focusUnavailableBody")}
		</p>
	);

	if (desktop) {
		return (
			<Dialog open={open} onOpenChange={(next) => !next && close()}>
				<DialogContent className="gap-6 sm:max-w-lg" showCloseButton>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					{open ? body : null}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={(next) => !next && close()}
			showSwipeHandle
		>
			<DrawerContent>
				<DrawerHeader className="flex flex-row items-center justify-between">
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerClose
						render={
							<Button
								variant="ghost"
								size="icon"
								aria-label={t(locale, "focusClose")}
							/>
						}
					>
						<XIcon />
					</DrawerClose>
				</DrawerHeader>
				<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
					{open ? body : null}
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function useDesktop() {
	const [desktop, setDesktop] = useState(false);

	useEffect(() => {
		const media = window.matchMedia("(min-width: 48rem)");
		const sync = () => setDesktop(media.matches);
		sync();
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);

	return desktop;
}
