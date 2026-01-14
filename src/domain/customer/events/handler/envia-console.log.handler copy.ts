import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        const customer = event.event;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address}`);
    }

}