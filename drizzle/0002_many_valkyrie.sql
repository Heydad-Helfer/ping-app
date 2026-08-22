ALTER TABLE "pings" ADD COLUMN "completed_at" timestamp with time zone;
--> statement-breakpoint
UPDATE "pings" SET "completed_at" = "updated_at" WHERE "resolved" = true;
