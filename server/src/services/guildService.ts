import { GuildModel } from '../models/Guild.js';
import { User } from '../models/User.js';

export class GuildService {
  public static async createGuild(leaderUserId: string, name: string, tag: string, description: string) {
    const existingName = await GuildModel.findOne({ name });
    if (existingName) throw new Error('Guild name already taken');

    const existingTag = await GuildModel.findOne({ tag });
    if (existingTag) throw new Error('Guild tag already taken');

    const leaderUser = await User.findById(leaderUserId);
    if (!leaderUser) throw new Error('Leader user not found');

    const leaderMember = {
      userId: leaderUser._id,
      username: leaderUser.username,
      avatarUrl: leaderUser.avatarUrl,
      role: 'LEADER',
      joinedAt: Date.now(),
      weeklyContributionXp: 0,
      totalContributionXp: 0,
      lastOnlineAt: Date.now(),
      isOnline: true,
    };

    const guild = new GuildModel({
      name,
      tag,
      description,
      leaderUserId: leaderUser._id,
      members: [leaderMember],
    });

    await guild.save();
    return guild;
  }

  public static async listGuilds() {
    return GuildModel.find().limit(50);
  }
}
