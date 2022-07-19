import CommentEntity from "../entities/CommentEntity";

export default interface CommentRepository {
  insertComment(comment: CommentEntity): Promise<CommentEntity>;
  updateComment(newComment: CommentEntity): Promise<CommentEntity>;
  getComment(id: string): Promise<CommentEntity>;
  listCommentsFromPost(postId: string): Promise<CommentEntity[]>;
  deleteComment(id: string): Promise<boolean>;
}