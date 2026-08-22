"use client";

import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { XIcon } from "lucide-react";
import { useEffect, useId, useState, useTransition } from "react";
import { TargetDatePicker } from "#/components/pings/target-date-picker";
import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "#/components/ui/drawer";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";
import { priorityLabel, tagLabel } from "#/lib/ping-labels";
import {
	isPriorityToken,
	type PingListItem,
	type PingWrite,
	PRIORITY_TOKENS,
	parseTagTokens,
	TAG_TOKENS,
	type TagToken,
} from "#/lib/pings";
import { createPingFn, updatePingFn } from "#/lib/pings.functions";
import { t } from "#/lib/preferences";

export type EditorState =
	| { open: false }
	| { open: true; mode: "create" }
	| { open: true; mode: "edit"; ping: PingListItem };

export function PingEditor({
	state,
	onClose,
}: {
	state: EditorState;
	onClose: () => void;
}) {
	const desktop = useDesktop();
	const { locale } = usePreferences();
	const title = t(
		locale,
		state.open && state.mode === "edit"
			? "editorEditTitle"
			: "editorCreateTitle",
	);

	if (desktop) {
		return (
			<Dialog open={state.open} onOpenChange={(open) => !open && onClose()}>
				<DialogContent className="gap-8 sm:max-w-lg" showCloseButton>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					{state.open ? (
						<PingForm
							key={state.mode === "edit" ? state.ping.id : "create"}
							state={state}
							onClose={onClose}
							footer="dialog"
						/>
					) : null}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={state.open}
			onOpenChange={(open) => !open && onClose()}
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
								aria-label={t(locale, "editorClose")}
							/>
						}
					>
						<XIcon />
					</DrawerClose>
				</DrawerHeader>
				{state.open ? (
					<PingForm
						key={state.mode === "edit" ? state.ping.id : "create"}
						state={state}
						onClose={onClose}
						footer="drawer"
					/>
				) : null}
			</DrawerContent>
		</Drawer>
	);
}

function PingForm({
	state,
	onClose,
	footer,
}: {
	state: Extract<EditorState, { open: true }>;
	onClose: () => void;
	footer: "dialog" | "drawer";
}) {
	const { locale } = usePreferences();
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const createPing = useServerFn(createPingFn);
	const updatePing = useServerFn(updatePingFn);
	const bodyId = useId();
	const priorityId = useId();
	const tagsId = useId();
	const dateId = useId();
	const privateId = useId();
	const priorityItems = PRIORITY_TOKENS.map((token) => ({
		value: token,
		label: priorityLabel(locale, token),
	}));
	const tagItems = TAG_TOKENS.map((token) => ({
		value: token,
		label: tagLabel(locale, token),
	}));

	const initial = state.mode === "edit" ? state.ping : null;
	const [body, setBody] = useState(initial?.body ?? "");
	const [priority, setPriority] = useState(initial?.priority ?? "routine");
	const [tags, setTags] = useState<TagToken[]>(initial?.tags ?? []);
	const [targetDate, setTargetDate] = useState(initial?.targetDate ?? "");
	const [isPrivate, setIsPrivate] = useState(initial?.isPrivate ?? false);

	function submit() {
		const payload: PingWrite = {
			body,
			isPrivate,
			priority,
			tags,
			targetDate: targetDate || null,
		};

		startTransition(async () => {
			if (state.mode === "edit") {
				await updatePing({ data: { id: state.ping.id, ...payload } });
			} else {
				await createPing({ data: payload });
			}
			await router.invalidate();
			onClose();
		});
	}

	const fields = (
		<FieldGroup className={footer === "drawer" ? "px-4" : undefined}>
			<Field>
				<FieldLabel htmlFor={bodyId}>{t(locale, "editorBodyLabel")}</FieldLabel>
				<Textarea
					id={bodyId}
					value={body}
					onChange={(event) => setBody(event.target.value)}
					placeholder={t(locale, "editorBodyPlaceholder")}
					className="min-h-32"
					required
				/>
			</Field>
			<Field>
				<FieldLabel htmlFor={priorityId}>
					{t(locale, "editorPriority")}
				</FieldLabel>
				<Select
					items={priorityItems}
					value={priority}
					onValueChange={(value) => {
						if (typeof value === "string" && isPriorityToken(value)) {
							setPriority(value);
						}
					}}
				>
					<SelectTrigger id={priorityId} className="min-h-touch w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent align="start" alignItemWithTrigger={false}>
						<SelectGroup>
							{priorityItems.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel htmlFor={tagsId}>{t(locale, "editorTags")}</FieldLabel>
				<Select
					items={tagItems}
					multiple
					value={tags}
					onValueChange={(value) => setTags(parseTagTokens(value))}
				>
					<SelectTrigger id={tagsId} className="min-h-touch w-full">
						<SelectValue>
							{(value: TagToken[]) =>
								value.length === 0
									? t(locale, "editorTagsPlaceholder")
									: value.map((token) => tagLabel(locale, token)).join(", ")
							}
						</SelectValue>
					</SelectTrigger>
					<SelectContent align="start" alignItemWithTrigger={false}>
						<SelectGroup>
							{tagItems.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel htmlFor={dateId}>{t(locale, "editorDueDate")}</FieldLabel>
				<TargetDatePicker
					id={dateId}
					value={targetDate}
					onChange={setTargetDate}
				/>
			</Field>
			<Field orientation="horizontal">
				<Checkbox
					id={privateId}
					checked={isPrivate}
					onCheckedChange={setIsPrivate}
				/>
				<FieldContent>
					<FieldLabel htmlFor={privateId}>
						{t(locale, "editorPrivate")}
					</FieldLabel>
					<FieldDescription>{t(locale, "editorPrivateHint")}</FieldDescription>
				</FieldContent>
			</Field>
		</FieldGroup>
	);

	const actions = (
		<>
			{footer === "dialog" ? (
				<Button type="button" variant="outline" onClick={onClose}>
					{t(locale, "editorCancel")}
				</Button>
			) : null}
			<Button
				type="button"
				onClick={submit}
				disabled={pending || body.trim().length === 0}
				className="w-full sm:w-auto"
			>
				{t(locale, state.mode === "edit" ? "editorSave" : "editorAdd")}
			</Button>
		</>
	);

	if (footer === "dialog") {
		return (
			<>
				{fields}
				<DialogFooter>{actions}</DialogFooter>
			</>
		);
	}

	return (
		<>
			<div className="min-h-0 flex-1 overflow-y-auto py-4">{fields}</div>
			<DrawerFooter>{actions}</DrawerFooter>
		</>
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
