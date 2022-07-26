import UserEntity from "./UserEntity";
import crypto from "crypto";
import BasePostEntity from "./PostEntity";

type CommentConstructData = {
  id?: string;
  writer: UserEntity;
  body: string;
  post: BasePostEntity;
};

export default class CommentEntity {
  id: string;
  writer: UserEntity;
  body: string;
  post: BasePostEntity;

  constructor(data: CommentConstructData) {
    this.id = data.id || crypto.randomUUID();
    this.writer = data.writer;
    this.body = data.body;
    this.post = data.post;
  }
}
