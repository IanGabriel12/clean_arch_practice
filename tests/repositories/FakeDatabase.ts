import PostEntity from "../../src/core/entities/PostEntity";
import UserEntity from "../../src/core/entities/UserEntity";

export type FakeDB = {
  users: UserEntity[];
  posts: PostEntity[];
}

const db: FakeDB = {
  users: [
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
  ],

  posts: [

  ]
};

export default db;