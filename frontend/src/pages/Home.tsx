import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Grid, List, TrendingUp } from 'lucide-react';
import api from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import RecentlyViewed from '../components/RecentlyViewed';
import VoiceSearch from '../components/VoiceSearch';
import GlobalShipping from '../components/GlobalShipping';
import MetaverseStore from '../components/MetaverseStore';
import FlashSale from '../components/FlashSale';
import LoyaltyProgram from '../components/LoyaltyProgram';
import GamificationBadges from '../components/GamificationBadges';
import PersonalStylist from '../components/PersonalStylist';
import LiveStream from '../components/LiveStream';
import { useTranslation } from '../hooks/useTranslation';
import { useStore } from '../store/useStore';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const t = useTranslation();
  const user = useStore(state => state.user);

  useEffect(() => {
    api.get('/products', { params: { search, category: category || undefined } })
      .then(res => {
        let filtered = res.data.filter((p: Product) => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (sortBy === 'price-asc') filtered.sort((a: Product, b: Product) => a.price - b.price);
        if (sortBy === 'price-desc') filtered.sort((a: Product, b: Product) => b.price - a.price);
        if (sortBy === 'name') filtered.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        setProducts(filtered);
      })
      .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        setProducts([]);
      });
  }, [search, category, sortBy, priceRange]);

  const [trending, setTrending] = useState<Product[]>([]);
  const categories = ['Eletrônicos', 'Roupas', 'Livros', 'Casa', 'Esportes'];

  useEffect(() => {
    api.get('/recommendations/trending').then(res => setTrending(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <GlobalShipping />
        <MetaverseStore />
        <LiveStream />
        <FlashSale products={products.slice(0, 4)} />
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {user && <LoyaltyProgram />}
          {user && <GamificationBadges />}
        </div>
        <PersonalStylist />
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">{t.home.title}</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.home.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-600 transition">
              <option value="">{t.home.allCategories}</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-600 transition">
              <option value="name">{t.home.sortName || 'Name'}</option>
              <option value="price-asc">{t.home.sortPriceAsc || 'Price: Low to High'}</option>
              <option value="price-desc">{t.home.sortPriceDesc || 'Price: High to Low'}</option>
            </select>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'}`}>
                <Grid size={20} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl transition ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'}`}>
                <List size={20} />
              </button>
              <VoiceSearch onSearch={setSearch} />
            </div>
          </div>
          {trending.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold dark:text-gray-100">{t.home.trending || 'Trending'}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {trending.map(product => <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />)}
              </div>
            </div>
          )}
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {products.map(product => <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />)}
        </div>
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 dark:text-gray-600">{t.home.noProducts || 'No products found'}</p>
          </div>
        )}
        <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        <RecentlyViewed />
      </div>
    </div>
  );
}
