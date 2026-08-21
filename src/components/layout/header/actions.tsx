import { LocaleMenu } from "#/components/layout/header/locale-menu";
import { ThemeMenu } from "#/components/layout/header/theme-menu";
import HeaderUser from "#/integrations/clerk/header-user";

export function HeaderActions() {
	return (
		<div className="app-header-actions">
			<LocaleMenu />
			<ThemeMenu />
			<HeaderUser />
		</div>
	);
}
