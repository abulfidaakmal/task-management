import { NextFunction, Response } from "express";
import { TaskService } from "../service/task-service";
import {
  CreateTaskRequest,
  GetAllTaskRequest,
  RemoveTaskRequest,
  TaskResponse,
  UpdateStatusTaksRequest,
  UpdateTaskRequest,
} from "../model/task-model";
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

  static async getAll(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const request: GetAllTaskRequest = {
        user_id: req.user_id!,
        is_important: req.query.is_important
          ? req.query.is_important === "true"
          : undefined,
        is_completed: req.query.is_completed
          ? req.query.is_completed === "true"
          : undefined,
        size: Number(req.query.page) || 20,
        page: Number(req.query.page) || 1,
      };

      const result: SuccessResponse<TaskResponse[]> = await TaskService.getAll(
        request
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const request: UpdateTaskRequest = {
        user_id: req.user_id!,
        id: req.params.id,
        ...req.body,
      };

      const result: SuccessResponse<TaskResponse> = await TaskService.update(
        request
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const request: RemoveTaskRequest = {
        user_id: req.user_id!,
        id: req.params.id,
      };

      const result: SuccessResponse<TaskResponse> = await TaskService.remove(
        request
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(
    req: RequestModel,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateStatusTaksRequest = {
        user_id: req.user_id!,
        id: req.params.id,
        is_completed: req.body.is_completed,
      };

      const result: SuccessResponse<TaskResponse> =
        await TaskService.updateStatus(request);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
