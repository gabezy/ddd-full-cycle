import {Sequelize} from 'sequelize-typescript';
import ProductRepository from './product.repository';
import ProductModel from './sequelize/model/product.model';
import Product from '../../../domain/product/entities/product';

describe("Product repository test", () => {

  let sequelize: Sequelize;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logginh: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel]);
    await sequelize.sync()

    productRepository = new ProductRepository();
  })

  it("should create a product", async () => {
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    })
  })

  it("should update a product", async () => {
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    product.changeName("Caderno");
    product.changePrice(120);

    await productRepository.update(product);

    const productModelChanged = await ProductModel.findOne({ where: { id: '1'} });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(productModelChanged.toJSON()).toStrictEqual({
      id: "1",
      name: "Caderno",
      price: 120,
    });
  })

  it("should find a product by id", async () => {
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    const productSearched = await productRepository.findById("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: productSearched.id,
      name: productSearched.name,
      price: productSearched.price,
    })
  })

  it("should find all products", async () => {
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  })

  afterEach(async () => {
    await ProductModel.destroy({ truncate: true, });
  })

  afterAll(async () => {
    await sequelize.close();
  })
})
