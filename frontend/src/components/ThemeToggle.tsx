import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
