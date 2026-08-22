import { LocaleMenu } from "#/components/layout/header/locale-menu";
import { HeaderRefresh } from "#/components/layout/header/refresh-button";
import { ThemeMenu } from "#/components/layout/header/theme-menu";
import HeaderUser from "#/integrations/clerk/header-user";

export function HeaderActions() {
	return (
		<div className="app-header-actions">
			<HeaderRefresh />
			<LocaleMenu />
			<ThemeMenu />
			<HeaderUser />
		</div>
	);
}
