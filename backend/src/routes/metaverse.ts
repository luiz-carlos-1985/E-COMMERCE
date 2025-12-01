import { Router } from 'express';
import { getMetaverseStore, getAvatar, updateAvatar, virtualTryOn } from '../controllers/metaverseController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/store', getMetaverseStore);
router.get('/avatar', authenticate, getAvatar);
router.put('/avatar', authenticate, updateAvatar);
router.get('/try-on/:productId', authenticate, virtualTryOn);

export default router;
