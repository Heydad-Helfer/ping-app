import { SignInButton } from "@clerk/tanstack-react-start";
import { LogInIcon } from "lucide-react";
import type { ReactNode } from "react";

import { usePreferences } from "#/components/preferences-provider";
import { Button } from "#/components/ui/button";
import { t } from "#/lib/preferences";

export function SignInOnlyButton({
	children,
	variant = "ghost",
}: {
	children?: ReactNode;
	variant?: "ghost" | "default";
}) {
	const { locale } = usePreferences();

	return (
		<SignInButton mode="modal" forceRedirectUrl="/" withSignUp={false}>
			{children ?? (
				<Button variant={variant}>
					<LogInIcon data-icon="inline-start" />
					{t(locale, "signIn")}
				</Button>
			)}
		</SignInButton>
	);
}
