CREATE TABLE "question" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"type" text NOT NULL,
	"user_id" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "response" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"user_id" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response" ADD CONSTRAINT "response_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response" ADD CONSTRAINT "response_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "question_user_id_idx" ON "question" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "response_question_id_idx" ON "response" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "response_user_id_idx" ON "response" USING btree ("user_id");