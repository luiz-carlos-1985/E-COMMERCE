import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, addNotification } = useStore();
  const t = useTranslation();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    addNotification('success', t.home.addedCart || 'Product added to cart!');
  };

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    addNotification('info', t.wishlist?.removed || 'Removed from wishlist');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" fill="currentColor" size={32} />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              {t.wishlist?.title || 'My Wishlist'}
            </h1>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {wishlist.length}
            </span>
          </div>
          {wishlist.length > 0 && (
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              <Share2 size={20} />
              {t.wishlist?.share || 'Share'}
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={80} />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              {t.wishlist?.empty || 'Your wishlist is empty'}
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              {t.wishlist?.emptyDesc || 'Start adding products you love!'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
            >
              {t.wishlist?.browse || 'Browse Products'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.stock > 0 ? (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {t.home.stock}: {product.stock}
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {t.home.outOfStock}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={18} />
                      {t.home.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
