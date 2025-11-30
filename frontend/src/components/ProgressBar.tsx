import { Truck } from 'lucide-react';

interface Props {
  total: number;
}

export default function ProgressBar({ total }: Props) {
  const freeShipping = 200;
  const progress = Math.min((total / freeShipping) * 100, 100);
  const remaining = Math.max(freeShipping - total, 0);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck className="text-green-600" size={20} />
          <span className="font-semibold text-sm">Frete Grátis</span>
        </div>
        {remaining > 0 ? (
          <span className="text-sm text-gray-600 dark:text-gray-400">Faltam R$ {remaining.toFixed(2)}</span>
        ) : (
          <span className="text-sm text-green-600 font-semibold">✓ Você ganhou!</span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
