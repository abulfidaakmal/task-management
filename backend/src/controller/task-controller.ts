import { NextFunction, Response } from "express";
import { TaskService } from "../service/task-service";
import { CreateTaskRequest, TaskResponse } from "../model/task-model";
import { SuccessResponse } from "../model/response-model";
import { RequestModel } from "../model/request-model";

export class TaskController {
  static async create(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const request: CreateTaskRequest = {
        user_id: req.user_id!,
        ...req.body,
      };

      const result: SuccessResponse<TaskResponse> = await TaskService.create(
        request
      );

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
