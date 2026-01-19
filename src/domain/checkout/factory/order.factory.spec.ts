import Order from "../entities/order";
import OrderFactoryProps from "./order-factory-props.interface";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  
  it("should create an order", () => {
    const orderProps: OrderFactoryProps = {
      id: "some id",
      customerId: "some customer id",
      items: [
        { id: "some item id", name: "item", productId: "some product id", quantity: 1, price: 20 }
      ]
    };
    
    const order: Order = OrderFactory.create(orderProps);
    
    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
  
});