export type SuccessResponse<T> = {
  success: boolean;
  message: string;
  error: null;
  data: T;
  paging?: Paging;
};

export type Paging = {
  size: number;
  page: number;
  total_data: number;
  total_page: number;
};

export type ErrorResponse = {
  code: number;
  message: string;
  details?: any;
};
