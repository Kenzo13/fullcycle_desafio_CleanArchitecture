import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("Should throw error when id is empty", ()=> {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("Should throw error when name is empty", ()=> {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("Should change name", ()=> {
    const customer = new Customer("123", "John");

    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("Should activate customer", ()=> {
    const customer = new Customer("1", "John");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo")
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("Should deactivate customer", ()=> {
    const customer = new Customer("1", "John");
    
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("Should throw error when address is undefined when you activate a customer", ()=> {
    expect(() => {
      const customer = new Customer("1", "John");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("Should add reward points", () => {
    const customer = new Customer("1", "Customer1");
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20)
  });
});