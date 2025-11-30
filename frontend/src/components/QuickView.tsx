import { X, ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import ARViewer from './ARViewer';
import SocialShare from './SocialShare';
import PriceAlert from './PriceAlert';
import VirtualTryOn from './VirtualTryOn';
import InstallmentCalculator from './InstallmentCalculator';
import SizeGuide from './SizeGuide';
import SustainabilityScore from './SustainabilityScore';
import CryptoPayment from './CryptoPayment';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  if (!product) return null;

  const isInWishlist = wishlist.some(p => p.id === product.id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Visualização Rápida</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <X size={24} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
            <div className="flex gap-2 mt-4">
              {[1,2,3].map(i => (
                <img key={i} src={product.image} className="w-20 h-20 object-cover rounded-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">(128 avaliações)</span>
            </div>
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">R$ {product.price.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
            <InstallmentCalculator price={product.price} />
            <div className="flex gap-2 my-4">
              <ARViewer product={product} />
              <VirtualTryOn />
              <SocialShare product={product} />
            </div>
            <div className="flex gap-4 mb-4">
              <PriceAlert productId={product.id} currentPrice={product.price} />
              <SizeGuide />
            </div>
            <SustainabilityScore score={85} />
            <div className="my-4">
              <CryptoPayment />
            </div>
            <div className="flex gap-4 mb-6">
              <button onClick={() => { addToCart(product); onClose(); }} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Adicionar ao Carrinho
              </button>
              <button onClick={() => toggleWishlist(product)} className={`p-3 rounded-xl border-2 transition ${isInWishlist ? 'bg-red-50 border-red-500 text-red-500' : 'border-gray-300 hover:border-red-500 hover:text-red-500'}`}>
                <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Categoria:</span> {product.category}</p>
              <p><span className="font-semibold">Estoque:</span> {product.stock} unidades</p>
              <p><span className="font-semibold">SKU:</span> {product.id.slice(0, 8)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
