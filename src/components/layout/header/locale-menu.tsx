import { LanguagesIcon } from "lucide-react";

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
import { type LocalePreference, t } from "#/lib/preferences";

export function LocaleMenu() {
	const { locale, localePreference, setLocalePreference } = usePreferences();
	const label = t(locale, "localeLabel");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon" aria-label={label} />}
			>
				<LanguagesIcon data-icon="inline-start" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-40">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{label}</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={localePreference}
						onValueChange={(next) => {
							if (isLocalePreference(next)) setLocalePreference(next);
						}}
					>
						<DropdownMenuRadioItem value="system">
							{t(locale, "localeSystem")}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="en">
							{t(locale, "localeEnglish")}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="he">
							{t(locale, "localeHebrew")}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function isLocalePreference(value: string): value is LocalePreference {
	return value === "system" || value === "en" || value === "he";
}
