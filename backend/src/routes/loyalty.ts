import { Router } from 'express';
import { getLoyaltyStatus, addPoints, redeemReward } from '../controllers/loyaltyController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/status', authenticate, getLoyaltyStatus);
router.post('/points', authenticate, addPoints);
router.post('/redeem', authenticate, redeemReward);

export default router;
