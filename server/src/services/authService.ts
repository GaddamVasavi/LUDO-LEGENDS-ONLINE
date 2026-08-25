import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.js';
import { env } from '../config/env.js';

export class AuthService {
  public static async register(username: string, email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error('Email address already registered');
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      passwordHash,
    });

    await user.save();

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  public static async login(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    user.isOnline = true;
    user.lastActive = new Date();
    await user.save();

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  public static generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
  }

  public static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  }

  public static verifyAccessToken(token: string): { userId: string } {
    return jwt.verify(token, env.JWT_SECRET) as { userId: string };
  }
}
