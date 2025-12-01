import { useEffect, useState } from 'react';
import { Box, Sparkles, User, ShoppingBag, Glasses } from 'lucide-react';
import axios from 'axios';

export default function MetaverseStore() {
  const [products, setProducts] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [view, setView] = useState<'store' | 'avatar' | 'tryon'>('store');

  useEffect(() => {
    loadMetaverseData();
  }, []);

  const loadMetaverseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [storeRes, avatarRes] = await Promise.all([
        axios.get('http://localhost:3001/api/metaverse/store'),
        axios.get('http://localhost:3001/api/metaverse/avatar', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setProducts(storeRes.data.products);
      setAvatar(avatarRes.data);
    } catch (error) {
      console.error('Failed to load metaverse data:', error);
    }
  };

  const tryOnProduct = async (product: any) => {
    setSelectedProduct(product);
    setView('tryon');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Sparkles className="text-yellow-400" />
            Loja no Metaverso
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView('store')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                view === 'store' ? 'bg-white text-black' : 'bg-white/10'
              }`}
            >
              <ShoppingBag size={20} />
              Loja
            </button>
            <button
              onClick={() => setView('avatar')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                view === 'avatar' ? 'bg-white text-black' : 'bg-white/10'
              }`}
            >
              <User size={20} />
              Avatar
            </button>
          </div>
        </div>
      </div>

      {/* Store View */}
      {view === 'store' && (
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo ao Futuro das Compras</h2>
            <p className="text-gray-400">Explore produtos em 3D e experimente virtualmente</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 backdrop-blur-lg border border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer group"
              >
                <div className="relative mb-4 h-48 bg-black/30 rounded-xl flex items-center justify-center overflow-hidden">
                  <Box size={64} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded-full">
                    3D
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => tryOnProduct(product)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Glasses size={18} />
                    Experimentar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avatar View */}
      {view === 'avatar' && avatar && (
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6">Seu Avatar</h2>
              <div className="h-96 bg-black/30 rounded-xl flex items-center justify-center mb-6">
                <User size={128} className="text-purple-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Acessórios</label>
                  <p className="text-white">{avatar.accessories.length} equipados</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-2xl p-6 backdrop-blur-lg border border-pink-500/30">
                <h3 className="text-2xl font-bold mb-4">Personalizar Avatar</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Óculos', 'Chapéu', 'Jaqueta', 'Tênis', 'Relógio', 'Mochila'].map((item) => (
                    <div
                      key={item}
                      className="bg-black/30 p-4 rounded-xl text-center cursor-pointer hover:bg-black/50 transition-all"
                    >
                      <Box size={32} className="mx-auto mb-2 text-purple-400" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-6 backdrop-blur-lg border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4">Loja de Acessórios</h3>
                <p className="text-gray-400 mb-4">Desbloqueie itens exclusivos com pontos de fidelidade</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                  Explorar Loja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Try-On View */}
      {view === 'tryon' && selectedProduct && (
        <div className="max-w-7xl mx-auto p-8">
          <button
            onClick={() => setView('store')}
            className="mb-6 text-purple-400 hover:text-purple-300"
          >
            ← Voltar para loja
          </button>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6">Experimentação Virtual</h2>
              <div className="h-96 bg-black/30 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Glasses size={64} className="mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-400">Visualização 3D do produto</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold">
                  Adicionar ao Carrinho
                </button>
                <button className="px-6 bg-white/10 rounded-xl">
                  <ShoppingBag />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-2xl p-6 backdrop-blur-lg border border-pink-500/30">
                <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
                <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
                <div className="text-3xl font-bold text-green-400 mb-6">
                  R$ {selectedProduct.price.toFixed(2)}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Visualização 360°</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Realidade Aumentada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Prova Virtual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
