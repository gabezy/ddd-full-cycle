import Customer from './entities/customer';
import Address from './dtos/address';

let customer = new Customer("1", "Gabriel Moreira");
const address = new Address("Street one", 10, "12312-321", "São Paulo");
customer.address(address);

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);

const order = new Order("1", "1", [item1, item2]);
