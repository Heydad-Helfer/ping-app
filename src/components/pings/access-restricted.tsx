"use client";

import { LockIcon, LogInIcon } from "lucide-react";

import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import { SignInOnlyButton } from "#/integrations/clerk/sign-in-only-button";
import { t } from "#/lib/preferences";

export function AccessRestricted() {
	const { locale } = usePreferences();

	return (
		<section className="access-gate">
			<div className="access-gate-card">
				<div className="access-gate-mark">
					<img
						src="/apple-touch-icon.png"
						alt=""
						width={72}
						height={72}
						className="access-gate-icon"
					/>
					<span className="access-gate-lock">
						<LockIcon />
					</span>
				</div>
				<h1 className="font-heading text-headline-md">
					{t(locale, "accessTitle")}
				</h1>
				<p className="max-w-prose text-body-md text-muted-foreground">
					{t(locale, "accessBody")}
				</p>
				<SignInOnlyButton variant="default">
					<Button>
						<LogInIcon data-icon="inline-start" />
						{t(locale, "signIn")}
					</Button>
				</SignInOnlyButton>
			</div>
		</section>
	);
}
