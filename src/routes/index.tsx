import { createFileRoute } from "@tanstack/react-router";

import { usePreferences } from "#/components/preferences-provider";
import { t } from "#/lib/preferences";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { locale } = usePreferences();

	return (
		<section className="flex flex-1 flex-col justify-center gap-4 py-8">
			<h1 className="font-heading text-headline-lg text-foreground">
				{t(locale, "homeTitle")}
			</h1>
			<p className="max-w-prose text-body-lg text-muted-foreground">
				{t(locale, "homeBody")}
			</p>
			<p className="text-body-sm text-muted-foreground">
				{t(locale, "homePlaceholder")}
			</p>
		</section>
	);
}
