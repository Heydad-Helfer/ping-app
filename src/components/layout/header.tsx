import { Link } from "@tanstack/react-router";
import { LanguagesIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
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
import HeaderUser from "#/integrations/clerk/header-user";
import {
	type LocalePreference,
	type ThemePreference,
	t,
} from "#/lib/preferences";
import { cn } from "#/lib/utils";

const mockNav = [
	{ to: "/", key: "navHome" as const },
	{ to: "/", key: "navInbox" as const, mock: true },
	{ to: "/", key: "navSettings" as const, mock: true },
];

export function Header() {
	const {
		locale,
		themePreference,
		localePreference,
		setThemePreference,
		setLocalePreference,
	} = usePreferences();

	return (
		<header className="surface-glass sticky top-0 z-40 border-b border-outline-variant/40">
			<div className="flex h-14 items-center gap-3">
				<Link
					to="/"
					className="flex shrink-0 items-center gap-2 text-foreground no-underline"
				>
					<img
						src="/favicon-32x32.png"
						alt=""
						width={28}
						height={28}
						className="size-7 rounded-sm"
					/>
					<span className="font-heading text-headline-sm tracking-tight">
						{t(locale, "brand")}
					</span>
				</Link>

				<nav
					aria-label="Primary"
					className="mx-auto hidden min-w-0 flex-1 items-center justify-center gap-1 sm:flex"
				>
					{mockNav.map((item) => (
						<Link
							key={item.key}
							to={item.to}
							aria-disabled={item.mock || undefined}
							className={cn(
								"inline-flex h-touch items-center px-3 text-label-md text-muted-foreground transition-colors hover:text-foreground",
								item.mock && "pointer-events-none opacity-60",
							)}
							onClick={
								item.mock ? (event) => event.preventDefault() : undefined
							}
						>
							{t(locale, item.key)}
						</Link>
					))}
				</nav>

				<div className="ms-auto flex shrink-0 items-center gap-1 sm:ms-0">
					<LocaleMenu
						value={localePreference}
						onChange={setLocalePreference}
						label={t(locale, "localeLabel")}
						systemLabel={t(locale, "localeSystem")}
						englishLabel={t(locale, "localeEnglish")}
						hebrewLabel={t(locale, "localeHebrew")}
					/>
					<ThemeMenu
						value={themePreference}
						onChange={setThemePreference}
						label={t(locale, "themeLabel")}
						systemLabel={t(locale, "themeSystem")}
						lightLabel={t(locale, "themeLight")}
						darkLabel={t(locale, "themeDark")}
					/>
					<HeaderUser />
				</div>
			</div>
		</header>
	);
}

function ThemeMenu({
	value,
	onChange,
	label,
	systemLabel,
	lightLabel,
	darkLabel,
}: {
	value: ThemePreference;
	onChange: (value: ThemePreference) => void;
	label: string;
	systemLabel: string;
	lightLabel: string;
	darkLabel: string;
}) {
	const Icon =
		value === "dark" ? MoonIcon : value === "light" ? SunIcon : MonitorIcon;

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
						value={value}
						onValueChange={(next) => {
							if (next === "system" || next === "light" || next === "dark") {
								onChange(next);
							}
						}}
					>
						<DropdownMenuRadioItem value="system">
							<MonitorIcon data-icon="inline-start" />
							{systemLabel}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="light">
							<SunIcon data-icon="inline-start" />
							{lightLabel}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="dark">
							<MoonIcon data-icon="inline-start" />
							{darkLabel}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function LocaleMenu({
	value,
	onChange,
	label,
	systemLabel,
	englishLabel,
	hebrewLabel,
}: {
	value: LocalePreference;
	onChange: (value: LocalePreference) => void;
	label: string;
	systemLabel: string;
	englishLabel: string;
	hebrewLabel: string;
}) {
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
						value={value}
						onValueChange={(next) => {
							if (next === "system" || next === "en" || next === "he") {
								onChange(next);
							}
						}}
					>
						<DropdownMenuRadioItem value="system">
							{systemLabel}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="en">
							{englishLabel}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="he">
							{hebrewLabel}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
