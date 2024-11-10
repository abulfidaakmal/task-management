export type SuccessResponse<T> = {
  success: boolean;
  message: string;
  error: null;
  data: T;
};

export type ErrorResponse = {
  code: number;
  message: string;
  details?: any;
};
