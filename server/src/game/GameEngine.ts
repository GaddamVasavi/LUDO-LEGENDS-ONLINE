import {
  GameState,
  GameStatus,
  GameMode,
  PlayerColor,
  MoveLog,
  PlayerStats,
  GamePlayer,
} from '@ludo/shared';
import { Dice } from './Dice.js';
import { Token } from './Token.js';
import { TurnManager } from './TurnManager.js';
import { MoveValidator } from './MoveValidator.js';
import { AIEngine } from './AIEngine.js';

export class GameEngine {
  public readonly id: string;
  public readonly roomCode: string;
  public readonly mode: GameMode;
  public status: GameStatus = 'WAITING';
  public createdAt: number = Date.now();
  public startedAt?: number;
  public endedAt?: number;

  public dice: Dice;
  public turnManager!: TurnManager;
  public players: Map<PlayerColor, { player: GamePlayer; tokens: Token[] }> = new Map();
  public winners: PlayerColor[] = [];
  public moveLogs: MoveLog[] = [];
  private turnNumber: number = 1;

  constructor(id: string, roomCode: string, mode: GameMode = 'CLASSIC') {
    this.id = id;
    this.roomCode = roomCode;
    this.mode = mode;
    this.dice = new Dice();
  }

  public addPlayer(
    userId: string,
    username: string,
    color: PlayerColor,
    isBot: boolean = false,
    botDifficulty: 'EASY' | 'MEDIUM' | 'HARD' = 'MEDIUM'
  ): void {
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
      throw new Error('Game is not in progress');
    }
    if (this.turnManager.getCurrentColor() !== color) {
      throw new Error('Not your turn');
    }
    if (this.dice.getIsRolled()) {
      throw new Error('Dice already rolled for this turn');
    }

    const value = this.dice.roll();
    const playerObj = this.players.get(color)!;

    // Consecutive 3 sixes foul rule
    if (this.dice.getConsecutiveSixes() >= 3) {
      this.dice.resetConsecutiveSixes();
      this.turnManager.nextTurn();
      this.dice.resetTurn();
      return { value, validMoves: [] };
    }

    const validMoves = MoveValidator.getValidMoveTokenIds(playerObj.tokens, value);

    // Auto pass if no valid moves available
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

    // Execute Move
    token.moveSteps(diceValue);
    playerObj.player.stats.totalMoves += 1;

    // Check Capture Mechanics
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

    // Check Home Entry
    if (token.status === 'HOME') {
      playerObj.player.stats.tokensHome += 1;
    }

    // Check Win Condition for this player (all 4 tokens home)
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

    // Turn sequence management
    if (!earnedExtraTurn) {
      this.turnManager.nextTurn();
    }
    this.dice.resetTurn();

    return log;
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
      activePowerUps: [],
      validMoves,
      winners: [...this.winners],
      moveLogs: [...this.moveLogs],
      isPaused: false,
      spectatorCount: 0,
    };
  }
}
