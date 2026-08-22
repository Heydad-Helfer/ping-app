import { useRouter } from "@tanstack/react-router";
import { RefreshCwIcon } from "lucide-react";
import { useState } from "react";

import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import { t } from "#/lib/preferences";
import { cn } from "#/lib/utils";

export function HeaderRefresh() {
	const { locale } = usePreferences();
	const router = useRouter();
	const [pending, setPending] = useState(false);
	const label = t(locale, "refreshLabel");

	async function refresh() {
		if (pending) return;
		setPending(true);
		try {
			await router.invalidate();
		} finally {
			setPending(false);
		}
	}

	return (
		<div className="header-refresh">
			<Button
				variant="ghost"
				size="icon"
				aria-label={label}
				aria-busy={pending}
				disabled={pending}
				onClick={() => {
					void refresh();
				}}
			>
				<RefreshCwIcon className={cn(pending && "animate-spin")} />
			</Button>
		</div>
	);
}
