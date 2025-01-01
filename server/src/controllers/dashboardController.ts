import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import { db } from "../db";
import {
  expenseByCategoryTable,
  expenseSummaryTable,
  productsTable,
  purchaseSummaryTable,
  salesSummaryTable,
} from "../db/schema";
import { desc, sql } from "drizzle-orm";
import { ApiResponse } from "../types/apiResponse";

export const getDashboardMatrics = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    const popularProducts = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.stockQuantity))
      .limit(15);

    const saleSummary = await db
      .select()
      .from(salesSummaryTable)
      .orderBy(desc(salesSummaryTable.date))
      .limit(5);

    const purchaseSummary = await db
      .select()
      .from(purchaseSummaryTable)
      .orderBy(desc(purchaseSummaryTable.date))
      .limit(5);

    const expenseSummary = await db
      .select()
      .from(expenseSummaryTable)
      .orderBy(desc(expenseSummaryTable.date))
      .limit(15);

    const expenseByCategorySummary = db.select({
      expenseByCategoryId: expenseByCategoryTable.expenseByCategoryId,
      expenseSummaryId: expenseByCategoryTable.expenseSummaryId,
      category: expenseByCategoryTable.category,
      amount: sql<number>`CAST ${expenseByCategoryTable.amount} AS INT`,
      date: expenseByCategoryTable.date,
    });

    const response: ApiResponse = {
      success: true,
      data: {
        popularProducts,
        saleSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategorySummary,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(
      "Error retrieing dashboard matrics",
      500,
    );
    next(customError);
  }
};
