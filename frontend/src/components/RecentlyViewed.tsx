import { Eye } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function RecentlyViewed() {
  const recentlyViewed = useStore(state => state.recentlyViewed);
  if (recentlyViewed.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold">Visualizados Recentemente</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.slice(0, 6).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
