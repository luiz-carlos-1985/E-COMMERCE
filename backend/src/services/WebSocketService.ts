import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export class WebSocketService {
  private io: SocketServer;
  private activeUsers = new Map<string, Set<string>>();

  constructor(server: HTTPServer) {
    this.io = new SocketServer(server, {
      cors: { origin: 'http://localhost:3000', credentials: true }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('user:join', (userId: string) => {
        if (!this.activeUsers.has(userId)) {
          this.activeUsers.set(userId, new Set());
        }
        this.activeUsers.get(userId)!.add(socket.id);
        this.io.emit('users:online', this.activeUsers.size);
      });

      socket.on('disconnect', () => {
        this.activeUsers.forEach((sockets, userId) => {
          if (sockets.has(socket.id)) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
              this.activeUsers.delete(userId);
            }
          }
        });
        this.io.emit('users:online', this.activeUsers.size);
      });
    });
  }

  notifyStockUpdate(productId: string, stock: number) {
    this.io.emit('stock:update', { productId, stock });
  }

  notifyNewOrder(userId: string, order: any) {
    const userSockets = this.activeUsers.get(userId);
    if (userSockets) {
      userSockets.forEach(socketId => {
        this.io.to(socketId).emit('order:created', order);
      });
    }
    this.io.emit('admin:new-order', order);
  }

  notifyOrderStatusUpdate(userId: string, orderId: string, status: string) {
    const userSockets = this.activeUsers.get(userId);
    if (userSockets) {
      userSockets.forEach(socketId => {
        this.io.to(socketId).emit('order:status-update', { orderId, status });
      });
    }
  }

  notifyPriceChange(productId: string, oldPrice: number, newPrice: number) {
    this.io.emit('price:change', { productId, oldPrice, newPrice });
  }

  broadcastFlashSale(product: any, discount: number, endsAt: Date) {
    this.io.emit('flash-sale:start', { product, discount, endsAt });
  }

  getActiveUsersCount() {
    return this.activeUsers.size;
  }
}

let webSocketService: WebSocketService;

export const initWebSocket = (server: HTTPServer) => {
  webSocketService = new WebSocketService(server);
  return webSocketService;
};

export const getWebSocketService = () => webSocketService;
