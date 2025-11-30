import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items } = req.body;
  let total = 0;

  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ error: 'Produto indisponível' });
    }
    total += product.price * item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      userId: req.userId!,
      total,
      orderItems: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: { orderItems: { include: { product: true } } }
  });

  for (const item of items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } }
    });
  }

  res.status(201).json(order);
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: { user: true, orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status: req.body.status }
  });
  res.json(order);
};
