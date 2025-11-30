import { Bitcoin, Wallet, QrCode } from 'lucide-react';
import { useState } from 'react';

export default function CryptoPayment() {
  const [open, setOpen] = useState(false);
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'from-orange-400 to-yellow-500' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: 'from-blue-400 to-purple-500' },
    { name: 'USDT', symbol: 'USDT', icon: '₮', color: 'from-green-400 to-emerald-500' }
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-700 transition flex items-center justify-center gap-2">
        <Bitcoin size={20} /> Pagar com Crypto
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Pagamento Crypto</h3>
            <div className="space-y-3 mb-4">
              {cryptos.map(crypto => (
                <button key={crypto.symbol} className={`w-full bg-gradient-to-r ${crypto.color} text-white p-4 rounded-xl hover:scale-105 transition flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{crypto.icon}</span>
                    <div className="text-left">
                      <p className="font-bold">{crypto.name}</p>
                      <p className="text-sm opacity-90">{crypto.symbol}</p>
                    </div>
                  </div>
                  <Wallet size={24} />
                </button>
              ))}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
              <QrCode size={48} className="mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Escaneie o QR Code para pagar</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
