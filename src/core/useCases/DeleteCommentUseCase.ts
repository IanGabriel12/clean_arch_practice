import { CommentNotFoundException } from "../exceptions/CommentExceptions";
import CommentRepository from "../repositories/CommentRepository";

export default class DeleteCommentUseCase {
  commentRepo: CommentRepository

  constructor(commentRepo: CommentRepository) {
    this.commentRepo = commentRepo
  }

  async execute(commentId: string) {
    const comment = await this.commentRepo.getComment(commentId);

    if(!comment) throw new CommentNotFoundException('Comment does not exist');

    const deleted = this.commentRepo.deleteComment(commentId);

    return deleted;
  }
}