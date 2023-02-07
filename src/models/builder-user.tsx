import { User } from "./user.class";

export class BuilderUser {
  private _user: User;
  constructor() {
    this._user = new User("", "", 0, null);
  }

  public set username(name: string) {
    this._user.username = name;
  }
  public set id(id: number) {
    this._user.id = id;
  }
  public set email(email: string) {
    this._user.email = email;
  }
}
