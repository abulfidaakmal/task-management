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
