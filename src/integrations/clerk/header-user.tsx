import { Show, UserButton } from "@clerk/tanstack-react-start";

import { SignInOnlyButton } from "#/integrations/clerk/sign-in-only-button";

export default function HeaderUser() {
	return (
		<>
			<Show when="signed-in">
				<UserButton />
			</Show>
			<Show when="signed-out">
				<SignInOnlyButton />
			</Show>
		</>
	);
}
