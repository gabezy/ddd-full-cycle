import Order from "../../../domain/checkout/entities/order";
import OrderItem from "../../../domain/checkout/entities/order-item";
import OrderRepositoryInterface from "../../../domain/checkout/repositories/order-repository.interface";
import OrderItemModel from "./sequelize/model/order-item.model";
import OrderModel from "./sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

    items.forEach(async (item) => {
      const itemModel = await OrderItemModel.findOne({ where: { id: item.id }});
      if (itemModel != undefined || itemModel != null) {
        await OrderItemModel.update({...item}, { where: { id: item.id }});
      } else {
        await OrderItemModel.create({...item});
      }
    })

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        include: [{ model: OrderItemModel }],
        where: { id: entity.id }
      }
    )
  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ 
      include: ["items"],
      where: { id },
    });
    
    if (!order) {
      throw new Error();
    }
    
    return this.mapToEntity(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"]});
    return orders.map(order => this.mapToEntity(order));
  }

  private mapToEntity(model: OrderModel): Order {
    const orderItems = model.items.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      )
    });

    return new Order(model.id, model.customer_id, orderItems);
  }

}
