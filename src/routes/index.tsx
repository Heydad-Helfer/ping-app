import { createFileRoute } from "@tanstack/react-router";

import { AccessRestricted } from "#/components/pings/access-restricted";
import { PingQueue } from "#/components/pings/ping-queue";
import { pingSearchSchema } from "#/lib/pings";
import { getSessionFn, listPingsFn } from "#/lib/pings.functions";

export const Route = createFileRoute("/")({
	validateSearch: pingSearchSchema,
	loaderDeps: ({ search }) => search,
	beforeLoad: async () => {
		const session = await getSessionFn();
		return { session };
	},
	loader: async ({ context, deps }) => {
		if (!context.session.userId) {
			return { signedIn: false as const, pings: [] };
		}
		const pings = await listPingsFn({ data: deps });
		return { signedIn: true as const, pings };
	},
	component: Home,
});

function Home() {
	const data = Route.useLoaderData();
	const search = Route.useSearch();

	if (!data.signedIn) {
		return <AccessRestricted />;
	}

	return <PingQueue pings={data.pings} search={search} />;
}
