import type { ReactNode } from "react";

import { Header } from "#/components/layout/header";

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="app-layout">
			<div className="app-layout-content">
				<Header />
				<main className="app-main">{children}</main>
			</div>
		</div>
	);
}
