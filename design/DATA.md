**"Ping" model**
* A "Ping" is the main entity in the system.
* A "Ping" represents a message / note / reminder / idea that a user sketches, and may want to share with the others.
* Each "Ping" is created by a user (user id comes from Clerk)
* Each "Ping" has a UUIDv7 id
* A "Ping" can be either private, or not (i.e. Boolean field that indicates if the other users can see the ping)
* A "Ping" can have 0 or more tags (topics) to later filter by (like "work", "groceries", etc.). The list of tags is static in the code, the DB should hold only tokens that represents the tag. This might change in the future to support dynamic tags, but requires multi-language support.
* A "Ping" can have priority (Urgent, Idea, Routine). The list of priorities is static in the code, the DB should hold only the token that represents the priority. This might change in the future to support dynamic priorities, but requires multi-language support.
* A "Ping" has a lifecycle. It can have a targetDate, and (regardless) it can be resolved (Boolean. Determins if the ping is displayed or not by default.)
* The content of a Ping is a text area. Currently it'll be plain, but we might change it in the future.
* A Ping will also have a createdAt timestamp.

**Assumptions**
* All dates are in saved in UTC. Frontend will convert for the user's locale with Temporal API.
* The app is pure SSR, so a server function will handle all the querying and filtering.
* Filters will be requested as part of the query parameters (`/?tag=medical&priority=urgent`)
* Filters of different types will have "AND" relation, while filters of the same type will have an "OR" relation (example: `tag = medical OR tag = groceries`. `tag = medical AND priority = urgent`)