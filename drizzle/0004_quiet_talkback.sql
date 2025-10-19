CREATE TABLE "system_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"deposit_address" text NOT NULL,
	"deposit_qr_code_url" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "deposit_address" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "deposit_qr_code_url" DROP DEFAULT;