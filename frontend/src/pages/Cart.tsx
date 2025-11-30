import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import api from '../services/api';
import CouponInput from '../components/CouponInput';
import ProgressBar from '../components/ProgressBar';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, discount, setDiscount, addNotification } = useStore();
  const navigate = useNavigate();
  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const total = subtotal - (subtotal * (discount || 0) / 100);

  const handleCheckout = async () => {
    try {
      await api.post('/orders', { items: cart });
      clearCart();
      alert('Pedido realizado com sucesso!');
      navigate('/orders');
    } catch {
      alert('Erro ao finalizar pedido');
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Carrinho Vazio</h2>
          <button onClick={() => navigate('/')} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition">
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Carrinho de Compras</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.productId} className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
                <img src={item.product?.image} alt={item.product?.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.product?.name}</h3>
                  <p className="text-purple-600 font-semibold">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit space-y-4">
            <h2 className="text-2xl font-bold mb-4">Resumo</h2>
            <ProgressBar total={subtotal} />
            <CouponInput onApply={(d) => { setDiscount(d); addNotification('success', `Desconto de ${d}% aplicado!`); }} />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto ({discount}%):</span>
                  <span className="font-semibold">-R$ {(subtotal * discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-purple-600 dark:text-purple-400 pt-2 border-t dark:border-gray-700">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition">
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
