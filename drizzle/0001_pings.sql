DROP TABLE "todos";
--> statement-breakpoint
CREATE TABLE "pings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"author_id" text NOT NULL,
	"body" text NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"priority" text DEFAULT 'routine' NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"target_date" date,
	"resolved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "pings_author_id_idx" ON "pings" USING btree ("author_id");
--> statement-breakpoint
CREATE INDEX "pings_resolved_idx" ON "pings" USING btree ("resolved");
--> statement-breakpoint
CREATE INDEX "pings_created_at_idx" ON "pings" USING btree ("created_at");
