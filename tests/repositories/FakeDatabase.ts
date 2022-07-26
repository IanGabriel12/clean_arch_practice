import CommentEntity from "../../src/core/entities/CommentEntity";
import PostEntity, { PostDetailEntity } from "../../src/core/entities/PostEntity";
import UserEntity from "../../src/core/entities/UserEntity";

export type FakeDB = {
  users: UserEntity[];
  posts: PostDetailEntity[];
  comments: CommentEntity[];
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

const comments: CommentEntity[] = [
  new CommentEntity({
    id: "abc",
    writer: users[0],
    post: posts[0],
    body: "Comentário 01"
  }),

  new CommentEntity({
    id: "abcd",
    writer: users[1],
    post: posts[0],
    body: "Comentário 02"
  }),

  new CommentEntity({
    id: "abcde",
    writer: users[0],
    post: posts[1],
    body: "Comentário 03"
  }),

  new CommentEntity({
    id: "abcdef",
    writer: users[1],
    post: posts[1],
    body: "Comentário 04"
  }),
]

const db: FakeDB = {
  users,
  posts,
  comments,
};

export default db;