
import CommentEntity from "./CommentEntity";
import UserEntity from "./UserEntity";
import crypto from 'crypto';

type PostDetailProps = {
  id?: string;
  title: string;
  body: string;
  writer: UserEntity;
  comments?: CommentEntity[];
  created_at?: Date;
  updated_at?: Date | null;
};

type BasePostProps = Omit<PostDetailProps, "writer" | "comments" | "body">;

export default class BasePostEntity {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(props: BasePostProps) {
    this.id = props.id || crypto.randomUUID();
    this.title = props.title;
    this.created_at = props.created_at || new Date();
    this.updated_at = props.updated_at || null;
  }
}

export class PostDetailEntity extends BasePostEntity {
  writer: UserEntity;
  comments: CommentEntity[];
  body: string;

  constructor(props: PostDetailProps) {
    super(props);
    this.writer = props.writer;
    this.comments = this.comments || [];
    this.body = props.body;
  }
}
