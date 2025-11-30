import { Glasses, Gamepad2, Sparkles } from 'lucide-react';

export default function MetaverseStore() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Glasses size={48} className="animate-pulse" />
            <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-400 animate-spin" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-1">Loja no Metaverso</h2>
            <p className="text-purple-200">Compre em realidade virtual</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Glasses size={32} className="mx-auto mb-2" />
            <p className="font-semibold">VR Shopping</p>
            <p className="text-sm text-purple-200">Experiência imersiva</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Gamepad2 size={32} className="mx-auto mb-2" />
            <p className="font-semibold">Avatar 3D</p>
            <p className="text-sm text-purple-200">Personalize seu avatar</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Sparkles size={32} className="mx-auto mb-2" />
            <p className="font-semibold">NFT Store</p>
            <p className="text-sm text-purple-200">Produtos exclusivos</p>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-600 transition shadow-2xl">
          Entrar no Metaverso
        </button>
      </div>
    </div>
  );
}
