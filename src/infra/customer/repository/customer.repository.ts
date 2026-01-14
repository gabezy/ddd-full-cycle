import Customer from '../../../domain/customer/entities/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repositories/customer-repository.interface';
import Address from '../../../domain/customer/vos/address';
import CustomerModel from './sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address?.street,
      number: entity.address?.number,
      zipcode: entity.address?.zip,
      city: entity.address?.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address?.street,
        number: entity.address?.number,
        zipcode: entity.address?.zip,
        city: entity.address?.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    
    if (!customerModel) {
      throw new Error();
    }
    
    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.addRewardPoints(customer.rewardPoints);
    customer.changeAddress(address);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
