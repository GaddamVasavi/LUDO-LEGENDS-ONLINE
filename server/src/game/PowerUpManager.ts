import { ActivePowerUp, PlayerColor, PowerUpType } from '@ludo/shared';
import { Token } from './Token.js';

export class PowerUpManager {
  private activePowerUps: ActivePowerUp[] = [];

  public applyPowerUp(
    type: PowerUpType,
    appliedBy: PlayerColor,
    targetPlayer?: PlayerColor,
    targetToken?: Token
  ): ActivePowerUp {
    const powerUp: ActivePowerUp = {
      id: `pup_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      appliedBy,
      targetPlayer,
      targetTokenId: targetToken?.id,
    };

    if (type === 'SHIELD' && targetToken) {
      targetToken.hasShield = true;
    }

    this.activePowerUps.push(powerUp);
    return powerUp;
  }

  public removeExpiredPowerUps(currentTurnNumber: number): void {
    this.activePowerUps = this.activePowerUps.filter((p) => {
      if (p.expiresAtTurn && p.expiresAtTurn <= currentTurnNumber) {
        return false;
      }
      return true;
    });
  }

  public getActivePowerUps(): ActivePowerUp[] {
    return [...this.activePowerUps];
  }
}
