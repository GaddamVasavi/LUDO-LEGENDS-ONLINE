import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain alphanumeric characters and underscores',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const createRoomSchema = z.object({
  name: z.string().min(3).max(30),
  mode: z.enum(['CLASSIC', 'QUICK', 'POWERUP', 'TOURNAMENT', 'PRACTICE']),
  isPrivate: z.boolean(),
  password: z.string().optional(),
  maxPlayers: z.number().int().min(2).max(4),
});

export const moveTokenSchema = z.object({
  gameId: z.string().uuid(),
  tokenId: z.string(),
  diceValue: z.number().int().min(1).max(6),
});
