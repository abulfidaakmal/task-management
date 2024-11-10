import {
  CreateTaskRequest,
  TaskResponse,
  toTaskResponse,
} from "../model/task-model";
import { Validation } from "../validation/validation";
import { TaskValidation } from "../validation/task-validation";
import { ResponseError } from "../error/response-error";
import { SuccessResponse } from "../model/response-model";
import { TaskRepository } from "../repository/task-repository";

export class TaskService {
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
}
