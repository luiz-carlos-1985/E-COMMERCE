import { Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Language } from '../i18n/translations';

export default function LanguageSelector() {
  const { language, setLanguage } = useStore();
  const langs: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
        <Globe size={20} />
        <span>{langs.find(l => l.code === language)?.flag}</span>
      </button>
      <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {langs.map(l => (
          <button key={l.code} onClick={() => setLanguage(l.code)} className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${language === l.code ? 'bg-purple-50 dark:bg-purple-900' : ''}`}>
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
