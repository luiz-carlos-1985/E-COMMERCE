import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Package, Eye, Heart } from 'lucide-react';
import RealTimeAnalytics from './RealTimeAnalytics';

export default function AdvancedDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [salesData, setSalesData] = useState({
    total: 45678.90,
    growth: 23.5,
    orders: 234,
    avgOrder: 195.20
  });

  const [topProducts, setTopProducts] = useState([
    { name: 'Notebook Gamer', sales: 45, revenue: 67500 },
    { name: 'Mouse Wireless', sales: 123, revenue: 6150 },
    { name: 'Teclado Mecânico', sales: 89, revenue: 13350 },
    { name: 'Monitor 4K', sales: 34, revenue: 20400 }
  ]);

  const metrics = [
    {
      title: 'Receita Total',
      value: `R$ ${salesData.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: `+${salesData.growth}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Total de Pedidos',
      value: salesData.orders,
      change: '+12%',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${salesData.avgOrder.toFixed(2)}`,
      change: '+8%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Novos Clientes',
      value: 89,
      change: '+34%',
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Dashboard Avançado
        </h1>
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range === '24h' ? '24 Horas' : range === '7d' ? '7 Dias' : '30 Dias'}
            </button>
          ))}
        </div>
      </div>

      <RealTimeAnalytics />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.bg} p-3 rounded-lg`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <span className="text-green-600 text-sm font-semibold">{metric.change}</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Produtos Mais Vendidos
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} vendas</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">R$ {product.revenue.toLocaleString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Métricas de Engajamento
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Visualizações</span>
              </div>
              <span className="text-xl font-bold">12,543</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-red-600" />
                <span className="font-medium">Favoritos</span>
              </div>
              <span className="text-xl font-bold">3,421</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <span className="font-medium">Carrinhos Ativos</span>
              </div>
              <span className="text-xl font-bold">567</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Taxa de Conversão</span>
              </div>
              <span className="text-xl font-bold">4.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">🎯 Meta do Mês</h3>
        <p className="text-purple-100 mb-4">R$ 100.000,00</p>
        <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-2">
          <div className="bg-white h-full rounded-full transition-all" style={{ width: '45.7%' }} />
        </div>
        <div className="flex justify-between text-sm">
          <span>R$ 45.678,90 alcançado</span>
          <span>45.7%</span>
        </div>
      </div>
    </div>
  );
}
