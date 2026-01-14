import EventInterface from "../../@shared/event/event.interface";
import Product from "../entities/product";

export default class ProductCreatedEvent implements EventInterface {

  dateTimeOccurred: Date;
  event: Product;
  eventName: string
  
  
  constructor(event: Product) {
    this.dateTimeOccurred = new Date();
    this.eventName = 'ProductCreatedEvent';
    this.event = event;
  }


}
