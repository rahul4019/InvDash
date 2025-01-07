import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { ApiResponse } from "../types/apiResponse";

export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await db.select().from(usersTable);
    const response: ApiResponse = {
      success: true,
      data: users,
    };

    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError("Error retrieving users", 500);
    next(customError);
  }
};
