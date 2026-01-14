export default interface EventInterface<T = any> {

  dateTimeOccurred: Date;
  event: T;
  eventName: string;

}
