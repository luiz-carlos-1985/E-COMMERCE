import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../store/useStore';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function AIRecommendations() {
  const [personalized, setPersonalized] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);
  const addToCart = useStore(state => state.addToCart);

  useEffect(() => {
    loadRecommendations();
  }, [user]);

  const loadRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [personalizedRes, trendingRes] = await Promise.all([
        user 
          ? axios.get('http://localhost:3001/api/ai/recommendations/personalized', { headers })
          : Promise.resolve({ data: [] }),
        axios.get('http://localhost:3001/api/ai/recommendations/trending')
      ]);

      setPersonalized(personalizedRes.data);
      setTrending(trendingRes.data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {user && personalized.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Recomendado para Você</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {personalized.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}

      {trending.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Produtos em Alta</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: any) => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          AI Pick
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-purple-600 font-bold text-lg mb-3">
          R$ {product.price.toFixed(2)}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
