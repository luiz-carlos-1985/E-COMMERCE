import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { cart, user } = useStore();
  const t = useTranslation();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t.ai?.welcome || 'Hello! How can I help you today?');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(message.toLowerCase());
      addBotMessage(response);
      setLoading(false);
    }, 800);
  };

  const generateResponse = (input: string): string => {
    if (input.includes('cart') || input.includes('carrinho')) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return `You have ${cart.length} items in your cart. Total: $${total.toFixed(2)}`;
    }
    if (input.includes('order') || input.includes('pedido')) {
      return user ? 'You can view your orders in the Orders page.' : 'Please login to view your orders.';
    }
    if (input.includes('shipping') || input.includes('entrega')) {
      return 'We offer free shipping on orders over $50. Delivery takes 5-10 business days.';
    }
    if (input.includes('return') || input.includes('devolução')) {
      return 'You can return items within 30 days of purchase. Contact support for assistance.';
    }
    if (input.includes('payment') || input.includes('pagamento')) {
      return 'We accept credit cards, PayPal, and cryptocurrency payments.';
    }
    if (input.includes('discount') || input.includes('desconto')) {
      return 'Check our Flash Sale section for current discounts up to 50% off!';
    }
    if (input.includes('help') || input.includes('ajuda')) {
      return 'I can help you with: cart info, orders, shipping, returns, payments, and discounts. What do you need?';
    }
    return 'I understand your question. For detailed assistance, please contact our support team or ask about cart, orders, shipping, returns, or payments.';
  };

  const quickActions = [
    { label: t.ai?.cart || 'View Cart', action: 'cart' },
    { label: t.ai?.orders || 'My Orders', action: 'order' },
    { label: t.ai?.shipping || 'Shipping Info', action: 'shipping' },
    { label: t.ai?.help || 'Help', action: 'help' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mb-2 w-96 h-[500px] flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">{t.ai?.title || 'AI Assistant'}</h3>
                <p className="text-xs opacity-80">{t.ai?.online || 'Online'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t.ai?.quick || 'Quick actions'}:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map(action => (
                  <button
                    key={action.action}
                    onClick={() => { setMessage(action.action); handleSend(); }}
                    className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.ai?.placeholder || 'Type your message...'}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || loading}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
    </div>
  );
};

export default AIAssistant;
