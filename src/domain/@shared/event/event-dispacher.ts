import EventDispacherInterface from './event-dispacher.interface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default class EventDispacher implements EventDispacherInterface {

  private handlers: Map<string, EventHandlerInterface[]>;

  constructor() {
    this.handlers = new Map<string, EventHandlerInterface[]>;
  }

  notify(event: EventInterface): void {
    const eventHandlers = this.getEventHandlersByEvent(event.eventName);
    
    if (!eventHandlers) {
      return;
    }

    eventHandlers.forEach(handler => handler.handle(event));
  }

  register(eventName: string, handler: EventHandlerInterface): void {
    const eventHandlers = this.getEventHandlersByEvent(eventName);

    if (!eventHandlers) {
      this.handlers.set(eventName, [handler]);
      return;
    }

    eventHandlers.push(handler);
  }

  unregister(eventName: string, handler: EventHandlerInterface): void {
    const eventHandlers = this.getEventHandlersByEvent(eventName);

    if (!eventHandlers) {
      return;
    }
    
    const index = eventHandlers.indexOf(handler);

    if (index > -1) {
      eventHandlers.splice(index, 1);
    }
  }

  unregisterAll(): void {
    this.handlers.forEach((_, key, m) => {
      m.set(key, []);
    })
  }

  getEventHandlers(): Map<string, EventHandlerInterface[]> {
    return this.handlers;
  }
  
  getEventHandlersByEvent(eventName: string): EventHandlerInterface[] | undefined {
    return this.handlers.get(eventName);
  };

}
