
import crypto from "crypto";
import CommentEntity from "./CommentEntity";
import UserEntity from "./UserEntity";

type PostConstructData = {
  id?: string;
  title: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class PostEntity {
  id: string;
  writer: UserEntity;
  comments: CommentEntity[];
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(data: PostConstructData) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title;
    this.body = data.body;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || null;
  }
}
