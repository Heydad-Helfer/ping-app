import { ClientOnly } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Header } from "#/components/layout/header";
import { ResumeInvalidate } from "#/components/layout/resume-invalidate";

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="app-layout">
			<ClientOnly>
				<ResumeInvalidate />
			</ClientOnly>
			<Header />
			<div className="app-layout-content">
				<main className="app-main">{children}</main>
			</div>
		</div>
	);
}
