import { relations } from "drizzle-orm";
import {
  bigint,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: text("user_id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const productsTable = pgTable("products", {
  productId: text("product_id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating"),
  stockQuantity: integer("stock_quantity").notNull(),
});

export const salesTable = pgTable("sales", {
  saleId: text("sale_id").primaryKey(),
  productId: text("product_id")
    .references(() => productsTable.productId)
    .notNull(),
  timestamp: timestamp("timestamp").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  totalAmount: integer("total_amount").notNull(),
});

export const purchasesTable = pgTable("purchases", {
  purchaseId: text("purchase_id").primaryKey(),
  productId: text("product_id")
    .references(() => productsTable.productId)
    .notNull(),
  timestamp: timestamp("timestamp").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  totalCost: integer("total_cost").notNull(),
});

export const expensesTable = pgTable("expenses", {
  expenseId: text("expense_id").primaryKey(),
  category: text("category").notNull(),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const salesSummaryTable = pgTable("sales_summary", {
  salesSummaryId: text("sales_summary_id").primaryKey(),
  totalValue: integer("total_value").notNull(),
  changePercentage: integer("change_percentage").notNull(),
  date: timestamp("date").notNull(),
});

export const purchaseSummaryTable = pgTable("purchase_summary", {
  purchaseSummaryId: text("purchase_summary_id").primaryKey(),
  totalPurchased: integer("total_purchased").notNull(),
  changePercentage: integer("change_percentage"),
  date: timestamp("date").notNull(),
});

export const expenseSummaryTable = pgTable("expense_summary", {
  expenseSummaryId: text("expense_summary_id").primaryKey(),
  totalExpenses: integer("total_expenses").notNull(),
  date: timestamp("date").notNull(),
});

export const expenseByCategoryTable = pgTable("expense_by_category", {
  expenseByCategoryId: text("expense_by_category_id").primaryKey(),
  expenseSummaryId: text("expense_summary_id")
    .references(() => expenseSummaryTable.expenseSummaryId)
    .notNull(),
  category: text("category").notNull(),
  amount: bigint("amount",{mode: "number"}).notNull(),
  date: timestamp("date").notNull(),
});

export const productsRelations = relations(productsTable, ({ many }) => ({
  sales: many(salesTable),
  purchases: many(purchasesTable),
}));

export const salesRelations = relations(salesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [salesTable.productId],
    references: [productsTable.productId],
  }),
}));

export const purchasesRelations = relations(purchasesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [purchasesTable.productId],
    references: [productsTable.productId],
  }),
}));

export const expenseSummaryRelations = relations(
  expenseSummaryTable,
  ({ many }) => ({
    expenseByCategory: many(expenseByCategoryTable),
  }),
);

export const expenseByCategoryRelations = relations(
  expenseByCategoryTable,
  ({ one }) => ({
    expenseSummary: one(expenseSummaryTable, {
      fields: [expenseByCategoryTable.expenseSummaryId],
      references: [expenseSummaryTable.expenseSummaryId],
    }),
  }),
);
