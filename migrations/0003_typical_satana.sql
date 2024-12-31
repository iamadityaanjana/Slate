CREATE TABLE "collaborators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_price_id_fkey";
--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "folder_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "created" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "current_period_start" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "current_period_end" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "ended_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "cancel_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "canceled_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "trial_start" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "trial_end" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_price_id_prices_id_fk" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "created at";--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "logo";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "created at";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "logo";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN "created at";--> statement-breakpoint
DROP POLICY "Can only view own subs data." ON "subscriptions" CASCADE;