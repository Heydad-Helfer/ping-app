**"Ping" model**
* A "Ping" is the main entity in the system.
* A "Ping" represents a message / note / reminder / idea that a user sketches, and may want to share with the other person.
* v1 is a **single implicit household**: the whole app is the couple's queue. There is no households table. Auth is Clerk; restrict who can sign up in the Clerk dashboard. See [V1.md](V1.md).
* Each "Ping" is created by a user (user id comes from Clerk)
* Each "Ping" has a UUIDv7 id
* A "Ping" can be either private, or not (i.e. Boolean field that indicates if the other user can see the ping)
* A "Ping" can have 0 or more tags (topics) to later filter by. The list of tags is static in the code (`groceries`, `home`, `medical`, `work`, `travel`); the DB holds only tokens. Dynamic / user-authored tags are out of v1 (they need multi-language support).
* A "Ping" can have priority (`urgent`, `idea`, `routine`). Static tokens in code; DB holds the token.
* A "Ping" has a lifecycle. It can have a `target_date` (date only, no time), and (regardless) it can be resolved (Boolean) with a `completed_at` timestamp when resolved.
* The content of a Ping is a text area. Currently it'll be plain, but we might change it in the future.
* A Ping has `created_at` and `updated_at` timestamps (timestamptz, UTC).

**Assumptions**
* `target_date` is a calendar date, not a UTC instant. `created_at` / `updated_at` / `completed_at` are UTC. The server formats dates with `Intl` using the app locale.
* The app is pure SSR for the feed, so a server function will handle all querying and filtering.
* Filters will be requested as part of the query parameters (`/?tag=medical&priority=urgent`)
* Filters of different types will have "AND" relation, while filters of the same type will have "OR" relation (example: `tag = medical OR tag = groceries`. `tag = medical AND priority = urgent`)
* Default feed ("All"): shared pings + the viewer's private pings that are (a) unresolved, (b) dated in the future even if resolved, or (c) resolved in the past 24 hours (`completed_at`). `private=1` = my private only, same visibility. `resolved=1` = resolved only.
