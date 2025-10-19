CREATE TYPE "public"."order_network" AS ENUM('trc20');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('submitted', 'pending', 'rejected', 'success');--> statement-breakpoint
CREATE TYPE "public"."order_enum" AS ENUM('usdt');--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"token" "order_enum" NOT NULL,
	"network" "order_network",
	"wallet_address" text,
	"telegram_name" text,
	"from_amount" numeric,
	"to_amount" numeric,
	"conversion_rate" numeric,
	"deposit_address" text,
	"deposit_qr_code_url" text,
	"tx_id" text,
	"payment_proof_url" text,
	"status" "order_status" DEFAULT 'submitted' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_telegram_name_user_username_fk" FOREIGN KEY ("telegram_name") REFERENCES "public"."user"("username") ON DELETE cascade ON UPDATE no action;