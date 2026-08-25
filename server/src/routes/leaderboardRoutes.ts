import { Router } from 'express';
import { LeaderboardController } from '../controllers/leaderboardController.js';

const router = Router();

router.get('/global', LeaderboardController.getGlobalLeaderboard);

export default router;
