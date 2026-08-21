import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="page-shell">
			<div className="page-content flex flex-col gap-4">
				<h1>Welcome to TanStack Start</h1>
				<p className="text-body-lg text-muted-foreground">
					Edit{" "}
					<code className="text-body-sm text-foreground">
						src/routes/index.tsx
					</code>{" "}
					to get started.
				</p>
			</div>
		</div>
	);
}
