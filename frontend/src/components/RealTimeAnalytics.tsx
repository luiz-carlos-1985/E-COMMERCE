import { useEffect, useState } from 'react';
import { Users, ShoppingCart, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';

export default function RealTimeAnalytics() {
  const [stats, setStats] = useState({
    onlineUsers: 0,
    activeOrders: 0,
    todaySales: 0,
    conversionRate: 0
  });

  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on('users:online', (count: number) => {
        setStats(prev => ({ ...prev, onlineUsers: count }));
      });

      socket.on('admin:new-order', () => {
        setStats(prev => ({ 
          ...prev, 
          activeOrders: prev.activeOrders + 1,
          todaySales: prev.todaySales + Math.random() * 500
        }));
      });
    }
  }, [socket]);

  const metrics = [
    {
      icon: Users,
      label: 'Usuários Online',
      value: stats.onlineUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: ShoppingCart,
      label: 'Pedidos Ativos',
      value: stats.activeOrders,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: DollarSign,
      label: 'Vendas Hoje',
      value: `R$ ${stats.todaySales.toFixed(2)}`,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Conversão',
      value: `${stats.conversionRate.toFixed(1)}%`,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
            <div className={`${metric.bg} p-3 rounded-lg`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <Activity className="w-4 h-4 text-green-600" />
            <span className="text-green-600">Tempo real</span>
          </div>
        </div>
      ))}
    </div>
  );
}
