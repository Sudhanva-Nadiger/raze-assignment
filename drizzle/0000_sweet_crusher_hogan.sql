CREATE TABLE IF NOT EXISTS "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"lastName" text,
	"email" varchar,
	"pronoun" text,
	"profileImage" text,
	"backgroundImage" text,
	"headline" text NOT NULL,
	"location" text,
	"city" text,
	"phone" text,
	"website" text,
	"address" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about" ADD CONSTRAINT "about_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
