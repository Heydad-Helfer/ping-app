import type { ReactNode } from "react";

import { Header } from "#/components/layout/header";

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="app-layout">
			<Header />
			<div className="app-layout-content">
				<main className="app-main">{children}</main>
			</div>
		</div>
	);
}
