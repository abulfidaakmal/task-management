import {
  CreateTaskRequest,
  GetAllTaskRequest,
  RemoveTaskRequest,
  TaskResponse,
  toTaskResponse,
  UpdateTaskRequest,
} from "../model/task-model";
import { Validation } from "../validation/validation";
import { TaskValidation } from "../validation/task-validation";
import { ResponseError } from "../error/response-error";
import { SuccessResponse } from "../model/response-model";
import { TaskRepository } from "../repository/task-repository";
import { NextFunction } from "express";

export class TaskService {
  private static async isTaskExists(
    user_id: string,
    id: string
  ): Promise<void> {
    const check = await TaskRepository.isTaskExists(user_id, id);

    if (!check) {
      throw new ResponseError(404, "task is not found");
    }
  }

  static async create(
    req: CreateTaskRequest
  ): Promise<SuccessResponse<TaskResponse>> {
    const createRequest: CreateTaskRequest = Validation.validate(
      TaskValidation.CREATE,
      req
    );

    const isTitleAlreadyExists = await TaskRepository.isTitleAlreadyExists(
      createRequest.user_id,
      createRequest.title
    );

    if (isTitleAlreadyExists) {
      throw new ResponseError(409, "title already exists");
    }

    const task = await TaskRepository.create(createRequest);

    return toTaskResponse(task, "successfully added task");
  }

  static async getAll(
    req: GetAllTaskRequest
  ): Promise<SuccessResponse<TaskResponse[]>> {
    const getAllRequest: GetAllTaskRequest = Validation.validate(
      TaskValidation.GETALL,
      req
    );

    const total_task = await TaskRepository.getTotalTask(
      getAllRequest.user_id,
      getAllRequest.is_important,
      getAllRequest.is_completed
    );

    if (!total_task) {
      throw new ResponseError(404, "no tasks available");
    }

    const page = getAllRequest.page;
    const size = getAllRequest.size;
    const total_page = Math.ceil(total_task / size);

    getAllRequest.page = (page - 1) * size;

    const tasks = await TaskRepository.getAll(getAllRequest);

    return {
      success: true,
      message: "successfully get all tasks",
      error: null,
      data: tasks,
      paging: {
        page: page,
        size: size,
        total_data: total_task,
        total_page: total_page,
      },
    };
  }

  static async update(
    req: UpdateTaskRequest
  ): Promise<SuccessResponse<TaskResponse>> {
    const updateRequest: UpdateTaskRequest = Validation.validate(
      TaskValidation.UPDATE,
      req
    );

    await this.isTaskExists(updateRequest.user_id, updateRequest.id);

    const task = await TaskRepository.update(updateRequest);

    return toTaskResponse(task, "successfully updated task");
  }
}
