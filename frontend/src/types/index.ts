export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface Order {
  id: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  orderItems: CartItem[];
}

export interface LoyaltyData {
  points: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
  nextTier: string | null;
  pointsToNext: number;
  achievements: Achievement[];
  benefits: string[];
}

export interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt: string;
}

export interface MetaverseAvatar {
  id: string;
  userId: string;
  avatarUrl: string;
  accessories: string[];
  position: string;
}

export interface StyleProfile {
  id: string;
  userId: string;
  bodyType: string;
  preferredColors: string[];
  preferredStyles: string[];
  sizes: string;
  budget: string;
}

export interface StyleRecommendation extends Product {
  matchScore: number;
  reason: string;
}

export interface Outfit {
  top?: Product;
  bottom?: Product;
  shoes?: Product;
  accessories?: Product[];
}
