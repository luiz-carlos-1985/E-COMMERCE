import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getStyleProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const profile = await prisma.styleProfile.findUnique({
      where: { userId }
    });

    res.json(profile || { message: 'Create your style profile first' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get style profile' });
  }
};

export const createStyleProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { bodyType, preferredColors, preferredStyles, sizes, budget } = req.body;

    const profile = await prisma.styleProfile.upsert({
      where: { userId },
      update: { bodyType, preferredColors, preferredStyles, sizes, budget },
      create: { userId: userId!, bodyType, preferredColors, preferredStyles, sizes, budget }
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create style profile' });
  }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const profile = await prisma.styleProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return res.status(404).json({ error: 'Style profile not found' });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { tags: { hasSome: profile.preferredStyles } },
          { category: { in: profile.preferredStyles } }
        ]
      },
      take: 20
    });

    const recommendations = products.map(p => ({
      ...p,
      matchScore: calculateMatchScore(p, profile),
      reason: generateReason(p, profile)
    })).sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      recommendations: recommendations.slice(0, 10),
      styleInsights: generateInsights(profile)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
};

export const createOutfit = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { occasion, season } = req.body;

    const profile = await prisma.styleProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return res.status(404).json({ error: 'Style profile not found' });
    }

    const products = await prisma.product.findMany({
      where: { tags: { hasSome: [occasion, season, ...profile.preferredStyles] } }
    });

    const outfit = {
      top: products.find(p => p.category === 'Camisetas' || p.category === 'Blusas'),
      bottom: products.find(p => p.category === 'Calças' || p.category === 'Saias'),
      shoes: products.find(p => p.category === 'Calçados'),
      accessories: products.filter(p => p.category === 'Acessórios').slice(0, 2)
    };

    res.json({
      outfit,
      occasion,
      season,
      totalPrice: calculateOutfitPrice(outfit),
      styleNotes: `Look perfeito para ${occasion} no ${season}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create outfit' });
  }
};

function calculateMatchScore(product: any, profile: any): number {
  let score = 50;
  
  if (profile.preferredStyles.some((s: string) => product.tags.includes(s))) score += 30;
  if (profile.preferredColors.some((c: string) => product.name.toLowerCase().includes(c.toLowerCase()))) score += 20;
  
  return Math.min(score, 100);
}

function generateReason(product: any, profile: any): string {
  const reasons = [
    'Combina com seu estilo',
    'Cor favorita detectada',
    'Tendência da temporada',
    'Perfeito para seu tipo de corpo'
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

function generateInsights(profile: any) {
  return {
    dominantStyle: profile.preferredStyles[0] || 'Casual',
    colorPalette: profile.preferredColors.join(', '),
    tip: 'Experimente combinar peças básicas com acessórios statement!'
  };
}

function calculateOutfitPrice(outfit: any): number {
  let total = 0;
  if (outfit.top) total += outfit.top.price;
  if (outfit.bottom) total += outfit.bottom.price;
  if (outfit.shoes) total += outfit.shoes.price;
  if (outfit.accessories) {
    outfit.accessories.forEach((a: any) => total += a.price);
  }
  return total;
}
