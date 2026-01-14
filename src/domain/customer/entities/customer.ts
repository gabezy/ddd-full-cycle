import EventInterface from "../../@shared/event/event.interface";
import CustomerAddressChanged from "../events/customer-address-changed.event";
import CustomerCreatedEvent from "../events/customer-created.event";
import Address from "../vos/address";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address?: Address;
  private _activate: boolean = true;
  private _rewardPoints: number = 0;
  private _domainEvents: EventInterface[] = [];

  constructor(id: string, name: string) {
    if (id == null || id.length == 0) {
      throw new Error("Id is required");
    }

    if (name == null || name.length == 0) {
      throw new Error("Name is required");
    }

    this._id = id;
    this._name = name;
    this._activate = true;

    this.addDomainEvent(new CustomerCreatedEvent(this));
  }

  get domainEvents(): EventInterface[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: EventInterface): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public get id() : string {
    return this._id
  }

  public get name() : string {
    return this._name
  }
  
  public set address(v : Address) {
    if (v == null || v == undefined) {
      throw new Error("")
    }

    this._address = v;
  }

  changeAddress(address: Address): void {
    this._address = address;
    this.addDomainEvent(new CustomerAddressChanged(this));
  }

  
  public get address() : Address | undefined {
    return this._address;
  }

  public activate() {
    this._activate = true;
  }

  public deactivate() {
    this._activate = false;
  }

  public isActive() {
    return this._activate;
  }

  public addRewardPoints(points: number) {
    if (points < 0) {
      throw new Error("Cannot add negative points");
    }
    this._rewardPoints += points;
  }

  public get rewardPoints() : number {
    return this._rewardPoints;
  }
  
}
