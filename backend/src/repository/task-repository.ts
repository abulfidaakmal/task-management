import { prismaClient } from "../application/db";
import { CreateTaskRequest, TaskResponse } from "../model/task-model";

export class TaskRepository {
  static async isTitleAlreadyExists(
    user_id: string,
    title: string
  ): Promise<number> {
    return prismaClient.task.count({
      where: {
        user_id: user_id,
        title: title,
      },
    });
  }

  static async create(req: CreateTaskRequest): Promise<TaskResponse> {
    return prismaClient.task.create({
      data: req,
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        is_completed: true,
        is_important: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
