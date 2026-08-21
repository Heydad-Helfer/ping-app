import { createFileRoute } from "@tanstack/react-router";

import { usePreferences } from "#/components/preferences-provider";
import { t } from "#/lib/preferences";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { locale } = usePreferences();

	return (
		<section className="home-section">
			<h1 className="home-title">{t(locale, "homeTitle")}</h1>
			<p className="home-body">{t(locale, "homeBody")}</p>
			<p className="home-placeholder">{t(locale, "homePlaceholder")}</p>
		</section>
	);
}
