import Order from "../entities/order";
import OrderItem from "../entities/order-item";
import OrderFactoryProps from "./order-factory-props.interface";

export default class OrderFactory {
  
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map(prop => {
      return new OrderItem(prop.id, prop.name, prop.price, prop.productId, prop.quantity);
    })
    
    return new Order(props.id, props.customerId, items);
  }
  
}