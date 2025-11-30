import { Tag, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onApply: (discount: number) => void;
}

export default function CouponInput({ onApply }: Props) {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const coupons: Record<string, number> = {
    'BEMVINDO10': 10,
    'PRIMEIRACOMPRA': 15,
    'FRETEGRATIS': 0
  };

  const applyCoupon = () => {
    const discount = coupons[code.toUpperCase()];
    if (discount !== undefined) {
      onApply(discount);
      setApplied(true);
    } else {
      alert('Cupom inválido');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="text-purple-600" size={20} />
        <span className="font-semibold">Cupom de Desconto</span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Digite o cupom"
          disabled={applied}
          className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-600 disabled:opacity-50"
        />
        <button
          onClick={applyCoupon}
          disabled={applied}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          {applied ? <><Check size={16} /> Aplicado</> : 'Aplicar'}
        </button>
      </div>
      {applied && <p className="text-green-600 text-sm mt-2">✓ Cupom aplicado com sucesso!</p>}
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        <p>Cupons disponíveis: BEMVINDO10, PRIMEIRACOMPRA, FRETEGRATIS</p>
      </div>
    </div>
  );
}
