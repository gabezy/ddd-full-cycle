import Product from "../entities/product";
import ProductB from "../entities/product-b";
import ProductInterface from "../entities/product.interface";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number,
  ): ProductInterface {
    const productType = type.trim().toLowerCase();

    switch (productType) {
      case "a":
        return new Product("some id", name, price);
      case "b":
        return new ProductB("some id", name, price);
      default:
        throw new Error("Product for " + type + " not implemented yet");
    }
  }
}
