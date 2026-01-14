import Customer from '../../customer/entities/customer';
import EnviaConsoleLog1Handler from '../../customer/events/handler/envia-console.log-1.handler';
import EnviaConsoleLog2Handler from '../../customer/events/handler/envia-console.log-2.handler copy';
import EnviaConsoleLogHandler from '../../customer/events/handler/envia-console.log.handler copy';
import Address from '../../customer/vos/address';
import Product from '../../product/entities/product';
import SendEmailWhenProductIsCreatedHandler from '../../product/events/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/events/product-created.event';
import EventDispacher from './event-dispacher';

describe("Domain event tests", () => {

  it("should register an event handler", () => {
    const eventName = "ProductCreatedEvent";
    const eventDispacher = new EventDispacher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispacher.register(eventName, eventHandler);
    eventDispacher.register(eventName, eventHandler);

    const productHandlers = eventDispacher.getEventHandlersByEvent(eventName);

    expect(productHandlers).toBeDefined();
    expect(productHandlers.length).toBe(2);
    expect(productHandlers[0]).toMatchObject(eventHandler);
  })

  it("should unregister an event handler", () => {
    const eventName = "ProductCreatedEvent";
    const eventDispacher = new EventDispacher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispacher.register(eventName, eventHandler);

    const productHandlers = eventDispacher.getEventHandlersByEvent(eventName);

    expect(productHandlers[0]).toMatchObject(eventHandler);

    eventDispacher.unregister(eventName, eventHandler);

    expect(eventDispacher.getEventHandlersByEvent(eventName)).toBeDefined();
    expect(eventDispacher.getEventHandlersByEvent(eventName)?.length).toBe(0);
  })

  it("should unregister all event handlers", () => {
    const eventName = "ProductCreatedEvent";
    const eventDispacher = new EventDispacher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispacher.register(eventName, eventHandler);

    const productHandlers = eventDispacher.getEventHandlersByEvent(eventName);

    expect(productHandlers[0]).toMatchObject(eventHandler);

    eventDispacher.unregisterAll();

    expect(eventDispacher.getEventHandlersByEvent(eventName)).toBeDefined();
    expect(eventDispacher.getEventHandlersByEvent(eventName)?.length).toBe(0);
  })

  it("should notify all event handlers", () => {
    const product = new Product("id12", "Cellphone", 100);

    const eventName = "ProductCreatedEvent";
    const productCreatedEvent = new ProductCreatedEvent(product)
    const eventDispacher = new EventDispacher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispacher.register(eventName, eventHandler);

    eventDispacher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })

  it("should notify the customer created event to the handlers", () => {
    const customer = new Customer("123", "Customer 123");
    const eventName = "CustomerCreatedEvent";
    const eventDispacher = new EventDispacher();

    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const eventDispacherSpy = jest.spyOn(eventDispacher, "notify");

    eventDispacher.register(eventName, eventHandler);
    eventDispacher.register(eventName, eventHandler2);

    customer.domainEvents.forEach(event => eventDispacher.notify(event));

    expect(customer.domainEvents.length).toBe(1);
    expect(eventDispacher.getEventHandlersByEvent(eventName)?.length).toBe(2);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(eventDispacherSpy).toHaveBeenCalledTimes(1);
  })

  it("should notify when the customer changes adrress", () => {
    const customer = new Customer("123", "Customer 123");
    const eventName = "CustomerAddressChangedEvent";
    customer.clearEvents();
    customer.changeAddress(new Address("Street 1", 10, "72212-322", "São Paulo"));

    const eventDispacher = new EventDispacher();

    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const eventDispacherSpy = jest.spyOn(eventDispacher, "notify");

    eventDispacher.register(eventName, eventHandler);

    customer.domainEvents.forEach(event => eventDispacher.notify(event));

    expect(customer.domainEvents.length).toBe(1);
    expect(eventDispacher.getEventHandlersByEvent(eventName)?.length).toBe(1);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(eventDispacherSpy).toHaveBeenCalledTimes(1);
  })

})
