import Customer from './customer';

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {

    expect(() => {
      const customer = new Customer("", "jonh");
    }).toThrow("Id is required");
  })
})
