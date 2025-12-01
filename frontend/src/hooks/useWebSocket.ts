import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store/useStore';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const user = useStore(state => state.user);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('WebSocket connected');
      if (user) {
        socket.emit('user:join', user.id);
      }
    });

    socket.on('stock:update', ({ productId, stock }) => {
      useStore.getState().updateProductStock(productId, stock);
    });

    socket.on('order:created', (order) => {
      useStore.getState().addNotification({
        type: 'success',
        message: 'Pedido criado com sucesso!'
      });
    });

    socket.on('order:status-update', ({ orderId, status }) => {
      useStore.getState().addNotification({
        type: 'info',
        message: `Status do pedido atualizado: ${status}`
      });
    });

    socket.on('price:change', ({ productId, oldPrice, newPrice }) => {
      if (newPrice < oldPrice) {
        useStore.getState().addNotification({
          type: 'success',
          message: `Preço reduzido! Economize ${((oldPrice - newPrice) / oldPrice * 100).toFixed(0)}%`
        });
      }
    });

    socket.on('flash-sale:start', ({ product, discount, endsAt }) => {
      useStore.getState().addNotification({
        type: 'info',
        message: `Flash Sale! ${product.name} com ${discount}% de desconto!`
      });
    });

    socket.on('users:online', (count) => {
      console.log(`Usuários online: ${count}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return socketRef.current;
};
