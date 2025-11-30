import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Como posso ajudar?', sender: 'bot', time: '10:30' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Obrigado pela mensagem! Um atendente responderá em breve.', sender: 'bot', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50">
          <MessageCircle size={24} />
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="font-semibold">Suporte Online</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button onClick={sendMessage} className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
