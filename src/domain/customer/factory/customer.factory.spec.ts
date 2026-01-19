import Customer from "../entities/customer";
import Address from "../vos/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer: Customer = CustomerFactory.create("Jonh");
    
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jonh");
    expect(customer.address).toBeUndefined();
  })
  
  it("should create a customer with an address", () => {
    const address = new Address("street 1", 10, "76621-231", "São Paulo");
    const customer: Customer = CustomerFactory.createWithAddress("Jonh", address)
    
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jonh");
    expect(customer.address).toBe(address);
  })
})