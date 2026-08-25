export class EloService {
  private static K_FACTOR = 32;

  /**
   * Calculates new ELO ratings after a match between winner and loser.
   */
  public static calculateMatchRating(
    winnerElo: number,
    loserElo: number
  ): { newWinnerElo: number; newLoserElo: number; change: number } {
    const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

    const change = Math.round(this.K_FACTOR * (1 - expectedWinner));

    return {
      newWinnerElo: winnerElo + change,
      newLoserElo: Math.max(100, loserElo - change),
      change,
    };
  }

  /**
   * Resolves rank tier based on ELO rating points.
   */
  public static getTierFromElo(elo: number): 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'LEGEND' {
    if (elo >= 2200) return 'LEGEND';
    if (elo >= 1800) return 'DIAMOND';
    if (elo >= 1500) return 'PLATINUM';
    if (elo >= 1200) return 'GOLD';
    if (elo >= 1000) return 'SILVER';
    return 'BRONZE';
  }
}
