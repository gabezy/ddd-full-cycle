export default interface OrderFactoryProps {
  
  id: string;
  customerId: string;
  items: ItemInterface[];

}

interface ItemInterface {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}