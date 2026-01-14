import Customer from "../../entities/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChanged implements EventInterface<Customer> {

    dateTimeOccurred: Date;
    event: Customer;
    eventName: string;

    constructor(customer: Customer) {
        this.dateTimeOccurred = new Date();
        this.eventName = "CustomerAddressChangedEvent";
        this.event = customer;
    }
}