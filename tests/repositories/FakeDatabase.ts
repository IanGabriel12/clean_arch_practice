import PostEntity, { PostDetailEntity } from "../../src/core/entities/PostEntity";
import UserEntity from "../../src/core/entities/UserEntity";

export type FakeDB = {
  users: UserEntity[];
  posts: PostDetailEntity[];
}

const users = [
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

const posts = [
  new PostDetailEntity({
    id: "abcd",
    title: "Post novo 01",
    body: "Lorem ipsum",
    writer: users[0],
  }),
  new PostDetailEntity({
    id: "abcde",
    title: "Post novo 02",
    body: "Lorem ipsum",
    writer: users[0],
  }),
  new PostDetailEntity({
    id: "dcba",
    title: "Post novo 03",
    body: "Lorem ipsum",
    writer: users[1],
  }),
  new PostDetailEntity({
    id: "dcbe",
    title: "Post novo 04",
    body: "Lorem ipsum",
    writer: users[1],
  }),
]

const db: FakeDB = {
  users,
  posts,
};

export default db;