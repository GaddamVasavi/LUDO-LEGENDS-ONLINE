export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface LoginResponseData {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponseData {
  user: any;
  accessToken: string;
  refreshToken: string;
}
