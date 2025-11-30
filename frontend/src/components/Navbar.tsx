import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

export default function Navbar() {
  const { user, cart, wishlist, logout } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const t = useTranslation();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🛍️</span>
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">E-Shop</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-purple-200 transition">{t.nav.products}</Link>
          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="flex items-center gap-2 hover:text-purple-200 transition">
                  <LayoutDashboard size={20} /> {t.nav.admin}
                </Link>
              )}
              <Link to="/orders" className="hover:text-purple-200 transition">{t.nav.orders}</Link>
              <Link to="/wishlist" className="relative hover:text-purple-200 transition">
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative hover:text-purple-200 transition">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
              <ThemeToggle />
              <LanguageSelector />
              <button onClick={logout} className="flex items-center gap-2 hover:text-purple-200 transition">
                <LogOut size={20} /> {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <LanguageSelector />
              <Link to="/login" className="flex items-center gap-2 hover:text-purple-200 transition">
                <User size={20} /> {t.nav.login}
              </Link>
              <Link to="/register" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition">
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
