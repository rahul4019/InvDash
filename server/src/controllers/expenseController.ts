import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import { db } from "../db";
import { expenseByCategoryTable } from "../db/schema";
import { ApiResponse } from "../types/apiResponse";
import { desc, sql } from "drizzle-orm";

export const getExpenses = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const expenseByCategorySummary = await db
      .select({
        expenseByCategoryId: expenseByCategoryTable.expenseByCategoryId,
        expenseSummaryId: expenseByCategoryTable.expenseSummaryId,
        category: expenseByCategoryTable.category,
        amount: sql<string>`cast(${expenseByCategoryTable.amount} as text)`,
        date: expenseByCategoryTable.date,
      })
      .from(expenseByCategoryTable)
      .orderBy(desc(expenseByCategoryTable.date));

    const response: ApiResponse = {
      success: true,
      data: expenseByCategorySummary,
    };

    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(
      "Error retrieving expenses by category",
      500,
    );
    next(customError);
  }
};
