import { HeaderActions } from "#/components/layout/header/actions";
import { HeaderBrand } from "#/components/layout/header/brand";
import { HeaderNav } from "#/components/layout/header/nav";

export function Header() {
	return (
		<header className="app-header">
			<div className="app-header-bar">
				<HeaderBrand />
				<HeaderNav />
				<HeaderActions />
			</div>
		</header>
	);
}
