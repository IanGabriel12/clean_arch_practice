import CommentEntity from "../entities/CommentEntity";

export default interface CommentRepository {
  insertComment(comment: CommentEntity): Promise<string>;
  updateComment(newComment: CommentEntity): Promise<string>;
  getComment(id: string): Promise<CommentEntity | null>;
  listCommentsFromPost(postId: string): Promise<CommentEntity[]>;
  deleteComment(id: string): Promise<boolean>;
}