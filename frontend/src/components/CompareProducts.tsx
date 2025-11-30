import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CompareProducts() {
  const { compareList, removeFromCompare, clearCompare } = useStore();
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-2xl p-4 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Comparar Produtos ({compareList.length})</h3>
          <button onClick={clearCompare} className="text-sm text-red-500 hover:underline">Limpar</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compareList.map(product => (
            <div key={product.id} className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <button onClick={() => removeFromCompare(product.id)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full">
                <X size={12} />
              </button>
              <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
              <p className="text-sm font-semibold truncate">{product.name}</p>
              <p className="text-purple-600 dark:text-purple-400 font-bold">R$ {product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
