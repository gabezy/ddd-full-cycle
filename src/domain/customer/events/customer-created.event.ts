import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entities/customer";

export default class CustomerCreatedEvent implements EventInterface<Customer> {

    dateTimeOccurred: Date;
    event: Customer;
    eventName: string;

    constructor(customer: Customer) {
        this.dateTimeOccurred = new Date();
        this.eventName = "CustomerCreatedEvent";
        this.event = customer;
    }

}