export interface QueueUser {
  userId: string;
  username: string;
  eloRating: number;
  mode: string;
  joinedAt: number;
}

export class MatchmakingService {
  private static queue: QueueUser[] = [];

  public static addToQueue(user: QueueUser): void {
    const exists = this.queue.some((q) => q.userId === user.userId);
    if (!exists) {
      this.queue.push(user);
    }
  }

  public static removeFromQueue(userId: string): void {
    this.queue = this.queue.filter((q) => q.userId !== userId);
  }

  public static findMatch(mode: string): QueueUser[] | null {
    const modeQueue = this.queue.filter((q) => q.mode === mode);
    if (modeQueue.length >= 4) {
      const match = modeQueue.slice(0, 4);
      match.forEach((m) => this.removeFromQueue(m.userId));
      return match;
    }
    return null;
  }
}
