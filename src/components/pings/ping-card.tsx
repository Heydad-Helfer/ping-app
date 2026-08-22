import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
	CheckIcon,
	EllipsisIcon,
	LightbulbIcon,
	LockIcon,
	RotateCcwIcon,
	ShareIcon,
} from "lucide-react";
import { useState, useTransition } from "react";

import { usePreferences } from "#/components/preferences-provider";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
} from "#/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { formatPingDate, formatRelativeCreated } from "#/lib/dates";
import { priorityLabel, tagLabel } from "#/lib/ping-labels";
import type { PingListItem } from "#/lib/pings";
import { deletePingFn, setPingResolvedFn } from "#/lib/pings.functions";
import { t } from "#/lib/preferences";
import { sharePingLink } from "#/lib/share-ping";
import { cn } from "#/lib/utils";

export function PingCard({
	ping,
	onEdit,
	onDeleted,
}: {
	ping: PingListItem;
	onEdit: (ping: PingListItem) => void;
	onDeleted?: () => void;
}) {
	const { locale } = usePreferences();
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [shareLabel, setShareLabel] = useState<"share" | "copied" | "failed">(
		"share",
	);
	const setResolved = useServerFn(setPingResolvedFn);
	const removePing = useServerFn(deletePingFn);

	const authorLabel =
		ping.author.relation === "me"
			? t(locale, "authorMe")
			: t(locale, "authorPartner");
	const createdLabel = formatRelativeCreated(ping.createdAt, locale);

	function run(action: () => Promise<unknown>) {
		startTransition(async () => {
			await action();
			await router.invalidate();
		});
	}

	function share() {
		startTransition(async () => {
			const result = await sharePingLink(ping.id, t(locale, "brand"));
			if (result === "copied") {
				setShareLabel("copied");
				window.setTimeout(() => setShareLabel("share"), 2000);
			} else if (result === "failed") {
				setShareLabel("failed");
				window.setTimeout(() => setShareLabel("share"), 2000);
			}
		});
	}

	return (
		<Card
			className={cn(
				"ping-card",
				ping.priority === "urgent" && "ping-card-urgent",
				ping.resolved && "ping-card-resolved",
			)}
		>
			<CardHeader className="border-b-0">
				<div className="flex min-w-0 items-center gap-2">
					<Avatar size="sm">
						{ping.author.imageUrl ? (
							<AvatarImage src={ping.author.imageUrl} alt="" />
						) : null}
						<AvatarFallback>{ping.author.initials}</AvatarFallback>
					</Avatar>
					<p className="truncate text-label-md text-muted-foreground">
						{authorLabel}
						{createdLabel ? ` · ${createdLabel}` : null}
					</p>
				</div>
				<CardAction className="flex items-center gap-1">
					<PriorityBadge priority={ping.priority} locale={locale} />
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									size="icon"
									aria-label={t(locale, "cardMenu")}
									disabled={pending}
								/>
							}
						>
							<EllipsisIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-40">
							<DropdownMenuGroup>
								{ping.canEdit ? (
									<DropdownMenuItem onClick={() => onEdit(ping)}>
										{t(locale, "actionEdit")}
									</DropdownMenuItem>
								) : null}
								<DropdownMenuItem onClick={share}>
									<ShareIcon />
									{t(
										locale,
										shareLabel === "copied"
											? "linkCopied"
											: shareLabel === "failed"
												? "linkCopyFailed"
												: "actionShare",
									)}
								</DropdownMenuItem>
								{ping.canResolve ? (
									<DropdownMenuItem
										onClick={() =>
											run(() =>
												setResolved({
													data: { id: ping.id, resolved: !ping.resolved },
												}),
											)
										}
									>
										{ping.resolved ? <RotateCcwIcon /> : <CheckIcon />}
										{t(
											locale,
											ping.resolved ? "actionRestore" : "actionResolve",
										)}
									</DropdownMenuItem>
								) : null}
								{ping.canDelete ? (
									<DropdownMenuItem
										variant="destructive"
										onClick={() => {
											if (!window.confirm(t(locale, "deleteConfirm"))) return;
											run(async () => {
												await removePing({ data: { id: ping.id } });
												onDeleted?.();
											});
										}}
									>
										{t(locale, "actionDelete")}
									</DropdownMenuItem>
								) : null}
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						"whitespace-pre-wrap text-body-md",
						ping.resolved
							? "text-muted-foreground line-through"
							: "text-foreground",
					)}
				>
					{ping.body}
				</p>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2">
				{ping.resolved ? (
					<Badge variant="secondary">
						<CheckIcon data-icon="inline-start" />
						{t(locale, "resolvedBadge")}
					</Badge>
				) : null}
				{ping.isPrivate ? (
					<Badge variant="secondary">
						<LockIcon data-icon="inline-start" />
						{t(locale, "privateBadge")}
					</Badge>
				) : null}
				{ping.tags.map((token) => (
					<Badge key={token} variant="outline">
						{tagLabel(locale, token)}
					</Badge>
				))}
				{ping.targetDate ? (
					<Badge variant="outline">
						{t(locale, "duePrefix")} {formatPingDate(ping.targetDate, locale)}
					</Badge>
				) : null}
			</CardFooter>
		</Card>
	);
}

function PriorityBadge({
	priority,
	locale,
}: {
	priority: PingListItem["priority"];
	locale: Parameters<typeof t>[0];
}) {
	return (
		<Badge
			variant="secondary"
			className={cn(
				priority === "urgent" && "bg-chip-rose text-urgent-red",
				priority === "idea" && "bg-chip-sky text-idea-blue",
				priority === "routine" && "bg-chip-muted text-routine-gray",
			)}
		>
			{priority === "idea" ? <LightbulbIcon data-icon="inline-start" /> : null}
			{priorityLabel(locale, priority)}
		</Badge>
	);
}
