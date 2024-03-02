ALTER TABLE "experiences" RENAME COLUMN "positions" TO "title";--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "startDate" text NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "endDate" text;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "description" text;