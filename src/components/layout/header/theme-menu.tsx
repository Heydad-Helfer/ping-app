import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { type ThemePreference, t } from "#/lib/preferences";

export function ThemeMenu() {
	const { locale, themePreference, setThemePreference } = usePreferences();

	const Icon =
		themePreference === "dark"
			? MoonIcon
			: themePreference === "light"
				? SunIcon
				: MonitorIcon;

	const label = t(locale, "themeLabel");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon" aria-label={label} />}
			>
				<Icon data-icon="inline-start" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-40">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{label}</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={themePreference}
						onValueChange={(next) => {
							if (isThemePreference(next)) setThemePreference(next);
						}}
					>
						<DropdownMenuRadioItem value="system">
							<MonitorIcon data-icon="inline-start" />
							{t(locale, "themeSystem")}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="light">
							<SunIcon data-icon="inline-start" />
							{t(locale, "themeLight")}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="dark">
							<MoonIcon data-icon="inline-start" />
							{t(locale, "themeDark")}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function isThemePreference(value: string): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark";
}
