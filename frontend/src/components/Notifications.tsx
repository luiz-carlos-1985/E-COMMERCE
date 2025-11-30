import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Notifications() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(notif => (
        <div key={notif.id} className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-sm animate-slide-in ${
          notif.type === 'success' ? 'bg-green-500/90 text-white' :
          notif.type === 'error' ? 'bg-red-500/90 text-white' :
          'bg-blue-500/90 text-white'
        }`}>
          {notif.type === 'success' && <CheckCircle size={20} />}
          {notif.type === 'error' && <XCircle size={20} />}
          {notif.type === 'info' && <Info size={20} />}
          <span className="flex-1">{notif.message}</span>
          <button onClick={() => removeNotification(notif.id)} className="hover:bg-white/20 p-1 rounded transition">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
