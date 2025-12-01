import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, MapPin, Calendar, DollarSign, Eye, Download } from 'lucide-react';
import api from '../services/api';
import { Order } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>('ALL');
  const t = useTranslation();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error: any) {
      if (error?.offline) {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    PENDING: { color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400', icon: Clock, label: t.orders?.status?.PENDING || 'Pending' },
    PROCESSING: { color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400', icon: Package, label: t.orders?.status?.PROCESSING || 'Processing' },
    SHIPPED: { color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400', icon: Truck, label: t.orders?.status?.SHIPPED || 'Shipped' },
    DELIVERED: { color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400', icon: CheckCircle, label: t.orders?.status?.DELIVERED || 'Delivered' },
    CANCELLED: { color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400', icon: XCircle, label: t.orders?.status?.CANCELLED || 'Cancelled' }
  };

  const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  const StatusIcon = ({ status }: { status: string }) => {
    const Icon = statusConfig[status]?.icon || Package;
    return <Icon size={20} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="text-purple-600 dark:text-purple-400" size={40} />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              {t.orders?.title || 'My Orders'}
            </h1>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {status === 'ALL' ? 'All' : statusConfig[status]?.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={80} />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              {filter === 'ALL' ? 'Start shopping to see your orders here!' : `No ${statusConfig[filter]?.label.toLowerCase()} orders`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <StatusIcon status={order.status} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800 dark:text-gray-100">
                            {t.orders?.order || 'Order'} #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar size={14} />
                          {new Date(order.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${statusConfig[order.status]?.color}`}>
                        <StatusIcon status={order.status} />
                        {statusConfig[order.status]?.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order.orderItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {item.product?.name || 'Product'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600 dark:text-purple-400">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <DollarSign size={20} />
                        <span className="font-semibold">Total:</span>
                      </div>
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                      >
                        <Eye size={20} />
                        View Details
                      </button>
                      <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2">
                        <Download size={20} />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Order Details
                  </h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">#{selectedOrder.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`px-3 py-1 rounded-full font-semibold ${statusConfig[selectedOrder.status]?.color}`}>
                      {statusConfig[selectedOrder.status]?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
