import "../../@shared/event-handler.interface";
import "../product-created.event";
import "../../product/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

  handle(event: ProductCreatedEvent): void {
    console.log('sending email to ...')
  }

}
