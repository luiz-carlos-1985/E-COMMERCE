import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import api from '../services/api';
import { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'Pendente',
    PROCESSING: 'Processando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregue',
    CANCELLED: 'Cancelado'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Meus Pedidos</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="text-purple-600" />
                    <span className="font-semibold text-gray-600">Pedido #{order.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                {order.orderItems.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-700">
                    <span>{item.product?.name} x{item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-purple-600">R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
