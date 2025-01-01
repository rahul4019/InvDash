import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse";
import CustomError from "../utils/customError";

export const errorHandler = (
  err: Error & { status?: number },
  _: Request,
  res: Response,
  next: NextFunction,
): Response<ApiResponse> => {
  console.error(err);

  const response: ApiResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(response);
  }

  return res.status(err.status || 500).json(response);
};
