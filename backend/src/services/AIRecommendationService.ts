import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AIRecommendationService {
  async getCollaborativeRecommendations(userId: string, limit = 10) {
    const userOrders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } }
    });

    const userProductIds = new Set(
      userOrders.flatMap(o => o.orderItems.map(i => i.productId))
    );

    const similarUsers = await prisma.order.findMany({
      where: {
        userId: { not: userId },
        orderItems: { some: { productId: { in: Array.from(userProductIds) } } }
      },
      include: { orderItems: { include: { product: true } } },
      take: 50
    });

    const recommendations = new Map<string, number>();
    similarUsers.forEach(order => {
      order.orderItems.forEach(item => {
        if (!userProductIds.has(item.productId)) {
          recommendations.set(item.productId, (recommendations.get(item.productId) || 0) + 1);
        }
      });
    });

    const sortedRecs = Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    return prisma.product.findMany({
      where: { id: { in: sortedRecs.map(r => r[0]) } }
    });
  }

  async getContentBasedRecommendations(productId: string, limit = 10) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return [];

    const priceRange = product.price * 0.3;
    return prisma.product.findMany({
      where: {
        id: { not: productId },
        category: product.category,
        price: { gte: product.price - priceRange, lte: product.price + priceRange },
        stock: { gt: 0 }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTrendingProducts(limit = 10) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendingData = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: { order: { createdAt: { gte: thirtyDaysAgo } } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit
    });

    return prisma.product.findMany({
      where: { id: { in: trendingData.map(t => t.productId) } }
    });
  }

  async getPersonalizedRecommendations(userId: string, limit = 10) {
    const [collaborative, trending] = await Promise.all([
      this.getCollaborativeRecommendations(userId, limit),
      this.getTrendingProducts(limit)
    ]);

    return [...collaborative.slice(0, 6), ...trending.slice(0, 4)].slice(0, limit);
  }

  async smartSearch(query: string, limit = 20) {
    const terms = query.toLowerCase().split(' ');
    
    return prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          ...terms.map(term => ({
            OR: [
              { name: { contains: term, mode: 'insensitive' } },
              { description: { contains: term, mode: 'insensitive' } }
            ]
          }))
        ],
        stock: { gt: 0 }
      },
      take: limit
    });
  }

  async getFrequentlyBoughtTogether(productId: string, limit = 5) {
    const orders = await prisma.order.findMany({
      where: { orderItems: { some: { productId } } },
      include: { orderItems: { include: { product: true } } }
    });

    const coOccurrence = new Map<string, number>();
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        if (item.productId !== productId) {
          coOccurrence.set(item.productId, (coOccurrence.get(item.productId) || 0) + 1);
        }
      });
    });

    const sorted = Array.from(coOccurrence.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    return prisma.product.findMany({
      where: { id: { in: sorted.map(s => s[0]) } }
    });
  }
}

export const aiRecommendationService = new AIRecommendationService();
