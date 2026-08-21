import type { ReactNode } from "react";

import { Header } from "#/components/layout/header";

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="page-shell flex flex-col gap-gutter">
			<div className="page-content flex min-h-0 flex-1 flex-col gap-gutter">
				<Header />
				<main className="flex min-h-0 flex-1 flex-col">{children}</main>
			</div>
		</div>
	);
}
