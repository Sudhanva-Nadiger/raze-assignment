CREATE TABLE IF NOT EXISTS "educations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"school" text NOT NULL,
	"degree" text NOT NULL,
	"fieldOfStudy" text,
	"startDate" text NOT NULL,
	"endDate" text,
	"description" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
