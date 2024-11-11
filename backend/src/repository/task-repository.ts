import { prismaClient } from "../application/db";
import {
  CreateTaskRequest,
  GetAllTaskRequest,
  RemoveTaskRequest,
  TaskResponse,
  UpdateTaskRequest,
} from "../model/task-model";
import useFakeTimers = jest.useFakeTimers;

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

  static async getTotalTask(
    user_id: string,
    is_important?: boolean,
    is_completed?: boolean
  ): Promise<number> {
    return prismaClient.task.count({
      where: {
        user_id: user_id,
        is_completed: is_completed,
        is_important: is_important,
      },
    });
  }

  static async getAll(req: GetAllTaskRequest): Promise<TaskResponse[]> {
    return prismaClient.task.findMany({
      where: {
        user_id: req.user_id,
        is_important: req.is_important,
        is_completed: req.is_completed,
      },
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
      skip: req.page,
      take: req.size,
    });
  }
}
