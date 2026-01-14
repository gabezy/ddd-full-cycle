import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerRepository from "../../customer/repository/customer.repository";
import ProductRepository from "../../product/repository/product.repository";
import CustomerModel from "../../customer/repository/sequelize/model/customer.model";
import OrderModel from "./sequelize/model/order.model";
import OrderItemModel from "./sequelize/model/order-item.model";
import ProductModel from "../../product/repository/sequelize/model/product.model";
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/vos/address";
import Product from "../../../domain/product/entities/product";
import OrderItem from "../../../domain/checkout/entities/order-item";
import Order from "../../../domain/checkout/entities/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.create(customer);

    productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a existing order", async () =>{
    // create the Order
    customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.create(customer);

    productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Update order
    const newItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      3
    );

    const items = [...order.items, newItem];

    const updatedOrder = new Order(order.id, order.customerId, items);

    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: updatedOrder.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: updatedOrder.total(),
      items: [
        {
          id: "1",
          name: orderItem.name,
          price: orderItem.price,
          quantity: 2,
          order_id: "123",
          product_id: "123",
        },
        {
          id: "2",
          name: newItem.name,
          price: newItem.price,
          quantity: 3,
          order_id: "123",
          product_id: "123",
        }
      ],
    });
  });

  it("should find a order by id", async () =>{
    // create the Order
    customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.create(customer);

    productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await orderRepository.findById(order.id);

    expect(orderModel.id).toEqual(order.id);
    expect(orderModel.customerId).toEqual(order.customerId);
  });

  it("should list various orders", async () => {
    // create the Order
    customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.create(customer);

    productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      3
    )

    const order = new Order("123", "123", [orderItem]);
    const order2 = new Order("234", "123", [orderItem2])

    orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersModel = await orderRepository.findAll();

    expect(ordersModel.length).toEqual(2);
  })

});
