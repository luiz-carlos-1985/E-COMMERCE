import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getMetaverseStore = async (req: AuthRequest, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { model3D: { not: null } }
    });

    res.json({
      products: products.map(p => ({
        ...p,
        metaverseEnabled: true,
        virtualTryOn: true
      })),
      storeLayout: {
        theme: 'futuristic',
        zones: ['entrance', 'fashion', 'tech', 'vip']
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load metaverse store' });
  }
};

export const getAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    let avatar = await prisma.metaverseAvatar.findUnique({
      where: { userId }
    });

    if (!avatar) {
      avatar = await prisma.metaverseAvatar.create({
        data: {
          userId: userId!,
          avatarUrl: '/avatars/default.glb',
          accessories: []
        }
      });
    }

    res.json(avatar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get avatar' });
  }
};

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { avatarUrl, accessories, position } = req.body;

    const avatar = await prisma.metaverseAvatar.upsert({
      where: { userId },
      update: { avatarUrl, accessories, position },
      create: { userId: userId!, avatarUrl, accessories, position }
    });

    res.json(avatar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update avatar' });
  }
};

export const virtualTryOn = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({
      productId,
      model3D: product.model3D,
      tryOnUrl: `/api/metaverse/try-on/${productId}`,
      arEnabled: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load virtual try-on' });
  }
};
