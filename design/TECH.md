**Tech Stack**
*   **Framework:** TanStack Start (React, TypeScript, TanStack Router)
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Database:** PostgreSQL hosted on Neon, managed with Drizzle ORM
*   **Auth:** Clerk (Standard email/password or Google auth)
*   **Target Environment:** Nitro Node server (see README). PWA install metadata (`site.webmanifest`, icons) only — no service worker / offline cache in v1.

**Architecture & Constraints (STRICT - DO NOT DEVIATE):**
1.  **Pure SSR Data Flow:** Do NOT use TanStack Query or client-side caching for data fetching and filtering. Use TanStack Router's built-in `loader` functions and typed Search Params. When a user filters by tag or priority, update the URL (e.g., `/?tag=groceries`) and let the server execute the Drizzle query. Client `useState` is allowed for UI chrome (sheets, forms, menus), not as a ping-list cache.
2.  **No WebSockets or Polling:** Rely strictly on standard server functions and loaders. No real-time syncing. After mutations, `router.invalidate()`.
3.  **i18n & RTL (Zero-Dependency):** Do NOT use external i18n libraries like Paraglide. Implement a simple typed dictionary. The active language is determined server-side by the `ping-locale` cookie, falling back to the `Accept-Language` header. Render the root `<html>` tag with the correct `lang` and `dir` (rtl/ltr) attributes to ensure no client-side layout flashing. Use Tailwind logical properties (e.g., `ms-4`, `pe-2`). Add a UI toggle that updates the cookie and refreshes the route.
4.  **Household:** v1 has no households table. Signed-in Clerk users are members of the single implicit household. Restrict signup in the Clerk dashboard. See [V1.md](V1.md).

**Core UI Requirements**

**Layout**: A simple mobile-first feed. Use a sticky floating action button (FAB) to add a new note.
**Filtering**: A simple, horizontally scrollable row of toggleable chips at the top of the feed to filter by `tags` or `priority` via URL parameters, plus a toggle for "My Private Notes".