import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { sendError } from '../utils/response';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authorization token missing', 'UNAUTHORIZED', [], 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = {
      id: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 'INVALID_TOKEN', [], 401);
  }
}

export function authorize(roles: Array<'PATIENT' | 'DOCTOR' | 'ADMIN'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 'User context not authenticated', 'UNAUTHORIZED', [], 401);
    }
    if (!roles.includes(req.user.role)) {
      return sendError(res, 'Access denied: insufficient permission', 'FORBIDDEN', [], 403);
    }
    next();
  };
}
