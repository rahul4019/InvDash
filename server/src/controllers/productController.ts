import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import { productsTable } from "../db/schema";
import { db } from "../db";
import { ilike } from "drizzle-orm";
import { ApiResponse } from "../types/apiResponse";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await db
      .select()
      .from(productsTable)
      .where(ilike(productsTable.name, `%${search}%`));

    const response: ApiResponse = {
      success: true,
      data: products,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const customError = new CustomError("Error retrieving products", 500);
    next(customError);
  }
};
