import UserEntity from "../../src/core/entities/UserEntity";
import UserRepository from "../../src/core/repositories/UserRepository";

export default class InMemoryUserRepository implements UserRepository {
  db: UserEntity[];

  constructor() {
    this.db = [
      new UserEntity({
        id: "abc",
        name: "Usuário teste",
        username: "teste",
        password: "123456",
        email: "teste@email.com",
      }),
      new UserEntity({
        id: "cbd",
        name: "Julia Roberta",
        username: "julia",
        password: "123456",
        email: "julia@email.com",
      }),
    ];
  }

  async insertUser(user: UserEntity) {
    this.db.push(user);
    return user.id;
  }

  async updateUser(newUser: UserEntity) {
    const index = this.db.findIndex((user) => (user.id = newUser.id));

    this.db[index].name = newUser.name;
    this.db[index].username = newUser.username;
    this.db[index].email = newUser.email;

    return newUser.id;
  }

  async getUser(id: string) {
    const user = this.db.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async listUsers() {
    return this.db;
  }

  async deleteUser(id: string) {
    const index = this.db.findIndex((user) => user.id === id);

    this.db.splice(index, 1);

    return true;
  }

  async getUserByUsername(username: string) {
    const user = this.db.find((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string) {
    const user = this.db.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
