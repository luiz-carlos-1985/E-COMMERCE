import { useState, useCallback } from 'react';
import { useStore } from '../store/useStore';

export const useApi = <T,>(fallbackData: T) => {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const addNotification = useStore(state => state.addNotification);

  const execute = useCallback(async (apiCall: () => Promise<any>) => {
    setLoading(true);
    try {
      const response = await apiCall();
      setData(response.data);
      setOffline(false);
      return response.data;
    } catch (error: any) {
      if (error?.offline) {
        setOffline(true);
        setData(fallbackData);
        addNotification('warning', 'Modo offline ativado');
      } else {
        addNotification('error', error?.response?.data?.message || 'Erro na requisição');
      }
      return fallbackData;
    } finally {
      setLoading(false);
    }
  }, [fallbackData, addNotification]);

  return { data, loading, offline, execute };
};
