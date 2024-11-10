import { getAuth } from "@clerk/express";
import { RequestModel } from "../model/request-model";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "../model/response-model";

export const authMiddleware = (
  req: RequestModel,
  res: Response,
  next: NextFunction
) => {
  const { userId } = getAuth(req);

  if (userId) {
    req.user_id = userId;
    next();
    return;
  }

  const response: ErrorResponse = {
    code: 401,
    message: "Unauthorized",
  };

  res.status(401).json(response);
};
