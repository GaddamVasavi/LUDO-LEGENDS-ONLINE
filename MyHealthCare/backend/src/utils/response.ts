import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  error?: {
    code: string;
    details: any[];
  };
}

export function sendSuccess<T>(res: Response, data: T, message: string = 'Operation successful', statusCode: number = 200) {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(payload);
}

export function sendError(res: Response, message: string = 'Operation failed', errorCode: string = 'INTERNAL_ERROR', details: any[] = [], statusCode: number = 400) {
  const payload: ApiResponse = {
    success: false,
    message,
    data: null,
    error: {
      code: errorCode,
      details,
    },
  };
  return res.status(statusCode).json(payload);
}
