import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { enGB, he } from "react-day-picker/locale";

import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";
import {
	DATE_PRESET_IDS,
	type DatePresetId,
	dateFromPreset,
	formatPingDate,
	isDatePresetId,
	matchingDatePreset,
	parseIsoDate,
	toIsoDate,
} from "#/lib/dates";
import { type CopyKey, t } from "#/lib/preferences";

const PRESET_COPY: Record<DatePresetId, CopyKey> = {
	today: "datePresetToday",
	tomorrow: "datePresetTomorrow",
	nextWeek: "datePresetNextWeek",
	inTwoWeeks: "datePresetInTwoWeeks",
	endOfMonth: "datePresetEndOfMonth",
	nextMonth: "datePresetNextMonth",
};

export function TargetDatePicker({
	id,
	value,
	onChange,
}: {
	id: string;
	value: string;
	onChange: (next: string) => void;
}) {
	const { locale, dir } = usePreferences();
	const selected = value ? (parseIsoDate(value) ?? undefined) : undefined;
	const activePreset = value ? matchingDatePreset(value) : undefined;
	const [open, setOpen] = useState(false);
	const [month, setMonth] = useState<Date>(() => selected ?? new Date());

	function commit(date: Date | undefined) {
		onChange(date ? toIsoDate(date) : "");
		if (date) setMonth(date);
		setOpen(false);
	}

	return (
		<Popover
			open={open}
			onOpenChange={(next) => {
				setOpen(next);
				if (next) setMonth(selected ?? new Date());
			}}
		>
			<PopoverTrigger
				render={
					<Button
						id={id}
						variant="outline"
						data-empty={!selected}
						className="min-h-touch w-full justify-between text-start font-normal data-[empty=true]:text-muted-foreground"
					/>
				}
			>
				{selected ? (
					formatPingDate(value, locale)
				) : (
					<span>{t(locale, "editorDuePlaceholder")}</span>
				)}
				<ChevronDownIcon data-icon="inline-end" />
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="w-auto flex-row items-stretch gap-0 overflow-hidden p-0"
				dir={dir}
			>
				<div className="flex w-max min-w-36 flex-col justify-between gap-1 border-e p-2">
					<ToggleGroup
						orientation="vertical"
						spacing={1}
						className="flex w-full flex-col items-stretch"
						value={activePreset ? [activePreset] : []}
						onValueChange={(next) => {
							const preset = next[0];
							if (!preset || !isDatePresetId(preset)) return;
							commit(dateFromPreset(preset));
						}}
					>
						{DATE_PRESET_IDS.map((preset) => (
							<ToggleGroupItem
								key={preset}
								value={preset}
								className="w-full justify-start font-normal"
							>
								{t(locale, PRESET_COPY[preset])}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					{selected ? (
						<Button
							variant="ghost"
							size="xs"
							className="h-8 min-h-0 w-full justify-start px-2.5 font-normal text-muted-foreground"
							onClick={() => commit(undefined)}
						>
							{t(locale, "editorDueClear")}
						</Button>
					) : null}
				</div>
				<Calendar
					mode="single"
					selected={selected}
					onSelect={commit}
					month={month}
					onMonthChange={setMonth}
					autoFocus={open}
					fixedWeeks
					dir={dir}
					locale={locale === "he" ? he : enGB}
					className="p-3 [--cell-size:--spacing(8)]"
				/>
			</PopoverContent>
		</Popover>
	);
}
