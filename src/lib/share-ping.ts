import { buildPingShareUrl } from "#/lib/pings";

export type SharePingResult = "shared" | "copied" | "aborted" | "failed";

export async function sharePingLink(
	id: string,
	title: string,
): Promise<SharePingResult> {
	const url = buildPingShareUrl(id, window.location.origin);

	if (typeof navigator.share === "function") {
		try {
			await navigator.share({ title, url });
			return "shared";
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				return "aborted";
			}
		}
	}

	try {
		await navigator.clipboard.writeText(url);
		return "copied";
	} catch {
		return "failed";
	}
}
