import { Heart, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-h-96 overflow-y-auto z-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" fill="currentColor" size={20} />
          <h3 className="font-bold">Favoritos ({wishlist.length})</h3>
        </div>
      </div>
      <div className="space-y-2">
        {wishlist.map(product => (
          <div key={product.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{product.name}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">R$ {product.price.toFixed(2)}</p>
            </div>
            <button onClick={() => addToCart(product)} className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-xs">Add</button>
            <button onClick={() => removeFromWishlist(product.id)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded transition">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
