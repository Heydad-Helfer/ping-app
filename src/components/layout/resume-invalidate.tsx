import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

/** Skip resume refetches that would stack on a fetch we just ran. */
const RESUME_MIN_INTERVAL_MS = 5_000;

export function ResumeInvalidate() {
	const router = useRouter();

	useEffect(() => {
		let lastAt = Date.now();

		function maybeInvalidate() {
			const now = Date.now();
			if (now - lastAt < RESUME_MIN_INTERVAL_MS) return;
			lastAt = now;
			void router.invalidate();
		}

		function onVisibilityChange() {
			if (document.visibilityState === "visible") {
				maybeInvalidate();
			}
		}

		function onPageShow(event: PageTransitionEvent) {
			if (event.persisted) maybeInvalidate();
		}

		document.addEventListener("visibilitychange", onVisibilityChange);
		window.addEventListener("pageshow", onPageShow);

		return () => {
			document.removeEventListener("visibilitychange", onVisibilityChange);
			window.removeEventListener("pageshow", onPageShow);
		};
	}, [router]);

	return null;
}
