import PostEntity from "./PostEntity";
import crypto from "crypto";

type UserConstructData = {
  id?: string;
  username: string;
  password: string;
  name: string;
  email: string;
};

export default class UserEntity {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;

  constructor(data: UserConstructData) {
    this.id = data.id || crypto.randomUUID();
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.email = data.email;
  }

  static createEmptyWithId(id: string) {
    return new UserEntity({
      id,
      username: '',
      password: '',
      name: '',
      email: ''
    })
  }
}
