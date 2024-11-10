import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../model/response-model";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const response: ErrorResponse = {
      code: 400,
      message: "Validation error",
      details: err.errors,
    };

    res.status(400).json(response);
  } else if (err instanceof ResponseError) {
    const response: ErrorResponse = {
      code: err.status,
      message: err.message,
    };

    res.status(err.status).json(response);
  } else {
    console.info(err);
    const response: ErrorResponse = {
      code: 500,
      message: "Internal server error",
    };

    res.status(500).json(response).end();
  }
};
