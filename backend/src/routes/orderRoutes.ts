import { Router } from 'express';
import { createOrder, getOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.patch('/:id/status', authenticate, isAdmin, updateOrderStatus);

export default router;
