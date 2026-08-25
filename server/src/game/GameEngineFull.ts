import {
  GameState,
  GameStatus,
  GameMode,
  PlayerColor,
  MoveLog,
  PlayerStats,
  GamePlayer,
  ActivePowerUp,
  PowerUpType,
} from '@ludo/shared';
import { Dice } from './Dice.js';
import { Token } from './Token.js';
import { TurnManager } from './TurnManager.js';
import { MoveValidator } from './MoveValidator.js';
import { GameRules } from './GameRules.js';
import { PowerUpManager } from './PowerUpManager.js';
import { AIEngine } from './AIEngine.js';

export class GameEngineFull {
  public readonly id: string;
  public readonly roomCode: string;
  public readonly mode: GameMode;
  public status: GameStatus = 'WAITING';
  public createdAt: number = Date.now();
  public startedAt?: number;
  public endedAt?: number;

  public dice: Dice;
  public turnManager!: TurnManager;
  public powerUpManager: PowerUpManager;
  public players: Map<PlayerColor, { player: GamePlayer; tokens: Token[] }> = new Map();
  public winners: PlayerColor[] = [];
  public moveLogs: MoveLog[] = [];
  public spectators: Set<string> = new Set();
  private turnNumber: number = 1;
  public isPaused: boolean = false;

  constructor(id: string, roomCode: string, mode: GameMode = 'CLASSIC') {
    this.id = id;
    this.roomCode = roomCode;
    this.mode = mode;
    this.dice = new Dice();
    this.powerUpManager = new PowerUpManager();
  }

  public addPlayer(
    userId: string,
    username: string,
    color: PlayerColor,
    isBot: boolean = false,
    botDifficulty: 'EASY' | 'MEDIUM' | 'HARD' = 'MEDIUM'
  ): void {
    if (this.players.has(color)) {
      throw new Error(`Color ${color} is already taken in this room`);
    }

    const tokens = [
      new Token(color, 0),
      new Token(color, 1),
      new Token(color, 2),
      new Token(color, 3),
    ];

    const stats: PlayerStats = {
      tokensHome: 0,
      tokensCaptured: 0,
      tokensLost: 0,
      sixesRolled: 0,
      totalMoves: 0,
      powerUpsUsed: 0,
    };

    const player: GamePlayer = {
      id: userId,
      userId,
      username,
      color,
      seatIndex: this.players.size,
      isHost: this.players.size === 0,
      isBot,
      botDifficulty,
      isDisconnected: false,
      eloRating: 1000,
      tokens: tokens.map((t) => t.getState()),
      stats,
      inventory: {
        boardTheme: 'theme_classic',
        tokenSkin: 'token_standard',
        diceSkin: 'dice_classic',
      },
    };

    this.players.set(color, { player, tokens });
  }

  public removePlayer(color: PlayerColor): void {
    if (this.players.has(color)) {
      this.players.delete(color);
      if (this.turnManager) {
        this.turnManager.removePlayer(color);
      }
    }
  }

  public addSpectator(userId: string): void {
    this.spectators.add(userId);
  }

  public removeSpectator(userId: string): void {
    this.spectators.delete(userId);
  }

  public startGame(): void {
    if (this.players.size < 2) {
      throw new Error('Minimum 2 players required to start game');
    }

    const playerColors = Array.from(this.players.keys());
    this.turnManager = new TurnManager(playerColors, 15);
    this.status = 'IN_PROGRESS';
    this.startedAt = Date.now();
  }

  public rollDice(color: PlayerColor): { value: number; validMoves: string[] } {
    if (this.status !== 'IN_PROGRESS') {
      throw new Error('Game is not currently in progress');
    }
    if (this.turnManager.getCurrentColor() !== color) {
      throw new Error(`Not your turn. Current turn belongs to ${this.turnManager.getCurrentColor()}`);
    }
    if (this.dice.getIsRolled()) {
      throw new Error('Dice has already been rolled for this turn');
    }

    const value = this.dice.roll();
    const playerObj = this.players.get(color)!;

    if (value === 6) {
      playerObj.player.stats.sixesRolled += 1;
    }

    // Evaluate rules
    const allTokensMap = new Map<PlayerColor, Token[]>();
    for (const [c, obj] of this.players.entries()) {
      allTokensMap.set(c, obj.tokens);
    }

    // Triple 6 consecutive rolls penalty
    if (this.dice.getConsecutiveSixes() >= 3) {
      this.dice.resetConsecutiveSixes();
      this.turnManager.nextTurn();
      this.dice.resetTurn();
      return { value, validMoves: [] };
    }

    const validMoves = MoveValidator.getValidMoveTokenIds(playerObj.tokens, value);

    if (validMoves.length === 0 && value !== 6) {
      setTimeout(() => {
        this.turnManager.nextTurn();
        this.dice.resetTurn();
      }, 1000);
    }

    return { value, validMoves };
  }

  public moveToken(color: PlayerColor, tokenId: string, diceValue: number): MoveLog {
    const playerObj = this.players.get(color)!;
    const token = playerObj.tokens.find((t) => t.id === tokenId);

    if (!token) {
      throw new Error(`Token ${tokenId} not found`);
    }

    const fromStatus = token.status;
    const fromPosition = token.position;

    // Perform move
    token.moveSteps(diceValue);
    playerObj.player.stats.totalMoves += 1;

    // Handle Token Captures
    let capturedTokenId: string | undefined;
    if (token.status === 'ACTIVE' && !token.isSafe) {
      for (const [oppColor, oppObj] of this.players.entries()) {
        if (oppColor === color) continue;
        for (const oppToken of oppObj.tokens) {
          if (
            oppToken.status === 'ACTIVE' &&
            !oppToken.isSafe &&
            oppToken.position === token.position &&
            !oppToken.hasShield
          ) {
            oppToken.sendToBase();
            capturedTokenId = oppToken.id;
            playerObj.player.stats.tokensCaptured += 1;
            oppObj.player.stats.tokensLost += 1;
            break;
          }
        }
      }
    }

    // Handle Home Entry
    if (token.status === 'HOME') {
      playerObj.player.stats.tokensHome += 1;
    }

    // Check Victory Condition
    const allHome = playerObj.tokens.every((t) => t.status === 'HOME');
    if (allHome && !this.winners.includes(color)) {
      this.winners.push(color);
      if (this.winners.length >= this.players.size - 1) {
        this.status = 'FINISHED';
        this.endedAt = Date.now();
      }
    }

    const earnedExtraTurn = diceValue === 6 || capturedTokenId !== undefined || token.status === 'HOME';

    const log: MoveLog = {
      id: `move_${Date.now()}_${this.turnNumber++}`,
      turnNumber: this.turnNumber,
      playerColor: color,
      diceValue,
      tokenId,
      fromPosition,
      toPosition: token.position,
      fromStatus,
      toStatus: token.status,
      capturedTokenId,
      earnedExtraTurn,
      timestamp: Date.now(),
    };

    this.moveLogs.push(log);

    if (!earnedExtraTurn) {
      this.turnManager.nextTurn();
    }
    this.dice.resetTurn();

    return log;
  }

  public activatePowerUp(type: PowerUpType, color: PlayerColor, targetTokenId?: string): ActivePowerUp {
    const playerObj = this.players.get(color);
    if (!playerObj) throw new Error('Player not found');

    const targetToken = targetTokenId
      ? playerObj.tokens.find((t) => t.id === targetTokenId)
      : undefined;

    const powerUp = this.powerUpManager.applyPowerUp(type, color, undefined, targetToken);
    playerObj.player.stats.powerUpsUsed += 1;
    return powerUp;
  }

  public getGameState(): GameState {
    const playersRecord: any = {};
    for (const [color, obj] of this.players.entries()) {
      playersRecord[color] = {
        ...obj.player,
        tokens: obj.tokens.map((t) => t.getState()),
      };
    }

    const currentTurnColor = this.turnManager ? this.turnManager.getCurrentColor() : 'RED';
    const validMoves =
      this.dice.getIsRolled() && this.players.has(currentTurnColor)
        ? MoveValidator.getValidMoveTokenIds(
            this.players.get(currentTurnColor)!.tokens,
            this.dice.getValue()
          )
        : [];

    return {
      id: this.id,
      roomCode: this.roomCode,
      mode: this.mode,
      status: this.status,
      createdAt: this.createdAt,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      currentTurnColor,
      turnSequence: this.turnManager ? this.turnManager.getTurnSequence() : [],
      turnIndex: 0,
      turnTimeLimit: 15,
      turnTimerExpiresAt: this.turnManager ? this.turnManager.getTimerExpiresAt() : 0,
      dice: this.dice.getState(),
      players: playersRecord,
      activePowerUps: this.powerUpManager.getActivePowerUps(),
      validMoves,
      winners: [...this.winners],
      moveLogs: [...this.moveLogs],
      isPaused: this.isPaused,
      spectatorCount: this.spectators.size,
    };
  }
}
