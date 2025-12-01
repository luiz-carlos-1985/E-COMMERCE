import { Globe, Plane, Ship, Truck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useStore } from '../store/useStore';

export default function GlobalShipping() {
  const [country, setCountry] = useState('BR');
  const t = useTranslation();
  const language = useStore(state => state.language);
  
  const getCountryName = (code: string) => {
    const names: any = {
      BR: { en: 'Brazil', pt: 'Brasil', es: 'Brasil' },
      US: { en: 'United States', pt: 'Estados Unidos', es: 'Estados Unidos' },
      UK: { en: 'United Kingdom', pt: 'Reino Unido', es: 'Reino Unido' },
      JP: { en: 'Japan', pt: 'Japão', es: 'Japón' },
      DE: { en: 'Germany', pt: 'Alemanha', es: 'Alemania' },
      AU: { en: 'Australia', pt: 'Austrália', es: 'Australia' }
    };
    return names[code][language];
  };
  
  const countries = [
    { code: 'BR', flag: '🇧🇷', shipping: language === 'pt' ? 'Grátis' : 'Free' },
    { code: 'US', flag: '🇺🇸', shipping: '$25' },
    { code: 'UK', flag: '🇬🇧', shipping: '£20' },
    { code: 'JP', flag: '🇯🇵', shipping: '¥3000' },
    { code: 'DE', flag: '🇩🇪', shipping: '€15' },
    { code: 'AU', flag: '🇦🇺', shipping: 'A$30' }
  ];

  const selected = countries.find(c => c.code === country);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Globe size={32} className="animate-spin-slow" />
        <div>
          <h2 className="text-2xl font-bold">{t.shipping?.title || 'Global Shipping'}</h2>
          <p className="text-blue-100">{t.shipping?.subtitle || 'We ship worldwide'}</p>
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
            <p className="text-xs font-semibold">{getCountryName(c.code)}</p>
          </button>
        ))}
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane size={24} />
            <div>
              <p className="font-semibold">{t.shipping?.shippingTo || 'Shipping to'} {getCountryName(selected?.code || 'BR')}</p>
              <p className="text-sm text-blue-100">{t.shipping?.delivery || 'Delivery in 5-10 business days'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{selected?.shipping}</p>
            <p className="text-xs text-blue-100">{t.shipping?.tracking || 'Tracking included'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
