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

export const getDashboardMetrics = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const popularProducts = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.stockQuantity))
      .limit(15);

    const salesSummary = await db
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

    const expenseByCategorySummary = await db
      .select()
      .from(expenseByCategoryTable)
      .orderBy(desc(expenseByCategoryTable.date))
      .limit(15);


    const response: ApiResponse = {
      success: true,
      data: {
        popularProducts,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategorySummary,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const customError = new CustomError(
      "Error retrieing dashboard metrics",
      500,
    );
    next(customError);
  }
};
