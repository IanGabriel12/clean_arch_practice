import UserEntity from "../../src/core/entities/UserEntity";
import UserRepository from "../../src/core/repositories/UserRepository";
import db, { FakeDB } from "./FakeDatabase";

export default class InMemoryUserRepository implements UserRepository {
  db: FakeDB;

  constructor() {
    this.db = db;
  }

  async insertUser(user: UserEntity) {
    this.db.users.push(user);
    return user.id;
  }

  async updateUser(newUser: UserEntity) {
    const index = this.db.users.findIndex((user) => (user.id = newUser.id));

    this.db.users[index].name = newUser.name;
    this.db.users[index].username = newUser.username;
    this.db.users[index].email = newUser.email;

    return newUser.id;
  }

  async getUser(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async listUsers() {
    return this.db.users;
  }

  async deleteUser(id: string) {
    const index = this.db.users.findIndex((user) => user.id === id);

    this.db.users.splice(index, 1);

    return true;
  }

  async getUserByUsername(username: string) {
    const user = this.db.users.find((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string) {
    const user = this.db.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
