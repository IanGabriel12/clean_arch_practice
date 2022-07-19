import UserEntity from "./UserEntity";

type CommentConstructData = {
  id?: string;
  writer: UserEntity;
  body: string;
}

export default class CommentEntity {
  id: string;
  writer: UserEntity;
  body: string;

  constructor (data: CommentConstructData) {
    this.id = data.id || crypto.randomUUID();
    this.writer = data.writer;
    this.body = data.body;
  }
}