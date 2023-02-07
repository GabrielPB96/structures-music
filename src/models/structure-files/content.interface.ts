import { CustomDate } from "../date";

export abstract class Content {
  protected _name: string;
  protected _creationDate: string;
  protected _type: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._creationDate = new CustomDate().format;
    this._type = type;
  }
  public get type() {
    return this._type;
  }
  public get name(): string {
    return this._name;
  }
  public get creationDate(): string {
    return this._creationDate;
  }

  public abstract size(): number;
}
