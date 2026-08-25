import { Request, Response } from 'express';
import { User } from '../models/User.js';

export class LeaderboardController {
  public static async getGlobalLeaderboard(req: Request, res: Response) {
    try {
      const topUsers = await User.find()
        .select('username avatarUrl eloRating tier stats.gamesWon stats.winRate coins')
        .sort({ eloRating: -1 })
        .limit(100);

      const leaderboard = topUsers.map((user, idx) => ({
        rank: idx + 1,
        userId: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        tier: user.tier,
        eloRating: user.eloRating,
        gamesWon: user.stats.gamesWon,
        winRate: user.stats.winRate,
        coins: user.coins,
      }));

      return res.status(200).json({ success: true, data: leaderboard });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
