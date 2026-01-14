import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default interface EventDispacherInterface {

  notify(event: EventInterface): void;
  register(eventName: string, handler: EventHandlerInterface): void;
  unregister(eventName: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
  getEventHandlers(): Map<string, EventHandlerInterface[]>;
  getEventHandlersByEvent(eventName: string): EventHandlerInterface[] | undefined;

}
