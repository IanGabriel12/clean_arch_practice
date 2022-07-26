import CommentEntity from "../entities/CommentEntity";
import CommentRepository from "../repositories/CommentRepository";

export default class UpdateCommentUseCase {
  commentRepo: CommentRepository
  constructor(commentRepo: CommentRepository) {
    this.commentRepo = commentRepo
  }

  async execute(commentId: string, newBody: string) {
    const comment = await this.commentRepo.getComment(commentId);

    if(!comment) throw new Error('Comentário não existe');

    const newComment = new CommentEntity({
      body: newBody,
      post: comment.post,
      writer: comment.writer,
      id: comment.id,
    });

    const updatedId = await this.commentRepo.updateComment(newComment);
    const updatedComment = (await this.commentRepo.getComment(updatedId))!;

    return updatedComment;
  }
}