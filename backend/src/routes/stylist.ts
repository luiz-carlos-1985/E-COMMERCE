import { Router } from 'express';
import { getStyleProfile, createStyleProfile, getRecommendations, createOutfit } from '../controllers/stylistController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticate, getStyleProfile);
router.post('/profile', authenticate, createStyleProfile);
router.get('/recommendations', authenticate, getRecommendations);
router.post('/outfit', authenticate, createOutfit);

export default router;
