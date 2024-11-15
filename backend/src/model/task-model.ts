import { SuccessResponse } from "./response-model";

export type TaskResponse = {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  is_completed: boolean;
  is_important: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateTaskRequest = {
  user_id: string;
  title: string;
  description?: string | null;
  date: Date;
  is_important: boolean;
};

export type GetAllTaskRequest = {
  user_id: string;
  is_important?: boolean;
  is_completed?: boolean;
  page: number;
  size: number;
};

export type UpdateTaskRequest = {
  user_id: string;
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  is_important: boolean;
};

export type RemoveTaskRequest = {
  user_id: string;
  id: string;
};

export type UpdateStatusTaksRequest = {
  user_id: string;
  id: string;
  is_completed: boolean;
};

export function toTaskResponse(
  task: TaskResponse,
  message: string
): SuccessResponse<TaskResponse> {
  return {
    success: true,
    message,
    error: null,
    data: task,
  };
}
