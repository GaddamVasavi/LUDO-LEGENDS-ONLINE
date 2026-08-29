import { Request, Response } from 'express';
import { AuthService } from './authService';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthRequest } from '../../middleware/auth';
import { z } from 'zod';

const registerPatientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string(),
  gender: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class AuthController {
  public static async registerPatient(req: Request, res: Response) {
    try {
      const validated = registerPatientSchema.parse(req.body);
      const result = await AuthService.registerPatient(validated);
      return sendSuccess(res, result, 'Patient registered successfully', 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Registration failed', 'REGISTRATION_FAILED', [], 400);
    }
  }

  public static async registerDoctor(req: Request, res: Response) {
    try {
      const result = await AuthService.registerDoctor(req.body);
      return sendSuccess(res, result, 'Doctor account registered successfully', 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Doctor registration failed', 'REGISTRATION_FAILED', [], 400);
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await AuthService.login(validated.email, validated.password);
      return sendSuccess(res, result, 'Login successful', 200);
    } catch (error: any) {
      return sendError(res, error.message || 'Login failed', 'AUTHENTICATION_FAILED', [], 401);
    }
  }

  public static async me(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserProfile(req.user!.id);
      return sendSuccess(res, user, 'User profile fetched successfully');
    } catch (error: any) {
      return sendError(res, error.message, 'NOT_FOUND', [], 404);
    }
  }

  public static async logout(req: Request, res: Response) {
    return sendSuccess(res, null, 'Logged out successfully');
  }
}
