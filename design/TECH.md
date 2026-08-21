**Tech Stack**
*   **Framework:** TanStack Start (React, TypeScript, TanStack Router)
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Database:** PostgreSQL hosted on Neon, managed with Drizzle ORM
*   **Auth:** Clerk (Standard email/password or Google auth)
*   **Target Environment:** Vercel (Serverless) configured as a PWA (manifest.json, standard service worker).

**Architecture & Constraints (STRICT - DO NOT DEVIATE):**
1.  **Pure SSR Data Flow:** Do NOT use TanStack Query, `useState`, or client-side caching for data fetching and filtering. Use TanStack Router's built-in `loader` functions and typed Search Params. When a user filters by tag or priority, update the URL (e.g., `/?tag=groceries`) and let the server execute the Drizzle query and return the rendered HTML.
2.  **No WebSockets or Polling:** Rely strictly on standard server actions and loaders. No real-time syncing.
3.  **i18n & RTL (Zero-Dependency):** Do NOT use external i18n libraries like Paraglide. Implement a simple typed dictionary (`translations.ts`). The active language must be determined server-side in the root route by checking a `ping-lang` cookie, falling back to the `Accept-Language` header. Render the root `<html>` tag with the correct `lang` and `dir` (rtl/ltr) attributes to ensure no client-side layout flashing. Use Tailwind logical properties (e.g., `ms-4`, `pe-2`). Add a UI toggle that updates the cookie and refreshes the route.

**Core UI Requirements**

**Layout**: A simple mobile-first feed. Use a sticky floating action button (FAB) to add a new note.
**Filtering**: A simple, horizontally scrollable row of toggleable chips at the top of the feed to filter by `tags` or `priority` via URL parameters, plus a toggle for "My Private Notes".