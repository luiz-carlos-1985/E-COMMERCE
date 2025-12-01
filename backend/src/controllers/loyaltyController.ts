import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 1000,
  GOLD: 5000,
  PLATINUM: 15000,
  DIAMOND: 50000
};

export const getLoyaltyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { achievements: true }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const nextTier = getNextTier(user.loyaltyTier);
    const pointsToNext = nextTier ? TIER_THRESHOLDS[nextTier] - user.loyaltyPoints : 0;

    res.json({
      points: user.loyaltyPoints,
      tier: user.loyaltyTier,
      nextTier,
      pointsToNext,
      achievements: user.achievements,
      benefits: getTierBenefits(user.loyaltyTier)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get loyalty status' });
  }
};

export const addPoints = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { points, reason } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { loyaltyPoints: { increment: points } }
    });

    const newTier = calculateTier(user.loyaltyPoints);
    if (newTier !== user.loyaltyTier) {
      await prisma.user.update({
        where: { id: userId },
        data: { loyaltyTier: newTier }
      });
      await createAchievement(userId!, `Tier ${newTier}`, `Alcançou o nível ${newTier}!`, 'trophy', 500);
    }

    res.json({ points: user.loyaltyPoints, tier: newTier });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add points' });
  }
};

export const redeemReward = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { rewardId, pointsCost } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.loyaltyPoints < pointsCost) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { loyaltyPoints: { decrement: pointsCost } }
    });

    res.json({ success: true, remainingPoints: user.loyaltyPoints - pointsCost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to redeem reward' });
  }
};

function calculateTier(points: number): string {
  if (points >= TIER_THRESHOLDS.DIAMOND) return 'DIAMOND';
  if (points >= TIER_THRESHOLDS.PLATINUM) return 'PLATINUM';
  if (points >= TIER_THRESHOLDS.GOLD) return 'GOLD';
  if (points >= TIER_THRESHOLDS.SILVER) return 'SILVER';
  return 'BRONZE';
}

function getNextTier(currentTier: string): string | null {
  const tiers = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
  const index = tiers.indexOf(currentTier);
  return index < tiers.length - 1 ? tiers[index + 1] : null;
}

function getTierBenefits(tier: string) {
  const benefits: Record<string, string[]> = {
    BRONZE: ['5% desconto', 'Frete grátis acima de R$200'],
    SILVER: ['10% desconto', 'Frete grátis acima de R$150', 'Acesso antecipado'],
    GOLD: ['15% desconto', 'Frete grátis sempre', 'Estilista pessoal', 'Loja metaverso'],
    PLATINUM: ['20% desconto', 'Frete expresso grátis', 'Consultoria VIP', 'Avatar premium'],
    DIAMOND: ['25% desconto', 'Concierge 24/7', 'Produtos exclusivos', 'Eventos VIP']
  };
  return benefits[tier] || [];
}

async function createAchievement(userId: string, title: string, description: string, icon: string, points: number) {
  await prisma.achievement.create({
    data: { userId, title, description, icon, points, type: 'TIER' }
  });
}
