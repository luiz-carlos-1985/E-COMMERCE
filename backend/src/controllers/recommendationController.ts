import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { orderItems: { include: { product: true } } },
    take: 5
  });
  
  const categories = [...new Set(orders.flatMap(o => o.orderItems.map(i => i.product.category)))];
  const recommended = await prisma.product.findMany({
    where: { category: { in: categories } },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });
  
  res.json(recommended);
};

export const getTrending = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });
  res.json(products);
};
