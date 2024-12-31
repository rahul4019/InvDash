CREATE TABLE "expense_by_category" (
	"expense_by_category_id" text PRIMARY KEY NOT NULL,
	"expense_summary_id" text NOT NULL,
	"category" text NOT NULL,
	"amount" bigint NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_summary" (
	"expense_summary_id" text PRIMARY KEY NOT NULL,
	"total_expenses" numeric(2) NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"expense_id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"amount" numeric(2) NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" numeric(2) NOT NULL,
	"rating" numeric,
	"stock_quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase_summary" (
	"purchase_summary_id" text PRIMARY KEY NOT NULL,
	"total_purchased" numeric(2) NOT NULL,
	"change_percentage" numeric(2),
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"purchase_id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(2) NOT NULL,
	"total_cost" numeric(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales_summary" (
	"sales_summary_id" text PRIMARY KEY NOT NULL,
	"total_value" numeric(2) NOT NULL,
	"change_percentage" numeric(2) NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"sale_id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(2) NOT NULL,
	"total_amount" numeric(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expense_by_category" ADD CONSTRAINT "expense_by_category_expense_summary_id_expense_summary_expense_summary_id_fk" FOREIGN KEY ("expense_summary_id") REFERENCES "public"."expense_summary"("expense_summary_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;