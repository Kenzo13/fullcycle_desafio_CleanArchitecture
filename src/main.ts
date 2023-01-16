import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';

let customer = new Customer("123", "Raphael Kenzo");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 'p1', 100);
const item2 = new OrderItem("2", "Item 2", 15, 'p2', 200);
const order = new Order("1", "123", [item1, item2]);