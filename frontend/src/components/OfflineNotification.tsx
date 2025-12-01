import React, { useState, useEffect } from 'react';
import { checkOnlineStatus } from '../services/api';

const OfflineNotification: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOffline(!checkOnlineStatus());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center z-50">
      ⚠️ Sistema em modo offline - Algumas funcionalidades podem estar limitadas
    </div>
  );
};

export default OfflineNotification;
