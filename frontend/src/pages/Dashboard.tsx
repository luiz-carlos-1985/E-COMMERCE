import { Link } from 'react-router-dom';
import { Trophy, Box, Sparkles, ShoppingBag, Heart, TrendingUp, Award, Zap } from 'lucide-react';

export default function Dashboard() {
  const features = [
    {
      title: 'Programa de Fidelidade',
      description: 'Ganhe pontos, suba de nível e desbloqueie recompensas exclusivas',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      link: '/loyalty',
      stats: ['5 Níveis', '50+ Recompensas', 'Benefícios VIP']
    },
    {
      title: 'Loja no Metaverso',
      description: 'Explore produtos em 3D, personalize seu avatar e compre no futuro',
      icon: Box,
      color: 'from-purple-500 to-pink-500',
      link: '/metaverse',
      stats: ['Avatar 3D', 'Prova Virtual', 'Realidade Aumentada']
    },
    {
      title: 'Estilista Pessoal IA',
      description: 'Receba recomendações personalizadas e looks criados por IA',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      link: '/stylist',
      stats: ['IA Avançada', 'Looks Personalizados', 'Análise de Estilo']
    }
  ];

  const quickStats = [
    { label: 'Produtos', value: '500+', icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Clientes Ativos', value: '10K+', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Conquistas', value: '100+', icon: Award, color: 'text-yellow-500' },
    { label: 'Satisfação', value: '98%', icon: Heart, color: 'text-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-8 py-20 text-center">
          <div className="inline-block mb-6">
            <Zap className="text-yellow-400 animate-pulse" size={64} />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">
            Bem-vindo ao Futuro do E-Commerce
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experiência de compra revolucionária com IA, Metaverso e Gamificação
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              Explorar Produtos
            </Link>
            <Link
              to="/metaverse"
              className="bg-white/10 backdrop-blur-lg px-8 py-4 rounded-xl text-white font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
            >
              Entrar no Metaverso
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-8 -mt-10 mb-16">
        <div className="grid md:grid-cols-4 gap-6">
          {quickStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <stat.icon className={`${stat.color} mb-3`} size={32} />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Funcionalidades Ultra Modernas
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Link
              key={i}
              to={feature.link}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
              <div className="relative">
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.stats.map((stat, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {stat}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                  Explorar
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para Revolucionar sua Experiência?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de clientes que já estão no futuro do e-commerce
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Criar Conta Grátis
            </Link>
            <Link
              to="/loyalty"
              className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
            >
              Ver Programa de Fidelidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
