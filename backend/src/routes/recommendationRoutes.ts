import { Router } from 'express';
import { getRecommendations, getTrending } from '../controllers/recommendationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/recommendations', authenticate, getRecommendations);
router.get('/trending', getTrending);

export default router;
