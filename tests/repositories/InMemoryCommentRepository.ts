import CommentEntity from "../../src/core/entities/CommentEntity";
import CommentRepository from "../../src/core/repositories/CommentRepository";
import db, { FakeDB } from "./FakeDatabase";

export default class InMemoryCommentRepository implements CommentRepository {
  db: FakeDB;

  constructor() {
    this.db = db;
  }

  async insertComment(comment: CommentEntity): Promise<string> {
    this.db.comments.push(comment);
    return comment.id;
  }

  async updateComment(newComment: CommentEntity): Promise<string> {
    const index = this.db.comments.findIndex(comment => comment.id === newComment.id);
    this.db.comments[index].body = newComment.body;
    return newComment.id;
  }

  async getComment(id: string): Promise<CommentEntity | null> {
    const comment = this.db.comments.find(comment => comment.id === id);

    if(!comment) return null;

    return comment;
  }

  async listCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return this.db.comments.filter(comment => comment.post.id === postId);
  }

  async deleteComment(id: string): Promise<boolean> {
    const index = this.db.comments.findIndex(comment => comment.id === id);

    this.db.comments.splice(index, 1);

    return true;
  }
}