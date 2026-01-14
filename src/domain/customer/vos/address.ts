export default class Address {

  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  private validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required")
    }
  }
  
  public get street() : string {
    return this._street;
  }
  
  public get number() : number {
    return this._number;
  }

  public get zip() : string {
    return this._zip
  }
  
  public get city() : string {
    return this._city;
  }

  toString(): string {
    return `Rua ${this._street} número ${this._number} - ${this._city}`;
  }

}
