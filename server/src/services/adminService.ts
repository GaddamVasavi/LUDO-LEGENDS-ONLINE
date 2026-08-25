import { User } from '../models/User.js';
import { Game } from '../models/Game.js';

export class AdminService {
  public static async getSystemTelemetry() {
    const totalUsers = await User.countDocuments();
    const totalGames = await Game.countDocuments();
    const activeOnlineUsers = await User.countDocuments({ isOnline: true });

    return {
      totalUsers,
      totalGames,
      activeOnlineUsers,
      serverUptimeSeconds: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }

  public static async grantUserCurrency(userId: string, coins: number, gems: number) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.coins += coins;
    user.gems += gems;
    await user.save();

    return user;
  }
}
