import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { env } from '../config/env';
import mongoose from 'mongoose';

// In-memory fallback user database for local environments without MongoDB service
const inMemoryUsers: Map<string, any> = new Map();

export class AuthService {
  public static async register(username: string, email: string, password: string): Promise<{ user: any; accessToken: string; refreshToken: string }> {
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new Error('Email address already registered');
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new Error('Username already taken');
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ username, email, passwordHash });
      await user.save();

      const accessToken = this.generateAccessToken(user.id);
      const refreshToken = this.generateRefreshToken(user.id);

      return { user, accessToken, refreshToken };
    }

    // Fallback: In-memory store
    const existing = Array.from(inMemoryUsers.values()).find(
      (u) => u.email === email || u.username === username
    );
    if (existing) {
      throw new Error('Username or Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const userObj = {
      _id: userId,
      id: userId,
      username,
      email,
      passwordHash,
      avatarUrl: '/assets/images/avatars/default.png',
      level: 1,
      xp: 0,
      coins: 1000,
      gems: 20,
      eloRating: 1000,
      tier: 'BRONZE',
      stats: { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, tokensCaptured: 0, tokensLost: 0, totalSixesRolled: 0, longestWinStreak: 0, currentWinStreak: 0, tournamentWins: 0, tournamentFinals: 0, totalCoinsEarned: 1000, totalGemsEarned: 20 },
      customization: { equippedBoardTheme: 'theme_classic', equippedTokenSkin: 'token_standard', equippedDiceSkin: 'dice_classic', equippedAvatarFrame: 'frame_default', equippedEmoteSet: ['thumbs_up', 'laughing', 'crying', 'angry'] },
      isOnline: true,
      lastActive: new Date(),
    };

    inMemoryUsers.set(userId, userObj);

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);

    return { user: userObj, accessToken, refreshToken };
  }

  public static async login(email: string, password: string): Promise<{ user: any; accessToken: string; refreshToken: string }> {
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email or password');

      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error('Invalid email or password');

      user.isOnline = true;
      user.lastActive = new Date();
      await user.save();

      const accessToken = this.generateAccessToken(user.id);
      const refreshToken = this.generateRefreshToken(user.id);

      return { user, accessToken, refreshToken };
    }

    // Fallback: In-memory store
    const user = Array.from(inMemoryUsers.values()).find((u) => u.email === email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid email or password');

    user.isOnline = true;
    user.lastActive = new Date();

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  public static async getUserById(userId: string): Promise<any> {
    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      return User.findById(userId).select('-passwordHash');
    }
    const user = inMemoryUsers.get(userId);
    if (!user) return null;
    const { passwordHash, ...userClean } = user;
    return userClean;
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
