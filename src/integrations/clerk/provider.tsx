import { ClerkProvider } from "@clerk/tanstack-react-start";

const clerkAppearance = {
	layout: {
		socialButtonsPlacement: "bottom" as const,
		showOptionalFields: false,
	},
	elements: {
		footerAction: { display: "none" },
		footerActionText: { display: "none" },
		footerActionLink: { display: "none" },
	},
};

export default function AppClerkProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider appearance={clerkAppearance} signInFallbackRedirectUrl="/">
			{children}
		</ClerkProvider>
	);
}
