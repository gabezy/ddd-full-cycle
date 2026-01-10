import Address from "../dtos/address.ts";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address: Address;
  private _activate: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    if (id == null || id.length == 0) {
      throw new Error("Id is required");
    }

    if (name == null || name.length == 0) {
      throw new Error("Name is required");
    }

    this._id = id;
    this._name = name;
    this._address = "";
    this._activate = true;
  }

  public get id() : string {
    return this._id
  }

  public get name() : string {
    return this._id
  }
  
  public set address(v : Address) {
    if (v == null || v == undefined) {
      throw new Error("")
    }

    this._address = v;
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  
  public get address() : Address {
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
