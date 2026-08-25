import { QuestProgress } from '../models/Quest.js';
import { User } from '../models/User.js';
import { EXTENDED_QUESTS_CATALOG } from '@ludo/shared';

export class QuestService {
  public static async getUserQuests(userId: string) {
    let progressList = await QuestProgress.find({ userId });

    if (progressList.length === 0) {
      // Seed initial daily quests for user
      const initialQuests = EXTENDED_QUESTS_CATALOG.slice(0, 5).map((q) => ({
        userId,
        questId: q.id,
        currentCount: 0,
        targetCount: q.targetCount,
        isCompleted: false,
        isClaimed: false,
      }));

      progressList = await QuestProgress.insertMany(initialQuests);
    }

    return progressList;
  }

  public static async claimQuestReward(userId: string, questId: string) {
    const questProg = await QuestProgress.findOne({ userId, questId });
    if (!questProg) {
      throw new Error('Quest progress record not found');
    }

    if (questProg.isClaimed) {
      throw new Error('Quest reward already claimed');
    }

    if (questProg.currentCount < questProg.targetCount) {
      throw new Error('Quest progress is incomplete');
    }

    const questDef = EXTENDED_QUESTS_CATALOG.find((q) => q.id === questId);
    if (!questDef) {
      throw new Error('Quest definition not found');
    }

    questProg.isCompleted = true;
    questProg.isClaimed = true;
    await questProg.save();

    // Reward player
    const user = await User.findById(userId);
    if (user) {
      user.coins += questDef.reward.coins;
      user.gems += questDef.reward.gems;
      user.xp += questDef.reward.xp;
      await user.save();
    }

    return { questProg, reward: questDef.reward };
  }
}
