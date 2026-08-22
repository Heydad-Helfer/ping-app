import { Link } from "@tanstack/react-router";

import { usePreferences } from "#/components/preferences-provider";
import { t } from "#/lib/preferences";

export function HeaderBrand() {
	const { locale } = usePreferences();

	return (
		<Link to="/" search={{}} className="app-header-brand">
			<img
				src="/favicon-32x32.png"
				alt=""
				width={28}
				height={28}
				className="app-header-brand-mark"
			/>
			<span className="app-header-brand-name">{t(locale, "brand")}</span>
		</Link>
	);
}
