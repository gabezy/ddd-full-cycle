import Customer from '../../customer/entities/customer';
import Order from '../entities/order';
import OrderItem from '../entities/order-item';
// import { v4 as uuidv4 } from 'uuid';

export default class OrderService {

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if(items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order("dsadas", customer.id, items);
    customer.addRewardPoints(order.total()/2);
    return order;
  }

}
