import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Tag, Truck, Shield, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import api from '../services/api';
import CouponInput from '../components/CouponInput';
import ProgressBar from '../components/ProgressBar';
import { useTranslation } from '../hooks/useTranslation';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, discount, setDiscount, addNotification } = useStore();
  const navigate = useNavigate();
  const t = useTranslation();
  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal - (subtotal * (discount || 0) / 100) + shipping;

  const handleCheckout = async () => {
    try {
      await api.post('/orders', { items: cart });
      clearCart();
      addNotification('success', t.cart?.success || 'Order placed successfully!');
      navigate('/orders');
    } catch (error: any) {
      if (error?.offline) {
        addNotification('error', 'System offline - Try again later');
      } else {
        addNotification('error', error.response?.data?.error || 'Error placing order');
      }
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingCart className="mx-auto text-gray-300 dark:text-gray-700 mb-6" size={100} />
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t.cart?.empty || 'Your cart is empty'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition shadow-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            {t.cart?.continue || 'Continue Shopping'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-purple-600 dark:text-purple-400" size={40} />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              {t.cart?.title || 'Shopping Cart'}
            </h1>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
          >
            <ArrowLeft size={20} />
            {t.cart?.continue || 'Continue Shopping'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.productId}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-32 h-32 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {item.product?.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {item.product?.category}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.product?.stock && item.product.stock < 10 && (
                        <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full">
                          Only {item.product.stock} left!
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t.cart?.title || 'Order Summary'}
              </h2>

              <ProgressBar total={subtotal} />

              <div className="my-6">
                <CouponInput
                  onApply={(d) => {
                    setDiscount(d);
                    addNotification('success', `${d}% discount applied!`);
                  }}
                />
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>{t.cart?.subtotal || 'Subtotal'}:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({discount}%):</span>
                    <span className="font-semibold">-${(subtotal * discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-4 border-t dark:border-gray-700 flex justify-between text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <span>{t.cart?.total || 'Total'}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg mb-4"
              >
                {t.cart?.checkout || 'Proceed to Checkout'}
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield size={18} className="text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Truck size={18} className="text-blue-600" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CreditCard size={18} className="text-purple-600" />
                  <span>Multiple payment options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
