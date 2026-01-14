import {Sequelize} from 'sequelize-typescript';
import CustomerRepository from './customer.repository';
import CustomerModel from './sequelize/model/customer.model';
import Customer from '../../../domain/customer/entities/customer';
import Address from '../../../domain/customer/vos/address';

describe("customer repository test", () => {

  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logginh: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel]);
    await sequelize.sync()

    customerRepository = new CustomerRepository();
  })

  it("should create a customer", async () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.addRewardPoints(10);
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  })

  afterEach(async () => {
    await CustomerModel.destroy({ truncate: true, });
  })

  afterAll(async () => {
    await sequelize.close();
  })
})
