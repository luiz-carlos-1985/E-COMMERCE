import { ShoppingCart, Heart, Eye, GitCompare } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { addToCart, toggleWishlist, addToCompare, wishlist, addNotification } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isInWishlist = wishlist.some(p => p.id === product.id);
  const t = useTranslation();

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
      <div className="relative overflow-hidden">
        {!imageLoaded && <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />}
        <img src={product.image} alt={product.name} className={`w-full h-64 object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => toggleWishlist(product)} className={`p-2 rounded-full backdrop-blur-sm transition ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-red-500 hover:text-white'}`}>
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => onQuickView?.(product)} className="p-2 bg-white/90 rounded-full hover:bg-purple-500 hover:text-white transition backdrop-blur-sm">
            <Eye size={18} />
          </button>
          <button onClick={() => { addToCompare(product); addNotification('success', t.home.addedCompare || 'Added to compare!'); }} className="p-2 bg-white/90 rounded-full hover:bg-blue-500 hover:text-white transition backdrop-blur-sm">
            <GitCompare size={18} />
          </button>
        </div>
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {t.home.lastUnits?.replace('{n}', product.stock.toString()) || `Last ${product.stock} units!`}
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{product.category}</span>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {product.price.toFixed(2)}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.home.stock}: {product.stock}</p>
          </div>
          <button
            onClick={() => { addToCart(product); addNotification('success', t.home.addedCart || 'Product added!'); }}
            disabled={product.stock === 0}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={20} /> {product.stock === 0 ? t.home.outOfStock : t.home.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
