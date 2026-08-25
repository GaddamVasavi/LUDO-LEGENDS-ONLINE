import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { registerSchema, loginSchema } from '@ludo/shared';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await AuthService.register(validated.username, validated.email, validated.password);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message || 'Registration failed' });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await AuthService.login(validated.email, validated.password);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({ success: false, error: error.message || 'Login failed' });
    }
  }

  public static async me(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserById(req.userId!);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
