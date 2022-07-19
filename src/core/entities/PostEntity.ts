import CommentEntity from "./CommentEntity";
import UserEntity from "./UserEntity";

type PostConstructData = {
  id?: string;
  comments?: CommentEntity[];
  writer: UserEntity;
  title: string;
  body: string;
}

export default class PostEntity {
  id: string;
  writer: UserEntity;
  title: string;
  body: string;
  comments: CommentEntity[] //CommentEntity

  constructor (data: PostConstructData) {
    this.id = data.id || crypto.randomUUID();
    this.writer = data.writer;
    this.title = data.title;
    this.body = data.body;
    this.comments = data.comments || [];
  }
}