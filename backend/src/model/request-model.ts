import { Request } from "express";

export interface RequestModel extends Request {
  user_id?: string;
}
