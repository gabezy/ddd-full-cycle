import Product from "../entities/product";

export default class ProductService {

  static increasePrice(products: Product[], percentage: number): Product[] {
    return products.map(product => {
      const newPrice = (product.price * percentage) / 100 + product.price;
      return product.changePrice(newPrice);
    })
  }
}
