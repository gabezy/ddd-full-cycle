import Customer from "../entities/customer";
import Address from "../vos/address";

export default class CustomerFactory {
  
  public static create(name: string): Customer {
    return new Customer("some id", name);
  }
  
  public static createWithAddress(name: string, address: Address): Customer {
    const customer = this.create(name);
    customer.changeAddress(address);
    return customer;
  }
  
}