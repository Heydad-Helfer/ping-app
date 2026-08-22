import { HeaderActions } from "#/components/layout/header/actions";
import { HeaderBrand } from "#/components/layout/header/brand";

export function Header() {
	return (
		<header className="app-header">
			<div className="app-header-bar">
				<HeaderBrand />
				<HeaderActions />
			</div>
		</header>
	);
}
