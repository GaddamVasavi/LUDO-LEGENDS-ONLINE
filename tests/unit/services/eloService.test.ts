import { EloService } from '../../../server/src/services/eloService.js';

describe('EloService Rating & Tier System', () => {
  test('Calculates correct ELO gain for winner and loss for loser', () => {
    const res = EloService.calculateMatchRating(1200, 1200);
    expect(res.newWinnerElo).toBe(1216);
    expect(res.newLoserElo).toBe(1184);
    expect(res.change).toBe(16);
  });

  test('Resolves tier correctly from ELO rating points', () => {
    expect(EloService.getTierFromElo(900)).toBe('BRONZE');
    expect(EloService.getTierFromElo(1100)).toBe('SILVER');
    expect(EloService.getTierFromElo(1300)).toBe('GOLD');
    expect(EloService.getTierFromElo(1600)).toBe('PLATINUM');
    expect(EloService.getTierFromElo(1900)).toBe('DIAMOND');
    expect(EloService.getTierFromElo(2300)).toBe('LEGEND');
  });
});
