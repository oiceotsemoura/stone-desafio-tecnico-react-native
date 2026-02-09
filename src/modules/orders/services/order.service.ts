import { Order, OrderStatus } from '../../../shared/types/order.types';
import { StorageUtils } from '../../../shared/utils/storage.utils';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class OrderService {
  private static currentUserEmail: string | null = null;

  static setCurrentUser(email: string) {
    this.currentUserEmail = email;
  }

  private static async loadUserOrders(): Promise<Order[]> {
    if (!this.currentUserEmail) {
      return [];
    }
    
    const orders = await StorageUtils.loadOrders(this.currentUserEmail);
    if (orders) {
      return orders.map(order => ({
        ...order,
        createdAt: new Date(order.createdAt),
      }));
    }
    return [];
  }

  private static async saveUserOrders(orders: Order[]): Promise<void> {
    if (!this.currentUserEmail) {
      return;
    }
    await StorageUtils.saveOrders(this.currentUserEmail, orders);
  }

  static async getOrders(): Promise<Order[]> {
    await delay(500);
    const orders = await this.loadUserOrders();
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  static async getOrderById(id: string): Promise<Order | null> {
    await delay(300);
    const orders = await this.loadUserOrders();
    return orders.find(order => order.id === id) || null;
  }

  static async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    await delay(800);
    
    const newOrder: Order = {
      ...order,
      id: String(Date.now()),
      createdAt: new Date(),
    };

    const orders = await this.loadUserOrders();
    orders.unshift(newOrder);
    await this.saveUserOrders(orders);
    
    return newOrder;
  }

  static async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    await delay(400);
    const orders = await this.loadUserOrders();
    return orders.filter(order => order.status === status);
  }
}
