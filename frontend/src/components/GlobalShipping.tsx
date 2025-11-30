import { Globe, Plane, Ship, Truck } from 'lucide-react';
import { useState } from 'react';

export default function GlobalShipping() {
  const [country, setCountry] = useState('BR');
  const countries = [
    { code: 'BR', name: 'Brasil', flag: '🇧🇷', shipping: 'Grátis' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', shipping: '$25' },
    { code: 'UK', name: 'Reino Unido', flag: '🇬🇧', shipping: '£20' },
    { code: 'JP', name: 'Japão', flag: '🇯🇵', shipping: '¥3000' },
    { code: 'DE', name: 'Alemanha', flag: '🇩🇪', shipping: '€15' },
    { code: 'AU', name: 'Austrália', flag: '🇦🇺', shipping: 'A$30' }
  ];

  const selected = countries.find(c => c.code === country);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Globe size={32} className="animate-spin-slow" />
        <div>
          <h2 className="text-2xl font-bold">Entrega Global</h2>
          <p className="text-blue-100">Enviamos para todo o mundo</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {countries.map(c => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`p-3 rounded-xl transition ${country === c.code ? 'bg-white text-purple-600 shadow-lg scale-105' : 'bg-white/20 hover:bg-white/30'}`}
          >
            <span className="text-3xl mb-1 block">{c.flag}</span>
            <p className="text-xs font-semibold">{c.name}</p>
          </button>
        ))}
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane size={24} />
            <div>
              <p className="font-semibold">Frete para {selected?.name}</p>
              <p className="text-sm text-blue-100">Entrega em 5-10 dias úteis</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{selected?.shipping}</p>
            <p className="text-xs text-blue-100">Rastreamento incluído</p>
          </div>
        </div>
      </div>
    </div>
  );
}
