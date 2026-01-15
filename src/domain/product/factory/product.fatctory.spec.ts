import ProductInterface from "../entities/product.interface";
import ProductFactory from "./prodcut.factory";

describe("Product factory unit test", () => {
  
  it("should create a product type A", () => {
    const product: ProductInterface = ProductFactory.create("a", "Product A", 1);
    
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  })
  
  
  it("should create a product type B", () => {
    const product: ProductInterface = ProductFactory.create("b", "Product B", 10);
    
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe("ProductB");
  })
  
  it("should throw an error when product type is not support", () => {
    const type = "unsupported type";
    
    expect(() => {
      ProductFactory.create(type, "product", 20)
    }).toThrow(new Error("Product for " + type + " not implemented yet"));
  })
  
})